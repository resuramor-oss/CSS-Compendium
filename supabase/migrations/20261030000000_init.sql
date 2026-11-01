-- CSS Compendium — initial schema
-- Run this in the Supabase SQL editor, or apply it with the Supabase CLI.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '',
  role text not null default 'student' check (role in ('student', 'admin')),
  analytics_opt_in boolean not null default false,
  analytics_consent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Create a profile automatically when a user signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(
      nullif(new.raw_user_meta_data ->> 'display_name', ''),
      nullif(split_part(coalesce(new.email, ''), '@', 1), ''),
      'Student'
    )
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create table if not exists public.section_progress (
  user_id uuid not null references auth.users (id) on delete cascade,
  coc_slug text not null,
  section_slug text not null,
  status text not null default 'complete' check (status in ('complete')),
  updated_at timestamptz not null default now(),
  primary key (user_id, coc_slug, section_slug)
);

alter table public.section_progress enable row level security;

drop policy if exists "section_progress_select_own" on public.section_progress;
create policy "section_progress_select_own"
  on public.section_progress for select
  using (auth.uid() = user_id);

drop policy if exists "section_progress_insert_own" on public.section_progress;
create policy "section_progress_insert_own"
  on public.section_progress for insert
  with check (auth.uid() = user_id);

drop policy if exists "section_progress_update_own" on public.section_progress;
create policy "section_progress_update_own"
  on public.section_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "section_progress_delete_own" on public.section_progress;
create policy "section_progress_delete_own"
  on public.section_progress for delete
  using (auth.uid() = user_id);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  coc_slug text,
  mode text not null check (mode in ('practice', 'exam')),
  score integer not null default 0,
  total integer not null default 0,
  duration_seconds integer,
  created_at timestamptz not null default now()
);

alter table public.quiz_attempts enable row level security;

drop policy if exists "quiz_attempts_select_own" on public.quiz_attempts;
create policy "quiz_attempts_select_own"
  on public.quiz_attempts for select
  using (auth.uid() = user_id);

drop policy if exists "quiz_attempts_insert_own" on public.quiz_attempts;
create policy "quiz_attempts_insert_own"
  on public.quiz_attempts for insert
  with check (auth.uid() = user_id);

drop policy if exists "quiz_attempts_delete_own" on public.quiz_attempts;
create policy "quiz_attempts_delete_own"
  on public.quiz_attempts for delete
  using (auth.uid() = user_id);

create table if not exists public.attempt_answers (
  id bigint generated always as identity primary key,
  attempt_id uuid not null references public.quiz_attempts (id) on delete cascade,
  question_id text not null,
  choice_id text,
  is_correct boolean not null default false
);

alter table public.attempt_answers enable row level security;

drop policy if exists "attempt_answers_select_own" on public.attempt_answers;
create policy "attempt_answers_select_own"
  on public.attempt_answers for select
  using (
    exists (
      select 1 from public.quiz_attempts a
      where a.id = attempt_answers.attempt_id and a.user_id = auth.uid()
    )
  );

drop policy if exists "attempt_answers_insert_own" on public.attempt_answers;
create policy "attempt_answers_insert_own"
  on public.attempt_answers for insert
  with check (
    exists (
      select 1 from public.quiz_attempts a
      where a.id = attempt_answers.attempt_id and a.user_id = auth.uid()
    )
  );

create index if not exists quiz_attempts_user_created_idx
  on public.quiz_attempts (user_id, created_at desc);

create index if not exists section_progress_user_idx
  on public.section_progress (user_id);

-- Keep updated_at fresh on profiles.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- Users may update their display name and analytics preference, but not
-- promote themselves to admin through the public API.
create or replace function public.protect_profile_role()
returns trigger
language plpgsql
as $$
begin
  if new.role is distinct from old.role then
    new.role = old.role;
  end if;
  if new.id is distinct from old.id then
    new.id = old.id;
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_protect_role on public.profiles;
create trigger profiles_protect_role
  before update on public.profiles
  for each row execute function public.protect_profile_role();
