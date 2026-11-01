import type { Question } from "@/lib/quiz";

export const coc1Questions: Question[] = [
  {
    id: "coc1-q01",
    coc: "1",
    prompt:
      "What is the main purpose of wearing an anti-static wrist strap while assembling a PC?",
    choices: [
      "To keep the technician's hands clean",
      "To safely discharge static electricity from the technician to a grounded point",
      "To increase the speed of the CPU",
      "To prevent the power supply from overheating",
    ],
    answer: 1,
    explanation:
      "An anti-static wrist strap bleeds static charge from your body to a grounded point so it does not discharge into sensitive components such as the CPU, RAM, or motherboard.",
    source: "TESDA TR CSS NC II, pp. 38–41; COC 1 Self-Assessment Guide",
  },
  {
    id: "coc1-q02",
    coc: "1",
    prompt: "Why is thermal paste applied between the CPU and the heatsink?",
    choices: [
      "It glues the CPU permanently to the socket",
      "It improves heat transfer by filling microscopic air gaps",
      "It insulates the CPU from electricity",
      "It cleans dust from the heatsink fins",
    ],
    answer: 1,
    explanation:
      "Metal surfaces are not perfectly flat. Thermal paste fills the tiny air gaps between the CPU and heatsink, improving heat conduction. A thin, even layer is enough.",
    source: "TESDA TR CSS NC II, p. 40; COC 1 Self-Assessment Guide",
  },
  {
    id: "coc1-q03",
    coc: "1",
    prompt: "What does POST check when a computer is powered on?",
    choices: [
      "Whether the operating system license is valid",
      "Whether the internet connection is working",
      "Whether basic hardware such as the CPU, RAM, and video output is present and working",
      "Whether the user's files are backed up",
    ],
    answer: 2,
    explanation:
      "The Power-On Self-Test (POST) is firmware code that performs a basic hardware check before handing control to the boot device. Errors are often reported through beeps, LEDs, or on-screen messages.",
    source: "TESDA TR CSS NC II, p. 41; COC 1 Self-Assessment Guide",
  },
  {
    id: "coc1-q04",
    coc: "1",
    prompt: "Which task is performed in BIOS/UEFI rather than in the operating system?",
    choices: [
      "Setting the boot device order",
      "Creating a user account",
      "Installing a word processor",
      "Formatting a document",
    ],
    answer: 0,
    explanation:
      "BIOS/UEFI configures low-level hardware settings, including the boot order, date/time, virtualization support, and sometimes fan or power settings. User accounts and applications belong to the OS.",
    source: "TESDA TR CSS NC II, p. 38 (Element 1.5); COC 1 Self-Assessment Guide",
  },
  {
    id: "coc1-q05",
    coc: "1",
    prompt:
      "You prepared a bootable USB installer. What should you change so the PC boots from it?",
    choices: [
      "The screen resolution",
      "The boot order or boot priority",
      "The keyboard layout",
      "The printer port",
    ],
    answer: 1,
    explanation:
      "The firmware must be told to boot from the USB device before the internal drive. This is done through the boot order or boot menu in BIOS/UEFI.",
    source: "TESDA TR CSS NC II, p. 38 (Element 2.1); COC 1 Self-Assessment Guide",
  },
  {
    id: "coc1-q06",
    coc: "1",
    prompt: "What is the purpose of partitioning a drive before installing an OS?",
    choices: [
      "To increase the physical size of the disk",
      "To divide the drive into logical regions that can be formatted and assigned to the OS",
      "To cool the hard drive",
      "To convert SATA into NVMe",
    ],
    answer: 1,
    explanation:
      "Partitioning creates logical sections on a storage device. The installer then formats a partition with a filesystem and uses it for the operating system, applications, and data.",
    source: "TESDA TR CSS NC II, p. 41; COC 1 Self-Assessment Guide",
  },
  {
    id: "coc1-q07",
    coc: "1",
    prompt: "Why must device drivers be installed after an operating system installation?",
    choices: [
      "Drivers are required for the OS to communicate correctly with hardware",
      "Drivers make the monitor physically larger",
      "Drivers replace the need for a power supply",
      "Drivers are only needed for games",
    ],
    answer: 0,
    explanation:
      "Drivers translate OS instructions into commands the hardware understands. Missing or incorrect drivers can cause devices to be unrecognized or to perform poorly.",
    source: "TESDA TR CSS NC II, p. 38 (Element 3.2); COC 1 Self-Assessment Guide",
  },
  {
    id: "coc1-q08",
    coc: "1",
    prompt:
      "A computer has 8 GB of RAM. Which operating system installation can use the full amount?",
    choices: [
      "A 32-bit OS",
      "A 64-bit OS",
      "Either one, because RAM size does not matter",
      "Only a live USB session",
    ],
    answer: 1,
    explanation:
      "A 32-bit OS is generally limited to about 4 GB of addressable RAM. A 64-bit OS can address much more, so it is the appropriate choice for 8 GB or more.",
    source: "TESDA TR CSS NC II, p. 41; COC 1 Self-Assessment Guide",
  },
  {
    id: "coc1-q09",
    coc: "1",
    prompt: "What is the purpose of a stress test after assembling a computer?",
    choices: [
      "To check whether the system remains stable under sustained load",
      "To erase the operating system",
      "To install additional RAM automatically",
      "To measure the physical weight of the unit",
    ],
    answer: 0,
    explanation:
      "A stress test pushes components such as the CPU, GPU, memory, and disk under load to expose instability, overheating, or faulty hardware before the unit is released.",
    source: "TESDA TR CSS NC II, p. 39 (Element 5.2); COC 1 Self-Assessment Guide",
  },
  {
    id: "coc1-q10",
    coc: "1",
    prompt: "In the 5S methodology, what does 'Seiri' (Sort) mean?",
    choices: [
      "Arrange frequently used items near the workstation",
      "Remove unnecessary items from the work area",
      "Clean the work area every hour",
      "Standardize the color of all cables",
    ],
    answer: 1,
    explanation:
      "Sort means separating what is needed from what is not, then removing the unnecessary items. The remaining 5S steps are Set in order, Shine, Standardize, and Sustain.",
    source: "TESDA TR CSS NC II, p. 39 (Element 5.3); COC 1 Self-Assessment Guide",
  },
  {
    id: "coc1-q11",
    coc: "1",
    prompt: "Which practice best reflects the 3Rs in a computer service area?",
    choices: [
      "Throw all electronic waste into the regular trash",
      "Reduce waste, reuse serviceable parts, and recycle or recover materials properly",
      "Burn old cables to recover copper",
      "Store broken parts indefinitely",
    ],
    answer: 1,
    explanation:
      "The 3Rs are Reduce, Reuse, and Recycle/Recover. Electronic waste needs proper handling because it may contain hazardous materials; it should not go into ordinary trash.",
    source: "TESDA TR CSS NC II, p. 39; COC 1 Self-Assessment Guide",
  },
  {
    id: "coc1-q12",
    coc: "1",
    prompt:
      "Before installing application software for a client, what should you confirm?",
    choices: [
      "That the client's wallpaper matches the software logo",
      "That the software meets the client's requirements and its license permits the installation",
      "That the software is the most expensive option",
      "That the monitor is turned off",
    ],
    answer: 1,
    explanation:
      "Installation should follow the user's requirements and the software license agreement. Installing unlicensed or unnecessary software creates legal and operational problems.",
    source: "TESDA TR CSS NC II, p. 39 (Element 4.1); COC 1 Self-Assessment Guide",
  },
  {
    id: "coc1-q13",
    coc: "1",
    prompt:
      "After replacing a motherboard, the system clock is wrong every time the PC is unplugged. What is the most likely cause?",
    choices: [
      "The CMOS battery is missing or discharged",
      "The monitor cable is loose",
      "The speakers are disconnected",
      "The USB keyboard is incompatible",
    ],
    answer: 0,
    explanation:
      "The CMOS battery maintains the real-time clock and firmware settings when power is removed. A dead or missing battery causes time and BIOS settings to reset.",
    source: "TESDA TR CSS NC II, pp. 38–41",
  },
  {
    id: "coc1-q14",
    coc: "1",
    prompt: "What is the safest way to handle a removed RAM module?",
    choices: [
      "Hold it by the gold contacts",
      "Hold it by the edges and keep it in an anti-static bag when not installed",
      "Place it on a carpet while you work",
      "Wipe the contacts with a wet cloth",
    ],
    answer: 1,
    explanation:
      "Handle memory by its edges to avoid touching the gold contacts, and store it in an anti-static bag. This prevents electrostatic damage and contamination.",
    source: "TESDA TR CSS NC II, p. 40; COC 1 Self-Assessment Guide",
  },
  {
    id: "coc1-q15",
    coc: "1",
    prompt:
      "Which document is most appropriate after completing an installation and testing job?",
    choices: [
      "A completed installation/test report or checklist forwarded to the appropriate personnel",
      "A personal diary entry only",
      "A copy of the installer saved on the desktop",
      "A screenshot of the desktop wallpaper",
    ],
    answer: 0,
    explanation:
      "Element 5.4 requires documentation of testing to be forwarded to the appropriate personnel or authority. A checklist or test report provides an auditable record of the work.",
    source: "TESDA TR CSS NC II, p. 39 (Element 5.4); COC 1 Self-Assessment Guide",
  },
];
