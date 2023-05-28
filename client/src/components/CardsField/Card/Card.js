import './card.scss'

/**
* TODO Description
**/

export const Card = ({style: {content}, children}) => {
    const setStyle = content ?? 'text';

    function getItems(children) {
        if (Array.isArray(children)) {
            return children.map((item) => {
                <div>{item}</div>
            })
        } else {
            return children;
        }
    }

    /*
    const childrenObjects = children.map((item) => {
        <div>{item}</div>
    })
    */
    return (
        <div className={`card ${setStyle}`} >
            {children}
        </div>
    )
}

// <h3>{children?.title}</h3>
// <p>{children?.text}</p>