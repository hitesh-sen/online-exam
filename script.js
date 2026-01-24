// EmailJS Init
(function () {
    emailjs.init("dNirsJkwieq53_oF4");
})();

let generatedOTP = null;

// Wait until page fully loads
document.addEventListener("DOMContentLoaded", function () {

    window.sendOTP = function () {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const cls = document.getElementById("class").value;

        if (!name || !email || !cls) {
            alert("Please fill all details first!");
            return;
        }

        generatedOTP = Math.floor(100000 + Math.random() * 900000);
        sessionStorage.setItem("examOTP", generatedOTP);

        emailjs.send("service_p4n3jt9", "template_kxgdizu", {
            to_name: name,
            to_email: email,
            otp_code: generatedOTP
        }).then(() => {
            alert("OTP sent to your email!");
            document.getElementById("otp-section").style.display = "block";
            document.getElementByById("send-otp-btn").style.display = "none";
        }).catch(err => {
            alert("Failed to send OTP");
            console.error(err);
        });
    };

    window.verifyOTPAndStart = function () {
        const enteredOTP = document.getElementById("otp-input").value.trim();
        const realOTP = sessionStorage.getItem("examOTP");

        if (enteredOTP === realOTP) {
            localStorage.setItem("studentName", document.getElementById("name").value.trim());
            localStorage.setItem("studentClass", document.getElementById("class").value);
            localStorage.setItem("studentEmail", document.getElementById("email").value.trim());
            localStorage.setItem("examTime", document.getElementById("exam-time").value);

            sessionStorage.removeItem("examOTP");
            window.location.href = "dashboard.html";
        } else {
            alert("Incorrect OTP!");
        }
    };

});
