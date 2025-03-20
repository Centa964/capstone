//Tracks progress of water intake
  //Displays progress
  //A progress bar that shows the user's progress and goal
  //Updates when progress changes

  const Activity = ({ goal, progress}) => {
    const progressPercent = (progress / goal) * 100;
    
    return ( 
    <div>
        <h2>My Activity</h2>
        <div>
          <div style={{ width: '100%', background: '#ccc', height: '10px' }}>
            <div 
              style={{ 
                width: `${progressPercent}%`, 
                background: 'green', 
                height: '10px' 
              }}
            />
          </div>
          <p>{progress} ml / {goal} ml</p>
        </div>
      </div>
    );
  };

  export default Activity;