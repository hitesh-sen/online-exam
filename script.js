// EmailJS Init
(function () {
    emailjs.init("dNirsJkwieq53_oF4");
})();

let generatedOTP = null;

// Wait until page fully loads
document.addEventListener("DOMContentLoaded", function () {

   function sendOTP() {
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
        otp: generatedOTP,
        email: email
    })
    .then(function () {
        alert("OTP sent to your email!");
        document.getElementById("otp-section").style.display = "block";
        document.getElementById("send-otp-btn").style.display = "none";
    })
    .catch(function (error) {
        console.error("EmailJS Error:", error);
        alert("Failed to send OTP. Check console.");
    });
}
