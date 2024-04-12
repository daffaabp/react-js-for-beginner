import {useState} from 'react';
import Header from "./components/Header";

function App() {
  const [title, setTitle] = useState("Welcome to My App");
  const [age, setAge] = useState(200);

  const changeTitle = () => {
    setTitle("Title Changed");
    setAge(40);
  };

  return (
    <>
      <div>
        <Header />
        <h1>{title}</h1>
        <h1>Age: {age}</h1>
        <button onClick={changeTitle}>Change Title</button>
      </div>
    </>
  );
}

export default App;
