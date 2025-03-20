//set water intake goal

import { useState } from "react";

const Settings = ({ setGoal }) => {
    const [newGoal, setNewGoal] = useState('');

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
            </div>
        );
};

export default Settings;
