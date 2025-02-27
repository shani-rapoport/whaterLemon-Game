//משתנים גלובליים

const fruit = document.querySelector('.fruit');
var lemon = document.getElementsByClassName('watermelon')[0];
var kernels = document.getElementsByTagName('i');
var drip = document.getElementsByClassName('drip')[0];
const cup = document.querySelector('svg');
var display = document.querySelector('#timer');
var timeClock;
var circle;
var cups = 0;
var drips = 0;

//מערך צבעי רקעים
const background = ["#bdd7ee", "#ffdfba", "#baffc9", "#ffb3ba", "#FFCCFF"]


//פונקציה שפועלת בטעינת הדף
window.onload = function play() {

    //הכניסה של הכוס מימין
    const slideAnimation = document.createElement('style');
    slideAnimation.nodeType = 'text/css';
    slideAnimation.innerHTML = `@keyframes slide {
      from { left: 50vw; }
      to { left: 0; }
    }`;
    document.head.appendChild(slideAnimation);

    //מילוי הכוס הראשונה
    filling_a_glass();
}



//מילוי הכוס - המשחק
function filling_a_glass() {

    //איפוס מספר הטיפות עד כה
    drips = 0;

    //הדפסה מיידית של הטיימר החדש
    display.textContent = "00:15";

    //ניקוי הטיימר הקודם
    clearInterval(timeClock);

    //הפעלת טיימר חדש
    startTimer();

    //הגרלת סוג הפרי
    if (lottery())
        change_to_lemon();


    //הגרלת צבע רקע    
    document.body.style.backgroundColor = background[Math.floor(Math.random() * 5)];


    //לסובב את הפרי והטיפה
    squeezing();
}


//פונקציה המעדכנת את הטיימר
function startTimer() {
    let timer = 15;
    timeClock = setInterval(function () {
        var seconds = --timer;

        //הצגת הזמן שנותר בטיימר
        seconds = seconds < 10 ? "00:0" + seconds : "00:" + seconds;
        display.textContent = seconds;

        if (timer - 1 < 0) {
            end();
        }
    }, 1000);
}


//פונקציה עבור כל טיפה של הכוס הנוכחית
function squeezing() {

    //אם נותר עוד מקום בכוס
    if (drips < 5) {
        drips++;

        //הגרלת צד רנדומאלית
        var side = lottery();
        if (side == 0)
            side--;


        //הסיבוב של הפרי
        let angle = 0;
        const rotationAmount = side;
        circle = setInterval(() => {
            angle += rotationAmount;
            fruit.style.transform = `rotate(${angle}deg)`;
        }, 10 / (cups + 1)); // 10 milliseconds

        //אירוע לחיצה על הפרי
        fruit.addEventListener('click', stop)
    }

    //למקרה שהכוס מלאה
    else {
        var audio_cup = new Audio('../sounds/cup.mp3');
        audio_cup.play();
        filling_a_glass();
    }
}



function stop() {

    //עוצר את הסיבוב
    clearInterval(circle);

    //למקרה שהטיפה בתוך הכוס
    if ((isInsideCup(drip.getBoundingClientRect().x, drip.getBoundingClientRect().y))) {

        //רעש בלופ של טיפה
        var audio_drip = new Audio('../sounds/poit-94911.mp3');
        audio_drip.play();

        //ממלא את הכוס במיץ
        fill_cup();
        squeezing();
    }

    // למקרה שהטיפה אינה בתוך הכוס - סיום המשחק
    else {
        end();
    }
}

//מחזיר נכון אם הטיפה בתוך הכוס, ופולס אם היא אינה בתוך הכוס
function isInsideCup(x, y) {
    const cupX = cup.getBoundingClientRect().x;
    const cupWidth = cup.getBoundingClientRect().width;
    if (x >= cupX && x <= cupX + cupWidth && y / 100 > 2)
        return true;
    else return false;
}

//פונקציה שממלאה את הכוס במיץ
function fill_cup() {
    var b = document.getElementById('b');
    var box = document.getElementById('box');
    b.attributes[3].value = `${100 - (drips * 18)}`;
    box.attributes[4].value = `${105 - b.attributes[3].value}`;
    b.attributes[6].value = "1s";
    b.attributes[4].value = "0.5s"
    if (drips == 5) {
        cups++;
        //פונקציה שמחזירה לאבטיח
        change_to_watermelon();

    }

}


//פונקציה שמסיימת את המשחק ומפעילה את הסיכום
function end() {
    clearInterval(timeClock);
    if (cups == 0) {
        var text = document.getElementById("words");
        text.innerHTML = ("Oopsy...try again!");
    }
    var message = document.getElementById("message");
    message.style.display = 'block';

    //משנה את מספר הכוסות שבדף הסיכום
    var sum = document.getElementById("cups");
    sum.innerHTML = cups;

    //שיר סיכום
    var audio_summery = new Audio('../sounds/watermelon.mp3');
    audio_summery.play();

    //יסתיר את האלמנטים 
    fruit.style.display = "none";
    cup.style.display = "none";

}

//פונקציה שמשנה את האבטיח ללימון
function change_to_lemon() {
    lemon.childNodes[1].style.borderColor = "#ffda36";
    lemon.childNodes[2].style.borderColor = "#ffff66";
    lemon.childNodes[5].style.borderColor = "#ffffac";
    for (let i = 0; i < 14; i++)
        kernels[i].style.borderColor = "#ccccb3";
    drip.style.backgroundColor = "#ffffac";
    cup.style.fill = "#ffffac";
    cup.style.stroke = "#ffffac"
}

//פונקציה שמחזירה את ערכי הפרי לערכי האבטיח המקוריים
function change_to_watermelon() {
    lemon.childNodes[1].style.borderColor = "#90B73F";
    lemon.childNodes[2].style.borderColor = "#D9E38F";
    lemon.childNodes[5].style.borderColor = "#F1124C";
    for (let i = 0; i < 14; i++)
        kernels[i].style.borderColor = "#252525";
    drip.style.backgroundColor = "#F1124C";
    cup.style.fill = "#F1124C";
    cup.style.stroke = "#F1124C"
    //קודם מרוקן את הכוס
    var b = document.getElementById('b');
    var box = document.getElementById('box');
    box.attributes[4].value = "0";
    b.attributes[3].value = "0";
}

//מחזיר 1 או 0
function lottery() {
    return Math.floor(Math.random() * 2);
}



