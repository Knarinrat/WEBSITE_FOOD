// ดึงข้อมูลจาก localStorage
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const cartContainer = document.getElementById('cart-items');

// เพิ่มฟังก์ชันเพื่อรีเซ็ตส่วนลดเมื่อมีการเปลี่ยนแปลงรายการ
function resetDiscount() {
    discountApplied = false; // รีเซ็ตค่า
    localStorage.removeItem('discountedPrice'); // ลบราคาที่ลด
    document.getElementById('total-price').textContent = `ราคาหลังจากใช้คูปอง: ${calculateTotalPrice().toFixed(2)} บาท`; // อัปเดตราคาใหม่
    displayFinalTotalPrice(); // อัปเดตราคารวมทั้งหมด
}

// ฟังก์ชันสำหรับลบรายการอาหาร
function removeItem(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    displayCartItems();
    displayInitialTotalPrice();
    resetDiscount(); // รีเซ็ตส่วนลดเมื่อมีการลบรายการ
}



// ฟังก์ชันสำหรับแสดงรายการอาหารในตะกร้า
function displayCartItems() {
    cartContainer.innerHTML = ''; // เคลียร์รายการเก่า
    if (cartItems.length === 0) {
        cartContainer.innerHTML = "<p>ไม่มีรายการอาหารในตะกร้า</p>";
    } else {
        cartItems.forEach((item, index) => {
            let optionsHtml = item.options && item.options.length > 0
                ? `<div class="item-options">ตัวเลือก: ${item.options.join(", ")}</div>`
                : "";

            cartContainer.innerHTML += `
                <div class="cart-item">
                    <button class="remove-button" onclick="removeItem(${index})">X</button>
                    <div class="item-name">${item.name} : ${item.quantity} ที่</div>
                    <div class="item-price">${item.price} </div>
                    ${optionsHtml}
                </div>
            `;
        });
    }
}


// ฟังก์ชันที่คำนวณราคาสินค้าในตะกร้า
function calculateTotalPrice() {
    let total = 0;
    cartItems.forEach(item => {
        total += item.price * item.quantity; // คำนวณราคาแต่ละรายการในตะกร้า
    });
    return total;
}

// ฟังก์ชันเพื่อแสดงราคารวมเริ่มต้นเมื่อหน้าโหลด
function displayInitialTotalPrice() {
    const totalPrice = calculateTotalPrice();
    document.getElementById('original-price').textContent = `ราคารวม: ${totalPrice.toFixed(2)} บาท`; // แสดงราคารวมเริ่มต้น
}


// เรียกใช้ฟังก์ชันแสดงราคารวมทันทีที่โหลดหน้าเว็บ
window.onload = displayInitialTotalPrice;

// เรียกใช้ฟังก์ชันเพื่อแสดงรายการอาหารเมื่อโหลดหน้า
displayCartItems();

// ดึงข้อมูลจาก localStorage
const email = localStorage.getItem('userEmail');
const userName = localStorage.getItem('userName'); // ดึงชื่อผู้ใช้จาก localStorage


// แสดงชื่อผู้ใช้ใน accountInfo
if (userName) {
    document.getElementById('userName').textContent = userName; // แสดงชื่อผู้ใช้
} else {
    document.getElementById('userName').textContent = 'ไม่พบชื่อผู้ใช้'; // หากไม่มีชื่อ
}

function updateShippingPrice() {
    // ค้นหาตัวเลือกที่ถูกเลือกอยู่
    const selectedOption = document.querySelector('input[name="ship-method"]:checked');

    // ตรวจสอบว่ามีตัวเลือกที่เลือกอยู่หรือไม่
    if (selectedOption) {
        // ดึงราคาจาก data-price และแปลงเป็นตัวเลข
        const price = Number(selectedOption.getAttribute('data-price'));

        // แสดงราคาที่ตำแหน่ง #shipping-price
        document.getElementById('shipping-price').textContent = `ราคาค่าจัดส่ง: ${price} บาท`;
    }

}

// ฟังก์ชันเพื่ออัพเดตราคาค่าจัดส่งและคำนวณราคารวม
function updateShippingPrice() {
    const selectedOption = document.querySelector('input[name="ship-method"]:checked');

    if (selectedOption) {
        const shippingPrice = Number(selectedOption.getAttribute('data-price'));

        // อัปเดตค่าจัดส่ง
        document.getElementById('shipping-price').textContent = `ค่าจัดส่ง: ${shippingPrice} บาท`;
        localStorage.setItem('shippingPrice', shippingPrice); // บันทึกค่าจัดส่ง

        displayFinalTotalPrice();  // อัพเดตราคารวมทั้งหมด
    }
}



// ฟังก์ชันเพื่อแสดงราคารวมทั้งหมดหลังรวมค่าจัดส่งและส่วนลดจากคูปอง
function displayFinalTotalPrice() {
    const discountedPrice = Number(localStorage.getItem('discountedPrice')) || calculateTotalPrice();
    const shippingPrice = Number(localStorage.getItem('shippingPrice')) || 0;

    const finalPrice = discountedPrice + shippingPrice;

    document.getElementById('final-price').textContent = `ราคารวมทั้งหมด: ${finalPrice} บาท`; // แสดงราคารวมทั้งหมด

    // เก็บราคารวมทั้งหมดใน localStorage
    localStorage.setItem('finalPrice', finalPrice);
}

// ฟังก์ชันสำหรับเก็บข้อมูลการสั่งซื้อใน MongoDB
async function saveOrderToMongoDB() {
    const email = localStorage.getItem('userEmail'); // ดึงอีเมลผู้ใช้ที่ล็อคอิน
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const finalPrice = localStorage.getItem('finalPrice'); // ดึงราคารวมทั้งหมดจาก localStorage

    // ตรวจสอบว่ามีอีเมลหรือไม่
    if (email) {
        const orderData = {
            userEmail: email,
            orderItems: cartItems,
            totalPrice: calculateTotalPrice(), // คำนวณราคาสินค้าในตะกร้า
            discountedPrice: localStorage.getItem('discountedPrice'), // ราคาหลังหักคูปอง
            shippingPrice: localStorage.getItem('shippingPrice'), // ราคาค่าจัดส่ง
            finalPrice: finalPrice, // เพิ่มราคารวมทั้งหมด
            timestamp: new Date().toISOString() // บันทึกเวลา
        };

        // ส่งข้อมูลการสั่งซื้อไปยังเซิร์ฟเวอร์ (ตรวจสอบให้แน่ใจว่าคุณมี API สำหรับการบันทึกข้อมูล)
        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                throw new Error('เกิดข้อผิดพลาดในการบันทึกข้อมูลการสั่งซื้อ');
            }

            console.log('บันทึกการสั่งซื้อเรียบร้อยแล้ว');
        } catch (error) {
            console.error('ไม่สามารถบันทึกการสั่งซื้อ:', error);
        }
    } else {
        console.error("ไม่พบอีเมลผู้ใช้");
    }
}


let discountApplied = false; // ประกาศตัวแปรระดับสูงสุด

function applyCoupon() {
    const couponCode = document.getElementById("coupon").value;
    const messageElement = document.getElementById("message");

    const coupons = {
        "DISCOUNT50": { type: "percent", value: 0.50 },
        "DISCOUNT40": { type: "percent", value: 0.40 },
        "DISCOUNT30": { type: "percent", value: 0.30 },
        "DISCOUNT20": { type: "percent", value: 0.20 },
        "FOOD100": { type: "amount", value: 100, minPurchase: 700 },
        "FOOD50": { type: "amount", value: 50, minPurchase: 500 },
        "FOOD20": { type: "amount", value: 20, minPurchase: 300 },
        "FOOD10": { type: "amount", value: 10, minPurchase: 200 }
    };

    const email = localStorage.getItem('userEmail');
    const usedCoupons = JSON.parse(localStorage.getItem('usedCoupons')) || {};


    if (coupons[couponCode] && !discountApplied) {
        const coupon = coupons[couponCode];

        // ตรวจสอบคูปองว่าเคยใช้หรือยัง
        if (coupon.type === "percent" && usedCoupons[email] && usedCoupons[email].includes(couponCode)) {
            messageElement.innerText = "คุณเคยใช้คูปองนี้ไปแล้ว!";
            messageElement.className = "error";
            return;
        }

        const totalPrice = calculateTotalPrice();
        if (totalPrice >= (coupon.minPurchase || 0)) {
            let discountedPrice;
            let discountAmount;

            if (coupon.type === "amount") {
                discountedPrice = totalPrice - coupon.value;
                discountAmount = coupon.value;
            } else if (coupon.type === "percent") {
                discountedPrice = totalPrice * (1 - coupon.value);
                discountAmount = coupon.value * 100;

                // บันทึกคูปองใน email นี้ว่าใช้ไปแล้ว
                usedCoupons[email] = usedCoupons[email] || [];
                usedCoupons[email].push(couponCode);
                localStorage.setItem('usedCoupons', JSON.stringify(usedCoupons));
            }

            // อัปเดต Local Storage
            localStorage.setItem('discountedPrice', discountedPrice);
            document.getElementById('total-price').textContent = `ราคาหลังจากใช้คูปอง: ${discountedPrice.toFixed(2)} บาท`;

            // แสดงข้อความส่วนลด
            messageElement.innerText = `ใช้คูปองสำเร็จ! ลด ${coupon.type === "percent" ? discountAmount + "%" : discountAmount + " บาท"}`;
            messageElement.className = "success";
            discountApplied = true;

            displayFinalTotalPrice(); // ฟังก์ชันอัปเดตราคารวมหลังลด
        } else {
            messageElement.innerText = `ไม่สามารถใช้คูปองนี้ได้ ต้องมีราคาอาหารอย่างน้อย ${coupon.minPurchase} บาท`;
            messageElement.className = "error";
        }
    } else if (discountApplied) {
        messageElement.innerText = "คุณใช้คูปองไปแล้ว!";
        messageElement.className = "error";
    } else {
        messageElement.innerText = "รหัสคูปองไม่ถูกต้อง!";
        messageElement.className = "error";
    }
}


// เรียกใช้ฟังก์ชันนี้เมื่อมีการสั่งซื้อ
async function confirmOrder() {
    // โค้ดสำหรับการยืนยันการสั่งซื้อที่นี่

    // เรียกใช้ฟังก์ชันสำหรับบันทึกข้อมูลการสั่งซื้อ
    await saveOrderToMongoDB(); // เก็บข้อมูลการสั่งซื้อ

    // เปลี่ยนเส้นทางไปยังหน้าถัดไป (ถ้าต้องการ)
    window.location.href = 'shipping.html'; // เปลี่ยนเส้นทางไปหน้าจัดส่ง
}


// ฟังก์ชันสำหรับยกเลิก
function cancle() {
    // ลบข้อมูลจาก localStorage
    localStorage.removeItem('cartItems');
    localStorage.removeItem('discountedPrice');
    localStorage.removeItem('shippingPrice');
    localStorage.removeItem('copiedCouponCode');
    // เปลี่ยนเส้นทางไปยังหน้า index.html
    window.location.href = 'menu.html';
}


// เพิ่มอีเวนต์ให้ปุ่ม "ยกเลิก"
document.getElementById('buttonred').addEventListener('click', cancle);





