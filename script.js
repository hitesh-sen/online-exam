let generatedOTP = null;

// EmailJS Init
(function(){
    emailjs.init("dNirsJkwieq53_oF4"); 
})();

let generatedOTP = null;

// ================= SEND OTP =================
function sendOTP() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const cls = document.getElementById("class").value;

    if (!name || !email || !cls) {
        alert("Please fill all details first!");
        return;
    }

    // Generate OTP
    generatedOTP = Math.floor(100000 + Math.random() * 900000);

    // Save OTP temporarily in session
    sessionStorage.setItem("examOTP", generatedOTP);

    emailjs.send("service_p4n3jt9", "template_kxgdizu", {
        to_name: name,
        email: email,
        otp: generatedOTP
    }).then(() => {
        alert("OTP sent to your email!");
        document.getElementById("otp-section").style.display = "block";
        document.getElementById("send-otp-btn").style.display = "none";
    }).catch(err => {
        alert("Failed to send OTP");
        console.error(err);
    });
}


// ================= VERIFY OTP =================
function verifyOTPAndStart() {
    const enteredOTP = document.getElementById("otp-input").value.trim();
    const realOTP = sessionStorage.getItem("examOTP");

    if (enteredOTP === realOTP) {

        // Save student session
        localStorage.setItem("studentName", document.getElementById("name").value.trim());
        localStorage.setItem("studentClass", document.getElementById("class").value);
        localStorage.setItem("studentEmail", document.getElementById("email").value.trim());
        localStorage.setItem("examTime", document.getElementById("exam-time").value);

        // Clear OTP after success
        sessionStorage.removeItem("examOTP");

        window.location.href = "dashboard.html";

    } else {
        alert("Incorrect OTP!");
    }
}

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const classSelect = document.getElementById("class");
const examTimeSelect = document.getElementById("exam-time");
const otpSection = document.getElementById("otp-section");
const otpInput = document.getElementById("otp-input");
const sendOtpBtn = document.getElementById("send-otp-btn");

