
// ดึงอีเมลจาก localStorage
const email = localStorage.getItem('userEmail');
const userName = localStorage.getItem('userName'); // ดึงชื่อผู้ใช้จาก localStorage

async function fetchUserData() {
    if (!email) {
        document.getElementById('userData').innerHTML = '<p>ไม่พบข้อมูลอีเมลใน localStorage</p>';
        return;
    }

    try {
        const response = await fetch('/getUserData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }), // ส่งอีเมลไปยังเซิร์ฟเวอร์
        });

        if (response.ok) {
            const data = await response.json();
            // แสดงชื่อที่ด้านบน
            document.getElementById('userName').innerText = `${data.user.name}`;
            document.getElementById('userData').innerHTML = `
                 <p><strong>ชื่อ:</strong> <span>${data.user.name}</span>  <span>${data.user.surname}</span></p>
                <p><strong>อีเมล:</strong> ${data.user.email}</p>
                <p><strong>เบอร์โทรศัพท์:</strong> ${data.user.telephone}</p>
                <p><strong>ที่อยู่:</strong> ${data.user.address}</p>
            `;
        } else {
            const errorData = await response.json();
            document.getElementById('userData').innerHTML = `<p>${errorData.message}</p>`;
        }
    } catch (error) {
        document.getElementById('userData').innerHTML = `<p>เกิดข้อผิดพลาด: ${error.message}</p>`;
    }
}

// ฟังก์ชันสำหรับออกจากระบบ
function logout() {
    // ลบข้อมูลจาก localStorage
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userName');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('discountedPrice');
    localStorage.removeItem('shippingPrice');
    localStorage.removeItem('copiedCouponCode');
    // เปลี่ยนเส้นทางไปยังหน้า index.html
    window.location.href = 'index.html';
}

// เรียกฟังก์ชันเมื่อโหลดหน้า
window.onload = fetchUserData;

// เพิ่มอีเวนต์ให้ปุ่ม "ออกจากระบบ"
document.getElementById('logoutButton').addEventListener('click', logout);
