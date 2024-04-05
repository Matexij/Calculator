const display = document.querySelector('#display')
const symbols = document.querySelectorAll('button[data-which]')
const tempResult = document.getElementById('inbetweenResult')
let symbolFlag = false
let decimalPointFlag = false
let memoryNumber = 0;
let currentNumber = 0;

window.addEventListener('keyup',appendToDisplayKeyboard)

function appendToDisplay(symbol){
    display.value = symbol
}
function appendToDisplayKeyboard(e){
    switch(e.key){
        case 'Backspace':
        case 'Delete':
            clearDisplay()
            break;
        case '/':
        case '*':
        case '-':
        case '+':
            addAction(e)
            break;
        case /^\d+$/.test(e.key) && e.key:
            accumulateNumbers(Number(e.key))
            break;
        case 'Enter':
            calculate()
            break;
        case '.':
            if(!decimalPointFlag)
                appendToDisplay(currentNumber + '.')
            decimalPointFlag = true            
            break;
    }
}
function addAction(e){
    addStyleSymbols(e)  
    decimalPointFlag = false  
    symbolFlag = e.key   
    memoryNumber = Number(currentNumber)
    currentNumber = 0
    tempResult.innerHTML = memoryNumber + ' ' + symbolFlag
}
function accumulateNumbers(number){
    
    if(decimalPointFlag){
        const decimalNum = (currentNumber + "").split('.')[1]!=undefined ? (currentNumber + "").split('.')[1] + number: number;
        const intNum = Number((currentNumber + "").split('.')[0])
        currentNumber = intNum + '.' + decimalNum
    } else
        currentNumber = currentNumber * 10 + number
    appendToDisplay(currentNumber)
}
function calculate(){
    addStyleSymbols(0) 
    currentNumber = memoryNumber ? operate(memoryNumber,Number(currentNumber),symbolFlag) : Number(currentNumber)
    appendToDisplay(currentNumber)
    tempResult.innerHTML = ''
}
function operate(a,b,symbol){
    switch(symbol){
        case '+':
            return a+b
        case '-':
            return a-b
        case '*':
            return a*b
        case '/':
            return a/b
    }
}
function clearDisplay(){
    display.value = ''
    tempResult.innerHTML = ''
    memoryNumber = 0
    currentNumber = 0
    symbolFlag = false
    addStyleSymbols(0)
}
function addStyleSymbols(e){  
    symbols.forEach(symbol => {
        if(symbol.getAttribute('data-which') == e.which)
            symbol.style.boxShadow = "0px 0px 7px 0px #6e2938";
        else
            symbol.style.boxShadow = "0px 0px 0px 0px";
    })    
}