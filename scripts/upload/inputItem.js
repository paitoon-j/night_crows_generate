const inputElements = document.querySelectorAll('.item-details input[type="number"]');

inputElements.forEach(inputElement => {
    inputElement.value = 0; // เริ่มต้นค่าเป็น 0

    inputElement.addEventListener('input', function() { // ตรวจสอบเมื่อค่าเปลี่ยนแปลง
        const numericValue = parseInt(this.value, 10);
        if (isNaN(numericValue) || numericValue < 0) {
            this.value = 0; // ป้องกันค่าติดลบหรือไม่ใช่ตัวเลข
        }
    });

    inputElement.addEventListener('focus', function() { // เมื่อได้รับโฟกัส
        if (this.value === '0') {
            this.value = ''; // ลบ 0 ออกเมื่อได้รับโฟกัส
        }
    });

    inputElement.addEventListener('blur', function() { // เมื่อเสียโฟกัส
        // ตรวจสอบค่าอีกครั้งเมื่อเสียโฟกัส (เผื่อผู้ใช้พิมพ์ค่าไม่ถูกต้อง)
        const numericValue = parseInt(this.value, 10);
        if (isNaN(numericValue) || numericValue < 0) {
            this.value = 0;
        }

        // ตรวจสอบว่าเป็น input ของจำนวน item หรือจำนวนคน
        const isItemInput = this.id.endsWith('ItemCount');
        const isPersonInput = this.id.endsWith('PeopleCount');

        // หา input ที่เกี่ยวข้อง (item หรือ person)
        const relatedInput = this.closest('.item-details').querySelector(
            isItemInput ? 'input[id$="PeopleCount"]' : 'input[id$="ItemCount"]'
        );

        if (relatedInput) {
            const relatedValue = parseInt(relatedInput.value, 10);

            if (isItemInput && numericValue < relatedValue) { // จำนวน item ต้องไม่น้อยกว่าจำนวนคน
                this.value = relatedValue;
            } else if (isPersonInput && numericValue > relatedValue) { // จำนวนคนต้องไม่มากกว่าจำนวน item
                relatedInput.value = numericValue;
            }
        }
    });
});