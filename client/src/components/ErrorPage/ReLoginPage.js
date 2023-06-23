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
    }

    return (
        <div style={styles}>
            Oops! Please Login!
            <Button btnStyle='btn' label='Вход' link={'/login'} />
        </div>
    )
}

export {
    ReLoginPage,
}