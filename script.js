const usdFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
const percentageButtons = document.querySelectorAll('[data-percentage-button]');
const percentageCustomInput = document.querySelector('[data-custom-percentage]');
const billInput = document.querySelector('[data-bill]');
const billErrorElement = document.querySelector('[data-bill-error]');
const numberOfPeopleInput = document.querySelector('[data-number-of-people]');
const numberOfPeopleErrorElement = document.querySelector('[data-number-of-people-error]');
const tipByPersonElement = document.querySelector('[data-tip-by-person]');
const totalByPersonElement = document.querySelector('[data-total-by-person]');
const resetButton = document.querySelector('[data-reset]');

const tipCalculator = new TipCalculator();

const clearPercentageButtons = () => {
    var selectedButtons = document.querySelectorAll('[data-percentage-button].selected');
    selectedButtons.forEach(button => {
        button.classList.remove('selected');
    });
}

const clearPercentagemCustomInput = () => {
    percentageCustomInput.value = '';
}

const updateDisplay = () => {
    tipByPersonElement.innerText = usdFormatter.format(tipCalculator.tipAmountByPerson || 0);
    totalByPersonElement.innerText = usdFormatter.format(tipCalculator.totalAmountByPerson || 0);
    billInput.value = tipCalculator.bill === undefined ? '' : tipCalculator.bill;
    numberOfPeopleInput.value = tipCalculator.numberOfPeople === undefined ? '' : tipCalculator.numberOfPeople;

    resetButton.disabled = !tipCalculator.canReset();
}

const showError = (inputElement, errorElement, errorMessage) => {
    errorElement.style.display = 'block';
    errorElement.innerText = errorMessage;
    inputElement.classList.add('error');
}

const clearError = (inputElement, errorElement) => {
    errorElement.style.display = 'none';
    errorElement.innerText = '';
    inputElement.classList.remove('error');
}

resetButton.addEventListener('click', () => {
    clearPercentageButtons();
    clearPercentagemCustomInput();
    clearError(billInput, billErrorElement);
    clearError(numberOfPeopleInput, numberOfPeopleErrorElement);
    tipCalculator.reset();
    updateDisplay();
});

percentageButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('selected')) {
            button.classList.remove('selected');
            tipCalculator.setTipPercentage(0);
        } else {
            clearPercentagemCustomInput();
            clearPercentageButtons();
            tipCalculator.setTipPercentage(button.value);
            button.classList.add('selected');
        }

        tipCalculator.calculate();
        updateDisplay();
    });
});

percentageCustomInput.addEventListener('beforeinput', (event) => {
    if (isNaN(event.data) || event.data === ' ' || event.data === 'Spacebar') {
        event.preventDefault();
        return;
    }
});

percentageCustomInput.addEventListener('input', (event) => {
    if (isNaN(event.data) || event.data === ' ' || event.data === 'Spacebar') {
        event.preventDefault();
        return;
    }

    clearPercentageButtons();
    tipCalculator.setTipPercentage(percentageCustomInput.value);
    tipCalculator.calculate();
    updateDisplay();
});

numberOfPeopleInput.addEventListener('beforeinput', (event) => {
    if (isNaN(event.data) || event.data === ' ' || event.data === 'Spacebar') {
        event.preventDefault();
        return;
    }
});

numberOfPeopleInput.addEventListener('input', (event) => {
    clearError(numberOfPeopleInput, numberOfPeopleErrorElement);
    tipCalculator.setNumberOfPeople(numberOfPeopleInput.value);
    if (tipCalculator.errors['numberOfPeople'])
        showError(numberOfPeopleInput, numberOfPeopleErrorElement, tipCalculator.errors['numberOfPeople']);
    tipCalculator.calculate();
    updateDisplay();
});

billInput.addEventListener('input', (event) => {
    clearError(billInput, billErrorElement);
    tipCalculator.setBill(billInput.value);
    if (tipCalculator.errors['bill'])
        showError(billInput, billErrorElement, tipCalculator.errors['bill']);
    tipCalculator.calculate();
    updateDisplay();
});