import type { Question } from "@/lib/quiz";

export const coc2Questions: Question[] = [
  {
    id: "coc2-q01",
    coc: "2",
    prompt:
      "Which pin order matches the T568B wiring standard for an RJ45 connector?",
    choices: [
      "White-green, green, white-orange, blue, white-blue, orange, white-brown, brown",
      "White-orange, orange, white-green, blue, white-blue, green, white-brown, brown",
      "White-blue, blue, white-green, green, white-orange, orange, white-brown, brown",
      "Orange, white-orange, green, white-green, blue, white-blue, brown, white-brown",
    ],
    answer: 1,
    explanation:
      "T568B starts with white-orange, orange, white-green, blue, white-blue, green, white-brown, then brown. T568A swaps the orange and green pairs.",
    source: "TESDA TR CSS NC II, pp. 42–45; COC 2 Self-Assessment Guide",
  },
  {
    id: "coc2-q02",
    coc: "2",
    prompt: "Which tool is used to attach an RJ45 connector to a UTP cable?",
    choices: [
      "Punch-down tool",
      "Crimping tool",
      "Multimeter",
      "Soldering iron",
    ],
    answer: 1,
    explanation:
      "A crimping tool presses the connector's metal contacts into the cable conductors and secures the strain relief. A punch-down tool is used for patch panels and keystone jacks.",
    source: "TESDA TR CSS NC II, p. 44; COC 2 Self-Assessment Guide",
  },
  {
    id: "coc2-q03",
    coc: "2",
    prompt: "What does a LAN cable tester verify?",
    choices: [
      "The cable's internet speed plan",
      "Continuity, pin-to-pin wiring, and sometimes faults such as opens or shorts",
      "The operating system version of the connected PC",
      "The Wi-Fi password strength",
    ],
    answer: 1,
    explanation:
      "A cable tester checks that the correct pins are connected end-to-end and can reveal opens, shorts, crossed pairs, or miswired connectors.",
    source: "TESDA TR CSS NC II, p. 44; COC 2 Self-Assessment Guide",
  },
  {
    id: "coc2-q04",
    coc: "2",
    prompt: "A straight-through cable is normally used to connect which pair of devices?",
    choices: [
      "A PC to a switch",
      "A switch to a switch",
      "A router to a router",
      "Two PCs directly without a switch",
    ],
    answer: 0,
    explanation:
      "Straight-through cables connect unlike devices, such as a PC to a switch or a switch to a router. Similar devices traditionally use crossover cables, though modern Auto-MDIX ports can detect either.",
    source: "TESDA TR CSS NC II, p. 42; COC 2 Self-Assessment Guide",
  },
  {
    id: "coc2-q05",
    coc: "2",
    prompt: "What is the maximum recommended copper Ethernet cable run for 1000BASE-T?",
    choices: ["10 meters", "50 meters", "100 meters", "500 meters"],
    answer: 2,
    explanation:
      "Copper twisted-pair Ethernet has a nominal maximum channel length of 100 meters (about 328 feet), including patch cords.",
    source: "TESDA TR CSS NC II, pp. 42–45",
  },
  {
    id: "coc2-q06",
    coc: "2",
    prompt: "Which address is in the private IPv4 range?",
    choices: ["8.8.8.8", "192.168.1.10", "172.15.0.1", "203.177.1.1"],
    answer: 1,
    explanation:
      "Private IPv4 ranges are 10.0.0.0/8, 172.16.0.0/12, and 192.168.0.0/16. Addresses in these ranges are not routed on the public internet without NAT.",
    source: "TESDA TR CSS NC II, p. 45; COC 2 Self-Assessment Guide",
  },
  {
    id: "coc2-q07",
    coc: "2",
    prompt: "What is the dotted-decimal subnet mask for a /24 network?",
    choices: [
      "255.0.0.0",
      "255.255.0.0",
      "255.255.255.0",
      "255.255.255.255",
    ],
    answer: 2,
    explanation:
      "A /24 prefix uses 24 network bits, which is 255.255.255.0 in dotted-decimal notation. It leaves 8 host bits.",
    source: "TESDA TR CSS NC II, p. 45; COC 2 Self-Assessment Guide",
  },
  {
    id: "coc2-q08",
    coc: "2",
    prompt: "What is the role of the default gateway on a client computer?",
    choices: [
      "It stores the user's documents",
      "It is the router address used to reach networks outside the local subnet",
      "It assigns the monitor resolution",
      "It encrypts all files on the disk",
    ],
    answer: 1,
    explanation:
      "When a destination is not on the local subnet, the host sends the traffic to its default gateway, which is normally the router interface on that LAN.",
    source: "TESDA TR CSS NC II, p. 45; COC 2 Self-Assessment Guide",
  },
  {
    id: "coc2-q09",
    coc: "2",
    prompt: "What service automatically provides IP addresses to client devices?",
    choices: ["DNS", "DHCP", "HTTP", "SMTP"],
    answer: 1,
    explanation:
      "DHCP (Dynamic Host Configuration Protocol) leases IP addresses, subnet masks, default gateways, and DNS server information to clients.",
    source: "TESDA TR CSS NC II, p. 45; COC 2 Self-Assessment Guide",
  },
  {
    id: "coc2-q10",
    coc: "2",
    prompt: "What is the main purpose of DNS?",
    choices: [
      "To resolve human-readable names into IP addresses",
      "To crimp network cables",
      "To assign MAC addresses to network cards",
      "To cool network switches",
    ],
    answer: 0,
    explanation:
      "DNS translates domain names such as example.com into IP addresses that devices can use to reach the destination.",
    source: "TESDA TR CSS NC II, p. 45; COC 2 Self-Assessment Guide",
  },
  {
    id: "coc2-q11",
    coc: "2",
    prompt: "Which command checks basic reachability to another host by sending ICMP echo requests?",
    choices: ["ping", "format", "dir", "taskkill"],
    answer: 0,
    explanation:
      "ping sends ICMP echo requests and reports whether replies arrive, along with round-trip time and packet loss. It is a first-step connectivity test.",
    source: "TESDA TR CSS NC II, p. 45; COC 2 Self-Assessment Guide",
  },
  {
    id: "coc2-q12",
    coc: "2",
    prompt: "Which wireless security option is the strongest of these choices?",
    choices: ["WEP", "WPA", "WPA2/WPA3", "No security"],
    answer: 2,
    explanation:
      "WEP is obsolete and easily broken. WPA2 and especially WPA3 provide modern encryption and authentication; WPA3 is preferred when supported.",
    source: "TESDA TR CSS NC II, p. 43 (Element 3.5); COC 2 Self-Assessment Guide",
  },
  {
    id: "coc2-q13",
    coc: "2",
    prompt: "What is an SSID?",
    choices: [
      "The name broadcast by a wireless network",
      "The serial number of a switch",
      "The subnet mask of a router",
      "The physical length of a cable",
    ],
    answer: 0,
    explanation:
      "The Service Set Identifier (SSID) is the name that identifies a wireless network. Clients use it to select the correct access point or SSID.",
    source: "TESDA TR CSS NC II, p. 43; COC 2 Self-Assessment Guide",
  },
  {
    id: "coc2-q14",
    coc: "2",
    prompt:
      "Which port on a typical home router connects to the internet service provider?",
    choices: ["LAN port", "WAN port", "Console port", "USB port"],
    answer: 1,
    explanation:
      "The WAN (Wide Area Network) port connects the router to the ISP or upstream network. LAN ports connect local devices.",
    source: "TESDA TR CSS NC II, p. 43 (Element 3.3); COC 2 Self-Assessment Guide",
  },
  {
    id: "coc2-q15",
    coc: "2",
    prompt:
      "After installing network cables, what should be done with excess materials and electronic waste?",
    choices: [
      "Bury them in the school yard",
      "Dispose of them according to WEEE directives and the 3Rs",
      "Store them inside the switch cabinet permanently",
      "Burn them to reduce volume",
    ],
    answer: 1,
    explanation:
      "Element 1.9 requires excess components and materials to be disposed of based on WEEE directives and the 3Rs waste management program.",
    source: "TESDA TR CSS NC II, p. 42 (Element 1.9); COC 2 Self-Assessment Guide",
  },
];
