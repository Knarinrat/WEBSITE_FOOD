// ฟังก์ชันเลื่อนกลับไปด้านบน
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // ทำให้การเลื่อนเป็นไปอย่างราบรื่น
    });
}

// ฟังก์ชันเพิ่มเมนูไปยังรายการ
function addToList(name, price) {
    const menuWithOptions = {
        'น้ำชาเย็น': 'option1.html',
        'ข้าวผัด': 'option2.html',
        'ข้าวผัดกะเพรา': 'option2.html',
        'ข้าวทอดกระเทียม': 'option2.html',
        'ข้าวคั่วพริกเกลือ': 'option2.html',
        'น้ำแข็งไส': 'option3.html'
    };
    // ตรวจสอบว่ามี URL ให้ไปหน้าต่างๆ หรือไม่
    if (menuWithOptions[name]) {
        window.location.href = menuWithOptions[name] + '?item=' + encodeURIComponent(name) + '&price=' + price;
        scrollToTop();
    } else {
        // ดึงรายการอาหารที่เลือกจาก localStorage หรือสร้าง array ใหม่ถ้าไม่มี
        let currentItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // ตรวจสอบว่ามีเมนูนี้อยู่แล้วหรือไม่
        const existingItem = currentItems.find(item => item.name === name);

        if (existingItem) {
            // เพิ่มจำนวนถ้ามีรายการนี้อยู่แล้ว
            existingItem.quantity += 1;
        } else {
            // เพิ่มรายการใหม่ถ้ายังไม่มี
            currentItems.push({ name: name, price: price, quantity: 1 });
        }

        // เก็บรายการที่อัปเดตใน localStorage
        localStorage.setItem('cartItems', JSON.stringify(currentItems));
        alert(name + " ได้ถูกเพิ่มไปยังรายการอาหารของคุณ");
    }
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

// เพิ่มฟังก์ชันสำหรับลิ้งค์ไปยังหน้าต่างๆ ตามช่วงราคาที่เลือก
const priceRangeSelect = document.getElementById('priceRangeSelect');

priceRangeSelect.addEventListener('change', function () {
    const selectedOption = priceRangeSelect.options[priceRangeSelect.selectedIndex];
    const targetUrl = selectedOption.getAttribute('data-url');

    // ถ้ามีค่า URL ใน data-url ให้ลิ้งค์ไปยังหน้านั้น
    if (targetUrl) {
        window.location.href = targetUrl;
    }
});

let foundItems = []; // ตัวแปรสำหรับเก็บเมนูที่ค้นพบ

function handleKey(event) {
    // ตรวจสอบการกดปุ่ม
    if (event.key === "Enter") {
        event.preventDefault(); // ป้องกันการรีเฟรชหน้า
        goToMenu(); // หากกด Enter ให้ไปที่เมนู
    }
    searchMenu(); // ค้นหาเมนู
}

function searchMenu() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const menuItems = document.querySelectorAll('.menu-item');

    foundItems = []; // เริ่มต้น foundItems ใหม่

    menuItems.forEach(item => {
        const name = item.querySelector('.name-text').textContent.toLowerCase();
        if (name.includes(input)) {
            item.style.display = 'block'; // แสดงเมนูที่ค้นพบ
            foundItems.push(item); // เก็บรายการเมนูที่ค้นพบ
        } else {
            item.style.display = 'none'; // ซ่อนเมนูที่ไม่ตรงกับการค้นหา
        }
    });
}

function goToMenu() {
    // ถ้ามีเมนูที่ค้นพบ
    if (foundItems.length > 0) {
        // เลื่อนดูไปที่เมนูแรกที่ค้นพบ
        foundItems[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
        // ถ้าไม่พบเมนูใด ๆ ให้เลื่อนขึ้นไปที่ช่องค้นหา
        document.getElementById('searchInput').scrollIntoView({ behavior: 'smooth' });
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

