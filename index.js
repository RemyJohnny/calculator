let num1 = '';
let num2 ='';
let operator = '';
let previousNum2 = '';
let roundAns = '';
// function to add two numbers
function add (a,b) {
return parseFloat(a) + parseFloat(b);
}
//function to minus
function minus (a,b) {
return parseFloat(a) - parseFloat(b);
}
//funtion to multiply two numbers
function times (a,b) {
    return parseFloat(a) * parseFloat(b);
}
//function to divde two number
function divide (a,b) {
    if (b === 0){
      return  "SyntaxError"
      }
    return parseFloat(a) / parseFloat(b);
}
function percentage (num1) {
let answer = parseFloat(num1) / 100;
return answer;
}

// functon to do the calculation by searching for the operator and calling the function of operator
function operate (num1,operator,num2) {
    if (operator === "+") {
      return add(num1,num2);
    }

    else if (operator === "-") {
      return minus(num1,num2);
    }

    else if (operator === 'x'){
      return times(num1,num2);
    }

    else if (operator === '/'){
      return divide(num1,num2);
    }
    else if (operator == "%"){
      return percentage(num1)
    }
}
//funtion to set input to num1
 function setNum1 (input){
 
   num1 += parseFloat(input);
   answerDiv.textContent += input;
   recorddiv.textContent += input;
   return num1; 
 }
 // function to set input to num2
 function setNum2 (input){
  num2 += parseFloat(input);
  answerDiv.textContent = num2;
  recorddiv.textContent += input;
  previousNum2 = num2;
  return num2;
 }
 // funtion to check for infinity
 function checkInfinity (num){
  if (num === Infinity){
    num = 'error'
    
    console.log(num);
  }
  else {
    console.log("i'm not infinity")
  }
  return num;
 }
 
//all keys
const keys = document.querySelectorAll('.btn');
//answer screen
const answerDiv = document.querySelector('.answerDiv');
// = button
const  equalsKey = document.querySelector('#equalsSign');
// % button
const percentbtn = document.querySelector(".percentage-key");
//calculation record seen at the top of calculator screen
const recorddiv = document.querySelector(".recordDiv");
// AC button
const ACbtn = document.querySelector('.AC-key');
// CE button
const backspace = document.querySelector('.backspace-key');

keys.forEach( key => {
  key.addEventListener('click' ,function () {
    const op = document.querySelectorAll('.click')
    // loop to remove click class that causes the operator button to white bg
    op.forEach(ops => {
      ops.classList.remove('click');
    })
    //for numbers
    if(Number.isInteger(parseFloat(key.textContent))){
      key.classList.add('blink');
      if(operator === ''){
        setNum1(parseInt(key.textContent));
        console.log(num1);
      }
      
      else if (num1 !== '' && operator !== ''){
        setNum2(key.textContent);
        console.log(num2);
      }
   
    }
    // for dot
    else if (!Number.isInteger(parseFloat(key.textContent)) && key.textContent === '.'){
      key.classList.add('blink');
      if(num1 === ''){
        let newinput = num1.toString();
        if (newinput.includes('.')){
          return
        } 
        num1 = 0
      num1 += key.textContent;
      answerDiv.textContent += num1 ;
      recorddiv.textContent += num1;
      console.log(num1);
      
      }
      else if(operator === ''){ 
        let newinput = num1.toString();
      if (newinput.includes('.')){
        return
      } 
        num1 += key.textContent;
        answerDiv.textContent += key.textContent ;
        recorddiv.textContent += key.textContent;
        console.log(num1);
      } 
      else if (num1 !== '' && operator !== '' && num2 === ''){
        let newinput = num2.toString();
        if (newinput.includes('.')){
          return
        } 
        num2 = 0;
        num2 += key.textContent;
        answerDiv.textContent = num2;
        recorddiv.textContent += num2;
        previousNum2 = num2;
        console.log(num2);
      }
      else if (num1 !== '' && operator !== ''){
        let newinput = num2.toString();
        if (newinput.includes('.')){
          return
        } 
        num2 = key.textContent;
        answerDiv.textContent += key.textContent ;
        recorddiv.textContent += key.textContent;
        console.log(num2);;
      }
    }
    //for operator
      else {
        key.classList.add('click');
        if (num1 ===''){
          return;
        }


        //for multiple operation
      if (num1 !== '' && operator !== '' && num2 !== ''){
        let answer = operate(num1,operator,num2)
        roundAns = Math.round(answer * 100)/100; 
        answerDiv.textContent = checkInfinity(roundAns);
        num1 = roundAns;
        operator = key.textContent;
        recorddiv.textContent += ` ${operator} `;
        num2 = '';
        
      }
      else if (num1 !== ''){
        operator = key.textContent;
      //answerDiv.textContent = "";
      recorddiv.textContent += ` ${operator} `;
      console.log(operator)
      }       
      else if (num1 !== '' && operator !== '' && previousNum2 !== ''){
        operator = key.textContent;
        recorddiv.textContent = `${roundAns} ${operator} `;
        console.log(operator)
      }
      else if (num1 !== '' && operator !== '' && num2 === ''){
        return         
      }

      
     
    }
      

    })
    
  })
// event to remove the class blink so that the button blink onclick
keys.forEach(key => {
  key.addEventListener('transitionend',function (){
    key.classList.remove('blink');
   
   
  })
})
// event for = button to call the operate function according to users input
equalsKey.addEventListener('click', function (){
  equalsKey.classList.add('blink');
  // check if num1, num2 and operator is given
  if (num1 !== '' && operator !=='' && num2 !== ''){
  let answer = operate(num1,operator,num2)
  roundAns = Math.round(answer * 100)/100
  answerDiv.textContent = checkInfinity(roundAns);
  console.log(roundAns);
  num1 = roundAns;
  // i made num 2 empty for next input (for complex calculation)
  num2 = '';
  }
  // check if equalsign is clicked more than once after previous calculation that means our num2 will be stored in previousnum2
  // in this case we use previousnum2 in place of num2
  else if ( num1 !== '' && operator !=='' && num2 === ''&& previousNum2 !== ''){
    let answer = operate(num1,operator,previousNum2)
    roundAns = Math.round(answer * 100)/100
    answerDiv.textContent = checkInfinity(roundAns);
    recorddiv.textContent = ` ${num1} ${operator} ${previousNum2}`;
    console.log(roundAns);
    num1 = roundAns;
  }// check if equalsign is clicked more than once without previous calculation
  // in this case our previousnum2 is empty so i use num1 in both num1 and num 2
  else if ( num1 !== '' && operator !=='' && num2 === ''&& previousNum2 === ''){
    let answer = operate(num1,operator,num1)
    roundAns = Math.round(answer * 100)/100
    answerDiv.textContent = checkInfinity(roundAns);
    recorddiv.textContent = ` ${num1} ${operator} ${num1}`;
    console.log(roundAns);
    num1 = roundAns;
  }
  
} )
// event to remove the class blink so that the = button blink onclick
equalsKey.addEventListener('transitionend',function (){
  equalsKey.classList.remove('blink');
})
//event % button to call the parcentage function on a given number
percentbtn.addEventListener('click', function () {
  percentbtn.classList.add('blink')
  //check if num1 is given if no the event won't function
  if (num1 === ''){
    return;
  }
  // check it operator and num2 were given before the parcentage buton was clicked
  // if yes call the operate function to calculate then calculate the parcentage of the answer
  if(num1 !=='' && operator !=='' && num2 !== ''){
    let answer = operate(num1,operator,num2)
  roundAns = Math.round(answer * 100)/100
  answerDiv.textContent = percentage(roundAns);
  console.log('percntage' + percentage(roundAns));
  num1 = percentage(roundAns);
  num2 = '';
  }
  else {
  let answer = percentage(num1);
  answerDiv.textContent = answer;
  console.log(percentage(num1));
  num1 = answer;
  num2 = '';
  }
})
// event to remove the class blink so that the % button blink onclick
percentbtn.addEventListener('transitionend',function (){
  percentbtn.classList.remove('blink');
})
//event AC button to wipe every stored data
ACbtn.addEventListener('click', function () {
  const op = document.querySelectorAll('.click')
    // loop to remove click class that causes the operator button to white bg
    op.forEach(ops => {
      ops.classList.remove('click');
    })
  ACbtn.classList.add('blink');
  num1 = '';
  num2 = '';
  operator = '';
  previousNum2 ='';
  answerDiv.textContent = '';
  recorddiv.textContent = '';
})
// event to remove the class blink so that the AC button blink onclick
ACbtn.addEventListener('transitionend',function (){
  ACbtn.classList.remove('blink');
})
//event CE button to delete previous input accordinly
backspace.addEventListener('click', function () {
  const op = document.querySelectorAll('.click')
    // loop to remove click class that causes the operator button to white bg
    op.forEach(ops => {
      ops.classList.remove('click');
    })
  backspace.classList.add('blink');
  if (num1 !== ''&& operator === '' && num2 === ''){
   let answerString = num1.toString();
   let newString = answerString.slice(0,num1.length - 1);
   num1 = newString;
   answerDiv.textContent = newString;
   recorddiv.textContent = newString;
   console.log(num1);
  }
  else if (num1 !== '' && operator !== '' && num2 === ''){
    let answerString = operator.toString();
   let newString = answerString.slice(0,operator.length - 1);
   operator = newString;
   answerDiv.textContent = newString;
   recorddiv.textContent = num1 + ' '+ newString;
   console.log(operator);
  }
  else if (num1 !== '' && operator !== '' && num2 !== ''){
    let answerString = num2.toString();
   let newString = answerString.slice(0,num2.length - 1);
   num2 = newString;
   previousNum2 = newString;
   answerDiv.textContent = newString;
   recorddiv.textContent = num1 + ' '+ operator + ' ' + newString;
   console.log(num2);
  }
 
  

})
// event to remove the class blink so that the CE button blink onclick
backspace.addEventListener('transitionend',function (){
  backspace.classList.remove('blink');
})
