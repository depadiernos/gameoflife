import React from "react"
import ReactDOM from 'react-dom'
import Board from "./components/Board"

const app = () => {
    return (
    <div>
        <Board/>
    </div>
    )
}

ReactDOM.render(app(), document.querySelector("#app"));
