let mode = "light";
let generatedOTP = null;

(function(){
    emailjs.init("dNirsJkwieq53_oF4"); 
})();

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
        if(document.getElementById("name")) document.getElementById("name").value = savedName;
        if(document.getElementById("class")) document.getElementById("class").value = savedClass;
        if(document.getElementById("email")) document.getElementById("email").value = savedEmail;
    }
};

function sendOTP() {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const classInput = document.getElementById("class");

    if (!nameInput || !emailInput || !classInput) return;

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const cls = classInput.value;

    if (!name || !email || !cls) {
        alert("Please enter Name, Email and Select Class!");
        return;
    }

    generatedOTP = Math.floor(100000 + Math.random() * 900000);

    const templateParams = {
        to_name: name,
        email: email, 
        otp: generatedOTP
    };

    emailjs.send('service_p4n3jt9', 'template_kxgdizu', templateParams)
        .then(function(response) {
           alert("OTP has been sent to your email!");
           document.getElementById("otp-section").style.display = "block";
           document.getElementById("send-otp-btn").style.display = "none";
        }, function(error) {
           alert("Email Error: " + JSON.stringify(error));
        });
}

function verifyOTPAndStart() {
    const otpInput = document.getElementById("otp-input");
    if (!otpInput) return;

    const userOTP = otpInput.value.trim();

    if (userOTP == generatedOTP && generatedOTP !== null) {
        localStorage.setItem("studentName", document.getElementById("name").value.trim());
        localStorage.setItem("studentClass", document.getElementById("class").value);
        localStorage.setItem("studentEmail", document.getElementById("email").value.trim());

        alert("Login Successful!");
        window.location.href = "exam.html";
    } else {
        alert("Invalid OTP! Please check again.");
    }
}
