document.addEventListener('DOMContentLoaded', () => {
    const confirmButton = document.getElementById('confirmButton');
    const cancelButton = document.getElementById('cancelButton');

    // ฟังก์ชันดึงข้อมูลจาก URL
    const urlParams = new URLSearchParams(window.location.search);
    const item = urlParams.get('item'); // ดึงชื่อเมนูจาก URL
    const price = urlParams.get('price'); // ดึงราคาเมนูจาก URL

    confirmButton.addEventListener('click', () => {
        const selectedDessert = document.querySelector('input[name="dessert"]:checked');
        const selectedToppings2 = Array.from(document.querySelectorAll('input[type="checkbox"]'))
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        if (selectedDessert) {
            const dessertValue = selectedDessert.value;

            // เก็บข้อมูลลง localStorage ใน array cartItems
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            // สร้างชื่อที่ไม่ซ้ำสำหรับแต่ละรายการ
            const uniqueItemName = `${item} (${dessertValue}) - Toppings: ${selectedToppings2.join(', ')}`;

            const existingItem = cartItems.find(cartItem => cartItem.name === uniqueItemName);

            if (existingItem) {
                existingItem.quantity += 1; // เพิ่มจำนวนถ้าสินค้าเดิมอยู่ในรายการ
            } else {
                cartItems.push({
                    name: uniqueItemName, // ชื่อที่ไม่ซ้ำกัน
                    price: price, // เพิ่มราคาลงในข้อมูล
                    quantity: 1, // จำนวนเริ่มต้นเป็น 1
                });
            }

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            window.location.href = 'menu.html'; // เปลี่ยนไปยังหน้า menu.html
        } else {
            alert("กรุณาเลือกของหวาน");
        }
    });

    cancelButton.addEventListener('click', () => {
        window.location.href = 'menu.html'; // เปลี่ยนไปยังหน้า menu.html
    });
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
