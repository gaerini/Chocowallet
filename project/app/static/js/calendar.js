window.onload = function () {
  buildCalendar();
};
events.forEach(function (idx) {
  idx.start_date = new Date(idx.start_date);
  idx.finish_date = new Date(idx.finish_date);
  //console.log(idx);
}); // 웹 페이지가 로드되면 buildCalendar 실행

let nowMonth = new Date(); // 현재 달을 페이지를 로드한 날의 달로 초기화
let today = new Date(); // 페이지를 로드한 날짜를 저장
today.setHours(0, 0, 0, 0); // 비교 편의를 위해 today의 시간을 초기화

// 달력 생성 : 해당 달에 맞춰 테이블을 만들고, 날짜를 채워 넣는다.
function buildCalendar() {
  let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1); // 이번달 1일
  let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0); // 이번달 마지막날

  let tbody_Calendar = document.querySelector(".Calendar > tbody");
  document.getElementById("calYear").innerText = nowMonth.getFullYear(); // 연도 숫자 갱신
  document.getElementById("calMonth").innerText = leftPad(
    nowMonth.getMonth() + 1
  ); // 월 숫자 갱신

  //현재 달력 연 월 정보
  const month = nowMonth.getMonth();
  //console.log(month);
  const year = nowMonth.getFullYear();
  //console.log(year);
  const lastDayOfMonth = lastDate.getDay();
  //console.log(lastDayOfMonth);
  //console.log(lastDate);

  //현재 연 월 해당하는 이벤트만 넣기
  const currentMonth = [];
  if (events.length != 0) {
    for (let j = 0; j < events.length; j++) {
      //console.log(events[j]['start_date'].getMonth());
      //console.log(events[j]['finish_date'].getMonth());
      if (
        (events[j]["start_date"].getMonth() === month ||
          events[j]["finish_date"].getMonth() === month) &&
        events[j]["start_date"].getFullYear() == year
      ) {
        //console.log(events[j]);
        currentMonth.push(events[j]);
      }
    }
  }

  while (tbody_Calendar.rows.length > 0) {
    // 이전 출력결과가 남아있는 경우 초기화
    tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
  }

  let nowRow = tbody_Calendar.insertRow(); // 첫번째 행 추가

  for (let j = 0; j < firstDate.getDay(); j++) {
    // 이번달 1일의 요일만큼
    let nowColumn = nowRow.insertCell(); // 열 추가
  }

  for (
    let nowDay = firstDate;
    nowDay <= lastDate;
    nowDay.setDate(nowDay.getDate() + 1)
  ) {
    // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복

    let nowColumn = nowRow.insertCell(); // 새 열을 추가하고

    let newDIV = document.createElement("p");
    newDIV.innerHTML = leftPad(nowDay.getDate()); // 추가한 열에 날짜 입력
    nowColumn.appendChild(newDIV);
    if (lastDayOfMonth <= 6 && nowDay.getDate() == lastDate.getDate()) {
      // console.log("go!");
      for (let fillDay = 0; fillDay < 6 - lastDayOfMonth; fillDay++) {
        let newColumn = nowRow.insertCell();
        let newDIV = document.createElement("p"); // 추가한 열에 날짜 입력
        nowColumn.appendChild(newDIV);
      }
    }
    if (currentMonth.length > 0) {
      for (let k = 0; k < currentMonth.length; k++) {
        if (currentMonth[k].start_date == currentMonth[k].finish_date) {
          if (currentMonth[k].start_date.getDate() == nowDay.getDate()) {
            let newEvent = document.createElement("p");
            newEvent.innerHTML = currentMonth[k].detail;
            newEvent.style.backgroundColor =
              currentMonth[k].category.toUpperCase();
            nowColumn.appendChild(newEvent);
          }
        } else if (
          currentMonth[k].start_date != currentMonth[k].finish_date &&
          currentMonth[k].finish_date.getMonth() == month
        ) {
          for (
            let m = new Date(currentMonth[k].start_date);
            m <= currentMonth[k].finish_date;
            m.setDate(m.getDate() + 1)
          ) {
            if (m.getDate() == nowDay.getDate()) {
              let newEvent = document.createElement("p");
              newEvent.innerHTML = currentMonth[k].detail;
              newEvent.style.backgroundColor =
                currentMonth[k].category.toUpperCase();
              nowColumn.appendChild(newEvent);
            }
          }
        } else if (
          currentMonth[k].start_date != currentMonth[k].finish_date &&
          currentMonth[k].finish_date.getMonth() != month
        ) {
          for (
            let m = new Date(currentMonth[k].start_date);
            m.getMonth() <= month;
            m.setDate(m.getDate() + 1)
          ) {
            if (m.getDate() == nowDay.getDate()) {
              let newEvent = document.createElement("p");
              newEvent.innerHTML = currentMonth[k].detail;
              newEvent.style.backgroundColor =
                currentMonth[k].category.toUpperCase();
              nowColumn.appendChild(newEvent);
            }
          }
        } else if (
          currentMonth[k].start_date != currentMonth[k].finish_date &&
          currentMonth[k].start_date.getMonth() != month
        ) {
          for (
            let m = new Date(currentMonth[k].finish_date);
            m.getMonth() >= month;
            m.setDate(m.getDate() - 1)
          ) {
            if (m.getDate() == nowDay.getDate()) {
              let newEvent = document.createElement("p");
              newEvent.innerHTML = currentMonth[k].detail;
              newEvent.style.backgroundColor =
                currentMonth[k].category.toUpperCase();
              nowColumn.appendChild(newEvent);
            }
          }
        }
      }
    }
    const modal_Month = nowDay.getMonth();
    const modal_Date = nowDay.getDate();
    const modalDate = document.querySelector(".modal-date");
    if (nowDay.getDay() == 6) {
      // 토요일인 경우
      nowRow = tbody_Calendar.insertRow(); // 새로운 행 추가
    }

    if (nowDay < today) {
      // 지난날인 경우
      newDIV.className = "pastDay";
      newDIV.onclick = function () {
        modalDate.innerHTML = `${year}-${modal_Month + 1}-${modal_Date}`;
        modalBox.classList.remove("hidden");
      };
    } else if (
      nowDay.getFullYear() == today.getFullYear() &&
      nowDay.getMonth() == today.getMonth() &&
      nowDay.getDate() == today.getDate()
    ) {
      // 오늘인 경우
      newDIV.className = "today";
      //newDIV.onclick = function () { choiceDate(this); }
      newDIV.onclick = function () {
        modalDate.innerHTML = `${year}-${modal_Month + 1}-${modal_Date}`;
        modalBox.classList.remove("hidden");
      };
      //console.log(nowDay);
    } else {
      // 미래인 경우
      newDIV.className = "futureDay";
      //newDIV.onclick = function () { choiceDate(this); }
      newDIV.onclick = function () {
        modalDate.innerHTML = `${year}-${modal_Month + 1}-${modal_Date}`;
        modalBox.classList.remove("hidden");
      };
    }
  }
  const makeSum = costSum();
  const makeRealSum = costRealSum();
  const makeRatio = costRatio();
}

// 날짜 선택
function choiceDate(newDIV) {
  if (document.getElementsByClassName("choiceDay")[0]) {
    // 기존에 선택한 날짜가 있으면
    document
      .getElementsByClassName("choiceDay")[0]
      .classList.remove("choiceDay"); // 해당 날짜의 "choiceDay" class 제거
  }
  newDIV.classList.add("choiceDay"); // 선택된 날짜에 "choiceDay" class 추가
}

// 이전달 버튼 클릭
function prevCalendar() {
  nowMonth = new Date(
    nowMonth.getFullYear(),
    nowMonth.getMonth() - 1,
    nowMonth.getDate()
  ); // 현재 달을 1 감소
  buildCalendar(); // 달력 다시 생성
}
// 다음달 버튼 클릭
const emc = document.querySelector(".event_modal_content");
function nextCalendar() {
  nowMonth = new Date(
    nowMonth.getFullYear(),
    nowMonth.getMonth() + 1,
    nowMonth.getDate()
  ); // 현재 달을 1 증가
  buildCalendar(); // 달력 다시 생성
  emc.innerHTML = "";
}

// input값이 한자리 숫자인 경우 앞에 '0' 붙혀주는 함수
function leftPad(value) {
  if (value < 10) {
    value = "0" + value;
    return value;
  }
  return value;
}

var saveMonth;
var saveDate;

var sum = 0;
var realsum = 0;
const monthSpan = document.querySelector("#calMonth");

function costSum() {
  sum = 0;
  events.forEach(function (obj) {
    const month = Number(monthSpan.innerText);
    const eventDate = new Date(obj.finish_date);
    //console.log(eventDate.getMonth());
    //헷갈려서 콘솔로그 주석처리했음
    if (month == eventDate.getMonth() + 1) {
      sum = sum + obj.cost;
    }
  });

  const expectedCost = document.querySelector("#expected_cost");

  expectedCost.innerText = sum.toLocaleString() + "원";
}

function costRealSum() {
  realsum = 0;
  realspends.forEach(function (i) {
    const mon = Number(monthSpan.innerText);
    const spenddate = i.date.substring(4, 6);
    const spendDate = Number(spenddate);

    if (mon == spendDate) {
      realsum = realsum + i.spend;
    }
  });

  const realCost = document.querySelector("#spent_cost");

  realCost.innerText = realsum.toLocaleString() + "원";
}

function costRatio() {
  const ratio = sum !== 0 ? (realsum / sum) * 100 : 0;
  if (ratio > 100) {
    ratio = 100;
  }

  const progressPercentElement = document.querySelector(".progresspercent");
  progressPercentElement.style.width = `${ratio}%`;
}
