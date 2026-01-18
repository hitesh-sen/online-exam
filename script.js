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

    if (savedName) document.getElementById("name").value = savedName;
    if (savedClass) document.getElementById("class").value = savedClass;
    if (savedEmail) document.getElementById("email").value = savedEmail;
};

function sendOTP() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const cls = document.getElementById("class").value;

    if (!name || !email || !cls) {
        alert("Pehle Name, Email aur Class select karein!");
        return;
    }

    generatedOTP = Math.floor(100000 + Math.random() * 900000);

    const templateParams = {
        to_name: name,
        email: email, 
        otp: generatedOTP
    };

    emailjs.send('service_p4n3jt9', 'template_kxgdizu', templateParams)
        .then(function() {
           alert("OTP aapke Email par bhej diya gaya hai!");
           document.getElementById("otp-section").style.display = "block";
           document.getElementById("send-otp-btn").style.display = "none";
        }, function(error) {
           alert("Email Error: Permission check karein (Error 412).");
        });
}

function verifyOTPAndStart() {
    const otpInput = document.getElementById("otp-input");
    
    // Naya dropdown se value uthane ke liye line:
    const selectedTime = document.getElementById("exam-time").value;

    if (otpInput.value.trim() == generatedOTP) {
        localStorage.setItem("studentName", document.getElementById("name").value.trim());
        localStorage.setItem("studentClass", document.getElementById("class").value);
        localStorage.setItem("studentEmail", document.getElementById("email").value.trim());
        
        // Ab static "5" ki jagah selectedTime save karein
        localStorage.setItem("examTime", selectedTime); 
        
        alert("Login Successful!");
        window.location.href = "exam.html";
    } else {
        alert("Galat OTP!");
    }
}




