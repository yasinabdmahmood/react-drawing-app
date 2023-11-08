import './App.css';
import DrawingApp from './components/DrawingApp';
import Bar from './components/Bar';

function App() {
  return (
    <div className="App">
      <Bar />
      <DrawingApp />
      <div className="label">
        <h3>Developed by : Eng. Yaseen abdulwahid</h3>
        <h3>College : Computer Science</h3>
        <h3>Department : programming</h3>
        <br />
      </div>
    </div>
  );
}

export default App;
