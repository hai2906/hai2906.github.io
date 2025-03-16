const holidays = {
    "1-1": "Tết Dương Lịch",
    "10-3": "Giỗ Tổ Hùng Vương",
    "30-4": "Ngày Giải Phóng Miền Nam",
    "1-5": "Ngày Quốc tế Lao Động",
    "2-9": "Quốc Khánh Việt Nam",
    "25-12": "Giáng Sinh",
    "15-1": "Tết Nguyên Tiêu (Rằm tháng Giêng)",
    "15-7": "Lễ Vu Lan (Rằm tháng Bảy)",
    "15-8": "Tết Trung Thu"
};

const now = new Date();
let currentMonth = now.getMonth();
let currentYear = now.getFullYear();

function renderCalendar(month, year) {
    const monthYearText = document.getElementById("month-year");
    const calendarBody = document.getElementById("calendar-body");
    const holidayInfo = document.getElementById("holiday-info");

    monthYearText.textContent = `Tháng ${month + 1}, ${year}`;
    calendarBody.innerHTML = "";

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let date = 1;
    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            let cell = document.createElement("td");

            if (i === 0 && j < firstDay) {
                row.appendChild(cell);
            } else if (date > daysInMonth) {
                break;
            } else {
                cell.textContent = date;

                let key = `${date}-${month + 1}`;
                if (holidays[key]) {
                    cell.classList.add("holiday");
                    cell.title = holidays[key];
                }

                if (j === 0) {
                    cell.classList.add("sunday");
                }

                cell.onclick = function () {
                    holidayInfo.textContent = holidays[key] ? `🎉 ${holidays[key]}` : "Không có sự kiện đặc biệt.";
                };

                row.appendChild(cell);
                date++;
            }
        }

        calendarBody.appendChild(row);
    }
}

document.getElementById("prev-month").addEventListener("click", function () {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
});

document.getElementById("next-month").addEventListener("click", function () {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
});

renderCalendar(currentMonth, currentYear);
