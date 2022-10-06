import BasicExample from "./UIComponents/navbar.js";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <BasicExample />
      <Calendar className = "cal"/>
    </div>
  );
}

export default App;
