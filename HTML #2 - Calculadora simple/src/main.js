// ? Formulario
const form_calculator    = document.getElementById('form-calculator')

// ? Pantalla
const input_calculator   = document.getElementById('input-calculator')
const calculator_buttons = document.getElementById('calculator-buttons')

// ? Botones
const equal_button      = document.querySelector('button.equal')
const reset_button      = document.querySelector('button.reset')
const delete_button     = document.querySelector('button.delete')
const sqrt_button       = document.querySelector('button.sqrt')
const operation_buttons = document.querySelectorAll('#calculator-buttons > button.operation')
const number_buttons    = document.querySelectorAll('#calculator-buttons > button.number')

// ? Variables
let RESULT          = 0
let OPERATION       = ''
let LAST_NUM        = undefined
let SELECT_OP       = false
let SELECT_LAST_NUM = false

//
// * Verificar e insertar valores en pantalla
const input = (char) => {
  /**
   * @param { string } char valor para agregar a pantalla
   */
  SELECT_LAST_NUM = true
  
  if(!SELECT_OP) {
    const new_value = input_calculator.value + char
    
    if(Number(new_value) > 0) input_calculator.value = new_value.replace(/^0+/, '')
    else input_calculator.value = new_value
  }else {
    SELECT_OP = !SELECT_OP
    input_calculator.value = char
  }
  input_calculator.value = input_calculator.value.slice(0, 25)
}

//
// * Reinicia valores de la calculadora
const reset = () => {
  RESULT                 = 0
  OPERATION              = ''
  LAST_NUM               = undefined
  SELECT_OP              = false
  SELECT_LAST_NUM        = false
  input_calculator.value = '0'
  Array(...operation_buttons).forEach(op => op.classList.remove('active'))
}

//
// * Elimina un (carácter|numero) de forma valida
const remove = () => {
  SELECT_LAST_NUM = true
  OPERATION       = ''
  SELECT_OP       = false
  LAST_NUM        = undefined
  Array(...operation_buttons).forEach(op => op.classList.remove('active'))

  if(input_calculator.value.length <= 1) { input_calculator.value = '0' }
  else input_calculator.value = input_calculator.value.slice(0, input_calculator.value.length-1)
}

//
// * Selecciona siguiente operación
const operate = (op) => {
  /**
   * @param { string } op operación a realizar
   */
  if(OPERATION.length > 0) equal()

  OPERATION = op
  SELECT_OP = true
  
  SELECT_LAST_NUM = true
  RESULT = Number(input_calculator.value)
}

//
// * Realiza las operaciones
const equal = () => {
  if(SELECT_LAST_NUM) {
    LAST_NUM = Number(input_calculator.value)
    SELECT_LAST_NUM = !SELECT_LAST_NUM
  }

  switch(OPERATION) {
    case '+':
      RESULT += LAST_NUM
      input_calculator.value = RESULT
      break
    case '-':
      RESULT -= LAST_NUM
      input_calculator.value = RESULT
      break
    case '*':
      RESULT *= LAST_NUM
      input_calculator.value = RESULT
      break
    case '/':
      RESULT /= LAST_NUM
      input_calculator.value = RESULT
      break
    case '%':
      RESULT %= LAST_NUM
      input_calculator.value = RESULT
      break
    default:
      console.log('[-] no hay operaciones activas')
      break
  }
}

// * Asignación de eventos
equal_button.onclick  = (e) => {equal();e.target.blur()} 
reset_button.onclick  = (e) => {reset();e.target.blur()}
delete_button.onclick = (e) => {remove();e.target.blur()}

sqrt_button.onclick = (e) => {
  SELECT_LAST_NUM = true
  OPERATION       = ''
  SELECT_OP       = false
  LAST_NUM        = undefined
  RESULT = Math.sqrt(Number(input_calculator.value))
  input_calculator.value = RESULT
  e.target.blur()
}

Array(...number_buttons).forEach(entry => {
  entry.onclick = (e) => {
    input(entry.innerHTML)
    e.target.blur()
  }
})

Array(...operation_buttons).forEach(operation => {
  operation.onclick = (e) => {
    operate(operation.innerHTML)
    Array(...operation_buttons).forEach(op => op.classList.remove('active'))
    operation.classList.add('active')
    e.target.blur()
  }
})

form_calculator.onsubmit = (e) => {
  e.preventDefault()
}

/*
AC | √ | % | /
 7 | 8 | 9 | *
 4 | 5 | 6 | -
 1 | 2 | 3 | +
 0 | . | < | =
 */

// * Eventos de teclado
window.addEventListener('keyup', (e) => {
  console.log(e)
  switch(e.key) {
    case '0':
      input('0')
      break
    case '1':
      input('1')
      break
    case '2':
      input('2')
      break
    case '3':
      input('3')
      break
    case '4':
      input('4')
      break
    case '5':
      input('5')
      break
    case '6':
      input('6')
      break
    case '7':
      input('7')
      break
    case '8':
      input('8')
      break
    case '9':
      input('9')
      break
    case '.':
      input('.')
      break
    case '+':
      operate('+')
      break
    case '-':
      operate('-')
      break
    case '*':
      operate('*')
      break
    case '/':
      operate('/')
      break
    case '%':
      operate('%')
      break
    case 'Enter':
      equal()
      break
    case 'Escape':
      reset()
      break
    case 'Backspace':
      remove()
      break
    default:
      break
  }
})