import './App.css';
import { useState } from 'react';
import ClassComponent from './ClassComponent'
 
function App() {
  const [data,setData] = useState(0);
  return (
    <div className="App">
        <button onClick={()=>{setData(data-1)}}>parent add</button>
        <ClassComponent data={data}/>
    </div>
  );
}

export default App;
