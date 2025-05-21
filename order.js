// ดึงอีเมลจาก localStorage
const email = localStorage.getItem('userEmail');
const userName = localStorage.getItem('userName'); // ดึงชื่อผู้ใช้จาก localStorage


// แสดงชื่อผู้ใช้ใน accountInfo
if (userName) {
    document.getElementById('userName').textContent = userName; // แสดงชื่อผู้ใช้
} else {
    document.getElementById('userName').textContent = 'ไม่พบชื่อผู้ใช้'; // หากไม่มีชื่อ
}

//เรียกข้อมูลการสั่งซื้อ
async function fetchOrderHistory() {
    const userEmail = localStorage.getItem('userEmail');

    if (!userEmail) {
        document.getElementById('orderList').innerHTML = '<p>กรุณาเข้าสู่ระบบก่อน</p>';
        return;
    }

    try {
        const response = await fetch('/api/orders', {
            method: 'GET',
            credentials: 'include' // ส่งคุกกี้เซสชันไปด้วย
        });

        if (response.ok) {
            const data = await response.json();

            if (data.success) {
                const orderList = document.getElementById('orderList');
                orderList.innerHTML = ''; // ล้างเนื้อหาเดิม

                if (data.orders.length === 0) {
                    orderList.innerHTML = '<p>ไม่พบประวัติการสั่งซื้อ</p>';
                } else {
                    data.orders.forEach(order => {
                        orderList.innerHTML += `
                            <div class="order-item">
                                <p><strong>รายการอาหาร:</strong> ${order.orderItems.map(item => item.item).join(', ')}</p>
                                <p><strong>ราคา:</strong> ${order.totalPrice} บาท</p>
                                <p><strong>วันที่สั่ง:</strong> ${new Date(order.timestamp).toLocaleString()}</p>
                            </div>
                        `;
                    });
                }
            } else {
                document.getElementById('orderList').innerHTML = `<p>${data.message}</p>`;
            }
        } else {
            const errorData = await response.json();
            document.getElementById('orderList').innerHTML = `<p>${errorData.message}</p>`;
        }
    } catch (error) {
        document.getElementById('orderList').innerHTML = `<p>เกิดข้อผิดพลาด: ${error.message}</p>`;
    }
}

// เรียกฟังก์ชันเมื่อโหลดหน้า
window.onload = () => {
    fetchOrderHistory(); // เรียกฟังก์ชันดึงประวัติการสั่งซื้อ
};