import { CardContent } from './CardContent/CardContent';
import { CardHeader } from './CardHeader/CardHeader';

import './card.scss';

/*
Компонент карт
Карта имеет две стороны: side со значениями front-side(по умолчанию) и back-side
*/

const Card = ({content, hint, side, onClick}) => {
    const cardSide = `${side || 'front-side'}`

    return (
        <div className={`card ${cardSide}`} onClick={onClick}>
            <CardHeader hint={hint}/>
            <CardContent content={content}/>
        </div>
    )
}

export {
    Card,
}