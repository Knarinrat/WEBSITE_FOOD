// ดึงข้อมูลจาก localStorage
const email = localStorage.getItem('userEmail');
const userName = localStorage.getItem('userName'); // ดึงชื่อผู้ใช้จาก localStorage

// แสดงชื่อผู้ใช้ใน accountInfo
if (userName) {
    document.getElementById('userName').textContent = userName; // แสดงชื่อผู้ใช้
} else {
    document.getElementById('userName').textContent = 'ไม่พบชื่อผู้ใช้'; // หากไม่มีชื่อ
}

// ฟังก์ชันสำหรับโหลดรีวิวจาก localStorage และแสดง
function loadReviews() {
    const reviewsContainer = document.getElementById('reviews-food');
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];

    if (reviews.length === 0) {
        reviewsContainer.innerHTML = "<p>ยังไม่มีรีวิว</p>";
    } else {
        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.classList.add('review');
            reviewElement.innerHTML = `
                <p>คะแนน: ${review.rating} ★</p>
                <p>รีวิว: ${review.text}</p>
            `;
            reviewsContainer.appendChild(reviewElement);
        });
    }
}

// เรียกใช้ฟังก์ชันเพื่อโหลดรีวิวเมื่อหน้าโหลด
loadReviews();

// ฟังก์ชันเลื่อนกลับไปด้านบน
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // ทำให้การเลื่อนเป็นไปอย่างราบรื่น
    });
}

// แสดง/ซ่อนปุ่มขึ้นด้านบนตามตำแหน่งการเลื่อน
window.onscroll = function () {
    const scrollToTopButton = document.getElementById("scrollToTopButton");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopButton.style.display = "block"; // แสดงปุ่ม
    } else {
        scrollToTopButton.style.display = "none"; // ซ่อนปุ่ม
    }
};

// เพิ่มการฟังเหตุการณ์คลิกให้กับปุ่มขึ้นด้านบน
document.getElementById("scrollToTopButton").addEventListener("click", scrollToTop);