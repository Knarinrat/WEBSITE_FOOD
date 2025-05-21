const form = document.getElementById("form");
const email = document.getElementById("email");
const messageDiv = document.getElementById("message");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateEmail();
});

const validateEmail = () => {
    const emaildata = email.value.trim();

    if (emaildata === "") {
        alert("กรุณากรอกอีเมล");
        return;
    }
    const data = {
        email: emaildata,
    };
    fetch('/check-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            if (response.ok) {
                // อีเมลถูกต้อง
                window.location.href = "resetpassword.html";
            } else if (response.status === 404) {
                // อีเมลไม่ถูกต้อง
                throw new Error("อีเมลไม่ถูกต้อง");
            } else {
                throw new Error("เกิดข้อผิดพลาดในการตรวจสอบอีเมล");
            }
        })
        .catch(error => {
            alert(error.message);
        });

};