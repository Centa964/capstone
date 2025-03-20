//log intake
import React, { useState } from 'react';


const DrinkLog = ({ logWater }) => {
    const [ logMessage, setLogMessage ] = useState('');
    const [ customAmount, setCustomAmount ] = useState(0);
    const [ isModalOpen, setIsModalOpen ] = useState(false);

const handleQuickLog = (amount) => {  
    logWater(amount);
    setLogMessage(`Logged ${amount} ml !`);
    setTimeout(() => setLogMessage(''), 2000);
    };  

    //function to handle custom log
    const handleCustomLog = () => {
        const amount = parseInt(customAmount);
        if (amount > 0) {
            logWater(amount);
            setLogMessage(`Logged ${amount} ml !`);
            setTimeout(() => setLogMessage(''), 2000);
            setCustomAmount('');
            setIsModalOpen(false);
        }
    };


    return (
        <div className="drink-log">
            <button onClick={() => handleQuickLog(250)}>+250ml</button>
            <button onClick={() => handleQuickLog(500)}>+500ml</button>
            <button onClick={() => setIsModalOpen(true)}>Add</button>

            {isModalOpen && (
                <div className="modal">
                    <input 
                        type="number" 
                        value={customAmount} 
                        onChange={(e) => setCustomAmount(e.target.value)} 
                        placeholder="Add amount in ml" 
                    />
                    <button onClick={handleCustomLog}>Log</button>
                    <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                </div>
            )}

           { logMessage && <p>{logMessage}</p>} { /* if logMessage is true/not empty, display the message */ }
        </div>
        
    );
};

    export default DrinkLog;