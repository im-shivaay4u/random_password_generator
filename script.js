const inputslider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const uppercaseCheck=document.querySelector("#uppercase")
const lowercaseCheck=document.querySelector("#lowercase")
const numbersCheck=document.querySelector("#numbers")
const symmbolsCheck=document.querySelector("#symbols")
const indicator=document.querySelector("[data-indicator]")
const generateBtn=document.querySelector(".generateButton")
const allCheckBox=document.querySelectorAll("input[type=checkbox]")


let password="";
let passwordLength=10;
let checkCount=0;
handleSlider();
//set strength color to grey
setIndicator("#ccc")
const min=inputslider.min;
const max=inputslider.max;
inputslider.backgroundSize=((passwordLength-min)*100/(max-min))

//set password length 
function handleSlider(){  //handle slider show the password length on UI
    inputslider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;
    const min=inputslider.min;
const max=inputslider.max;
inputslider.style.backgroundSize=((passwordLength-min)*100/(max-min))+"% 100%"

}

//set the indicator
function setIndicator(color){
    indicator.style.backgroundColor=color;
    //shadow;
    indicator.style.boxShadow=`0px 0px 12px 1px ${color} `
}
//get the random number
function getRandomInteger(min,max){
       return Math.floor( Math.random() *(max-min))+min;
}
// generate the random number
function generateRandomNumber(){
    return getRandomInteger(0,9);
}

function generateLowercase(){
            return String.fromCharCode(getRandomInteger(97,123));
}
function generateUppercase(){
    return String.fromCharCode(getRandomInteger(65,91));
}
const symbols='`~!@#$%^&*()_-+={}[]|\:;<>,.?/';
function generateSymbols(){
    const randNum=getRandomInteger(0,symbols.length);
    return symbols.charAt(randNum);
}

//calculate Strength
function calcStrength(){
     let hasUpper=false;
     let haslower=false;
     let hasNum=false;
     let hasSym=false;
     if(uppercaseCheck.checked) hasUpper=true;
     if(lowercaseCheck.checked) haslower=true;
     if(numbersCheck.checked) hasNum=true;
     if(symmbolsCheck.checked) hasSym=true;
     

     if(hasUpper&&haslower&&(hasNum||hasSym)&&passwordLength>=8){
        setIndicator("#0f0");
     }
        else if(
            (haslower||hasUpper)&&
            (hasNum||hasSym)&&
            passwordLength>=6
        ){
               setIndicator("#ff0");
        }
        else{
            setIndicator("#f00")
        }
     
}


///copy contact

async function copyContent(){
        try{
            await navigator.clipboard.writeText(passwordDisplay.value)
            copyMsg.innerText="copied";
        }
        catch(e){
            copyMsg.innerText="";
        }
        copyMsg.classList.add("active");
        setTimeout(() => {
            copyMsg.classList.remove("active")
        }, 2000);
}



//special case


function shufflepassword(array){
    //fisher yates method
    for(let i=array.length-1;i>  0;i--){
        const j=Math.floor(Math.random()*(i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=>(str+=el));
    return str;


}



function handlecheckboxChange(){
    checkCount=0;
    allCheckBox.forEach( (checkbox)=>{
        if(checkbox.checked)
            checkCount++;
    });
}
if(passwordLength<checkCount){
    passwordLength=checkCount;
    handleSlider();
}

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlecheckboxChange);
})



// allCheckBox.forEach('input',(e)=>{
//        passwordLength=e.target.value;
//        handleSlider();
// })

//generate password

inputslider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider(); 
})


copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
        copyContent();
})
generateBtn.addEventListener('click',()=>{
    //none of the checked box in clicked
    if(checkCount<=0) return;
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
    
    //remove the old password
    password="";
    //lets put the stuff mentioned by checkbox
    // if(uppercaseCheck.checked){
    //     password +=generateUppercase();
    // }
    // if(lowercaseCheck.checked){
    //     password+=generateLowercase();
    // }
    // if(numbersCheck.checked){
    //     password+=generateRandomNumber();
    // }
    // if(symmbolsCheck.checked){
    //     password+=generateSymbols(); 
    // }

    let funcArr=[];
    if(uppercaseCheck.checked){
        funcArr.push(generateUppercase);
    }
    if(lowercaseCheck.checked){
        funcArr.push(generateLowercase);
    }
    
    if(numbersCheck.checked){
        funcArr.push(generateRandomNumber);
    }
    if(symmbolsCheck.checked){
        funcArr.push(generateSymbols);
    }
    //cumpulsory addition
    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }
    //remaining additon
    for(let i=0;i<passwordLength-funcArr.length;i++){
        let randIndex=getRandomInteger(0,funcArr.length);
         password+=funcArr[randIndex](); 
    }

    //shuffle the password
    password=shufflepassword(Array.from(password));
    //show the  ui
    passwordDisplay.value=password;
//calculate the strength
 calcStrength();
})
console.log("everyone loves shiva")