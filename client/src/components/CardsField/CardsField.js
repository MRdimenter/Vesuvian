import './CardsField.scss'

import { Card } from './Card/Card'

export const CardsField = () => {
    return (
        <div className='cards-field'>
            <div className='column'>
                <Card />
                <Card />
            </div>
            <div className='column'>
                <Card />
                <Card />
            </div>
            
        </div>
    )
}