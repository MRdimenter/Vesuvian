import { CardContent } from './CardContent/CardContent';
import { CardHeader } from './CardHeader/CardHeader';
import './card.scss';

const Card = ({content}) => {
    return (
        <div className='card'>
            <CardHeader />
            <CardContent content={content}/>
        </div>
    )
}

export {
    Card,
}