import './index.scss'
import calendar, {CalendarProps} from "./index";
import {Dayjs} from "dayjs";

interface MonthCalendarProps extends CalendarProps {

}

function getAllDays(date: Dayjs) {
    const daysInMonth = date.daysInMonth(); // 本月有多少天
    const startDate = date.startOf('month'); // 本月第一天
    const day = startDate.day(); // 星期几

    const daysInfo: Array<{date: Dayjs, currentMonth: boolean}> = new Array(6 * 7);
    // 补足上月
    for (let i = 0; i < day; i++) {
        daysInfo[i] = {
            // subtract方法返回前day - i天的日期，补足前月
            date: startDate.subtract(day - i, 'day'),
            currentMonth: false, // 不在本月
        }
    }
    // 填充下月
    for (let i = day; i < daysInfo.length; i++) {
        const calcDate = startDate.add(i - day, 'day');
        daysInfo[i] = {
            // add方法返回day + i天的日期，补足下月
            date: startDate.add(i - day, 'day'),
            // month方法返回当前日期所在月份，判断该天是否在本月
            currentMonth: calcDate.month() === date.month()
        }
    }
    return daysInfo;
}

// 生成用于渲染的日期
function renderDays(days: Array<{date: Dayjs, currentMonth: boolean}>) {
    const rows = [];
    for (let i = 0; i < 6; i++) {
        const row = [];
        for (let j = 0; j < 7; j++) {
            const item = days[i * 7 + j];
            // 多选择器时注意字符串拼接时的空格
            row[j] = <div className={
                "calendar-month-body-cell " + (item.currentMonth ? 'calendar-month-body-cell-current' : '')
            }>{item.date.date()}</div>
        }
        rows.push(row);
    }
    return rows.map(row => <div className="calendar-month-body-row">{row}</div>);
}

function MonthCalendar(props: MonthCalendarProps) {
    const weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const allDays = getAllDays(props.value);

    return <div className="calendar-month">
        <div className="calendar-month-week-list">
            {weekList.map((week) =>
                <div className="calendar-month-week-list-item" key={week}>{week}</div>
            )}
        </div>
        <div className="calendar-month-body">{renderDays(allDays)}</div>
    </div>
}

export default MonthCalendar;