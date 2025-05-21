// ดึงข้อมูลจาก localStorage
const email = localStorage.getItem('userEmail'); // เปลี่ยนเป็น localStorage
const userName = localStorage.getItem('userName'); // ดึงชื่อผู้ใช้จาก localStorage

// แสดงชื่อผู้ใช้ใน accountInfo
if (userName) {
    document.getElementById('userName').textContent = userName; // แสดงชื่อผู้ใช้
} else {
    document.getElementById('userName').textContent = 'ไม่พบชื่อผู้ใช้'; // หากไม่มีชื่อ
}

// ฟังก์ชันสำหรับแสดงรายละเอียดการชำระเงินตามตัวเลือก
function showPaymentOptions() {
    // ดึงค่าที่ผู้ใช้เลือกจาก input ที่ชื่อว่า "payment-method"
    let selectedMethod = document.querySelector('input[name="payment-method"]:checked').value;

    // แสดงส่วนที่จะแสดงข้อมูลการชำระเงิน
    document.getElementById('payment-details').style.display = 'block';

    // ซ่อนรายละเอียดทั้งสองแบบก่อน แล้วแสดงตามตัวเลือกที่เลือก
    document.getElementById('cash-details').style.display = 'none';
    document.getElementById('bank-app-details').style.display = 'none';

    if (selectedMethod === 'cash') {
        // แสดงรายละเอียดชำระเงินสด
        document.getElementById('cash-details').style.display = 'block';
    } else if (selectedMethod === 'bank-app') {
        // แสดงรายละเอียดชำระผ่านแอพธนาคาร
        document.getElementById('bank-app-details').style.display = 'block';
    }
}

// ฟังก์ชันสำหรับยกเลิก
function confirmOrder() {
    // ลบข้อมูลจาก localStorage
    localStorage.removeItem('cartItems');
    localStorage.removeItem('discountedPrice');
    localStorage.removeItem('shippingPrice');
    localStorage.removeItem('copiedCouponCode');
    localStorage.removeItem('finalPrice');
    // เปลี่ยนเส้นทางไปยังหน้า success.html
    window.location.href = 'success.html';
}

// เพิ่มอีเวนต์ให้ปุ่ม "ยกเลิก"
document.getElementById('buttonred').addEventListener('click', confirmOrder);
