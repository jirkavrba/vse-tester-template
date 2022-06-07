import Tester from './components/Tester';
import questions from "./sets/4sa310-it-governance.json";

function App() {
  return (
    <Tester title="4SA310 - IT Governance" questions={questions}/>
  );
}

export default App;
