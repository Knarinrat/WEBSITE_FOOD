document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form");
    const email = document.getElementById("email");
    const pwsinput = document.getElementById("pwsinput");

    if (form) {
        form.addEventListener("submit", e => {
            e.preventDefault();
            loginUser();
        });
    } else {
        console.error("ไม่พบฟอร์มที่มี ID 'form'");
    }

    const loginUser = () => {
        const emaildata = email.value.trim();
        const pwsdata = pwsinput.value.trim();

        if (emaildata === "" || pwsdata === "") {
            alert("กรุณากรอกอีเมลและรหัสผ่าน");
            return;
        }

        const data = {
            email: emaildata,
            password: pwsdata,
        };

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    localStorage.setItem('userEmail', data.user.email);
                    localStorage.setItem('userName', data.user.name);

                    if (data.user.email === "admin@example.com") {
                        window.location.href = "admin.html";
                    } else {
                        window.location.href = "profile.html";
                    }
                } else {
                    alert('อีเมลหรือรหัสผ่านไม่ถูกต้อง');
                }
            })
            .catch(error => {
                console.error('เกิดข้อผิดพลาด:', error);
                alert('เกิดข้อผิดพลาดในระบบ');
            });
    };

});
