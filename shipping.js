// ดึงข้อมูลจาก localStorage
const email = localStorage.getItem('userEmail');
const userName = localStorage.getItem('userName');

// แสดงชื่อผู้ใช้ใน accountInfo
if (userName) {
    document.getElementById('userName').textContent = userName;
} else {
    document.getElementById('userName').textContent = 'ไม่พบชื่อผู้ใช้';
}

// ดึงข้อมูลรายการอาหารจาก localStorage
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const orderSummaryContainer = document.getElementById('order-summary');

// ฟังก์ชันแสดงข้อมูลรายการอาหาร
function displayOrderSummary() {
    if (cartItems.length === 0) {
        orderSummaryContainer.innerHTML = "<p>ไม่มีรายการอาหารที่สั่งซื้อ</p>";
    } else {
        cartItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('order-item');
            itemElement.innerHTML = `
                <p>${item.name} - ${item.quantity} ที่ - ราคา ${item.price} บาท</p>
            `;
            orderSummaryContainer.appendChild(itemElement);
        });
    }
}

// ฟังก์ชันดึงราคาสุทธิและแสดงใน DOM
function displayFinalPrice() {
    const finalPrice = localStorage.getItem('finalPrice'); // ดึง finalPrice จาก localStorage
    const finalPriceContainer = document.getElementById('final-price');

    if (finalPrice) {
        finalPriceContainer.innerHTML = `<p>ราคารวมทั้งหมด: ${finalPrice} บาท</p>`;
    } else {
        finalPriceContainer.innerHTML = `<p>ไม่พบข้อมูลราคารวม</p>`;
    }
}

// เรียกใช้ฟังก์ชันเพื่อแสดงข้อมูลรายการอาหารและราคาสุทธิ
displayOrderSummary();
displayFinalPrice();

// ฟังก์ชันดึงข้อมูลผู้ใช้
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
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            const data = await response.json();
            document.getElementById('userName').innerText = `${data.user.name}`;
            document.getElementById('userData').innerHTML = `
                <p><strong>ชื่อ:</strong> <span>${data.user.name}</span>  <span>${data.user.surname}</span></p>
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

// เรียกใช้ฟังก์ชันเพื่อดึงข้อมูลผู้ใช้
fetchUserData();

// ฟังก์ชันสำหรับยกเลิก
function cancle() {
    // ลบข้อมูลจาก localStorage
    localStorage.removeItem('cartItems');
    localStorage.removeItem('discountedPrice');
    localStorage.removeItem('shippingPrice');
    localStorage.removeItem('copiedCouponCode');
    localStorage.removeItem('finalPrice');
    // เปลี่ยนเส้นทางไปยังหน้า index.html
    window.location.href = 'menu.html';
}

// เพิ่มอีเวนต์ให้ปุ่ม "ยกเลิก"
document.getElementById('buttonred').addEventListener('click', cancle);

// เปลี่ยนหน้าไปที่ 'payment.html' หลังจาก 1 นาที (60000 มิลลิวินาที)
setTimeout(function () {
    window.location.href = 'payment.html';
}, 60000);
