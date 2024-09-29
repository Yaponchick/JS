const buttons = document.querySelectorAll('#table button');

let save = 23;
let Input = '0';
let operator = null;
let pValue = null; 

const updateDisplay = () => {
    box.textContent = Input;
};

const calculate = (a, b, operator) => {
    switch (operator) {
        case '+':
            return parseFloat(a) + parseFloat(b);
        case '-':
            return parseFloat(a) - parseFloat(b);
        case '*':
            return parseFloat(a) * parseFloat(b);
        case '/':
            return parseFloat(a) / parseFloat(b);
        case '**':
            return parseFloat(a) * parseFloat(a);
        case '//':
            return Math.sqrt(a);
        case 'changeSign':
            return parseFloat(a) * -1;

        default:
            return b;
    }
}

function Clear() {
    Input = 0;
    pValue = null;
    operator = null;
}

const Remove = () => {
    if (Input.length > 1) {
        Input = Input.slice(0, -1);
    }
    else if (Input.length = 1) {
        Input = 0;
    }
};

function Procent(){
    Input = Input/100;
}

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.id;

        if (!isNaN(value)) { 
            if (Input == '0') {
                Input = value;
            }
            else {
                Input += value;
            }
        }

        if (value == 'ca') {
            Clear();
        }

        else if (value == 'remove') {
            Remove();
        }
        else if(value == '%')
        {
            Procent();
        }
        else if(value == 'ce')
        {
            Input=0;
        }
        else if(value == 'mr' || value == "mc" || value == 'ms' || value == 'm+' || value == 'm-')
        {
            if(value == 'mr'){
                Input = save;
            }
            else if (value == 'mc') {
                save=0;
                Input = 0;
            }
            else if (value == 'ms')
            {
                save=Input;
            }
            else if (value == 'm+')
            {
                Input = calculate(Input, save,'+');
            }
            else if (value == 'm-')
            {
                Input = calculate(Input, save,'-');
            }
        }
        else if (['+', '-', '*', '/'].includes(value)) {
            if (operator) {
                Input = calculate(pValue, Input, operator);
            }
            pValue = Input;
            operator = value;
            Input = '0'; 
        }
        else if (value === '=') {
            if (operator && pValue !== null) {
                Input = calculate(pValue, Input, operator);
                operator = null;
                pValue = null;
            }
        }
        else if(value =='1divx')
        {
            Input = calculate(1, Input,'/');
        }
        else if(value =='pow')
        {
            Input = calculate(Input, Input,'**');
        }
        else if(value =='sqrt')
        {
            Input = calculate(Input, Input,'//');
        }
        else if(value == '.')
        {
            Input += ".";
        }
        else if(value == 'changeSign')
        {
            Input = calculate(Input, Input,'changeSign');
        }

        updateDisplay();
    });
});