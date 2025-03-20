//set water intake goal

import { useState } from "react";

const Settings = ({ setGoal }) => {
    const [newGoal, setNewGoal] = useState('');
    const [ showConfirmation, setShowConfirmation ] = useState(false);
    const [resetMessage, setResetMessage] = useState('');

 const handleReset = () => {
        setGoal(0);
        setHistory([]);
        setResetMessage('Progress reset successfully');
        setTimeout(() => setResetMessage(''), 2000);    
    }

    //function to reset 
    const handleSavedGoal = (e) => {
        if (!newGoal || isNaN(newGoal) || newGoal <= 0) return;
        setGoal(parseInt(newGoal));
        setNewGoal('');
        };

        return (
            <div>
                <h2>Settings</h2>
                <input 
                    type="number" 
                    value={newGoal} 
                    onChange={(e) => setNewGoal(e.target.value)} 
                    placeholder="Set your goal in ml" 
                />
                <button onClick={handleSavedGoal}>Save</button>
                <button onClick={() => setShowConfirm(true)}>Reset Progress</button>

          
                {showConfirmation && (
                    <div>
                        <p>Are you sure you want to reset your progress?</p>
                        <button onClick={handleReset}>Yes</button>
                        <button onClick={() => setShowConfirmation(false)}>No</button>
                    </div>
                )}
                {resetMessage && <p>{resetMessage}</p>}
            </div>
        );
};

export default Settings;
