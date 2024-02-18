import './index.css';
import React, {useImperativeHandle, useState} from 'react';

// 组件传入参数
interface CalendarProps{
    value?: Date,
    onChange?: (date: Date) => void,
}

const Calendar: React.FC<CalendarProps> = (props,) => {
    // 接受组件外部传入的参数
    const {value = new Date(), onChange} = props;

    const [date, setDate] = useState(value);

    // header年月切换
    const monthName = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    const handlePrevMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() - 1));
    }
    const handleNextMonth = () => {
        setDate(new Date(date.getFullYear(), date.getMonth() + 1));
    }

    // 渲染日期
    const renderDays = () => {
        const days = [];
        // 计算当前月的天数
        const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        // 当前月的第一天是星期几
        const firstWeekDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        // 计算当前月的最后一天星期几
        const lastWeekDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
        // 渲染上月空格
        // for (let i = 0 ; i < firstDay; i++) {
        //     days.push(<div key={`empty-${i}`} className="empty"></div>);
        // }
        // 计算上月天数
        let lastDays = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        // 填充上月末尾
        for (let i = 0; i < firstWeekDay; i++) {
            days.push(<div key={`last-${i}`} className="day grey">{lastDays - (firstWeekDay - i - 1)}</div>)
        }
        // 渲染日期
        for (let i = 1; i <= daysInMonth; i++) {
            // 点击事件回调
            const clickHandle = onChange?.bind(null, new Date(date.getFullYear(), date.getMonth(), i));
            if (i === date.getDate()) {
                days.push(<div key={`day-${i}`} className="day selected" onClick={clickHandle}>{i}</div>);
            } else {
                days.push(<div key={`day-${i}`} className="day" onClick={clickHandle}>{i}</div>);
            }
        }
        // 补充下月开头
        for (let i = 1; i <= 6 - lastWeekDay; i++) {
            days.push(<div key={`next-${i}`} className="day grey">{i}</div>);
        }
        return days;
    }

    return (
        <div className="calendar">
            <div className="header">
                <button onClick={handlePrevMonth}>&lt;</button>
                <div>{date.getFullYear()}年{monthName[date.getMonth()]}</div>
                <button onClick={handleNextMonth}>&gt;</button>
            </div>
            <div className="days">
                <div className="day">日</div>
                <div className="day">一</div>
                <div className="day">二</div>
                <div className="day">三</div>
                <div className="day">四</div>
                <div className="day">五</div>
                <div className="day">六</div>
                {renderDays()}
            </div>
        </div>
    );
}

export default Calendar;