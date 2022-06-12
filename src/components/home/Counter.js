import { useState, useEffect } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const [calculation, setCalculation] = useState(0);
  const [itung, setItung] = useState(0);  

  useEffect(() => {
    setCalculation(() => count * 2);
  }, [count]); // <- add the count variable here
  
  

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
      <p>Calculation: {calculation}</p>
      <p  onClick={() => setItung((c) => c + 1)}>me: {itung}</p>
    </div>
  );
};

export default Counter;
