const stars = document.querySelectorAll('.star');
let rating = 0;

stars.forEach(star => {
    star.addEventListener('click', () => {
        rating = star.getAttribute('data-value');
        stars.forEach(s => s.classList.remove('selected'));
        for (let i = 0; i < rating; i++) {
            stars[i].classList.add('selected');
        }
    });
});

document.getElementById('submitReview').addEventListener('click', () => {
    const reviewText = document.getElementById('reviewText').value;

    // สร้างอ็อบเจ็กต์รีวิว
    const review = {
        rating: rating,
        text: reviewText
    };

    // เก็บรีวิวใน Local Storage
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push(review);
    localStorage.setItem('reviews', JSON.stringify(reviews));

    if (rating === 0) {
        alert("กรุณาให้คะแนนก่อน");
        return;
    }
    // แสดงข้อความยืนยัน
    alert("ขอบคุณสำหรับการให้รีวิว!");
    // เคลียร์ค่าที่กรอก
    document.getElementById('reviewText').value = '';
    rating = 0;
    stars.forEach(star => star.classList.remove('selected'));
});

// ดึงข้อมูลจาก localStorage
const email = localStorage.getItem('userEmail');
const userName = localStorage.getItem('userName'); // ดึงชื่อผู้ใช้จาก localStorage

// แสดงชื่อผู้ใช้ใน accountInfo
if (userName) {
    document.getElementById('userName').textContent = userName; // แสดงชื่อผู้ใช้
} else {
    document.getElementById('userName').textContent = 'ไม่พบชื่อผู้ใช้'; // หากไม่มีชื่อ
}