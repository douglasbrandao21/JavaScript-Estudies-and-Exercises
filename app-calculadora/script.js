function calculate(type, value) {
    

    if(type === 'action') {
        if(value === 'clear') {
            document.getElementById("result").value = "";
        }

        else if(value === '+' || value === '-' || value === '*' || value === '/' || value === '.') {
            document.getElementById("result").value += value;
        }

        else if(value === '=') {
            var result = document.getElementById("result").value;
            document.getElementById("result").value = eval(result);
        }

    }
    else if(type === 'value') {
    
        document.getElementById("result").value += value;
    
    }
}