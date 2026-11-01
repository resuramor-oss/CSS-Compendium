import type { Question } from "@/lib/quiz";

export const coc3Questions: Question[] = [
  {
    id: "coc3-q01",
    coc: "3",
    prompt: "Which of these is a network operating system (NOS)?",
    choices: [
      "Windows Server",
      "Microsoft Word",
      "Google Chrome",
      "Adobe Photoshop",
    ],
    answer: 0,
    explanation:
      "A network operating system provides user management, file/print sharing, directory services, and network services. Windows Server and Linux server distributions are common examples.",
    source: "TESDA TR CSS NC II, pp. 46–48; COC 3 Self-Assessment Guide",
  },
  {
    id: "coc3-q02",
    coc: "3",
    prompt: "Why are user groups used on a server?",
    choices: [
      "To assign permissions to many users at once",
      "To increase the server's RAM",
      "To replace the need for a password",
      "To physically organize network cables",
    ],
    answer: 0,
    explanation:
      "Groups simplify administration: permissions are assigned to the group, and users inherit them by membership. This is easier and less error-prone than managing each account separately.",
    source: "TESDA TR CSS NC II, p. 46 (Element 1); COC 3 Self-Assessment Guide",
  },
  {
    id: "coc3-q03",
    coc: "3",
    prompt: "What does the principle of least privilege mean?",
    choices: [
      "Every user should be an administrator",
      "Users get only the access they need to do their job",
      "All files should be readable by everyone",
      "Passwords should be shared with the team",
    ],
    answer: 1,
    explanation:
      "Least privilege limits accounts to the minimum permissions required. It reduces the damage that can be caused by mistakes, malware, or compromised accounts.",
    source: "TESDA TR CSS NC II, p. 46 (Element 1.2); COC 3 Self-Assessment Guide",
  },
  {
    id: "coc3-q04",
    coc: "3",
    prompt:
      "A user has Full Control on an NTFS folder but only Read on the shared folder. What effective access does the user get over the network?",
    choices: [
      "Full Control, because NTFS is always stronger",
      "Read, because the most restrictive permission applies",
      "No access at all",
      "The permissions cancel each other out",
    ],
    answer: 1,
    explanation:
      "When share permissions and NTFS permissions differ, the effective network access is the most restrictive combination. Here, Read on the share limits the user to reading.",
    source: "TESDA TR CSS NC II, p. 46; COC 3 Self-Assessment Guide",
  },
  {
    id: "coc3-q05",
    coc: "3",
    prompt: "What is the role of a domain controller?",
    choices: [
      "It controls the building's air conditioning",
      "It authenticates users and stores directory information such as accounts and policies",
      "It only stores printer paper",
      "It converts copper cables to fiber",
    ],
    answer: 1,
    explanation:
      "In a Windows domain, a domain controller runs Active Directory Domain Services and handles authentication, authorization, and directory data.",
    source: "TESDA TR CSS NC II, p. 47; COC 3 Self-Assessment Guide",
  },
  {
    id: "coc3-q06",
    coc: "3",
    prompt: "Which service centrally manages IP address leases on a network?",
    choices: ["DNS", "DHCP", "IIS", "RDP"],
    answer: 1,
    explanation:
      "DHCP dynamically assigns IP addresses and related settings to clients, reducing manual configuration and address conflicts.",
    source: "TESDA TR CSS NC II, p. 47; COC 3 Self-Assessment Guide",
  },
  {
    id: "coc3-q07",
    coc: "3",
    prompt: "Which service resolves hostnames to IP addresses for clients?",
    choices: ["DHCP", "DNS", "FTP", "SMTP"],
    answer: 1,
    explanation:
      "DNS maps names to IP addresses. A server configured as a DNS server answers queries so clients can reach resources by name.",
    source: "TESDA TR CSS NC II, p. 47; COC 3 Self-Assessment Guide",
  },
  {
    id: "coc3-q08",
    coc: "3",
    prompt: "Microsoft IIS is primarily used to provide which service?",
    choices: ["Web services", "Printer ink refills", "Cable crimping", "Disk defragmentation"],
    answer: 0,
    explanation:
      "Internet Information Services (IIS) is a Microsoft web server role used to host websites and web applications.",
    source: "TESDA TR CSS NC II, p. 47; COC 3 Self-Assessment Guide",
  },
  {
    id: "coc3-q09",
    coc: "3",
    prompt:
      "Which network service lets users access shared folders and printers over the LAN?",
    choices: [
      "File and printer sharing",
      "Disk cleanup",
      "Device Manager",
      "Task Scheduler",
    ],
    answer: 0,
    explanation:
      "File and printer sharing services publish shared resources to network users, subject to permissions and access policies.",
    source: "TESDA TR CSS NC II, p. 47; COC 3 Self-Assessment Guide",
  },
  {
    id: "coc3-q10",
    coc: "3",
    prompt: "What does RDP allow an administrator to do?",
    choices: [
      "Remotely access a Windows desktop or server session",
      "Rewrite the BIOS firmware automatically",
      "Replace a faulty power supply",
      "Convert a physical server into a switch",
    ],
    answer: 0,
    explanation:
      "Remote Desktop Protocol (RDP) provides a remote graphical session to a Windows computer or server. Access should be restricted and secured.",
    source: "TESDA TR CSS NC II, p. 47; COC 3 Self-Assessment Guide",
  },
  {
    id: "coc3-q11",
    coc: "3",
    prompt:
      "Before deploying a server, which check confirms that it starts normally and has network connectivity?",
    choices: [
      "Check the boot sequence for errors and test network connectivity",
      "Change the desktop wallpaper",
      "Unplug all network cables",
      "Disable all user accounts",
    ],
    answer: 0,
    explanation:
      "The range of variables for normal server functions includes no error on the boot sequence and network connectivity.",
    source: "TESDA TR CSS NC II, p. 47; COC 3 Self-Assessment Guide",
  },
  {
    id: "coc3-q12",
    coc: "3",
    prompt: "Which item is part of pre-deployment procedures?",
    choices: [
      "Installing applications and populating the database",
      "Deleting all backups",
      "Removing the server from the network",
      "Disabling documentation",
    ],
    answer: 0,
    explanation:
      "Pre-deployment includes preparing the server for use, such as installing required applications and populating databases, before it is released or deployed.",
    source: "TESDA TR CSS NC II, p. 47; COC 3 Self-Assessment Guide",
  },
  {
    id: "coc3-q13",
    coc: "3",
    prompt:
      "A server is reachable by IP address but not by hostname from a client. What should you check first?",
    choices: [
      "The client's DNS configuration",
      "The monitor's brightness",
      "The keyboard layout",
      "The printer's paper tray",
    ],
    answer: 0,
    explanation:
      "If IP connectivity works but name resolution fails, DNS is the likely issue. Check the client's configured DNS server and whether the record exists.",
    source: "TESDA TR CSS NC II, p. 47; COC 3 Self-Assessment Guide",
  },
  {
    id: "coc3-q14",
    coc: "3",
    prompt: "Why should a new server's firewall and security settings be reviewed before deployment?",
    choices: [
      "To block unnecessary services and reduce the attack surface",
      "To make the server run slower",
      "To disable all user authentication",
      "To prevent backups from being created",
    ],
    answer: 0,
    explanation:
      "Only required ports and services should be exposed. Reviewing firewall and security settings reduces the attack surface and enforces the organization's access policy.",
    source: "TESDA TR CSS NC II, p. 46 (Element 1.3); COC 3 Self-Assessment Guide",
  },
  {
    id: "coc3-q15",
    coc: "3",
    prompt: "What should be completed after testing and pre-deployment checks?",
    choices: [
      "Reports and documentation according to enterprise policy",
      "A new social media account",
      "A hardware overclock",
      "A cable crimping contest",
    ],
    answer: 0,
    explanation:
      "Element 3.3 requires reports to be prepared and completed according to enterprise policies and procedures. Documentation is part of the assessed competency.",
    source: "TESDA TR CSS NC II, p. 46 (Element 3.3); COC 3 Self-Assessment Guide",
  },
];
