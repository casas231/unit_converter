const rates = {
    length: {
        km: 1,
        mi: 1.61
    },
    weight: {
        kg: 1,
        lb: 0.45
    }
};

function convertLengthWeight(value, fromUnit, toUnit, type) {
    const rateTable = rates[type];

    const baseValue = value * rateTable[fromUnit];
    const finalValue = baseValue / rateTable[toUnit];

    return finalValue;
}

function convertTemperature(value, fromUnit, toUnit) {
    if (fromUnit === '°C' && toUnit === '°F') {
        return (value * 9/5) + 32;
    } else if (fromUnit === '°F' && toUnit === '°C') {
        return (value - 32) * 5/9;
    }
    return value;
}

const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        btn.classList.add('active');

        const targetId = btn.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

const convertBtns = document.querySelectorAll('.convert-btn');

convertBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const currentTab = btn.closest('.tab-pane');
        const tabId = currentTab.getAttribute('id');

        const formScreen = currentTab.querySelector('.converter-form');
        const resultScreen = currentTab.querySelector('.result-screen');
        const resultText = resultScreen.querySelector('.final-result');

        const inputElement = formScreen.querySelector('.input-val');
        const inputValue = parseFloat(inputElement.value);
        const fromUnit = formScreen.querySelector('.select-from').value;
        const toUnit = formScreen.querySelector('.select-to').value;

        if (!inputValue) {
            alert('Vui lòng nhập giá trị cần chuyển đổi!');
            return;
        }

        if (fromUnit === toUnit) {
            alert('Vui lòng chọn đơn vị khác nhau để chuyển đổi!');
            return;
        }

        let ans = 0;
        
        if (tabId == "length") {
            ans = convertLengthWeight(inputValue, fromUnit, toUnit, 'length');
        } else if (tabId == "weight") {
            ans = convertLengthWeight(inputValue, fromUnit, toUnit, 'weight');
        } else if (tabId == "temperature") {
            ans = convertTemperature(inputValue, fromUnit, toUnit);
        }

        ans = Math.round(ans * 100) / 100;
        
        resultText.innerHTML = `${inputValue} ${fromUnit} = ${ans} ${toUnit}`;

        formScreen.style.display = 'none';
        resultScreen.style.display = 'block';
    });
});

const resetBtns = document.querySelectorAll('.reset-btn');

resetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const currentTab = btn.closest('.tab-pane');
        const formScreen = currentTab.querySelector('.converter-form');
        const resultScreen = currentTab.querySelector('.result-screen');
        const inputField = formScreen.querySelector('.input-val');

        inputField.value = '';

        resultScreen.style.display = 'none';
        formScreen.style.display = 'block';
    });
});