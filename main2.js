
document.getElementById('resetForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // ป้องกันการโหลดหน้าใหม่

    const email = document.getElementById('email').value;
    const newPassword = document.getElementById('new-password').value;

    try {
        const response = await fetch('/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, 'new-password': newPassword })
        });

        const result = await response.json();
        alert(result.message); // แสดงข้อความเป็นป๊อปอัพ

        if (result.success) {
            document.getElementById('resetForm').reset(); // รีเซ็ตฟอร์มหากสำเร็จ
        }
    } catch (error) {
        alert('เกิดข้อผิดพลาดในการรีเซตรหัสผ่าน');
    }
});
