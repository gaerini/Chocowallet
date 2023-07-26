// 일정 보여주는 모달 없애기, 내용 비우기
const e_m_c = document.querySelector(".event_modal_content"); //모달 내용 비우기
const s_r_s = document.querySelector(".show_real_spend");

function closeModal() {
  e_m_c.innerHTML = "";
  s_r_s.innerHTML = "";

  modalBox.classList.add("hidden");
  spendForm.classList.remove("hidden4");

  window.localStorage.removeItem("modal");
  window.localStorage.removeItem("modalDay");
}

closeBtn.addEventListener("click", closeModal);

const date = document.querySelector(".choiceDay");

//모달 창 열면 그날에 해당하는 이벤트(+예상 지출 금액)만 보여주기!!!!!!!!
const tbody_ = document.querySelector(".tt");
const go_back = document.querySelector(".go_back");
const spendForm = document.querySelector(".spend_form");

tbody_.addEventListener("click", showEvent);
// go_back.addEventListener("click", showEvent);

//일정 추가하기 모달
const modal2 = document.querySelector(".addEventModal");
// const openBtn2_ = document.querySelector(".addEventBtn1");
// const openBtn2_1 = document.querySelector(".addEventBtn2");
const closeBtn2 = document.querySelector(".close2");
const modalbox = document.querySelector(".modalbox");

function closeAddEventModal() {
  modal2.classList.add("hidden2");
  modalbox.classList.remove("hidden");
}

// openBtn2_.addEventListener("click", () => {
//   modal2.classList.remove("hidden2");
// });

// openBtn2_1.addEventListener("click", () => {
//   //모달열기
//   modal2.classList.remove("hidden2");
//   //시작 날짜, 끝날짜에 오늘 날짜 들어가게하기
//   const _date = new Date();
//   const year__ = _date.getFullYear();
//   const month__ = _date.getMonth() + 1;
//   const date__ = _date.getDate();

//   const yy_mm_dd =
//     year__ +
//     "-" +
//     ("00" + month__.toString()).slice(-2) +
//     "-" +
//     ("00" + date__.toString()).slice(-2);

//   document.querySelector("#event_date").value = yy_mm_dd;
//   document.querySelector("#event_finish_date").value = yy_mm_dd;
//   console.log(yy_mm_dd);
// });

closeBtn2.addEventListener("click", closeAddEventModal);

// 내용 없이 새 이벤트 입력시 alert창 띄움
const form = document.getElementById("event_form");

form.addEventListener("submit", (event) => {
  const titleInput = document.getElementById("event_title");
  const costInput = document.getElementById("event_cost");

  //할일만 안적은 경우
  if (titleInput.value.trim() === "" && costInput.value.trim() != "") {
    event.preventDefault();

    alert("할 일을 입력해주세요.");
  }

  //예상 지출 금액만 안적은 경우
  if (titleInput.value.trim() != "" && costInput.value.trim() === "") {
    event.preventDefault();

    alert("예상 지출 금액을 입력해주세요");
  }

  //둘 다 안적은 경우
  if (titleInput.value.trim() === "" && costInput.value.trim() === "") {
    event.preventDefault();

    alert("할 일과 예상 지출 금액을 입력해주세요!");
  }
});

//일정 보기 모달에서 바로 일정 추가하기 위한 버튼
const openBtn3 = document.querySelector(".addEventBtn3");

openBtn3.addEventListener("click", () => {
  modal2.classList.remove("hidden2");

  //모달창에서 추가버튼 눌렀을 때 시작날짜, 끝날짜에 해당 모달 날짜 들어가게하기
  let key_ = window.localStorage.getItem("modal");
  let startAndFinishDate = key_.split("-");

  const yearkey = startAndFinishDate[0];
  const monthkey = startAndFinishDate[1].padStart(2, "0");
  const datekey = startAndFinishDate[2].padStart(2, "0");
  let y_m_dkey = `${yearkey}-${monthkey}-${datekey}`;

  document.querySelector("#event_date").value = y_m_dkey;
  document.querySelector("#event_finish_date").value = y_m_dkey;

  modalbox.classList.add("hidden");
});

//내용 없이 금액 추가시 alert창 띄움
const spend_form = document.querySelector(".spend_form");

spend_form.addEventListener("submit", (event) => {
  const spendmoney = document.getElementById("real_spend");

  if (spendmoney.value.trim() === "") {
    event.preventDefault();

    alert("이날 실제로 지출한 금액을 입력해주세요!");
  }
});
