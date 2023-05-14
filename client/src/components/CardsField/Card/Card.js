import './card.scss'

/**
* TODO Description
**/


export const Card = ({style: {content}, children}) => {
    const setStyle = content ?? 'text';
    return (
        <div className={`card ${setStyle}`} >
            <h3>{children?.title}</h3>
            <p>{children?.text}</p>
        </div>
    )
}