import React from 'react';
import './App.css';
import MiniCalendar from "./component/MiniCalendar";

function App() {
  return (
    <div className="App">
        <MiniCalendar value={new Date('1999-10-23')} onChange={(date: Date) => {
            alert(date.toLocaleDateString())
        }}/>
    </div>
  );
}

export default App;
