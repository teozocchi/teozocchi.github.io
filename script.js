const text = "teozocchi@github.io:~$ ./about-me.sh";
let i = 0;

function typeWriter() {
  if (i < text.length) {
    document.getElementById("typed-title").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 35);
  }
}

window.onload = typeWriter;

