const information = (workHour) => {
    if(workHour < 0 || workHour > 24){
        workHour = 0;
    }

	return{workHour}
};

const calender = (_date, _info) => {
    const inDate = new Date(_date);
	const info = information(_info);


	return { inDate, info };
};

const monthInAYear = 13;
const dayInAMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

let _calender = [];

function createCalender(year){
    for(let month = 0; month < monthInAYear; month++){
        for(let day = 0; day < dayInAMonth[month]; day++){    

            let date = new Date(year, month, day);
            _calender.push(calender(date));
        }
    }
}

export default createCalender();

