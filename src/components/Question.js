import { UseQuiz } from "../contexts/QuizContext"
import Options from "./Options"

function Question() {
    const {questions, index} = UseQuiz()
    const question = questions[index]
    //answer and dispatch go to the options
    return (
        <div>
            <h4>{question.question}</h4>
             <Options question={question} />
        </div>
    )
}

export default Question
