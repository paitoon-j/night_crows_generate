const inputElements = document.querySelectorAll('.item-details input[type="number"]');

inputElements.forEach(inputElement => {

    inputElement.value = 0;

    function checkInputValue(inputElement) {
        if (inputElement.value === '') {
            inputElement.value = 0;
        } else if (inputElement.value < 0) {
            inputElement.value = 0;
        }
    }

    inputElement.addEventListener('focus', function () {
        if (this.value === '0') {
            this.value = '';
        }
    });

    inputElement.addEventListener('blur', function () {
        checkInputValue(this);

        const isItemInput = this.id.endsWith('ItemCount');
        const isPersonInput = this.id.endsWith('PeopleCount');

        if (isItemInput) {
            const personInput = this.closest('.item-details').querySelector('input[id$="PeopleCount"]');
            if (personInput && parseInt(this.value) < parseInt(personInput.value)) {
                this.value = personInput.value;
            }
        } else if (isPersonInput) {
            const itemInput = this.closest('.item-details').querySelector('input[id$="ItemCount"]');
            if (itemInput && parseInt(this.value) > parseInt(itemInput.value)) {
                itemInput.value = this.value;
            }
        }
    });
});