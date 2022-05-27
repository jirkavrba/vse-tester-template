import { FC, useMemo } from "react";
import { DisplayQuestion, QuestionState } from "./Tester";

interface QuestionsOverviewProps {
    questions: Array<DisplayQuestion>
}

const QuestionsOverview: FC<QuestionsOverviewProps> = ({questions}: QuestionsOverviewProps) => {
    const sorted = useMemo(() => questions.sort((a, b) => a.position - b.position), [questions]);

    const correct = questions.filter(q => q.state == QuestionState.Correct).length;
    const incorrect = questions.filter(q => q.state == QuestionState.Correct).length;
    const percentage = correct / Math.max(incorrect + correct, 1) * 100;

    return (
        <div>{percentage} %</div>
    );
}

export default QuestionsOverview;