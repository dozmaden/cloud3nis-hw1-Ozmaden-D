var store = document.getElementById("inputText");
var operations = ['+', '-', 'x', '/'];

var locked = false

function numberButton(val) {
    if (locked) return

    if (store.value == '0')
        store.value = ""

    if (store.value.length > 30) {
        store.value = "Input too big!"
        locked = true
    }

    store.value += val
}

function operatorButton(val) {
    var input = store.value;

    if (locked || input == "") return

    if (operations.some(element => input.includes(element))) {
        equalsButton()
    }

    var lastChar = input.substring(input.length - 1);
    
    if (input != '' && operations.indexOf(lastChar) == -1) {
        store.value += " " + val + " ";
    } else if (input == '' && val == '-') {
        store.value += " " + val + " ";
    }

    if (operations.indexOf(lastChar) > -1 && input.length > 1) {
        store.value = input.substring(0, input.length - 1) + val;
    }
}

function decimalButton() {
    if (locked) return

    if (!store.value.includes(".")) {
        store.value += '.'
    }
}

function equalsButton() {
    var input =  store.value.replaceAll("x", "*").split(' ')

    if (input.length != 3) {
        store.value = "Something is wrong!"
        locked = true
        return
    }

    var num1 = parseFloat(input[0])
    var operation = input[1]
    var num2 = parseFloat(input[2])

    var res = 0.0
    if (operation == '+') {
        res = num1 + num2
    } else if (operation == '-') {
        res = num1 - num2
    } else if (operation == '/') {
        if (num2 != 0) {
            res = num1 / num2
        } else {
            res = "NaN"
            locked = true
        }
    } else if (operation == '*') {
        res = num1 * num2
    }

    store.value = res.toString()
}


function resetButton() {
    locked = false;
    store.value = "0";
}