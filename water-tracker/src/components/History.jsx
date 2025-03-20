//Displays the history of water intake

const History = ({ history }) => {  
    return (
        <div>
            <h2>My History</h2>
            <ul>
                {history.length === 0 ? (
                    history.map((entry, index) => (
                        <li key={index}>
                            {entry.amount} ml at {entry.timestamp}
                        </li>
                    ))      
                ) : (
                    <p>No history yet</p>
                )}
            </ul>
        </div>
    );
};

export default History;