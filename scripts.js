const SIGN = {
  MULTIPLY: "*",
  ADDITION: '+',
  SUBTRACTION: '-',
  DIVIDE: '/'
} 

let currentNumber='', previousNumber = '', currentOperation='', currentSum='';


const setResult = (operation) => {
  currentSum  = getOperationResult(Number(previousNumber), Number(currentNumber), operation)
  previousNumber = currentSum;
  currentNumber = '';
  setDisplayElement(currentSum);
}

const getOperationResult = (previous, current, operation) => {
  switch(operation) {
    case SIGN.ADDITION : {
      return previous + current
    }
    case SIGN.SUBTRACTION : {
      return previous - current
    } 
    case SIGN.DIVIDE : {
      return previous / current
    }
    case SIGN.MULTIPLY : {
      return previous * current
    }
  }

}


const setDisplayElement = (text) => {
 const displayElement=  document.querySelector('.displaySum')
displayElement.innerHTML = text
}

const isOperation = (key)  =>  (key === SIGN.MULTIPLY ||key === SIGN.ADDITION || key === SIGN.SUBTRACTION || key=== SIGN.DIVIDE)

const numbersClick = (key) => (_) => {
  console.log(key)
  switch(key) {
    case '=': {
      setResult(currentOperation)
      break;
    }

    default:
      if(key === '.' && !currentNumber.includes('.')) {
        currentNumber += key
      }
      else if(key !== '.'){ 
      currentNumber += key
      }
      setDisplayElement(currentNumber)
      break;
  }
}


const numbers = () => {
  const elements = document.querySelectorAll('button[data-key]')
  if(elements.length>0)
 {
  elements.forEach(item => {
    if(!isOperation(item.dataset.key)) {
      item.addEventListener('click', numbersClick(item.dataset.key))
    }
  })
 } 
}


const updateNumbersAndAssignOperation = (operation) => {

  if(currentNumber !== '' && previousNumber === ''){
    previousNumber = currentNumber;
    currentNumber = '';
    
  }

  if(currentNumber!=='' && previousNumber !== '') {
  setResult(operation)
  previousNumber = currentSum;
  currentNumber = '';
  }
  currentOperation = operation;
}


const operationsClick = (key) => (_) => {
  console.log(key)
  switch(key) {
    case SIGN.ADDITION : {
      updateNumbersAndAssignOperation(SIGN.ADDITION)
      break;
    }
    case SIGN.SUBTRACTION : {
      updateNumbersAndAssignOperation(SIGN.SUBTRACTION)
      break;
    } 
    case SIGN.DIVIDE : {
      updateNumbersAndAssignOperation(SIGN.DIVIDE)
      break;
    }
    case SIGN.MULTIPLY : {
      updateNumbersAndAssignOperation(SIGN.MULTIPLY)
      break;
    }
  }
}

const operations = () => {
  const elements = document.querySelectorAll('button[data-key]')
  if(elements.length>0)
 {
  elements.forEach(item => {
    if(isOperation(item.dataset.key)) {
      item.addEventListener('click', operationsClick(item.dataset.key))
    }
  })
 } 

}
const erase = () => {
  const elements = document.querySelectorAll('button[value]')
  elements.forEach(item => {
      item.addEventListener('click', ()=> {
        currentNumber='', previousNumber = '', currentOperation='', currentSum = '';
        setDisplayElement('')
      })
  })
}

window.onload = function () {
  numbers()
  operations()
  erase()
}