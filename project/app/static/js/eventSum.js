var sum = 0;
var realsum = 0;
const monthSpan = document.querySelector("#calMonth");

function costSum () {
    events.forEach(function(obj){
        const month = Number(monthSpan.innerText);
        const eventDate = new Date(obj.finish_date);
        console.log(eventDate.getMonth());
        if (month == eventDate.getMonth()+1) {
            
            sum = sum + obj.cost;
        }
    });
    
    const expectedCost = document.querySelector("#expected_cost");
    
    expectedCost.innerText = sum + '원';
}

function costRealSum () {
    realspends.forEach(function(i){
        const mon = Number(monthSpan.innerText);
        const spenddate = i.date.substring(4, 6);
        const spendDate = Number(spenddate);

        if (mon == spendDate) {

            realsum = realsum + i.spend;
        }
    });

    const realCost = document.querySelector("#spent_cost");

    realCost.innerText = realsum + '원';
}

function costRatio () {
    const ratio = sum !== 0 ? (realsum / sum) * 100 : 0;
    if (ratio > 100) {
        ratio = 100;
    }
    
    const progressPercentElement = document.querySelector(".progresspercent");
    progressPercentElement.style.width = `${ratio}%`;
}