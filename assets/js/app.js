class Terminal {
    constructor() {
        this.input = document.getElementById("input");
        this.output = document.getElementById("output");
        this.commandHistory = [];
        this.historyIndex = -1;
        this.initializeTerminal();
    }

    initializeTerminal() {
        this.setupEventListeners();
        this.showBanner();
        this.input.focus();
    }

    setupEventListeners() {
        this.input.addEventListener("keydown", (e) => this.handleKeyPress(e));
        document.addEventListener("click", () => this.input.focus());
    }

    handleKeyPress(e) {
        if (e.key === "Enter") {
            const cmd = this.input.value.trim().toLowerCase();
            if (cmd) {
                this.commandHistory.push(cmd);
                this.historyIndex = this.commandHistory.length;
                this.processCommand(cmd);
            }
            this.input.value = "";
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            this.navigateHistory("up");
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            this.navigateHistory("down");
        } else if (e.key === "Tab") {
            e.preventDefault();
            this.autoComplete();
        }
    }

    navigateHistory(direction) {
        if (direction === "up" && this.historyIndex > 0) {
            this.historyIndex--;
            this.input.value = this.commandHistory[this.historyIndex];
        } else if (direction === "down" && this.historyIndex < this.commandHistory.length - 1) {
            this.historyIndex++;
            this.input.value = this.commandHistory[this.historyIndex];
        } else if (direction === "down" && this.historyIndex === this.commandHistory.length - 1) {
            this.historyIndex = this.commandHistory.length;
            this.input.value = "";
        }
    }

    autoComplete() {
        const input = this.input.value.toLowerCase();
        const possibilities = Object.keys(this.commands).filter(cmd => cmd.startsWith(input));
        if (possibilities.length === 1) {
            this.input.value = possibilities[0];
        } else if (possibilities.length > 1) {
            this.printOutput(`Possible commands: ${possibilities.join(", ")}`);
        }
    }

    printOutput(text, className = "") {
        const output = document.createElement("div");
        output.className = `command-output ${className}`;
        output.innerHTML = text;
        this.output.appendChild(output);
        this.scrollToBottom();
    }

    async typeWriter(text, element, speed = 50) {
        for (let i = 0; i < text.length; i++) {
            element.innerHTML += text.charAt(i);
            await new Promise(resolve => setTimeout(resolve, speed));
        }
    }

    scrollToBottom() {
        this.output.scrollTop = this.output.scrollHeight;
    }

    showBanner() {
        const bannerText = [
            "<pre class='matrix-effect'>",
            "     ██╗ █████╗ ██╗  ██╗ ██████╗ ██╗   ██╗████████╗    ██████╗  █████╗ ██████╗ ██████╗",
            "     ██║██╔══██╗██║ ██╔╝██╔═══██╗██║   ██║╚══██╔══╝    ██╔══██╗██╔══██╗██╔══██╗██╔══██╗",
            "     ██║███████║█████╔╝ ██║   ██║██║   ██║   ██║       ██████╔╝███████║██║  ██║██████╔╝",
            "██   ██║██╔══██║██╔═██╗ ██║   ██║██║   ██║   ██║       ██╔══██╗██╔══██║██║  ██║██╔══██╗",
            "╚█████╔╝██║  ██║██║  ██╗╚██████╔╝╚██████╔╝   ██║       ██████╔╝██║  ██║██████╔╝██║  ██║",
            " ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝       ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝",
            "</pre>",
            "<div class='highlight-text'>👋 Hey, Welcome to Jakout's Terminal Portfolio v2.0</div>",
            "<div>Type <span class='highlight-text'>help</span> to see available commands</div>"
        ].join("\n");
        this.printOutput(bannerText);
    }

    commands = {
        help: () => `Available commands:
            <br>• <span class='highlight-text'>about</span> - Learn about me
            <br>• <span class='highlight-text'>skills</span> - View my technical skills
            <br>• <span class='highlight-text'>experience</span> - View my professional experience
            <br>• <span class='highlight-text'>projects</span> - View my projects
            <br>• <span class='highlight-text'>education</span> - View my educational background
            <br>• <span class='highlight-text'>certifications</span> - View my certifications
            <br>• <span class='highlight-text'>achievements</span> - View awards & extracurriculars
            <br>• <span class='highlight-text'>languages</span> - View my language proficiency
            <br>• <span class='highlight-text'>contact</span> - Get my contact information
            <br>• <span class='highlight-text'>cv</span> - Download my CV
            <br>• <span class='highlight-text'>clear</span> - Clear the terminal
            <br>• <span class='highlight-text'>banner</span> - Show the welcome banner`,

        about: () => `<div class="timeline-item">
            <strong>JAKOUT Badr</strong> — Cybersecurity Engineering Student (Class of 2027)<br><br>
            Cybersecurity engineering student specializing in <span class='highlight-text'>SOC</span>, <span class='highlight-text'>Penetration Testing</span>, and <span class='highlight-text'>Blue Team</span> operations.<br>
            Hands-on experience with SIEM monitoring, intrusion detection, incident response, and real-world penetration testing environments.<br><br>
            📍 331 Lot Touafik, Khouribga 25000, Morocco<br>
            📞 +212 777545698<br>
            📧 <a href="mailto:jakoutbadr20@gmail.com" class="link">jakoutbadr20@gmail.com</a><br>
            🔗 <a href="https://linkedin.com/in/badr-jakout" target="_blank" class="link">linkedin.com/in/badr-jakout</a><br>
            🐙 <a href="https://github.com/b4d33r" target="_blank" class="link">github.com/b4d33r</a><br><br>
            🎂 Born: June 2, 2004 &nbsp;|&nbsp; 🇲🇦 Moroccan
            </div>`,

        skills: () => {
            const skillCategories = {
                "SOC & Defensive Security": [
                    "SIEM: Wazuh — Monitoring & Administration",
                    "Detection: Log Correlation, Threat Intelligence",
                    "Incident: Log Analysis, Incident Response",
                    "Frameworks: MITRE ATT&CK, OWASP Top 10"
                ],
                "Offensive Security": [
                    "Pentest: Metasploit, Burp Suite, Nmap, Nessus",
                    "Web: WPScan, Exploitation, Security Auditing",
                    "Network: pfSense, Wireshark, QEMU/KVM",
                    "CTF: Web, Cryptography, Forensics"
                ],
                "Systems & Cloud": [
                    "OS: Linux, Windows Server, Active Directory",
                    "Cloud: AWS (Foundations)",
                    "Virtualization: QEMU/KVM, VirtualBox"
                ],
                "Programming": [
                    "Scripting: Python, Bash",
                    "Web/DB: PHP, JavaScript, SQL"
                ]
            };

            let output = '';
            for (const [category, skills] of Object.entries(skillCategories)) {
                output += `<div class="skill-category"><strong class="highlight-text">[ ${category} ]</strong><br>`;
                skills.forEach(skill => {
                    output += `&nbsp;&nbsp;→ ${skill}<br>`;
                });
                output += `</div><br>`;
            }
            return `<div class="timeline-item">${output}</div>`;
        },

        experience: () => `<div class="timeline-item">
            <strong class="highlight-text">Cybersecurity Internship</strong><br>
            <strong>Groupe SONASID</strong> — El Jadida, Morocco<br>
            <span class="dim-text">July – August 2025</span><br><br>
            → Deployed and configured the <span class='highlight-text'>Wazuh SIEM</span> platform for real-time security monitoring.<br>
            → Simulated full APT attack chains: OSINT reconnaissance, exploitation (Nessus, WPScan), post-exploitation.<br>
            → Designed a segmented network environment (<span class='highlight-text'>QEMU/KVM</span>) with pfSense and Active Directory.<br>
            → Created custom detection rules and managed incident response workflows.
            </div>`,

        projects: () => `<div class="timeline-item">
            • <strong>Cloud Attack Range & Detection</strong>
            <br>&nbsp;&nbsp;<span class="dim-text">Cloud Security Research Project</span>
            <br>&nbsp;&nbsp;→ Simulate cloud attacks and design a full detection pipeline
            <br>&nbsp;&nbsp;→ <strong>Tools:</strong> LocalStack, Terraform, Stratus Red Team, Wazuh
            <br>&nbsp;&nbsp;→ Vulnerable cloud infrastructure provisioning
            <br>&nbsp;&nbsp;→ IAM privilege escalation simulation
            <br>&nbsp;&nbsp;→ Log-based detection rules
            <br>&nbsp;&nbsp;→ <strong>Research:</strong> Detection delay & attack surface measurement
            <br><br>• <strong>Offensive & Defensive Security Lab</strong>
            <br>&nbsp;&nbsp;<span class="dim-text">LAN/DMZ/WAN Enterprise Architecture — Nov 2025 – Jan 2026</span>
            <br>&nbsp;&nbsp;→ End-to-end simulation of a real enterprise network with 3-zone architecture
            <br>&nbsp;&nbsp;→ <strong>🔵 Blue Team:</strong> pfSense (segmentation), Suricata (IDS/IPS), Wazuh SIEM, Python Honeypot
            <br>&nbsp;&nbsp;→ <strong>🔴 Red Team:</strong> Phishing (Living off the Land), Custom Python Keylogger, Credential Exfiltration
            <br>&nbsp;&nbsp;→ <strong>Tools:</strong> pfSense, Suricata, Wazuh, Kali, Python, Apache2, Postfix, Wireshark
            <br><br>• <strong>SafeByte — CLI Password Manager</strong>
            <br>&nbsp;&nbsp;<span class="dim-text">Credential Security Tool</span>
            <br>&nbsp;&nbsp;→ Developed a CLI password manager with <span class='highlight-text'>AES-GCM</span> encryption and <span class='highlight-text'>Argon2</span> hashing
            <br><br>• <strong>Home Lab — Virtualized Pentesting Environment</strong>
            <br>&nbsp;&nbsp;<span class="dim-text">Offensive/Defensive Training Infrastructure — 2024 – Present</span>
            <br>&nbsp;&nbsp;→ Deployed a full lab with vulnerable machines, IDS/SIEM, and attack tools
            <br>&nbsp;&nbsp;→ Practiced full attack phases: reconnaissance, exploitation, post-exploitation
            <br><br>• <strong>Port Scanner</strong>
            <br>&nbsp;&nbsp;<span class="dim-text">Multithreaded Python Security Tool</span>
            <br>&nbsp;&nbsp;→ Fast, simple multithreaded port scanner supporting single ports and mixed ranges
            <br>&nbsp;&nbsp;→ <strong>Features:</strong> Threading for speed, supports ranges (e.g., 30-90) and mixed lists
            <br>&nbsp;&nbsp;→ <strong>GitHub:</strong> <a href="https://github.com/b4d33r/port_scanner" target="_blank" class="link">github.com/b4d33r/port_scanner</a>
            <br><br>• <strong>Educational Keylogger</strong>
            <br>&nbsp;&nbsp;<span class="dim-text">Python Security Research — 2025</span>
            <br>&nbsp;&nbsp;→ Study of keystroke logging and data exfiltration techniques for educational purposes
            <br><br>• <strong>Task Management Website</strong>
            <br>&nbsp;&nbsp;→ Developed using HTML/CSS/PHP/JS with database integration
            <br>&nbsp;&nbsp;→ Secure user authentication and task tracking
            </div>`,

        education: () => `<div class="timeline-item">
            <strong class="highlight-text">Engineering Cycle: Smart Networks & Cybersecurity (IRIC)</strong><br>
            ENSA Khouribga<br>
            <span class="dim-text">2024 – 2027</span><br>
            → Specialization in SOC, Penetration Testing, Blue Team operations<br>
            → Coursework: SIEM, Incident Response, Network Security, Cloud Infrastructure, Red Hat Administration<br><br>
            <strong class="highlight-text">Integrated Preparatory Cycle</strong><br>
            ENSA Khouribga<br>
            <span class="dim-text">2022 – 2024</span><br>
            → Core engineering fundamentals (Math, Physics, Computer Science)<br><br>
            <strong class="highlight-text">Baccalauréat — Mention Très Bien (Honors)</strong><br>
            Lycée Phosphate Montien, Khouribga<br>
            <span class="dim-text">2022</span>
            </div>`,

        certifications: () => `<div class="timeline-item">
            • <strong>Red Hat System Administration I (RH124 - RHA) - Ver. 10</strong>
            <br>&nbsp;&nbsp;Issued by Red Hat — <span class="dim-text">February 2026</span>
            <br><br>• <strong>Network Security</strong>
            <br>&nbsp;&nbsp;Issued by Cisco — <span class="dim-text">January 2026</span>
            <br><br>• <strong>CCNA: Switching, Routing, and Wireless Essentials</strong>
            <br>&nbsp;&nbsp;Issued by Cisco — <span class="dim-text">September 2025</span>
            <br><br>• <strong>AWS Academy Graduate — Cloud Foundations</strong>
            <br>&nbsp;&nbsp;Issued by Amazon Web Services — <span class="dim-text">May 2025</span>
            <br><br>• <strong>Network Technician Career Path</strong>
            <br>&nbsp;&nbsp;Issued by Cisco Networking Academy — <span class="dim-text">May 2025</span>
            <br><br>• <strong>CCNA: Introduction to Networks</strong>
            <br>&nbsp;&nbsp;Issued by Cisco Networking Academy — <span class="dim-text">May 2025</span>
            <br><br>• <strong>CompTIA Pentest+</strong>
            <br>&nbsp;&nbsp;Issued by TryHackMe — ID: THM-ESXVK9HMIU — <span class="dim-text">April 2025</span>
            <br><br>• <strong>Web Fundamentals</strong>
            <br>&nbsp;&nbsp;Issued by TryHackMe — ID: THM-1WZ92GUAV6 — <span class="dim-text">April 2025</span>
            <br><br>• <strong>Jr Penetration Tester Certificate</strong>
            <br>&nbsp;&nbsp;Issued by TryHackMe — ID: THM-7M1K3L2R06 — <span class="dim-text">February 2025</span>
            <br>&nbsp;&nbsp;Skills: Pentest, Burp Suite, Metasploit, Nmap, Privilege Escalation
            <br><br>• <strong>Introduction to Cybersecurity</strong>
            <br>&nbsp;&nbsp;Issued by Cisco Networking Academy — <span class="dim-text">October 2024</span>
            <br><br>• <strong>Linux 100: Fundamentals</strong>
            <br>&nbsp;&nbsp;Issued by TCM Security — ID: cert_xyxs296b — <span class="dim-text">November 2024</span>
            <br>&nbsp;&nbsp;Skills: Linux, System Administration, Bash, Shell Scripting
            </div>`,

        achievements: () => `<div class="timeline-item">
            <strong class="highlight-text">🏆 1st Place CTF — NetCom Days 7.0</strong><br>
            <span class="dim-text">Inter-university Cybersecurity Competition</span><br>
            → Won challenges in Web, Cryptography, and Forensics categories<br><br>
            <strong class="highlight-text">🎯 CTF Designer & Organizer — NetCom Days</strong><br>
            <span class="dim-text">2024 – Present</span><br>
            → Created challenges and managed competition infrastructure<br>
            → Organized the annual cybersecurity event for ENSA Khouribga<br><br>
            <strong class="highlight-text">🛡️ Active Member — B-Secure Club</strong><br>
            <span class="dim-text">2024 – Present</span><br>
            → Participation in cybersecurity workshops and community events
            </div>`,

        languages: () => `<div class="timeline-item">
            <strong>🇲🇦 Arabic</strong> — Native<br>
            <strong>🇫🇷 French</strong> — Fluent<br>
            <strong>🇬🇧 English</strong> — Fluent
            </div>`,

        contact: () => `<div class="timeline-item">
            • Email: <a href="mailto:jakoutbadr20@gmail.com" class="link">jakoutbadr20@gmail.com</a>
            <br>• Phone: <a href="tel:+212777545698" class="link">+212 777545698</a>
            <br>• GitHub: <a href="https://github.com/b4d33r" target="_blank" class="link">github.com/b4d33r</a>
            <br>• LinkedIn: <a href="https://www.linkedin.com/in/badr-jakout/" target="_blank" class="link">linkedin.com/in/badr-jakout</a>
            <br>• Location: 331 Lot Touafik, Khouribga 25000, Morocco
            </div>`,

        cv: () => `<div class="timeline-item">
            Download my CV: <a href="cv.pdf" target="_blank" class="link">cv.pdf</a>
            </div>`,

        clear: () => {
            this.output.innerHTML = "";
            return "";
        },

        banner: () => {
            this.showBanner();
            return "";
        }
    };

    processCommand(cmd) {
        const commandLine = `<div><span class="prompt">jakout@portfolio:~$</span> ${cmd}</div>`;
        this.printOutput(commandLine);

        const command = this.commands[cmd];
        if (command) {
            this.printOutput(command());
        } else {
            this.printOutput(`Command not found: ${cmd}. Type 'help' for available commands.`, "error-text");
        }
    }
}

// Initialize the terminal when the page loads
document.addEventListener("DOMContentLoaded", () => {
    new Terminal();
});