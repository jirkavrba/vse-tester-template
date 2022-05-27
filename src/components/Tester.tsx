import { useState, FC, useEffect } from "react";
import QuestionsOverview from "./QuestionsOverview";

export interface Question {
    text: string,
    answers: Array<{
        text: string,
        correct: boolean
    }>
}

export interface DisplayQuestion extends Question {
    position: number,
    state: QuestionState,
}

export enum QuestionState {
    Unanswered,
    Correct,
    Incorrect
}

interface TesterProps {
    title: string,
    questions: Array<Question>
}

const Tester: FC<TesterProps> = ({title, questions: source}: TesterProps) => {
    const [revealed, setRevealed] = useState<boolean>(false);
    const [questions, setQuestions] = useState<Array<DisplayQuestion>>([]);
    const [index, setIndex] = useState<number>(0);

    // Assign each questions a position, answer state and shuffle them to the questions state
    useEffect(() => setQuestions(
        source
            .map((q, i) => ({...q, state: QuestionState.Unanswered, position: i}))
            .sort(_ => 0.5 - Math.random())
    ), []);

    const question = questions[index];

    return (
        <>
            <h1>{title}</h1>
            <h2>Tester obsahuje {questions.length} otázek</h2>

            {question && question.text}
            <QuestionsOverview questions={questions}/>
        </>
    )
}

export default Tester;