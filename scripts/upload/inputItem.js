// เลือก input ทั้งหมดที่อยู่ใน div ที่มี class "item-details"
const inputElements = document.querySelectorAll('.item-details input[type="number"]');

// กำหนดค่าเริ่มต้นและเพิ่ม Event Listener ให้กับแต่ละ input
inputElements.forEach(inputElement => {
    // กำหนดค่าเริ่มต้นเป็น 0
    inputElement.value = 0;

    // ฟังก์ชันตรวจสอบค่า (เหมือนเดิม)
    function checkInputValue(inputElement) {
        if (inputElement.value === '') {
            inputElement.value = 0;
        } else if (inputElement.value < 0) {
            inputElement.value = 0; // หรือแจ้งเตือนผู้ใช้
        }
    }

    // เพิ่ม Event Listener เมื่อ input ได้รับโฟกัส
    inputElement.addEventListener('focus', function () {
        if (this.value === '0') {
            this.value = ''; // ลบค่า 0 ออกเมื่อ input ได้รับโฟกัส
        }
    });

    // เพิ่ม Event Listener เมื่อ input สูญเสียโฟกัส
    inputElement.addEventListener('blur', function () {
        checkInputValue(this); // ตรวจสอบค่าเมื่อ input สูญเสียโฟกัส
    });
});