const CustomProgressBar = ({ value, max, dotInterval }: any) => {
    const dots = [];
    const percentage = (value / max) * 100;
  
    // Calculate the number of dots based on the dotInterval
    const numDots = Math.floor(max / dotInterval);
  
    for (let i = 1; i <= numDots; i++) {
      // Calculate the position of each dot based on the dotInterval
      const dotPosition = (i / numDots) * 100;
      dots.push(
        <div
          key={i}
          className="absolute bg-gray-500 h-2 w-2 rounded-full"
          style={{ left: `calc(${dotPosition}% - 1px)` }}
        ></div>
      );
    }
  
    return (
      <div className="relative w-full h-2 rounded-full bg-gray-200">
        {/* Remove the default progress element */}
        {/* <progress value={value} max={max} className="w-full h-full rounded-full">
              {percentage}%
            </progress> */}
        {dots}
        {/* Render a div to represent the progress visually */}
        {/* {percentage >= 0 && percentage <= 100 && (
          <div
            className="absolute bg-primary h-full rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        )} */}
      </div>
    );
  };
  
  export default CustomProgressBar;
  