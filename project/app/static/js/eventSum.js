
function costSum () {
    var sum = 0;
    const monthSpan = document.querySelector("#calMonth");
    events.forEach(function(obj){
        const month = Number(monthSpan.innerText);
        const eventDate = new Date(obj.finish_date);
        console.log(eventDate.getMonth());
        if (month == eventDate.getMonth()+1) {
            
            sum = sum + obj.cost;
        }
    });
    
    const expectedCost = document.querySelector("#expected_cost");
    
    expectedCost.innerText = sum;
}
