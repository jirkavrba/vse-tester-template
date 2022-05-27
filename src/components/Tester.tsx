import { useState, FC, useEffect } from "react";
import QuestionComponent from "./Question";
import QuestionsOverview from "./QuestionsOverview";

export interface Answer {
    text: string,
    correct: boolean
}

export interface Question {
    text: string,
    answers: Array<Answer>
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
    const [positions, setPositions] = useState<Array<number>>([]);
    const [index, setIndex] = useState<number>(Math.floor(Math.random() * source.length));

    // Assign each questions a position and an answer state
    useEffect(() => {
        setQuestions(source.map((q, i) => ({...q, state: QuestionState.Unanswered, position: i})));
        setPositions(new Array(source.length).fill(0).map((_, i) => i).sort((a, b) => 0.5 - Math.random()));
    }, [])

    const question = questions[positions[index]];
    const selected = (correct: boolean) => {
        const state = correct ? QuestionState.Correct : QuestionState.Incorrect;

        setRevealed(true);
        setQuestions(current => {
            const copy = [...current];
            const updated = {...question, state: state}

            copy.splice(positions[index], 1, updated);

            return copy;
        })
    }

    const selectQuestion = (position: number) => {
        const index = positions.indexOf(position);

        setRevealed(false);
        setIndex(index);
    }

    const nextQuestion = () => {
        setIndex(index => (index + 1) % questions.length);
        setRevealed(false);
    }

    return (
        <div className="flex flex-col items-center justify-between py-10 min-h-screen">
            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-black text-gray-600">{title}</h1>
                <h2 className="text-sm mt-5 uppercase tracking-widest font-bold text-gray-400">Tester obsahuje {questions.length} otázek</h2>
            </div>

            <div className="flex-grow my-10 text-center">
                {question && <QuestionComponent text={question.text} answers={question.answers} revealed={revealed} onSelect={selected}/>}

                {revealed && <button className="mx-auto mt-5 px-8 py-4 bg-black text-white rounded-xl cursor-pointer uppercase font-black tracking-widest" onClick={nextQuestion}>Další otázka</button>}
            </div>

            <QuestionsOverview onSelect={selectQuestion} questions={questions} current={positions[index]}/>
        </div>
    )
}

export default Tester;