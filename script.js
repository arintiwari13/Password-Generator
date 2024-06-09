const inputslider = document.querySelector("[data-slider]");
const lengthdisplay = document.querySelector("[data-length-no]");
const passworddispaly = document.querySelector("[data-passwordDisplay]");
const copymessage = document.querySelector("[datacopy-text]");
const copybutton = document.querySelector("[data-copy-button]");
const Uppercasecheck = document.querySelector("#Uppercase");
const lowercasecheck = document.querySelector("#Lowercase");
const numbercheck =  document.querySelector("#Numbers");
const symbolcheck =  document.querySelector("#Symbols");
const indicator = document.querySelector("[data-indicator]");
const generatebtn = document.querySelector(".generate-button");
const allcheckbox = document.querySelectorAll("input[type = checkbox]");
const symbols = '`~!@#$%^&*()__+{[}]|:;"<,>.?/';

let password = "";
let passwordlength = 10;
let checkcount = 0;
handleslider();
// set indicator
setindicator("white");

// set password length accordingly 
function handleslider(){
    inputslider.value  = passwordlength;
    lengthdisplay.innerText = passwordlength;
}
// slider 
function setindicator (color){
    indicator.style.backgroundColor = color;
}

// generating random number between given values
function getrandint(min, max){
    return Math.floor(Math.random() * (max - min )) + min;
}

function generaterandomnumber (){
    return getrandint(0, 9);
}

function generatelowercase(){
    return String.fromCharCode(getrandint(97,123));
}

function generateupperrcase(){
    return String.fromCharCode(getrandint(65,91));
}

function generaterandomsymbols(){
    const randnum = getrandint(0, symbols.length);
    return symbols.charAt(randnum);
}

// password strenth calculator

function calstrength(){
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (Uppercasecheck.checked) hasUpper = true;
    if (lowercasecheck.checked) hasLower = true;
    if (numbercheck.checked) hasNum = true;
    if (symbolcheck.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordlength >= 8) {
        setindicator("#0f0");
    } else if (
      (hasLower || hasUpper) &&
      (hasNum || hasSym) &&
      passwordlength >= 6
    ) {
        setindicator("#ff0");
    } else {
        setindicator("#f00");
    }
}

async function copycentent(){
    try{
        await  navigator.clipboard.writeText(passworddispaly.value);
        copymessage.innerText = "copied";
    }
    catch(e){
        copymessage.innerText = "failed ";
    }
   // to make copy wala span visible

   copymessage.classList.add("active");

   setTimeout( () => {
        copymessage.classList.remove("active")
   }, 2000);
}

//   event listner for slider

inputslider.addEventListener('input', (e)=> {
    passwordlength = e.target.value;
    handleslider();
})

// event listner for copy button

copybutton.addEventListener('click', () => {
    if(passworddispaly.value)
     copycentent();
})

// shuffling the pasword
function shufflepassword(array){
    // fisher yates method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;

}

console.log('itna chal gya');

function handlecheckboxchange(){
    checkcount = 0;
    allcheckbox.forEach((checkbox) => {
        if(checkbox.checked)
        checkcount++;
    });

    // special condition for length and checkboc 

    if(passwordlength< checkcount){
        passwordlength = checkcount;
        handleslider();
    }
}

allcheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change', handlecheckboxchange)
});

// geerate button operation 

console.log('handle checkbox bhi');

generatebtn.addEventListener('click', () =>{
    
    // none of the checkbox are selected 

        if(checkcount <= 0) return;
        console.log('genret pe enter kiye');
    // special  case

    if(passwordlength< checkcount){
        passwordlength = checkcount;
        handleslider();
    }
    console.log('genret pe enter kiye');
    // let start the journy to find new password

    // remove old password
    password = " ";

    // putting the stuff given by th checkbox user

    // if(Uppercasecheck.checked){
    //     password += generateupperrcase();
    // }

    // if(lowercasecheck.checked){
    //     password += generatelowercase();
    // }

    // if(numbercheck.checked){
    //     password += generaterandomnumber();
    // }

    // if(symbolcheck.checked){
    //     password += generaterandomsymbols();
    // }

    let funcarr = [];

    if(Uppercasecheck.checked){
        funcarr.push(generateupperrcase);
    }

    if(lowercasecheck.checked){
        funcarr.push(generatelowercase);
    }

    if(numbercheck.checked){
        funcarr.push(generaterandomnumber);
    }

    if(symbolcheck.checked){
        funcarr.push(generaterandomsymbols);
    }

    // compulsory additon of data to passsword 
    for(let i = 0; i< funcarr.length; i++ ){
        password += funcarr[i]();
    }
    
    // remaing addittion of characters 

    for(let i = 0; i<passwordlength-funcarr.length; i++){
        let randindx = getrandint(0, funcarr.length);
        password+= funcarr[randindx]();
    }

    // shuffling the password

    password = shufflepassword(Array.from(password));

    // show in UI
    console.log('show password');

    passworddispaly.value = password;
 console.log(' password');
    //calculate strength
    calstrength();


});

