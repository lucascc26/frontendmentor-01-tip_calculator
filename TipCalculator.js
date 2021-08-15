class TipCalculator {
    constructor() {
        this.reset();
    }

    canReset() {
        return this.bill !== undefined ||
            this.tipPercentage !== undefined ||
            this.numberOfPeople !== undefined ||
            this.tipAmountByPerson !== 0 ||
            this.totalAmountByPerson !== 0;
    }

    reset() {
        if (this.canReset()) {
            this.bill = undefined;
            this.tipPercentage = undefined;
            this.numberOfPeople = undefined;
            this.tipAmountByPerson = 0;
            this.totalAmountByPerson = 0;
            this.errors = [];
        }
    }

    setBill(bill) {
        this.bill = isNaN(bill) || bill === '' ? undefined : parseFloat(bill);

        if (this.bill === 0)
            this.errors['bill'] = 'Can\'t be zero';
        else
            delete this.errors['bill'];
    }

    setTipPercentage(tipPercentage) {
        this.tipPercentage = isNaN(tipPercentage) || tipPercentage === '' ? undefined : parseInt(tipPercentage);
    }

    setNumberOfPeople(numberOfPeople) {
        this.numberOfPeople = isNaN(numberOfPeople) || numberOfPeople === '' ? undefined : parseInt(numberOfPeople);

        if (this.numberOfPeople === 0)
            this.errors['numberOfPeople'] = 'Can\'t be zero';
        else
            delete this.errors['numberOfPeople'];
    }

    calculate() {
        if (!this.bill || this.tipPercentage === undefined || !this.numberOfPeople) {
            this.tipAmountByPerson = 0;
            this.totalAmountByPerson = 0;
        } else {
            const tipTotal = this.bill * this.tipPercentage / 100;
            const billByPerson = this.bill / this.numberOfPeople;

            this.tipAmountByPerson = tipTotal / this.numberOfPeople;
            this.totalAmountByPerson = this.tipAmountByPerson + billByPerson;
        }
    }
}