import { Link } from "react-router-dom"

import './errorPage.scss'

const ErrorPage = ({message = 'Oops'}) => {
    return (
        <div className="wrapper">
            <h1>Oops</h1>
            <Link to={'/'}>На главную</Link>
        </div>
    )
}

export {
    ErrorPage,
}