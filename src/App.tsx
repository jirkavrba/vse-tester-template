import Tester from './components/Tester';
import questions from "./sets/4st204-statistika-pro-informatiky.json";

function App() {
  return (
    <Tester title="4ST204 - Statistika pro informatiky" questions={questions}/>
  );
}

export default App;
