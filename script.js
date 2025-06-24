document.addEventListener('DOMContentLoaded', () => {
    // --- Clock ---
    const clockElement = document.getElementById('clock');
    function updateClock() {
        clockElement.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    setInterval(updateClock, 1000);
    updateClock();

    // --- Typewriter effect for the log window ---
    const logContent = [
        "[1.001] System boot...",
        "[1.002] Initializing Corvid Console...",
        "[1.523] Mounting file system...",
        "[2.105] Fetching assets... OK",
        "[2.106] All components loaded successfully.",
        "[3.401] Awaiting user interaction..."
    ];
    const logElement = document.getElementById('log-content');
    let lineIndex = 0;

    function typeLog() {
        if (lineIndex < logContent.length) {
            logElement.innerHTML += logContent[lineIndex] + '\n';
            lineIndex++;
            setTimeout(typeLog, Math.random() * 200 + 50); // Random delay for realism
        } else {
            logElement.innerHTML += '<span class="cursor"> </span>';
        }
    }
    typeLog();


    // --- Windowing ---
    const windows = document.querySelectorAll('.window');
    const allWindows = Array.from(windows);

    function setActive(win) {
        const maxZ = allWindows.reduce((max, w) => Math.max(max, parseInt(w.style.zIndex || 1)), 1);
        allWindows.forEach(w => w.classList.remove('is-active'));
        win.classList.add('is-active');
        win.style.zIndex = maxZ + 1;
    }

    windows.forEach(win => {
        win.addEventListener('mousedown', () => setActive(win), { capture: true });
    });
    
    // Set initial active window
    const profileWindow = document.getElementById('profile-window');
    if (profileWindow) {
        setActive(profileWindow);
    }

    // --- Interact.js Logic ---
    interact('.window')
        .draggable({
            allowFrom: '.title-bar',
            inertia: true,
            modifiers: [
                interact.modifiers.restrictRect({
                    restriction: 'parent',
                    endOnly: true
                })
            ],
            autoScroll: true,
            listeners: {
                start(event) {
                    const target = event.target;
                    target.classList.add('is-dragging');
                    setActive(target);
                },
                move: dragMoveListener,
                end(event) {
                    event.target.classList.remove('is-dragging');
                }
            }
        })
        .resizable({
            edges: { left: true, right: true, bottom: true, top: false },
            listeners: { move: resizeListener },
            modifiers: [
                interact.modifiers.restrictEdges({
                    outer: 'parent'
                }),
                interact.modifiers.restrictSize({
                    min: { width: 300, height: 150 }
                })
            ],
            inertia: true
        });

    function dragMoveListener(event) {
        const target = event.target;
        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        target.style.width = target.offsetWidth + 'px'; // Fix width/height on drag start
        target.style.height = target.offsetHeight + 'px';
        target.style.transform = `translate(${x}px, ${y}px)`;
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    function resizeListener(event) {
        const target = event.target;
        let x = (parseFloat(target.getAttribute('data-x')) || 0);
        let y = (parseFloat(target.getAttribute('data-y')) || 0);

        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.transform = `translate(${x}px, ${y}px)`;
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }
});
