class Calculator{
    constructor(prevTextElement, currentTextElement){
        this.prevTextElement=prevTextElement
        this.currentTextElement=currentTextElement
        this.clear()
    }

    clear(){

        this.current=''
        this.previous=''
        this.operator=undefined


    }
    delete(){
        this.current = this.current.toString().slice(0, -1)
        
    }

    appendNumber(number){

        if(number=='.' && this.current.includes('.'))  return

        this.current= this.current.toString() + number.toString()
        
        
    }

    chooseOperation(operator){

        if(this.current==='') return 
        if(this.previous!==''){
            this.compute()
        }
        this.operator=operator
        this.previous=this.current
        this.current=''
        
    }

    compute(){
        let result
        const prevop=parseFloat(this.previous)
        const currentop= parseFloat(this.current)
        if (isNaN(prevop) || isNaN(currentop)) return
        switch (this.operator) {
        case '+':
        result = prevop + currentop
        break
      case '-':
        result = prevop - currentop
        break
      case '*':
        result = prevop * currentop
        break
      case '÷':
        result = prevop / currentop
        break
      default:
        return
    }

    this.current = result
    this.operator = undefined
    this.previous = ''
        
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }
    
    updateDisplay(){

        this.currentTextElement.innerText= this.getDisplayNumber(this.current)
        this.prevTextElement.innerText=this.previous

        if (this.operator != null) {
            this.prevTextElement.innerText =
              `${this.getDisplayNumber(this.previous)} ${this.operator}`
          } else {
            this.prevTextElement.innerText = ''
          }
        
    }
}



const numberButtons= document.querySelectorAll('[data-number]')
const operatorButtons= document.querySelectorAll('[data-operator]')
const del= document.querySelector('[data-delete]')
const delAll= document.querySelector('[data-delete-all]')
const equals= document.querySelector('[data-equals]')
const prevTextElement= document.querySelector('[data-prev]')
const currentTextElement=document.querySelector('[data-current]')

const calculator= new Calculator(prevTextElement,currentTextElement)


numberButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operatorButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equals.addEventListener('click', button=>{
    calculator.compute()
    calculator.updateDisplay()
})

delAll.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
  })
  
del.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
  })

