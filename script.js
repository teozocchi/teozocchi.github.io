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

    // Set initial active window
    const profileWindow = document.getElementById('profile-window');
    if (profileWindow) {
        profileWindow.classList.add('is-active');
    }

    windows.forEach(win => {
        win.addEventListener('mousedown', () => {
            // Remove active class from all windows
            windows.forEach(w => w.classList.remove('is-active'));
            // Add active class to the clicked window
            win.classList.add('is-active');
        });
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
