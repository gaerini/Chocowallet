const calendar = document.querySelector('.Calendar');
console.log(calendar);
let position = 0;
var startX, endX;

function handleStartX(e) {
    startX = e.touches[0].pageX;
}

function handleEndX(e) {
    endX = e.changedTouches[0].pageX;

    if ((startX - endX) < -180) {
        prevCalendar();
        console.log(startX);
        console.log(endX);
    }
    else if ((startX - endX) > 180) {
        nextCalendar();
        console.log(startX);
        console.log(endX);
    }
}

calendar.addEventListener('touchstart', handleStartX);

calendar.addEventListener('touchend', handleEndX);


/*const resvTab = document.querySelector('.resv-wrapper');
const exitBtn = document.querySelector('.resv-close');
exitBtn.addEventListener('click', ()=>{resvTab.classList.remove('open');});


// 날짜별로 이벤트 등록용 함수 및 변수
const selDate = []
const dateFunc = ()=>{
    const dates = document.querySelectorAll('.date');
    const year = document.querySelector('.year');
    const month = document.querySelector('.month');
    dates.forEach((i)=>{
        i.addEventListener('click', ()=>{
            if(i.classList.contains('other') || i.classList.contains('selected')){
                dates.forEach((ig)=>{ig.classList.remove('selected');});
                i.classList.remove('selected');
                selDate.length=0;
            }else if(selDate.length > 0){
                dates.forEach((ig)=>{ig.classList.remove('selected');});
                selDate.length=0;
                i.classList.add('selected');
                selDate.push([year.innerHTML, month.innerHTML, i.innerHTML]);
                resvTab.classList.add('open');
            }else{
                i.classList.add('selected');
                selDate.push([year.innerHTML, month.innerHTML, i.innerHTML]);
                resvTab.classList.add('open');
            }
        });
    });
};

// 초기화 함수 
const reset = ()=>{
    selDate.length=0;
    dateFunc();
}

// 로드시 Nav 버튼들 이벤트 등록 및 초기화
window.onload=()=>{
    const navBtn = document.querySelectorAll('.nav-btn');
    navBtn.forEach(inf=>{
        if(inf.classList.contains('go-prev')){
            inf.addEventListener('click', ()=>{prevMonth(); reset();});
        }else if(inf.classList.contains('go-today')){
            inf.addEventListener('click', ()=>{goToday(); reset();});
        }else if(inf.classList.contains('go-next')){
            inf.addEventListener('click', ()=>{nextMonth(); reset();});
        }
    });
    reset();
}*/

//일정 적는 모달 열고 닫는 코드
// const modalBox = document.querySelector(".modalbox")
// const modal = document.querySelector(".modal");
// const openBtn = document.querySelector("tbody");
// const closeBtn = document.querySelector(".close");
// const modalBackground = document.querySelector(".background")

// function openModal() {
//   modalBox.classList.remove("hidden")
// }

// function closeModal() {
//   modalBox.classList.add("hidden");
// }

// openBtn.addEventListener("click", openModal);

// closeBtn.addEventListener("click", closeModal);

// event write Modal open and close
// const modal2 = document.querySelector(".addEventModal");
// const openBtn2 = document.querySelector(".addEvent");
// const closeBtn2 = document.querySelector(".close2");

// function openAddEventModal() {
//   modal2.classList.remove("hidden2");
// }

// function closeAddEventModal() {
//   modal2.classList.add("hidden2");
// }

// openBtn2.addEventListener("click", openAddEventModal);
// closeBtn2.addEventListener("click", closeAddEventModal);