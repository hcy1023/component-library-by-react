import dayjs, { Dayjs } from "dayjs";
import './index.scss'
import MonthCalendar from "./MonthCalendar";
import Header from "./Header"
import cs from 'classnames'
import {CSSProperties, ReactNode, useState} from "react";
import LocaleContext from "./LocaleContext";

export interface CalendarProps {
    value: Dayjs,
    // 组件外部容器样式
    style?: CSSProperties,
    className?: string | string[],
    // 定制日期显示，会完全覆盖日期单元格
    dateRender?: (currentDate: Dayjs) => ReactNode,
    // 定期日期单元格，内容会被添加到单元格内，只在全屏日历模式下生效
    dateInnerContent?: (currentDate: Dayjs) => ReactNode,
    // 国际化相关
    locale?: string,
    onChange?: (date: Dayjs) => void
}

function Calendar(props: CalendarProps) {
    // 接收参数
    const {
        value,
        style,
        className,
        // dateRender,
        // dateInnerContent,
        locale,
        onChange
    } = props;

    const [curValue, setCurValue] = useState<Dayjs>(value);

    const [curMonth, setCurMonth] = useState<Dayjs>(value)

    // 抽离公共方法
    function changeDate(date: Dayjs) {
        setCurValue(date);
        setCurMonth(date);
        onChange?.(date);
    }
    function selectHandler(date: Dayjs) {
        changeDate(date);
    }

    // 上月点击回调
    function prevMonthHandler() {
        setCurMonth(curMonth.subtract(1, 'month'));
    }

    // 下月点击回调
    function nextMonthHandler() {
        setCurMonth(curMonth.add(1, 'month'));
    }

    // 今天按钮回调
    function todayHandler() {
        const date = dayjs(Date.now());

        changeDate(date);
    }

    const classNames = cs("calendar", className);

    return <LocaleContext.Provider value={{locale: locale || navigator.language}}>
        <div className={classNames} style={style}>
            <Header curMonth={curMonth} prevMonthHandler={prevMonthHandler} nextMonthHandler={nextMonthHandler} todayHandler={todayHandler}/>
            <MonthCalendar {...props} value={curValue} curMonth={curMonth} selectHandler={selectHandler} />
        </div>
    </LocaleContext.Provider>
}

export default Calendar