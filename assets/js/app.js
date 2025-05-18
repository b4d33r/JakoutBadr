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
            "<div class='success-text'>👋 Hey, Welcome to Jakout's Terminal Portfolio v2.0</div>",
            "<div>Type <span class='success-text'>help</span> to see available commands</div>"
        ].join("\n");
        this.printOutput(bannerText);
    }

    commands = {
        help: () => `Available commands:
            <br>• <span class='success-text'>about</span> - Learn about me
            <br>• <span class='success-text'>skills</span> - View my technical skills
            <br>• <span class='success-text'>projects</span> - View my projects
            <br>• <span class='success-text'>education</span> - View my educational background
            <br>• <span class='success-text'>certifications</span> - View my certifications
            <br>• <span class='success-text'>contact</span> - Get my contact information
            <br>• <span class='success-text'>cv</span> - Download my CV
            <br>• <span class='success-text'>clear</span> - Clear the terminal
            <br>• <span class='success-text'>banner</span> - Show the welcome banner`,

        about: () => `<div class="timeline-item">
            First-year engineering student in Smart Networks and Cybersecurity.
            Passionate about information security and ethical hacking.
            Proficient in Linux, Python, and Bash for securing network infrastructures.
            Skilled in vulnerability analysis and seeking a cybersecurity internship.
            </div>`,

        skills: () => {
            const skills = {
                "Linux": 85,
                "Python": 80,
                "Bash": 75,
                "Network Security": 70,
                "Web Development": 65,
                "System Administration": 70
            };
            
            return Object.entries(skills).map(([skill, level]) => `
                <div>${skill}</div>
                <div class="skill-bar">
                    <div class="skill-progress" style="width: ${level}%"></div>
                </div>
            `).join("");
        },

        projects: () => `<div class="timeline-item">
            • <strong>Task Management Website</strong>
            <br>- Developed using HTML/CSS/PHP/JS with database integration
            <br>- Implemented secure user authentication and task tracking
            <br><br>• <strong>Ubuntu Server Configuration</strong>
            <br>- Set up network services in virtualized environment
            <br>- Configured and secured server infrastructure
            <br><br>• <strong>Pixel Matrix</strong>
            <br>- Python-based image processing tool
            <br>- Implemented various image manipulation algorithms
            </div>`,

        education: () => `<div class="timeline-item">
            <strong>Engineering Degree in Smart Networks and Cybersecurity</strong>
            <br>• First-year student
            <br>• Focus on network security and system administration
            <br>• Coursework in cybersecurity and ethical hacking
            </div>`,

        certifications: () => `<div class="timeline-item">
            • <strong>CCNA</strong> - Cisco Certified Network Associate
            <br>• <strong>AWS Academy</strong> - Cloud Computing Certification
            <br>• <strong>TryHackMe Jr Penetration Tester</strong>
            <br>• <strong>Cisco Cybersecurity</strong> - Introduction to Cybersecurity
            </div>`,

        contact: () => `<div class="timeline-item">
            • Email: <a href="mailto:jakoutbadr20@gmail.com" class="link">jakoutbadr20@gmail.com</a>
            <br>• GitHub: <a href="https://github.com/b4d33r" target="_blank" class="link">github.com/b4d33r</a>
            <br>• LinkedIn: <a href="https://www.linkedin.com/in/badr-jakout/" target="_blank" class="link">linkedin.com/in/badr-jakout</a>
            </div>`,

        cv: () => `<div class="timeline-item">
            Download my CV: <a href="JAKOUT  BADR .pdf" target="_blank" class="link">JAKOUT_BADR.pdf</a>
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