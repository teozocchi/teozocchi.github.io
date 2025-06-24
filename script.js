document.addEventListener('DOMContentLoaded', () => {

    // -------------------------------------------------------------------------
    // --- (1) CONFIGURATION: EDIT THIS SECTION --------------------------------
    // -------------------------------------------------------------------------
    
    const GITHUB_USERNAME = 'teozocchi'; // Your GitHub username

    const profileData = {
        name: "Teo Zocchi",
        title: "Creative Software Engineer & TUI Enthusiast",
        contact: "mailto:teo.zocchi.dev@email.com",
        linkedin: "https://www.linkedin.com/in/your-profile", // Your LinkedIn URL
        resume: "./path-to-your/resume.pdf", // Path to your resume
        skills: {
            "Languages": "Python, JavaScript, Rust, SQL",
            "Frontend": "React, HTML5, CSS3, Tailwind",
            "Backend": "Node.js, FastAPI, Django",
            "Tools": "Git, Docker, Neovim, Linux"
        }
    };
    
    // Add custom details for your top projects. The key must match the repo name from GitHub.
    const projectDetails = {
        "your-best-repo-name": { // <--- Replace with your repo name
            image: "./images/project-demo.gif", // <--- Path to a GIF or screenshot
            story: `
                <h4>The Challenge</h4>
                <p>This project was created to solve [describe the problem]. The primary technical difficulty involved [mention a specific challenge, e.g., implementing real-time data sync with WebSockets or optimizing a complex algorithm].</p>
                <h4>My Solution</h4>
                <p>I developed a [describe your solution] using [mention key technologies]. A feature I'm particularly proud of is the [specific feature], which [led to a positive outcome, e.g., improved performance by 30% or made the UI more intuitive].</p>
            `
        },
        "another-cool-repo-name": { // <--- Replace with another repo name
            image: "./images/another-project.png",
            story: `
                <h4>The Goal</h4>
                <p>This application was designed to [describe the purpose].</p>
                <p>It demonstrates my ability to [mention a key skill, e.g., work with third-party APIs or build a scalable backend]. The most valuable lesson I learned was [mention a takeaway].</p>
            `
        }
    };
    // -------------------------------------------------------------------------
    // --- END OF CONFIGURATION ------------------------------------------------
    // -------------------------------------------------------------------------

    // --- ELEMENTS ---
    const desktop = document.getElementById('desktop');
    const clockElement = document.getElementById('clock');
    const logElement = document.getElementById('log-content');
    const projectListElement = document.getElementById('project-list');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const commandPaletteOverlay = document.getElementById('command-palette-overlay');
    const commandInput = document.getElementById('command-input');
    const commandList = document.getElementById('command-list');
    const audioToggle = document.getElementById('audio-toggle');

    // --- INITIAL DATA INJECTION ---
    document.getElementById('profile-name').textContent = profileData.name;
    document.getElementById('profile-title').textContent = profileData.title;
    document.getElementById('profile-links').innerHTML = `
        <li><a href="https://github.com/${GITHUB_USERNAME}" target="_blank">[ GitHub ]</a></li>
        <li><a href="${profileData.linkedin}" target="_blank">[ LinkedIn ]</a></li>
        <li><a href="${profileData.resume}" target="_blank">[ Resume.pdf ]</a></li>
    `;
    document.getElementById('skills-content').innerHTML = `
        <ul class="skills-list">
            ${Object.entries(profileData.skills).map(([category, skills]) => `<li><span class="skill-category">${category}:</span> ${skills}</li>`).join('')}
        </ul>
    `;
    
    // --- AUDIO ---
    let isMuted = true;
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioFiles = { boot: './audio/boot.wav', click: './audio/click.wav', type: './audio/type.wav' };
    let audioBuffers = {};
    async function loadAudio() {
        for (const key in audioFiles) {
            try {
                const response = await fetch(audioFiles[key]);
                const arrayBuffer = await response.arrayBuffer();
                audioBuffers[key] = await audioContext.decodeAudioData(arrayBuffer);
            } catch (error) { console.error(`Failed to load audio file: ${audioFiles[key]}`, error); }
        }
    }
    function playSound(sound) {
        if (isMuted || !audioBuffers[sound] || audioContext.state === 'suspended') return;
        const source = audioContext.createBufferSource();
        source.buffer = audioBuffers[sound];
        const gainNode = audioContext.createGain(); gainNode.gain.value = 0.3;
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        source.start(0);
    }
    audioToggle.addEventListener('click', () => {
        if (audioContext.state === 'suspended') { audioContext.resume(); }
        isMuted = !isMuted;
        audioToggle.textContent = isMuted ? '[🔇]' : '[🔊]';
        playSound('click');
    });
    loadAudio();

    // --- COMMAND PALETTE ---
    let filteredCommands = [];
    let selectedCommandIndex = 0;
    const baseCommands = [
        { cmd: "theme: raven", desc: "Switch to the default raven theme.", func: () => switchTheme('raven') },
        { cmd: "theme: dracula", desc: "Switch to the dracula theme.", func: () => switchTheme('dracula') },
        { cmd: "theme: nord", desc: "Switch to the nord theme.", func: () => switchTheme('nord') },
        { cmd: "neofetch", desc: "Display system/profile information.", func: showNeofetch },
        { cmd: "contact", desc: "Open mail client to contact me.", func: () => window.location.href = profileData.contact },
        { cmd: "socials: github", desc: "View my GitHub profile.", func: () => window.open(`https://github.com/${GITHUB_USERNAME}`, '_blank') },
        { cmd: "help", desc: "Show this command palette.", func: openCommandPalette },
    ];
    let commands = [...baseCommands];

    function renderCommands(filter = '') { /* ... unchanged ... */ } // This block can be copied from previous versions
    function updateCommandSelection() { /* ... unchanged ... */ }
    function openCommandPalette() { playSound('click'); commandPaletteOverlay.classList.remove('is-hidden'); commandInput.value = ''; renderCommands(); commandInput.focus(); }
    function closeCommandPalette() { commandPaletteOverlay.classList.add('is-hidden'); }
    window.addEventListener('keydown', e => { if (e.ctrlKey && e.key === 'k') { e.preventDefault(); openCommandPalette(); } if (e.key === 'Escape' && !commandPaletteOverlay.classList.contains('is-hidden')) { closeCommandPalette(); } });
    commandInput.addEventListener('input', () => renderCommands(commandInput.value));
    commandPaletteOverlay.addEventListener('click', (e) => { if (e.target === commandPaletteOverlay) closeCommandPalette(); });
    commandList.addEventListener('click', (e) => { const li = e.target.closest('li'); if (li) { const commandToRun = filteredCommands[parseInt(li.dataset.index)]; if (commandToRun) { commandToRun.func(); closeCommandPalette(); } } });
    commandInput.addEventListener('keydown', e => { if (filteredCommands.length === 0) return; if (e.key === 'ArrowDown') { e.preventDefault(); selectedCommandIndex = (selectedCommandIndex + 1) % filteredCommands.length; playSound('type'); } else if (e.key === 'ArrowUp') { e.preventDefault(); selectedCommandIndex = (selectedCommandIndex - 1 + filteredCommands.length) % filteredCommands.length; playSound('type'); } else if (e.key === 'Enter') { e.preventDefault(); filteredCommands[selectedCommandIndex]?.func(); closeCommandPalette(); } updateCommandSelection(); });
    Object.assign(renderCommands, {
        "function": function (filter = '') {
            filteredCommands = commands.filter(c => c.cmd.toLowerCase().includes(filter.toLowerCase()) || c.desc.toLowerCase().includes(filter.toLowerCase()));
            commandList.innerHTML = filteredCommands.map((c, i) => `<li data-index="${i}">${c.cmd} <span class="cmd-desc">${c.desc}</span></li>`).join('');
            selectedCommandIndex = 0;
            updateCommandSelection();
        }
    }); renderCommands['function'] = renderCommands.function.bind(renderCommands); updateCommandSelection = (() => { const fn = updateCommandSelection; return function() { commandList.querySelectorAll('li').forEach((li, i) => { li.classList.toggle('is-selected', i === selectedCommandIndex); if (i === selectedCommandIndex) li.scrollIntoView({ block: 'nearest' }); }); }; })();

    // --- THEME SWITCHER ---
    function switchTheme(themeName) { playSound('click'); document.body.setAttribute('data-theme', themeName); }

    // --- MODAL & NEOFECTH ---
    function showProjectModal(repo) { /* ... unchanged from previous versions ... */ }
    function showNeofetch() { /* ... unchanged ... */ }
    function openModal() { modalOverlay.classList.remove('is-hidden'); }
    function closeModal() { modalOverlay.classList.add('is-hidden'); }
    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeModal(); });
    Object.assign(showProjectModal, {
        "function": function (repo) {
            playSound('click');
            modalTitle.textContent = `╭─ [ ${repo.repo} ]`;
            const customDetails = projectDetails[repo.repo];
            let customHTML = '';
            if (customDetails) { customHTML = `${customDetails.image ? `<img src="${customDetails.image}" alt="Screenshot of ${repo.repo}">` : ''}${customDetails.story}<hr>`; }
            modalContent.innerHTML = `${customHTML}<p>${repo.description}</p><p><strong>Language:</strong> ${repo.language} | <strong>Stars:</strong> ${repo.stars} | <strong>Forks:</strong> ${repo.forks}</p><div class="modal-content-links"><a href="${repo.link}" target="_blank">[ GitHub Repo ]</a>${repo.website ? `<a href="${repo.website}" target="_blank">[ Live Demo ]</a>` : ''}</div>`;
            openModal();
        }
    }); showProjectModal['function'] = showProjectModal.function.bind(showProjectModal); Object.assign(showNeofetch, { "function": function () { playSound('boot'); const ravenASCII = `\n            .,,;;;;;;,,,,\n       .,;'';;,..,;;;,,,,,.''';;,..\n    ,,''                    '';;;;,;''\n   ,''                            ';'\n  ,'                               ';\n ,'                               ,'\n,'                               ,'\n,'                              ,'\n,'                ,cccc,       ,'\n'               ,cc,'cco,      ,'\n      .ccc,    ,cc',;co,      ,'\n     ,c,'co,  ,c',;;'o,      ,'\n     co,';co,,c',;;;'o,     ,'\n     'co,;;co',;;;;'o,    ,'\n      'co,;;c',;;;;,c'    ,'\n       'co,;c',;;;,,c'    ,'\n         'co,;,;;,,'      ,'\n          'co,;;,,'      ,'\n           'coo,     ,;,'\n            ',,    ,c'\n                 ,c'\n                ,c'\n                c'`; modalTitle.textContent = `╭─ [ neofetch ]`; modalContent.innerHTML = `<div class="neofetch-grid"><div class="neofetch-logo">${ravenASCII}</div><div class="neofetch-info"><h2>${profileData.name}</h2><ul>${Object.entries(profileData.skills).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('')}</ul></div></div>`; openModal(); } }); showNeofetch['function'] = showNeofetch.function.bind(showNeofetch);

    // --- CORE LOGIC (Clock, Log, GitHub Fetch) ---
    setInterval(() => { clockElement.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }, 1000);
    const logLines = [ "[1.001] System boot...", "[1.002] Initializing Corvid Console...", "[1.523] Mounting file system...", `[2.105] Fetching repo data for user:${GITHUB_USERNAME}...` ];
    let logIndex = 0;
    function typeLog() { if (logIndex < logLines.length) { logElement.innerHTML += logLines[logIndex] + '\n'; logIndex++; setTimeout(typeLog, Math.random() * 100 + 50); } else { fetchGitHubProjects(); } }
    async function fetchGitHubProjects() {
        projectListElement.innerHTML = '<li><p>Contacting GitHub API...</p></li>';
        try {
            const response = await fetch(`https://gh-pinned-repos.egoist.dev/?username=${GITHUB_USERNAME}`);
            if (!response.ok) throw new Error(`Network response error: ${response.statusText}`);
            const data = await response.json();
            projectListElement.innerHTML = '';
            const projectCommands = data.map(repo => ({ cmd: `project: ${repo.repo}`, desc: `View details for "${repo.repo}"`, func: () => showProjectModal.function(repo) }));
            commands = [...baseCommands, ...projectCommands];
            data.forEach(repo => { const li = document.createElement('li'); li.setAttribute('data-repo', JSON.stringify(repo)); li.innerHTML = `<h3>${repo.repo} <span class="tags">[${repo.language}]</span></h3><p>${repo.description}</p>`; projectListElement.appendChild(li); });
            logElement.innerHTML += "[OKAY] Project data loaded.\n[OKAY] System ready.\n<span class='cursor'> </span>";
            projectListElement.setAttribute('tabindex', '0');
        } catch (error) { logElement.innerHTML += `[ERROR] Failed to load project data. Check console.\n<span class='cursor'> </span>`; console.error("GitHub Fetch Error:", error); }
    }
    projectListElement.addEventListener('click', (event) => { const li = event.target.closest('li'); if (li && li.dataset.repo) showProjectModal.function(JSON.parse(li.dataset.repo)); });
    let focusedProjectIndex = -1;
    projectListElement.addEventListener('keydown', e => { const items = projectListElement.querySelectorAll('li'); if (!items.length) return; let index = focusedProjectIndex; if (e.key === 'ArrowDown') index = (index + 1) % items.length; else if (e.key === 'ArrowUp') index = (index - 1 + items.length) % items.length; else if (e.key === 'Enter') { items[index]?.click(); return; } else return; e.preventDefault(); playSound('type'); items.forEach(item => item.classList.remove('is-focused')); items[index]?.classList.add('is-focused'); items[index]?.scrollIntoView({ block: 'nearest' }); focusedProjectIndex = index; });

    // --- WINDOWING --- (Corrected Logic)
    const windows = document.querySelectorAll('.desktop .window:not(.modal)');
    function setActive(win) {
        const maxZ = Array.from(windows).reduce((max, w) => Math.max(max, parseInt(w.style.zIndex || 1)), 1);
        windows.forEach(w => w.classList.remove('is-active'));
        win.classList.add('is-active');
        win.style.zIndex = maxZ + 2;
    }
    windows.forEach(win => { win.addEventListener('mousedown', () => setActive(win), { capture: true }); });
    if (document.getElementById('profile-window')) setActive(document.getElementById('profile-window'));

    interact('.window:not(.modal)').draggable({
        allowFrom: '.title-bar',
        inertia: true,
        modifiers: [interact.modifiers.restrictRect({ restriction: 'parent', endOnly: true })],
        listeners: {
            start(event) {
                const target = event.target;
                if (!target.classList.contains('is-floating')) {
                    const rect = target.getBoundingClientRect();
                    const parentRect = desktop.getBoundingClientRect();
                    target.style.left = (rect.left - parentRect.left) + 'px';
                    target.style.top = (rect.top - parentRect.top) + 'px';
                    target.style.width = rect.width + 'px';
                    target.style.height = rect.height + 'px';
                    target.classList.add('is-floating');
                }
                setActive(target);
                playSound('click');
            },
            move(event) {
                const target = event.target;
                let x = (parseFloat(target.style.left) || 0) + event.dx;
                let y = (parseFloat(target.style.top) || 0) + event.dy;
                target.style.left = x + 'px';
                target.style.top = y + 'px';
            }
        }
    }).resizable({
        edges: { left: true, right: true, bottom: true, top: false },
        inertia: false,
        modifiers: [
            interact.modifiers.restrictEdges({ outer: 'parent' }),
            interact.modifiers.restrictSize({ min: { width: 300, height: 150 } })
        ],
        listeners: {
            start(event) {
                const target = event.target;
                if (!target.classList.contains('is-floating')) {
                    const rect = target.getBoundingClientRect();
                    const parentRect = desktop.getBoundingClientRect();
                    target.style.left = (rect.left - parentRect.left) + 'px';
                    target.style.top = (rect.top - parentRect.top) + 'px';
                    target.style.width = rect.width + 'px';
                    target.style.height = rect.height + 'px';
                    target.classList.add('is-floating');
                }
                setActive(target);
                playSound('click');
            },
            move(event) {
                const target = event.target;
                target.style.width = event.rect.width + 'px';
                target.style.height = event.rect.height + 'px';
                let x = (parseFloat(target.style.left) || 0) + event.deltaRect.left;
                let y = (parseFloat(target.style.top) || 0) + event.deltaRect.top;
                target.style.left = x + 'px';
                target.style.top = y + 'px';
            }
        }
    });

    // Start boot sequence
    typeLog();
});
