import React from "react"
import ReactDOM from 'react-dom'
import App from "./components/App"

const Root = () => {
    return (
    <div>
        <App/>
    </div>
    )
}

ReactDOM.render(<Root />, document.querySelector("#app"));
