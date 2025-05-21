const couponCodes = {
    'coupon/coupon1.png': 'DISCOUNT50',
    'coupon/coupon2.png': 'DISCOUNT40',
    'coupon/coupon3.png': 'DISCOUNT30',
    'coupon/coupon4.png': 'DISCOUNT20',
    'coupon/coupon5.png': 'FOOD100',
    'coupon/coupon6.png': 'FOOD50',
    'coupon/coupon7.png': 'FOOD20',
    'coupon/coupon8.png': 'FOOD10',
};

// ฟังก์ชันสำหรับคัดลอกโค้ดคูปอง
function copyCouponCode(couponId) {
    const couponCode = couponCodes[couponId]; // ดึงโค้ดคูปองจากอ็อบเจ็กต์
    if (couponCode) {
        navigator.clipboard.writeText(couponCode).then(() => {
            alert(`คูปองโค้ด '${couponCode}' ถูกคัดลอกไปยังคลิปบอร์ดแล้ว!`);
            localStorage.setItem('copiedCouponCode', couponCode); // บันทึกโค้ดคูปองลงใน Local Storage
        }).catch(err => {
            console.error("ไม่สามารถคัดลอกข้อความ: ", err);
            alert("เกิดข้อผิดพลาดในการคัดลอกโค้ดคูปอง");
        });
    } else {
        alert("ไม่พบโค้ดคูปองสำหรับคูปองนี้");
    }
}

// ดึงข้อมูลจาก localStorage
const email = localStorage.getItem('userEmail');
const userName = localStorage.getItem('userName'); // ดึงชื่อผู้ใช้จาก localStorage

// แสดงชื่อผู้ใช้ใน accountInfo
if (userName) {
    document.getElementById('userName').textContent = userName; // แสดงชื่อผู้ใช้
} else {
    document.getElementById('userName').textContent = 'ไม่พบชื่อผู้ใช้'; // หากไม่มีชื่อ
}