import React from 'react';
import './App.css';
import MiniCalendar from "./component/MiniCalendar";
import Calendar from "./component/Calendar";
import dayjs from "dayjs";

function App() {
  return (
    <div className="App">
        {/*<MiniCalendar value={new Date('1999-10-23')} onChange={(date: Date) => {*/}
        {/*    alert(date.toLocaleDateString())*/}
        {/*}}/>*/}
        <Calendar value={dayjs('2024-02-20')}/>
    </div>
  );
}

export default App;
