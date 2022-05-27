import Tester from './components/Tester';
import questions from "./questions.json";

function App() {
  return (
    // Todo: Fix this ugly (as unknown) typecast
    <Tester title="4ST204 - Statistika pro informatiky" questions={questions}/>
  );
}

export default App;
