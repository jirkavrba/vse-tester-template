import { FC, useMemo } from "react";
import { DisplayQuestion, QuestionState } from "./Tester";

interface QuestionsOverviewProps {
    questions: Array<DisplayQuestion>,
    current: number,
    onSelect: (position: number) => void
}

const QuestionsOverview: FC<QuestionsOverviewProps> = ({questions, current, onSelect}: QuestionsOverviewProps) => {
    const sorted = useMemo(() => questions.sort((a, b) => a.position - b.position), [questions]);

    const correct = questions.filter(q => q.state == QuestionState.Correct).length;
    const incorrect = questions.filter(q => q.state == QuestionState.Incorrect).length;
    const percentage = Math.floor(correct / Math.max(incorrect + correct, 1) * 100 * 10) / 10;

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-row items-center justify-center mb-5">
                <div className="text-2xl text-green-500 font-black">{correct} správně</div>
                <div className="text-3xl text-gray-300 font-black mx-5">/</div>
                <div className="text-2xl text-red-500 font-black">{incorrect} špatně</div>
                <div className="text-3xl text-gray-300 font-black mx-5">=</div>
                <div className="text-2xl text-gray-500 font-black">{percentage}%</div>
            </div>
            <div className="flex flex-row content-center justify-center flex-wrap w-1/2">
                {sorted.map(question => (
                    <QuestionSquare key={question.position} onClick={() => onSelect(question.position)} question={question} highlight={question.position === current}/>
                ))} 
            </div>
        </div>
    );
}

interface QuestionSquareProps {
    question: DisplayQuestion,
    highlight: boolean,
    onClick: () => void
}

const QuestionSquare: FC<QuestionSquareProps> = ({question, highlight, onClick}: QuestionSquareProps) => {
    const classes = {
        [QuestionState.Unanswered]: "bg-gray-200",
        [QuestionState.Correct]: "bg-green-500",
        [QuestionState.Incorrect]: "bg-red-500",
    }

    return (
        <button onClick={onClick} className={`w-4 h-4 border-2 m-1 ${highlight && question.state == QuestionState.Unanswered ? 'border-gray-400 !bg-white' : 'border-white'} rounded ${classes[question.state]}`}> 
        </button>
    );
}

export default QuestionsOverview;