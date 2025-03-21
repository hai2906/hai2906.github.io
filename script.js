const calendar = document.getElementById('calendar');
const currentMonthLabel = document.getElementById('currentMonth');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');

let currentDate = new Date(2025, 0, 1); // Bắt đầu từ tháng 1 năm 2025

// Ngày lễ Việt Nam
const holidays = {
    '2025-01-01': 'Tết Dương Lịch',
    '2025-02-17': 'Tết Nguyên Đán (Mùng 1 Tết)', // Ngày âm cần tính toán thêm
    '2025-04-18': 'Giỗ Tổ Hùng Vương (10/3 Âm lịch)',
    '2025-04-30': 'Ngày Thống Nhất',
    '2025-09-02': 'Quốc Khánh'
};

function renderCalendar() {
    calendar.innerHTML = '';
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Cập nhật tiêu đề tháng
    currentMonthLabel.textContent = `Tháng ${month + 1} - ${year}`;

    // Tạo tiêu đề ngày trong tuần
    const daysOfWeek = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    daysOfWeek.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.classList.add('day-header');
        dayHeader.textContent = day;
        calendar.appendChild(dayHeader);
    });

    // Lấy ngày đầu tiên của tháng
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Điền các ô trống trước ngày 1
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        calendar.appendChild(emptyDay);
    }

    // Điền các ngày trong tháng
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.classList.add('day');

        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        dayElement.innerHTML = `${day}<br><span class="lunar">Âm lịch: ${getLunarDate(day, month, year)}</span>`;

        // Kiểm tra ngày lễ
        if (holidays[dateStr]) {
            dayElement.classList.add('holiday');
            dayElement.innerHTML += `<br>${holidays[dateStr]}`;
            dayElement.title = holidays[dateStr]; // Tooltip
        }

        // Kiểm tra ngày hiện tại
        const today = new Date();
        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
            dayElement.classList.add('today');
        }

        calendar.appendChild(dayElement);
    }
}

// Hàm giả lập tính ngày âm (placeholder)
function getLunarDate(day, month, year) {
    // Thay bằng logic thật hoặc thư viện như 'lunar-javascript'
    return `${day}/${month + 1}`;
}

// Điều hướng tháng
prevMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonthBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// Khởi tạo lịch
renderCalendar();