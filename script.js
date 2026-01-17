let mode = "light";
let generatedOTP = null;

document.getElementById("toggleMode").onclick = () => {
    mode = (mode === "light") ? "dark" : "light";
    document.body.className = mode;
    document.getElementById("toggleMode").innerText = (mode === "light") ? "🌙" : "☀️";
};

window.onload = () => {
    const savedName = localStorage.getItem("studentName");
    const savedClass = localStorage.getItem("studentClass");
    const savedEmail = localStorage.getItem("studentEmail");

    if (savedName && savedClass) {
        document.getElementById("name").value = savedName;
        document.getElementById("class").value = savedClass;
        if(document.getElementById("email")) document.getElementById("email").value = savedEmail;
        console.log("Welcome back student data loaded.");
    }
};

function sendOTP() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const cls = document.getElementById("class").value;

    if (!name || !email || !cls) {
        alert("Sahi details bharein! Name, Email aur Class zaruri hai.");
        return;
    }

    generatedOTP = Math.floor(100000 + Math.random() * 900000);
    
    alert(`Verification Code: ${generatedOTP}\nKripya ise enter karein.`);

    document.getElementById("otp-section").style.display = "block";
    document.querySelector("button[onclick='sendOTP()']").style.display = "none";
}

function verifyOTPAndStart() {
    const userOTP = document.getElementById("otp-input").value.trim();
    const time = document.getElementById("time").value;

    if (userOTP == generatedOTP) {
        localStorage.setItem("studentName", document.getElementById("name").value.trim());
        localStorage.setItem("studentClass", document.getElementById("class").value);
        localStorage.setItem("studentEmail", document.getElementById("email").value.trim());
        localStorage.setItem("examTime", time);

        alert("Login Successful! Best of luck for your exam.");
        window.location.href = "exam.html";
    } else {
        alert("Galat OTP! Kripya sahi code dalein.");
    }
}
