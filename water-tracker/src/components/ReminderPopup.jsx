// Pop-up reminder for water intake

import React from "react";

const ReminderPopup = ({ showReminder, setShowReminder }) => {
    if (!showReminder) return null;

    return (
        <div className="reminder-popup">
            <h2>Stay Hydrated!</h2>
            <button onClick={() => setShowReminder(false)}>Close</button>
            <button onClick={() => {
                setShowReminder(false);
                setTimeout(() => setShowReminder(true), 1000 * 60 * 5); 
            }}>
                Remind me again in 5 minutes
            </button>
        </div>
    );
};

export default ReminderPopup;