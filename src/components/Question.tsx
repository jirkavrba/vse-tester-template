import { FC } from "react";
import { Answer } from "./Tester";

interface QuestionProps {
    text: string,
    answers: Array<Answer>,
    revealed: boolean
    onSelect: (correct: boolean) => void,
}

const Question: FC<QuestionProps> = ({text, answers, revealed, onSelect}: QuestionProps) => {
    return (
        <div className="mx-auto">
            <h1 className="text-xl md:text-3xl font-black text-center max-w-4xl mx-auto">{text}</h1>
            <div className="w-screen flex flex-col items-center">
                <ul className="flex flex-col items-stretch mt-10 w-full md:w-1/2">
                    {answers.map((answer, i) => {
                        if (revealed) {
                            return <li key={i} className={`px-10 py-4 md:py-8 m-2 rounded-xl font-black ${answer.correct ? 'text-green-800 bg-green-200' : 'text-red-800 bg-red-200'}`}>{answer.text}</li>
                        }

                        return <li key={i} onClick={() => onSelect(answer.correct)} className="px-10 py-8 m-2 rounded-xl font-black border transition transform hover:scale-110 hover:shadow-xl cursor-pointer bg-white">{answer.text}</li>
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Question;