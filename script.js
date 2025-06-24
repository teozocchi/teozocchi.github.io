const typingArea = document.getElementById("typing-area");

const lines = [
  "[teozocchi@arch ~]$ cat about.txt",
  "Hi, I'm Teo.",
  "Final year IT student, Linux-heavy and metal-infused.",
  "Learning C, Python, Docker, and TUI design.",
  "Intern @ Workgroup Consulting, future Bicocca student.",
  "",
  "Type 'github.com/sh1rafune' into your browser, I dare you."
];

let lineIndex = 0;
let charIndex = 0;

function typeLine() {
  if (lineIndex >= lines.length) return;

  const line = lines[lineIndex];
  if (charIndex < line.length) {
    typingArea.innerHTML += line.charAt(charIndex);
    charIndex++;
    setTimeout(typeLine, 30);
  } else {
    typingArea.innerHTML += "\n";
    charIndex = 0;
    lineIndex++;
    setTimeout(typeLine, 300);
  }
}

typeLine();

