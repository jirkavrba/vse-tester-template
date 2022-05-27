import Tester from './components/Tester';
import questions from "./questions.json";

function App() {
  return (
    <Tester title="4ST204 - Statistika pro informatiky" questions={questions}/>
  );
}

export default App;
