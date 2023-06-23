import { Link } from "react-router-dom"
import { Button } from "../Button/Button"

const ReLoginPage = () => {
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

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }

    return (
        <div style={styles}>
            <h3>Oops! Please Login!</h3>
            <Button btnStyle='btn' label='Вход' link={'/login'} />
            <h3>Вернуться на главную</h3>
            <Link className='Back' to={'/'}>Vesuvian :)</Link>
        </div>
    )
}

export {
    ReLoginPage,
}