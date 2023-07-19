window.onload = function () {
  buildCalendar();

  //새로고침해도 modal-day에 요일이 들어가있게
  const modalDayKey = window.localStorage.getItem("modalDay");

  if (modalDayKey) {
    document.querySelector(".modal-day").innerText = modalDayKey;
  }
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
  const year = nowMonth.getFullYear();
  const lastDayOfMonth = lastDate.getDay();

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
  console.log(currentMonth);

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

    let newDIV = document.createElement("div");
    newDIV.innerHTML = leftPad(nowDay.getDate()); // 추가한 열에 날짜 입력
    nowColumn.appendChild(newDIV);
    for (let _ = 0; _ < 5; _++) {
      let testEvent = document.createElement("div");
      testEvent.setAttribute("id", _ + nowDay.getDate().toString());

      testEvent.style.height = "1.8vh";
      nowColumn.appendChild(testEvent);
    }

    if (lastDayOfMonth <= 6 && nowDay.getDate() == lastDate.getDate()) {
      console.log("go!");
      for (let fillDay = 0; fillDay < 6 - lastDayOfMonth; fillDay++) {
        let newColumn = nowRow.insertCell();
      }
    }
    const modal_Month = nowDay.getMonth();
    const modal_Date = nowDay.getDate();
    const dayNum = nowDay.getDay();
    const modalDate = document.querySelector(".modal-date");
    const modalDay = document.querySelector(".modal-day");
    if (nowDay.getDay() == 6) {
      // 토요일인 경우
      nowRow = tbody_Calendar.insertRow(); // 새로운 행 추가
    }

    if (nowDay < today) {
      // 지난날인 경우
      newDIV.className = "pastDay";
      newDIV.onclick = function () {
        console.log(nowDay);
        modalDate.innerHTML = `${year}-${modal_Month + 1}-${modal_Date}`;
        modalDay.innerHTML = `(${dayNumToChar(dayNum)})`;
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
        modalDay.innerHTML = `(${dayNumToChar(dayNum)})`;
        modalBox.classList.remove("hidden");
      };
      //console.log(nowDay);
    } else {
      // 미래인 경우
      newDIV.className = "futureDay";
      //newDIV.onclick = function () { choiceDate(this); }
      newDIV.onclick = function () {
        modalDate.innerHTML = `${year}-${modal_Month + 1}-${modal_Date}`;
        modalDay.innerHTML = `(${dayNumToChar(dayNum)})`;
        modalBox.classList.remove("hidden");
      };
    }
  }
  if (currentMonth.length > 0) {
    const colorStart = eventColoring(currentMonth, month, lastDate);
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
  let ratio = sum !== 0 ? (realsum / sum) * 100 : 0;
  const progressPercentElement = document.querySelector(".progresspercent");

  if (ratio > 100) {
    ratio = 100;
    progressPercentElement.style.backgroundColor = "#FF6955";
  } else {
    progressPercentElement.style.backgroundColor = "#abe3ff";
  }

  progressPercentElement.style.width = `${ratio}%`;
}

function eventColoring(currentMonth, month, lastDate) {
  for (let i = 0; i < currentMonth.length; i++) {
    console.log(currentMonth[i].start_date.getMonth());
    var eventRowIdxStart = 0;
    var eventRowIdxFinish = 0;
    var eventRowIdx = 0;
    var initCheckIdx = 0;

    if (currentMonth[i].start_date == currentMonth[i].finish_date) {
      eventRowIdxStart = 0;
      eventRowIdxFinish = 0;
      eventRowIdx = 0;
      initCheckIdx = 0;
      var checkEventStart = document.getElementById(
        initCheckIdx.toString() +
          currentMonth[i].start_date.getDate().toString()
      );
      if (checkEventStart.innerText == "") {
        eventRowIdxStart = initCheckIdx;
      } else {
        while (checkEventStart.innerText != "") {
          if (initCheckIdx >= 8) {
            alert("더 이상 이벤트를 추가할 수 없어요 ㅜㅜ");
            break;
          }
          checkEventStart = document.getElementById(
            initCheckIdx.toString() +
              currentMonth[i].start_date.getDate().toString()
          );
          initCheckIdx++;
        }
      }
      eventRowIdxStart = initCheckIdxStart;
      findAndColor(currentMonth, i, eventRowIdx, currentMonth[i].start_date);
    } else if (
      currentMonth[i].start_date != currentMonth[i].finish_date &&
      currentMonth[i].finish_date.getMonth() == month &&
      currentMonth[i].start_date.getMonth() == month
    ) {
      console.log(currentMonth[i].detail);
      const writeEventDay = parseInt(
        (currentMonth[i].start_date.getDate() +
          currentMonth[i].finish_date.getDate()) /
          2
      );
      eventRowIdxStart = 0;
      eventRowIdxFinish = 0;
      eventRowIdx = 0;
      initCheckIdx = 0;
      var checkEventStart = document.getElementById(
        initCheckIdx.toString() +
          currentMonth[i].start_date.getDate().toString()
      );
      var checkEventFinish = document.getElementById(
        initCheckIdx.toString() +
          currentMonth[i].finish_date.getDate().toString()
      );
      console.log(checkEventStart.innerText);
      console.log(checkEventFinish.innerText);
      if (checkEventStart.style.backgroundColor == "") {
        eventRowIdxStart = initCheckIdx;
        console.log(eventRowIdxStart);
      } else {
        while (checkEventStart.style.backgroundColor != "") {
          if (initCheckIdx >= 8) {
            alert("이벤트를 더 이상 추가할 수 없습니다 ㅜㅜ");
            break;
          }
          checkEventStart = document.getElementById(
            initCheckIdx.toString() +
              currentMonth[i].start_date.getDate().toString()
          );
          initCheckIdx++;
          console.log(checkEventStart.style.backgroundColor);
          console.log(initCheckIdx - 1);
        }
        eventRowIdxStart = initCheckIdx - 1;
        console.log(eventRowIdxStart);
      }

      initCheckIdx = 0;
      if (checkEventFinish.style.backgroundColor == "") {
        eventRowIdx = initCheckIdx;
        console.log(eventRowIdxFinish);
      } else {
        while (checkEventFinish.style.backgroundColor != "") {
          if (initCheckIdx >= 8) {
            alert("이벤트를 더 이상 추가할 수 없습니다 ㅜㅜ");
            break;
          }
          checkEventFinish = document.getElementById(
            initCheckIdx.toString() +
              currentMonth[i].finish_date.getDate().toString()
          );
          initCheckIdx++;
          console.log(initCheckIdx - 1);
        }
        eventRowIdxFinish = initCheckIdx - 1;
        console.log(eventRowIdxFinish);
      }

      eventRowIdx = Math.max(eventRowIdxStart, eventRowIdxFinish);
      findAndColor(currentMonth, i, eventRowIdx, writeEventDay);
    } else if (
      currentMonth[i].start_date != currentMonth[i].finish_date &&
      currentMonth[i].finish_date.getMonth() == month + 1 &&
      currentMonth[i].start_date.getMonth() == month
    ) {
      console.log(currentMonth[i].detail);
      const writeEventDay = parseInt(
        (currentMonth[i].start_date.getDate() + lastDate.getDate()) / 2
      );
      eventRowIdxStart = 0;
      eventRowIdxFinish = 0;
      eventRowIdx = 0;
      initCheckIdx = 0;
      var checkEventStart = document.getElementById(
        initCheckIdx.toString() +
          currentMonth[i].start_date.getDate().toString()
      );
      var checkEventFinish = document.getElementById(
        initCheckIdx.toString() + lastDate.getDate().toString()
      );
      console.log(checkEventStart.innerText);
      console.log(checkEventFinish.innerText);
      if (checkEventStart.style.backgroundColor == "") {
        eventRowIdxStart = initCheckIdx;
        console.log(eventRowIdxStart);
      } else {
        while (checkEventStart.style.backgroundColor != "") {
          if (initCheckIdx >= 8) {
            alert("이벤트를 더 이상 추가할 수 없습니다 ㅜㅜ");
            break;
          }
          checkEventStart = document.getElementById(
            initCheckIdx.toString() +
              currentMonth[i].start_date.getDate().toString()
          );
          initCheckIdx++;
          console.log(checkEventStart.style.backgroundColor);
          console.log(initCheckIdx - 1);
        }
        eventRowIdxStart = initCheckIdx - 1;
        console.log(eventRowIdxStart);
      }

      initCheckIdx = 0;
      if (checkEventFinish.style.backgroundColor == "") {
        eventRowIdx = initCheckIdx;
        console.log(eventRowIdxFinish);
      } else {
        while (checkEventFinish.style.backgroundColor != "") {
          if (initCheckIdx >= 8) {
            alert("이벤트를 더 이상 추가할 수 없습니다 ㅜㅜ");
            break;
          }
          checkEventFinish = document.getElementById(
            initCheckIdx.toString() + lastDate.getDate().toString()
          );
          initCheckIdx++;
          console.log(initCheckIdx - 1);
        }
        eventRowIdxFinish = initCheckIdx - 1;
        console.log(eventRowIdxFinish);
      }

      eventRowIdx = Math.max(eventRowIdxStart, eventRowIdxFinish);
      for (
        let l = currentMonth[i].start_date.getDate();
        l <= lastDate.getDate();
        l++
      ) {
        const searchDate = document.getElementById(
          eventRowIdx.toString() + l.toString()
        );
        if (l == writeEventDay) {
          searchDate.innerText = currentMonth[i].detail;
        } else {
          searchDate.innerText = " ";
        }

        searchDate.style.backgroundColor =
          currentMonth[i].category.toUpperCase();
      }
    } else if (
      currentMonth[i].start_date != currentMonth[i].finish_date &&
      currentMonth[i].finish_date.getMonth() == month &&
      currentMonth[i].start_date.getMonth() == month - 1
    ) {
      console.log(currentMonth[i].detail);
      const writeEventDay = parseInt(
        (1 + currentMonth[i].finish_date.getDate()) / 2
      );
      eventRowIdxStart = 0;
      eventRowIdxFinish = 0;
      eventRowIdx = 0;
      initCheckIdx = 0;
      var checkEventStart = document.getElementById(
        initCheckIdx.toString() + "1"
      );
      var checkEventFinish = document.getElementById(
        initCheckIdx.toString() +
          currentMonth[i].finish_date.getDate().toString()
      );
      console.log(checkEventStart.innerText);
      console.log(checkEventFinish.innerText);
      if (checkEventStart.style.backgroundColor == "") {
        eventRowIdxStart = initCheckIdx;
        console.log(eventRowIdxStart);
      } else {
        while (checkEventStart.style.backgroundColor != "") {
          if (initCheckIdx >= 8) {
            alert("이벤트를 더 이상 추가할 수 없습니다 ㅜㅜ");
            break;
          }
          checkEventStart = document.getElementById(
            initCheckIdx.toString() + "1"
          );
          initCheckIdx++;
          console.log(checkEventStart.style.backgroundColor);
          console.log(initCheckIdx - 1);
        }
        eventRowIdxStart = initCheckIdx - 1;
        console.log(eventRowIdxStart);
      }

      initCheckIdx = 0;
      if (checkEventFinish.style.backgroundColor == "") {
        eventRowIdx = initCheckIdx;
        console.log(eventRowIdxFinish);
      } else {
        while (checkEventFinish.style.backgroundColor != "") {
          if (initCheckIdx >= 8) {
            alert("이벤트를 더 이상 추가할 수 없습니다 ㅜㅜ");
            break;
          }
          checkEventFinish = document.getElementById(
            initCheckIdx.toString() +
              currentMonth[i].finish_date.getDate().toString()
          );
          initCheckIdx++;
          console.log(initCheckIdx - 1);
        }
        eventRowIdxFinish = initCheckIdx - 1;
        console.log(eventRowIdxFinish);
      }

      eventRowIdx = Math.max(eventRowIdxStart, eventRowIdxFinish);
      for (let l = 1; l <= currentMonth[i].finish_date.getDate(); l++) {
        const searchDate = document.getElementById(
          eventRowIdx.toString() + l.toString()
        );
        if (l == writeEventDay) {
          searchDate.innerText = currentMonth[i].detail;
        } else {
          searchDate.innerText = " ";
        }

        searchDate.style.backgroundColor =
          currentMonth[i].category.toUpperCase();
      }
    }
  }
}

function findAndColor(
  currentMonth,
  currentMonthIdx,
  eventRowIdx,
  writeEventDay
) {
  for (
    let i = currentMonth[currentMonthIdx].start_date.getDate();
    i <= currentMonth[currentMonthIdx].finish_date.getDate();
    i++
  ) {
    const searchDate = document.getElementById(
      eventRowIdx.toString() + i.toString()
    );
    if (i == writeEventDay) {
      searchDate.innerText = currentMonth[currentMonthIdx].detail;
    } else {
      searchDate.innerText = " ";
    }

    searchDate.style.backgroundColor =
      currentMonth[currentMonthIdx].category.toUpperCase();
  }
}

function dayNumToChar(dayNum) {
  if (dayNum == 0) {
    return "일";
  } else if (dayNum == 1) {
    return "월";
  } else if (dayNum == 2) {
    return "화";
  } else if (dayNum == 3) {
    return "수";
  } else if (dayNum == 4) {
    return "목";
  } else if (dayNum == 5) {
    return "금";
  } else if (dayNum == 6) {
    return "토";
  }
}
