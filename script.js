const targets = document.querySelectorAll('.modal');
const modal = document.querySelector('.bg-modal');


//GET NAME and CHANGE IT

function getBabyName(){
    const babyName = document.getElementById ('baby-name');
    const inputText = document.getElementById('name').value;
    babyName.innerText = inputText === '' 
        ? 'Baby' 
        :  inputText;
}

//DAYS,HS,MIN,SEC
const days =  document.querySelector ('.days')
const hours = document.querySelector ('.hours')
const minutes = document.querySelector ('.minutes')
const seconds = document.querySelector ('.seconds')

var shouldEndCountDown = false;

const updateDifference = () => {

    const inputDate = document.getElementById('date').value;
    const dueDate= new Date(`${inputDate}`);
    return (dueDate.getTime()+24192000000) - new Date().getTime();

}
    
function updateCountdown (){

    const difference = updateDifference();
    shouldEndCountDown = Math.floor(difference) <= 0;


    days.innerHTML = shouldEndCountDown ? '00' : Math.floor(difference/ 1000/60/60/24);
    hours.innerHTML= shouldEndCountDown ? '00' :Math.floor(difference/1000/60/60)%24; 
    minutes.innerHTML= shouldEndCountDown ? '00' : Math.floor(difference/1000/60)%60; 
    seconds.innerHTML= shouldEndCountDown ? '00' : Math.floor(difference/1000)%60; 
}


//CLOSE MODAL AND UPDATE DATA


targets.forEach((target) => {
    target.addEventListener ('click', () => {

    const difference = updateDifference();
    
    if ((Math.floor(difference/ 1000/60/60/24))<= 300) {
        const interval = setInterval (() => {
            if(!shouldEndCountDown) {
                updateCountdown();
            } else {
                clearInterval(interval);
            }
        },1000);
        getBabyName();
        modal.style.display ='none';
    } else {
        const error= document.querySelector('#error')
        error.innerText= "*Please enter a valid date.";
    }
    });
})







