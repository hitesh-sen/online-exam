let generatedOTP = null;

(function(){
    emailjs.init("dNirsJkwieq53_oF4");
})();

function sendOTP() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const cls = classSelect.value;

    if (!name || !email || !cls) {
        alert("Fill all details first!");
        return;
    }

    generatedOTP = Math.floor(100000 + Math.random() * 900000);

    emailjs.send('service_p4n3jt9','template_kxgdizu',{
        to_name: name,
        email: email,
        otp: generatedOTP
    }).then(() => {
        alert("OTP sent to email");
        otpSection.style.display = "block";
        sendOtpBtn.style.display = "none";
    }).catch(() => alert("Email sending failed"));
}

function verifyOTPAndStart() {
    if (otpInput.value == generatedOTP) {
        localStorage.setItem("studentName", nameInput.value.trim());
        localStorage.setItem("studentClass", classSelect.value);
        localStorage.setItem("studentEmail", emailInput.value.trim());
        localStorage.setItem("examTime", examTimeSelect.value);
        window.location.href = "dashboard.html";
    } else alert("Wrong OTP");
}

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const classSelect = document.getElementById("class");
const examTimeSelect = document.getElementById("exam-time");
const otpSection = document.getElementById("otp-section");
const otpInput = document.getElementById("otp-input");
const sendOtpBtn = document.getElementById("send-otp-btn");
