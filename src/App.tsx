import Tester from './components/Tester';
import questions from "./sets/3sg201-strategicka-analyza.json";

function App() {
  return (
    <Tester title="3SG201 - Strategická analýza" questions={questions}/>
  );
}

export default App;
