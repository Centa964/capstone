import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header';
import Activity from './components/Activity';
import DrinkLog from './components/DrinkLog';
import History from './components/History';
import Settings from './components/Settings';
import ReminderPopup from './components/ReminderPopup';


function App() {
  //This is the state for the goal, progress, and history
  const [goal, setGoal] = useState(2500);
  const [ progress, setProgress ] = useState(0);
  const [ history, setHistory ] = useState([]);
  const [ showReminder, setShowReminder ] = useState(false);

  //a popup to shows every hour

  useEffect(() => { 
    const reminderTime = setInterval(() => {
      setShowReminder(true);
    }, 1000 * 60 * 60);

    return () => clearInterval(reminderTime);
  }, []); 



  //Load the previous history from local storage
  useEffect(() => {
    const savedGoal = localStorage.getItem('goal');
    const savedProgress = localStorage.getItem('progress');
    const savedHistory = localStorage.getItem('history');

    if (savedGoal) setGoal(parseInt(savedGoal));
    if (savedProgress) setProgress(parseInt(savedProgress));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  //save to local storage when the goal, progress, or history changes
  useEffect(() => {
    localStorage.setItem('goal', goal);
    localStorage.setItem('progress', progress);
    localStorage.setItem('history', JSON.stringify(history));
  }, [goal, progress, history]);

  //a function to handle water log
  const logWater = (amount) => {
    const newProgress = progress + amount;
    setProgress(newProgress);

    const newEntry = {
        amount,
        timestamp: new Date().toLocaleTimeString()
      };
    
    setHistory([...history, newEntry]);
  };

  //a function to open the settings
  const openSettings = () => {
    console.log('open settings');
  };
      

  return (
    <>
     <Header openSettings={openSettings}/>
     <Activity goal={goal} progress={progress} />
     <DrinkLog logWater={logWater} />
     <History history={history} />
     <Settings setGoal={setGoal} setProgress={setProgress} setHistory={setHistory}/>
      <ReminderPopup showReminder={showReminder} setShowReminder={setShowReminder} />
    </>
  )
}

export default App;
