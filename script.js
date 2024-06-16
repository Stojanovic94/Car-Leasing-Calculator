document.addEventListener("DOMContentLoaded", function() {
    // DOM elements
    const carType = document.getElementById("car-type");
    const carValue = document.getElementById("car-value");
    const carValueRange = document.getElementById("car-value-range");
    const leasePeriod = document.getElementById("lease-period");
    const downPayment = document.getElementById("down-payment");
    const downPaymentRange = document.getElementById("down-payment-range");
    
    // Elements to update with calculated values
    const leasingCostElement = document.getElementById("leasing-cost");
    const downPaymentValueElement = document.getElementById("down-payment-value");
    const monthlyInstallmentElement = document.getElementById("monthly-installment");
    const interestRateElement = document.getElementById("interest-rate");

    // Function to synchronize the value inputs with their corresponding range inputs
    function updateValues() {
        carValue.value = carValueRange.value;
        downPayment.value = downPaymentRange.value;
    }
    
    // Function to calculate leasing details based on user inputs
    function calculateLeasing() {
        const carValueNum = parseFloat(carValue.value);
        const leasePeriodNum = parseInt(leasePeriod.value);
        const downPaymentPercentNum = parseInt(downPayment.value);
        
        // Calculate down payment amount
        const downPaymentValue = (downPaymentPercentNum / 100) * carValueNum;
        
        // Determine annual interest rate based on car type
        const isBrandNew = carType.value === "new";
        const annualInterestRate = isBrandNew ? 2.99 : 3.7;
        
        // Calculate monthly interest rate
        const monthlyInterestRate = annualInterestRate / 12 / 100;
        
        // Calculate remaining lease value after down payment
        const leaseValue = carValueNum - downPaymentValue;
        
        // Calculate monthly installment using formula for annuity
        const monthlyInstallment = (leaseValue * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -leasePeriodNum));
        
        // Calculate total leasing cost
        const totalLeasingCost = (monthlyInstallment * leasePeriodNum) + downPaymentValue;
        
        // Update UI with calculated values
        leasingCostElement.textContent = totalLeasingCost.toFixed(2);
        downPaymentValueElement.textContent = downPaymentValue.toFixed(2);
        monthlyInstallmentElement.textContent = monthlyInstallment.toFixed(2);
        interestRateElement.textContent = annualInterestRate.toFixed(2);
    }

    // Event listeners to update and calculate when inputs change
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

    // Initial update and calculation when the page loads
    updateValues();
    calculateLeasing();
});
