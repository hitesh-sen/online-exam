let mode = "light";

document.getElementById("toggleMode").onclick = () => {
    mode = (mode === "light") ? "dark" : "light";
    document.body.className = mode;
    document.getElementById("toggleMode").innerText = (mode === "light") ? "🌙" : "☀️";
};

function startExam() {
    let name = document.getElementById("name").value.trim();
    let cls = document.getElementById("class").value.trim();
    let time = document.getElementById("time").value;

    if (!name || !cls) {
        alert("Please enter Name and Class");
        return;
    }

    localStorage.setItem("studentName", name);
    localStorage.setItem("studentClass", cls);
    localStorage.setItem("examTime", time);
    window.location.href = "exam.html";
}