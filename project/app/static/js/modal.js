//모달 여닫기
const e_m_c = document.querySelector(".event_modal_content"); //모달 내용 비우기
const s_r_s = document.querySelector(".show_real_spend");
function closeModal() {
  modalBox.classList.add("hidden");
  e_m_c.innerHTML = '';
  s_r_s.innerHTML = '';
  spendForm.classList.remove("hidden4");
}

closeBtn.addEventListener("click", closeModal);

//모달 내부
function openAddEventModal() {
  modal2.classList.remove("hidden2");
}

function closeAddEventModal() {
  modal2.classList.add("hidden2");
}

openBtn2.addEventListener("click", openAddEventModal);
closeBtn2.addEventListener("click", closeAddEventModal);
//요까지

const date = document.querySelector(".choiceDay");
const submitEvent = document.querySelector(".close2");

    //모달 창 열면 그날에 해당하는 이벤트(+예상 지출 금액)만 보여주기!!!!!!!!
const tbody_ = document.querySelector(".tt");
const spendForm = document.querySelector(".spend_form");
            


tbody_.addEventListener("click", showEvent);

//실제 지출액 칸 누르면 date_spend 에 저절로 날짜 값이 들어가게 (finish_date == list)
const realSpend = document.querySelector("#real_spend");

function fillDate() {
    const date_for_choice = document.querySelector(".modal-date").innerText; //"modal-date" div의 innertext를 가져옴
    const date_ = date_for_choice.split('-');

    const spendYear = date_[0];
    const spendMonth = date_[1].padStart(2, '0');
    const spendDate = date_[2].padStart(2, '0');
    const spend_date = spendYear+spendMonth+spendDate;

    const spendDateInputBox = document.querySelector("#date_spend");
    spendDateInputBox.value = spend_date;
}

realSpend.addEventListener("click", fillDate)    

//모달에서 이벤트 누르면 수정할 수 있게 하는 코드 (p태그의 클래스 = event의 pk값)
const todoEvent = document.querySelector(".todoEvent");

function edit() {
    for (let i = 1; i < events.length; i++) {
        let updateEventPk = getElementsByClassName("{{i}}");
    }
}

//todoEvent.addEventListener("click",edit);