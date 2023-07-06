import { Link } from "react-router-dom"

import './errorPage.scss'

const ErrorPage = () => {
    const styles = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#dee7c4',
        textAlign: 'center',
        paddingTop: '200px',
        color: 'red',
    }

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