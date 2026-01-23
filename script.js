let mode = "light";
let generatedOTP = null;
let otpAttempts = 0;   // security: limit attempts

// 🌙 Dark / Light Mode
document.getElementById("toggleMode").onclick = () => {
    mode = (mode === "light") ? "dark" : "light";
    document.body.className = mode;
    document.getElementById("toggleMode").innerText = (mode === "light") ? "🌙" : "☀️";
};

// Autofill saved data
window.onload = () => {
    const savedName = localStorage.getItem("studentName");
    const savedClass = localStorage.getItem("studentClass");
    const savedEmail = localStorage.getItem("studentEmail");

    if (savedName) document.getElementById("name").value = savedName;
    if (savedClass) document.getElementById("class").value = savedClass;
    if (savedEmail) document.getElementById("email").value = savedEmail;
};

// 📩 Send OTP
function sendOTP() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const cls = document.getElementById("class").value;

    if (!name || !email || !cls) {
        alert("Please fill Name, Email and Class first!");
        return;
    }

    generatedOTP = Math.floor(100000 + Math.random() * 900000);
    otpAttempts = 0; // reset attempts

    const templateParams = {
        to_name: name,
        email: email,
        otp: generatedOTP
    };

    emailjs.send('service_p4n3jt9', 'template_kxgdizu', templateParams)
        .then(() => {
            alert("OTP sent to your email!");
            document.getElementById("otp-section").style.display = "block";
            document.getElementById("send-otp-btn").style.display = "none";
        })
        .catch(() => {
            alert("Email service blocked. Check EmailJS settings.");
        });
}

// ✅ Verify OTP
function verifyOTPAndStart() {
    const otpInput = document.getElementById("otp-input").value.trim();
    const selectedTime = document.getElementById("exam-time").value;

    if (!generatedOTP) {
        alert("Please request OTP first!");
        return;
    }

    otpAttempts++;

    if (otpAttempts > 5) {
        alert("Too many wrong attempts. Please refresh and try again.");
        return;
    }

    if (otpInput == generatedOTP) {

        localStorage.setItem("studentName", document.getElementById("name").value.trim());
        localStorage.setItem("studentClass", document.getElementById("class").value);
        localStorage.setItem("studentEmail", document.getElementById("email").value.trim());
        localStorage.setItem("examTime", selectedTime);

        alert("Login Successful!");
        window.location.href = "exam.html";

    } else {
        alert("Wrong OTP! Attempts left: " + (5 - otpAttempts));
    }
}
