document.addEventListener("DOMContentLoaded", function() {
    const carType = document.getElementById("car-type");
    const carValue = document.getElementById("car-value");
    const carValueRange = document.getElementById("car-value-range");
    const leasePeriod = document.getElementById("lease-period");
    const downPayment = document.getElementById("down-payment");
    const downPaymentRange = document.getElementById("down-payment-range");
    
    const leasingCostElement = document.getElementById("leasing-cost");
    const downPaymentValueElement = document.getElementById("down-payment-value");
    const monthlyInstallmentElement = document.getElementById("monthly-installment");
    const interestRateElement = document.getElementById("interest-rate");

    function updateValues() {
        carValue.value = carValueRange.value;
        downPayment.value = downPaymentRange.value;
    }
    
    function calculateLeasing() {
        const carValueNum = parseFloat(carValue.value);
        const leasePeriodNum = parseInt(leasePeriod.value);
        const downPaymentPercentNum = parseInt(downPayment.value);
        
        const downPaymentValue = (downPaymentPercentNum / 100) * carValueNum;
        const isBrandNew = carType.value === "new";
        const annualInterestRate = isBrandNew ? 2.99 : 3.7;
        const monthlyInterestRate = annualInterestRate / 12 / 100;
        const leaseValue = carValueNum - downPaymentValue;
        
        const monthlyInstallment = (leaseValue * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -leasePeriodNum));
        const totalLeasingCost = (monthlyInstallment * leasePeriodNum) + downPaymentValue;
        
        leasingCostElement.textContent = totalLeasingCost.toFixed(2);
        downPaymentValueElement.textContent = downPaymentValue.toFixed(2);
        monthlyInstallmentElement.textContent = monthlyInstallment.toFixed(2);
        interestRateElement.textContent = annualInterestRate.toFixed(2);
    }

    carValueRange.addEventListener("input", () => {
        updateValues();
        calculateLeasing();
    });
    
    carValue.addEventListener("input", () => {
        carValueRange.value = carValue.value;
        calculateLeasing();
    });
    
    downPaymentRange.addEventListener("input", () => {
        updateValues();
        calculateLeasing();
    });
    
    downPayment.addEventListener("input", () => {
        downPaymentRange.value = downPayment.value;
        calculateLeasing();
    });

    leasePeriod.addEventListener("change", calculateLeasing);
    carType.addEventListener("change", calculateLeasing);

    updateValues();
    calculateLeasing();
});
