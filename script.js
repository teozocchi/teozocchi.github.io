document.addEventListener('DOMContentLoaded', () => {

    // --- ELEMENT REFERENCES ---
    const vignetteOverlay = document.getElementById('vignette-overlay');
    const bootScreen = document.getElementById('boot-screen');
    const bootLog = document.getElementById('boot-log');
    const consoleWrapper = document.getElementById('console-wrapper');
    const commandBar = document.getElementById('command-bar');
    const commandInput = document.getElementById('command-input');

    // --- BOOT SEQUENCE ---
    vignetteOverlay.classList.add('is-booting');

    const bootMessages = [
        { text: "Initializing BIOS...", delay: 200 },
        { text: "Memory Check: 65536K OK", delay: 300 },
        // Feel free to change these to red team tools like Kali, Metasploit, etc.
        { text: "Loading <span class='boot-accent'>CORVID_OS</span>...", delay: 500 },
        { text: "Kernel v2.7 loaded.", delay: 200 },
        { text: "Mounting file systems... <span class='boot-accent'>[OK]</span>", delay: 300 },
        { text: "Starting authentication service... ", delay: 400, noNewline: true },
        { text: "<span class='boot-accent'>[ACCESS GRANTED]</span>", delay: 1000 },
        { text: "Welcome, user.", delay: 500 },
        { text: "System check complete. Preparing shell...", delay: 800 }
    ];

    let messageIndex = 0;
    function showNextBootMessage() {
        if (messageIndex < bootMessages.length) {
            const msg = bootMessages[messageIndex];
            bootLog.innerHTML += msg.text + (msg.noNewline ? '' : '\n');
            bootLog.scrollTop = bootLog.scrollHeight;
            messageIndex++;
            setTimeout(showNextBootMessage, msg.delay);
        } else {
            triggerCorruptionFlood();
        }
    }

    // --- CORRUPTION FLOOD ---
    function triggerCorruptionFlood() {
        const floodChars = "▓▒░█";
        const floodText = "<span class='boot-accent'>FATAL_ERROR: KERNEL_PANIC - STACK_OVERFLOW</span>";
        let floodCount = 0;
        const floodInterval = setInterval(() => {
            let line = '';
            for (let i = 0; i < 80; i++) {
                line += floodChars[Math.floor(Math.random() * floodChars.length)];
            }
            if (Math.random() > 0.9) line += `  ${floodText}  `;
            bootLog.innerHTML += line + '\n';
            bootLog.scrollTop = bootLog.scrollHeight;
            floodCount++;
            if (floodCount > 20) {
                clearInterval(floodInterval);
                finishBoot();
            }
        }, 50);
    }

    // --- FINISH BOOT ---
    function finishBoot() {
        bootLog.style.transition = 'opacity 0.5s ease-out';
        bootLog.style.opacity = '0';
        setTimeout(() => {
            bootScreen.style.transition = 'opacity 1s ease-out';
            bootScreen.style.opacity = '0';
            vignetteOverlay.classList.remove('is-booting');
            setTimeout(() => {
                bootScreen.remove();
                document.title = "Teo Zocchi // Corvid Console";
                consoleWrapper.classList.remove('is-hidden');
                commandBar.classList.remove('is-hidden');
                commandInput.focus();
                initializeMainPage();
            }, 1000);
        }, 500);
    }

    // --- INITIALIZE ALL EFFECTS FOR THE MAIN PAGE ---
    function initializeMainPage() {
        const body = document.body;
        body.addEventListener('mousemove', (e) => {
            window.requestAnimationFrame(() => {
                body.style.setProperty('--x', e.clientX + 'px');
                body.style.setProperty('--y', e.clientY + 'px');
            });
        });

        const sections = document.querySelectorAll('section');
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        sections.forEach(section => observer.observe(section));

        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('mouseleave', () => {
                card.classList.add('decaying');
                setTimeout(() => card.classList.remove('decaying'), 200);
            });
        });

        const h1 = document.querySelector('h1');
        const originalText = h1.textContent;
        const chars = "!<>-_\\/[]{}—=+*^?#_";
        let glitchInterval = null;
        h1.addEventListener('mouseover', () => {
            let iteration = 0;
            clearInterval(glitchInterval);
            glitchInterval = setInterval(() => {
                h1.textContent = originalText.split("").map((_, index) => {
                    if(index < iteration) { return originalText[index]; }
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("");
                if(iteration >= originalText.length) clearInterval(glitchInterval);
                iteration += 1 / 3;
            }, 30);
        });
    }

    // --- START THE BOOT SEQUENCE ---
    setTimeout(showNextBootMessage, 500);
});