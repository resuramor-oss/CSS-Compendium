import type { Question } from "@/lib/quiz";

export const coc4Questions: Question[] = [
  {
    id: "coc4-q01",
    coc: "4",
    prompt: "What is the main goal of preventive maintenance?",
    choices: [
      "To fix failures only after they happen",
      "To reduce the chance of failure and keep systems reliable",
      "To make repairs more expensive",
      "To remove all user data",
    ],
    answer: 1,
    explanation:
      "Preventive maintenance is scheduled work such as cleaning, updates, backups, and inspections that reduces the likelihood of unexpected failures and extends equipment life.",
    source: "TESDA TR CSS NC II, pp. 49–52; COC 4 Self-Assessment Guide",
  },
  {
    id: "coc4-q02",
    coc: "4",
    prompt: "What is the difference between a backup and a restore point?",
    choices: [
      "A backup copies data for recovery; a restore point captures system state for rollback",
      "They are exactly the same thing",
      "A restore point copies only the monitor settings",
      "A backup is only for printers",
    ],
    answer: 0,
    explanation:
      "A backup protects files or systems by copying them to another location. A restore point records system configuration and state so the OS can be rolled back after a bad change.",
    source: "TESDA TR CSS NC II, p. 51; COC 4 Self-Assessment Guide",
  },
  {
    id: "coc4-q03",
    coc: "4",
    prompt: "Why should antivirus definitions be kept updated?",
    choices: [
      "New malware appears constantly, and updated definitions improve detection",
      "Updates make the computer physically lighter",
      "Updates remove the need for backups",
      "Updates disable the firewall permanently",
    ],
    answer: 0,
    explanation:
      "Antivirus software relies on current signatures and heuristics. Outdated definitions may miss newer threats, so updates are part of preventive maintenance.",
    source: "TESDA TR CSS NC II, p. 52; COC 4 Self-Assessment Guide",
  },
  {
    id: "coc4-q04",
    coc: "4",
    prompt: "What is the first step in a systematic troubleshooting process?",
    choices: [
      "Replace the motherboard immediately",
      "Identify and gather information about the problem",
      "Reinstall the operating system",
      "Ignore the symptom",
    ],
    answer: 1,
    explanation:
      "Diagnosis starts with gathering information, identifying symptoms, and isolating the fault before changing parts. Random replacement can destroy evidence and waste resources.",
    source: "TESDA TR CSS NC II, p. 52; COC 4 Self-Assessment Guide",
  },
  {
    id: "coc4-q05",
    coc: "4",
    prompt: "A PC powers on but shows no display and emits a repeating beep pattern. What does this usually indicate?",
    choices: [
      "A firmware/POST error code",
      "A successful boot",
      "The printer is offline",
      "The mouse battery is low",
    ],
    answer: 0,
    explanation:
      "Beep codes are produced by the motherboard firmware when POST detects a hardware problem, often related to memory or video. The pattern must be checked against the motherboard manual.",
    source: "TESDA TR CSS NC II, p. 52; COC 4 Self-Assessment Guide",
  },
  {
    id: "coc4-q06",
    coc: "4",
    prompt: "Which tool is appropriate for checking whether a power supply outputs the correct voltages?",
    choices: [
      "Multimeter",
      "Crimping tool",
      "Punch-down tool",
      "Cable tester",
    ],
    answer: 0,
    explanation:
      "A multimeter measures voltage, current, and resistance. It can verify PSU rail voltages within safe procedures, but testing should follow safety guidelines.",
    source: "TESDA TR CSS NC II, p. 51; COC 4 Self-Assessment Guide",
  },
  {
    id: "coc4-q07",
    coc: "4",
    prompt: "What should you do before opening a computer case for repair?",
    choices: [
      "Power it off, unplug it, and observe ESD and safety precautions",
      "Leave it running to save time",
      "Stand on a carpet while wearing wool socks",
      "Pour water on the components",
    ],
    answer: 0,
    explanation:
      "Always disconnect power before servicing internal components. Use ESD protection and follow OHS procedures to prevent electric shock and static damage.",
    source: "TESDA TR CSS NC II, p. 50; COC 4 Self-Assessment Guide",
  },
  {
    id: "coc4-q08",
    coc: "4",
    prompt: "Which is an example of a software fault rather than a hardware fault?",
    choices: [
      "A corrupted operating system file",
      "A swollen capacitor",
      "A disconnected SATA cable",
      "A failed power supply fan",
    ],
    answer: 0,
    explanation:
      "Corrupted system files, driver conflicts, and malware are software faults. Physical damage and loose or failed components are hardware faults.",
    source: "TESDA TR CSS NC II, p. 51; COC 4 Self-Assessment Guide",
  },
  {
    id: "coc4-q09",
    coc: "4",
    prompt: "Why should you back up data before a major repair or OS reinstallation?",
    choices: [
      "Repair procedures can overwrite or lose data",
      "Backups make the CPU faster",
      "Backups replace the need for a power supply",
      "Backups prevent all hardware failures",
    ],
    answer: 0,
    explanation:
      "Repairs, partitioning, and reinstalling an OS can erase data. A current backup protects against irreversible loss and supports contingency planning.",
    source: "TESDA TR CSS NC II, p. 51; COC 4 Self-Assessment Guide",
  },
  {
    id: "coc4-q10",
    coc: "4",
    prompt: "A computer shuts down randomly under heavy load and the fan is clogged with dust. What is the most likely cause?",
    choices: [
      "Overheating due to restricted airflow",
      "A missing web browser",
      "An incorrect desktop wallpaper",
      "A disconnected printer",
    ],
    answer: 0,
    explanation:
      "Dust-clogged fans and heatsinks cause overheating. The system may throttle or shut down to protect itself. Cleaning and checking airflow are part of preventive maintenance.",
    source: "TESDA TR CSS NC II, p. 50; COC 4 Self-Assessment Guide",
  },
  {
    id: "coc4-q11",
    coc: "4",
    prompt: "How should removed electronic components be handled?",
    choices: [
      "Dispose of them through proper WEEE channels and follow the 3Rs",
      "Throw them in the regular garbage",
      "Burn them behind the school",
      "Store them in a wet area",
    ],
    answer: 0,
    explanation:
      "Electronic waste can contain hazardous materials. Element 5.5 requires disposal based on WEEE directives and the 3Rs waste management program.",
    source: "TESDA TR CSS NC II, p. 50 (Element 5.5); COC 4 Self-Assessment Guide",
  },
  {
    id: "coc4-q12",
    coc: "4",
    prompt: "Why is a job/service order important before maintenance work?",
    choices: [
      "It records the reported problem, scope, and authorization for the work",
      "It replaces the need to test the unit",
      "It guarantees the repair will be free",
      "It automatically installs drivers",
    ],
    answer: 0,
    explanation:
      "A job order or service request documents the complaint, the unit's details, and the work authorized. It supports diagnosis, accountability, and reporting.",
    source: "TESDA TR CSS NC II, p. 52; COC 4 Self-Assessment Guide",
  },
  {
    id: "coc4-q13",
    coc: "4",
    prompt: "After replacing a faulty component, what should be done next?",
    choices: [
      "Inspect and test the system to confirm safe, correct operation",
      "Immediately return it without testing",
      "Remove all documentation",
      "Disable the cooling fans",
    ],
    answer: 0,
    explanation:
      "Element 5 requires final inspection and testing to confirm the repair conforms to the manufacturer's instructions and the system operates safely.",
    source: "TESDA TR CSS NC II, p. 50 (Element 5); COC 4 Self-Assessment Guide",
  },
  {
    id: "coc4-q14",
    coc: "4",
    prompt:
      "A workstation cannot reach any website, but it can ping its default gateway. What should you check next?",
    choices: [
      "DNS settings and upstream connectivity",
      "The keyboard cable",
      "The monitor stand",
      "The printer toner",
    ],
    answer: 0,
    explanation:
      "If the gateway responds, local connectivity is working. The next checks are DNS resolution and whether traffic can reach the internet beyond the gateway.",
    source: "TESDA TR CSS NC II, p. 51; COC 4 Self-Assessment Guide",
  },
  {
    id: "coc4-q15",
    coc: "4",
    prompt: "What should be done with the work site after a repair is completed?",
    choices: [
      "Clean and clear debris, and leave the area in a safe condition",
      "Leave tools and packaging scattered",
      "Store leftover screws on the floor",
      "Disconnect the fire extinguisher",
    ],
    answer: 0,
    explanation:
      "Element 5.4 requires the work site to be cleaned and cleared of debris and left in a safe condition according to company procedures. 5S supports this habit.",
    source: "TESDA TR CSS NC II, p. 50 (Element 5.4); COC 4 Self-Assessment Guide",
  },
];
