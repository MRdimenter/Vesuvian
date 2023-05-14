import './CardsField.scss'

import { Card } from './Card/Card'

export const CardsField = () => {
    const cardContent = {
        title: 'Учитесь вместе с нами',
        text: 'Наш сервис позволит вам запоминать любую информацию, будь то иностранные слова, математические определения или что-то еще. Мы разработали специальные методики обучения, которые помогут вам    запомнить всю необходимуюинформацию быстро и легко.',
    }

    return (
        <div className='cards-field'>
            <div className='row'>
                <Card style={{}}>{cardContent}</Card>
                <Card style={{content: 'picture'}}/>
            </div>
            <div className='row'>
                <Card style={{}}/>
                <Card style={{}}/>
            </div>
            <div className='row'>
                <Card style={{}}/>
                <Card style={{}}/>
            </div>
            
        </div>
    )
}