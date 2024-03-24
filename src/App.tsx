import React from 'react';
import './App.css';
import MiniCalendar from "./component/MiniCalendar";
import Calendar from "./component/Calendar";
import ColorPickerPanel from "./component/Colorpicker/ColorPickerPanel";
import dayjs from "dayjs";
import {IconAdd} from "./component/Icon/icons/IconAdd";
import {IconEmail} from "./component/Icon/icons/IconEmail";
import {createFromIconfont} from "./component/Icon/createFrontIconfont";

const IconFont = createFromIconfont('//at.alicdn.com/t/c/font_4479488_6s9wokfcww4.js')

function App() {
  return (
    <div className="App">
        {/*<MiniCalendar value={new Date('1999-10-23')} onChange={(date: Date) => {*/}
        {/*    alert(date.toLocaleDateString())*/}
        {/*}}/>*/}
        {/*<Calendar value={dayjs('2024-02-21')} locale="en-US" onChange={(date) => {*/}
        {/*    alert(date.format('YYYY-MM-DD'));*/}
        {/*}}/>*/}
        {/*<ColorPickerPanel value="rgb(166 57 57)"></ColorPickerPanel>*/}
        <div style={{padding: '50px'}}>
            <IconAdd size='40px'></IconAdd>
            <IconEmail spin></IconEmail>
            <IconEmail style={{color: 'blue', fontSize: '50px'}}></IconEmail>
            <IconFont type="icon-xihuan" size="40px"></IconFont>
            <IconFont type="icon-qianshuxieyi" fill="blue" size="40px"></IconFont>
        </div>
    </div>
  );
}

export default App;
