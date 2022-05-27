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
        <div className="flex flex-col items-center justify-between py-10 min-h-screen">
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-black text-gray-600">{title}</h1>
                <h2 className="text-sm mt-5 uppercase tracking-widest font-bold text-gray-400">Tester obsahuje {questions.length} otázek</h2>
            </div>

            <div className="flex-grow my-10">
                {question && question.text}
            </div>

            <QuestionsOverview questions={questions}/>
        </div>
    )
}

export default Tester;