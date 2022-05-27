import React from 'react';
import Tester, { Question } from './Tester';
import questions from "./questions.json";

function App() {
  return (
    // Todo: Fix this ugly (as unknown) typecast
    <Tester title="4ST204 - Statistika pro informatiky" questions={(questions as unknown) as Array<Question>}/>
  );
}

export default App;
