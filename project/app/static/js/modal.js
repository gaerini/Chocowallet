// 일정 보여주는 모달 없애기, 내용 비우기
const e_m_c = document.querySelector(".event_modal_content"); //모달 내용 비우기
const s_r_s = document.querySelector(".show_real_spend");

function closeModal() {
  modalBox.classList.add("hidden");
  e_m_c.innerHTML = "";
  s_r_s.innerHTML = "";
  spendForm.classList.remove("hidden4");
}

closeBtn.addEventListener("click", closeModal);

const date = document.querySelector(".choiceDay");

//모달 창 열면 그날에 해당하는 이벤트(+예상 지출 금액)만 보여주기!!!!!!!!
const tbody_ = document.querySelector(".tt");
const spendForm = document.querySelector(".spend_form");

tbody_.addEventListener("click", showEvent);

//일정 추가하기 모달
const modal2 = document.querySelector(".addEventModal");
const openBtn2_ = document.querySelector(".addEventBtn1");
const openBtn2_1 = document.querySelector(".addEventBtn2");
const closeBtn2 = document.querySelector(".close2");

function closeAddEventModal() {
  modal2.classList.add("hidden2");
}

openBtn2_.addEventListener("click", () => {
  modal2.classList.remove("hidden2");
});

openBtn2_1.addEventListener("click", () => {
  //모달열기
  modal2.classList.remove("hidden2");
  //시작 날짜, 끝날짜에 오늘 날짜 들어가게하기
  const _date = new Date();
  const year__ = _date.getFullYear();
  const month__ = _date.getMonth() + 1;
  const date__ = _date.getDate();

  const yy_mm_dd =
    year__ +
    "-" +
    ("00" + month__.toString()).slice(-2) +
    "-" +
    ("00" + date__.toString()).slice(-2);

  document.querySelector("#event_date").value = yy_mm_dd;
  document.querySelector("#event_finish_date").value = yy_mm_dd;
  console.log(yy_mm_dd);
});

closeBtn2.addEventListener("click", closeAddEventModal);