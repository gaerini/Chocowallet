//일정 보여주는 모달 없애기, 내용 비우기
const e_m_c = document.querySelector(".event_modal_content"); //모달 내용 비우기
const s_r_s = document.querySelector(".show_real_spend");
function closeModal() {
  modalBox.classList.add("hidden");
  e_m_c.innerHTML = "";
  s_r_s.innerHTML = "";
  spendForm.classList.remove("hidden4");
}

closeBtn.addEventListener("click", closeModal);

//일정 추가하기 모달
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
  const date_ = date_for_choice.split("-");

  const spendYear = date_[0];
  const spendMonth = date_[1].padStart(2, "0");
  const spendDate = date_[2].padStart(2, "0");
  const spend_date = spendYear + spendMonth + spendDate;

  const spendDateInputBox = document.querySelector("#date_spend");
  spendDateInputBox.value = spend_date;
}

realSpend.addEventListener("click", fillDate);

//이벤트 수정 모달에서 내용, 금액 칸에 원래 value 들어가게 하기
/*const editTrigger = document.querySelector(".event_modal_content");
const eventEditModal_ = document.querySelector(".eventEditModal");

function eventEditModalValue() {
  const todoEvent = document.querySelector(".todoEvent").innerText.split("\n");
  console.log(todoEvent[0]);
  document.querySelector("#event_content_update").value = todoEvent[0];
  document.querySelector("#event_cost_update").value =
    todoEvent[2].substring(10);

  eventEditModal_.classList.remove("hidden5");
}
editTrigger.addEventListener("click", eventEditModalValue);*/

//이벤트 ''수정'' 모달 닫기!
const closeBtn3 = document.querySelector(".close3"); //이벤트 수정 모달 닫는 버튼
closeBtn3.addEventListener("click", () => {
  eventEditModal_.classList.add("hidden5");
});
