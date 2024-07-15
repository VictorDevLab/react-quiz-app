import Options from "./Options"

function Question({question, answer, dispatch}) {
    //answer and dispatch go to the options
    return (
        <div>
            <h4>{question.question}</h4>
             <Options question={question} answer={answer} dispatch={dispatch} />
        </div>
    )
}

export default Question
