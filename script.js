document.addEventListener('DOMContentLoaded', () => {
    // --- Clock ---
    const clockElement = document.getElementById('clock');
    function updateClock() {
        clockElement.textContent = new Date().toLocaleTimeString();
    }
    setInterval(updateClock, 1000);
    updateClock();

    // --- Windowing ---
    const windows = document.querySelectorAll('.window');
    
    // Set initial active window and z-index
    const allWindows = Array.from(document.querySelectorAll('.window'));
    allWindows.forEach((win, index) => {
        // Stagger z-index to avoid ties
        win.style.zIndex = index + 1;
    });

    function setActive(win) {
        // Find the current highest z-index
        const maxZ = allWindows.reduce((max, w) => Math.max(max, parseInt(w.style.zIndex || 1)), 1);

        // De-activate all windows
        allWindows.forEach(w => w.classList.remove('is-active'));
        
        // Activate the clicked one and bring it to the front
        win.classList.add('is-active');
        win.style.zIndex = maxZ + 1;
    }

    // Set initial active window
    const profileWindow = document.getElementById('profile-window');
    if (profileWindow) {
        setActive(profileWindow);
    }
    
    windows.forEach(win => {
        win.addEventListener('mousedown', () => setActive(win), { capture: true });
    });


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
            listeners: { move: dragMoveListener }
        })
        .resizable({
            edges: { left: true, right: true, bottom: true, top: false },
            listeners: { move: resizeListener },
            modifiers: [
                interact.modifiers.restrictEdges({
                    outer: 'parent'
                }),
                interact.modifiers.restrictSize({
                    min: { width: 250, height: 150 }
                })
            ],
            inertia: true
        });

    function dragMoveListener(event) {
        const target = event.target;
        const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
        const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        target.style.transform = `translate(${x}px, ${y}px)`;
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    function resizeListener(event) {
        const target = event.target;
        let x = (parseFloat(target.getAttribute('data-x')) || 0);
        let y = (parseFloat(target.getAttribute('data-y')) || 0);

        // Update the element's style
        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // Translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.transform = 'translate(' + x + 'px,' + y + 'px)';
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }
});
