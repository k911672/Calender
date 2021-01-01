'use strict'

// console.clear()

{
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth(); 

    function getCalenderHead() {
        const dates = [];
        const d = new Date(year, month, 0).getDate();
        //↓2020年4月の1の曜日の数値が出力される。
        const n = new Date(year, month, 1).getDay();
        for(let i = 0; i < n; i++){
            dates.unshift({
                date: d - i,
                isToday: false,
                isDisabled: true,
            });
        }

        return dates;
    };

    function getCalenderTail(){
        const dates = [];
        // const d = new Date(year, month, 1).getDate();
        const lastDay = new Date(year, month + 1, 0).getDay();
        
        for(let i = 1; i < 7 - lastDay; i++){
            dates.push({
                date: i,
                isToday: false,
                isDisabled: true
            });
        }
        return dates;
    }

    function getCalenderBody() {
        const dates = [];//date: 日付、day: 曜日
        const lastDate = new Date(year, month + 1, 0).getDate();//⇨31日(第3引数を0にするとその月の最終日になる。初日の一日前という事になる。)

        for(let i = 1; i <= lastDate; i++){
            dates.push({
                date: i,
                isToday: false,
                isDisable: false
            });
        }

        //日付が太くなる処理
        if(year === today.getFullYear() && month === today.getMonth()){
            dates[today.getDate() - 1].isToday = true;
        }


        return dates;
    }

    function clearCalender() {
        const tbody = document.querySelector('tbody');

        while (tbody.firstChild) {
            tbody.removeChild(tbody.firstChild)
        }
    }

    function renderTitle() {
        //padStart⇨02などの頭に0を持ってくる時に使う。第一引数に桁数、第二引数に一桁目に持ってくる数値
        const title =`${year}/${String(month + 1).padStart(2,'0') }`;
        document.getElementById('title').textContent = title;
    }

    function renderWeek() {
        const dates = [
            //↓↓全て配列となっているので、一度展開する必要がある。
            ...getCalenderHead(),
            ...getCalenderBody(),
            ...getCalenderTail()
        ]

        const weeks = [];
        const weekCount = dates.length / 7;

        for (let i = 0; i < weekCount; i++){
            //7日分を小分けにweeks[]の中に配列として格納している。
            weeks.push(dates.splice(0, 7));
        }

        weeks.forEach(week => {
            const tr = document.createElement('tr');
            week.forEach(date => {
                const td = document.createElement('td')
                td.textContent = date.date;
                if(date.isToday){
                    td.classList.add('today')
                };
                if(date.isDisabled){
                    td.classList.add('disable')
                }

                tr.appendChild(td)
            })
            document.querySelector('tbody').appendChild(tr)
        })
    }
    
    function createCalender() {
        clearCalender();
        renderTitle();
        renderWeek();
    }

    document.getElementById('prev').addEventListener('click', () =>{
        month--;
        if (month < 0){
            year--;
            month = 11;
        }

        createCalender();
    })
    document.getElementById('next').addEventListener('click', () =>{
        month++;
        if (month > 11){
            year++;
            month = 0;
        }

        createCalender();
    })
    document.getElementById('today').addEventListener('click', () =>{
        year = today.getFullYear();
        month = today.getMonth();

        createCalender();
    })

    createCalender();

    // getCalenderBody();
    // getCalenderHead();
    // getCalenderTail();
}