import React from 'react';
import './App.css';
import Calendar from "./component/Calendar";

function App() {
  return (
    <div className="App">
        <Calendar value={new Date('1999-10-23')} onChange={(date: Date) => {
            alert(date.toLocaleDateString())
        }}/>
    </div>
  );
}

export default App;
