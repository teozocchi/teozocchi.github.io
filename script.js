const output = document.getElementById("output");
const input = document.getElementById("cmd");

const commands = {
  help: `Available commands:
  - about: Info about me
  - projects: List of my projects
  - contact: How to reach me
  - clear: Clear terminal
  - help: This help menu`,

  about: `I'm Teo — final year IT student, Linux user, metalhead, and system nerd.
Studying for TOLC-S and preparing for Informatica @ Bicocca.
Learning C, Python, Linux, and building TUI tools.`,

  projects: `Current projects:
  - sysadmin-tools: Bash & Python CLI tools
  - tui-tasker: Task manager in Textual
  - riconciliazione: Python invoice matcher used in internship`,

  contact: `GitHub : https://github.com/sh1rafune
Email  : teozocchi [at] example [dot] com`,

  clear: "clear"
};

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const cmd = input.value.trim();
    handleCommand(cmd);
    input.value = "";
  }
});

function handleCommand(cmd) {
  appendLine(`[teozocchi@arch ~]$ ${cmd}`);
  if (commands[cmd]) {
    if (cmd === "clear") {
      output.innerText = "";
    } else {
      appendLine(commands[cmd]);
    }
  } else if (cmd.length === 0) {
    appendLine("");
  } else {
    appendLine(`command not found: ${cmd}`);
  }
}

function appendLine(text) {
  output.innerText += `\n${text}`;
}

