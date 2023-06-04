import { useSelector } from 'react-redux';

import './CardsField.scss'

import { Card } from './Card/Card'
import { Button } from '../Button/Button'
import logo from '../../img/pictures/beautiful_picture.jpg';


export const CardsField = () => {

    const isAuthenticated = useSelector((state) => state.isAuth);

    const cardContentIntro = {
        title: '',
        text: 'Вы можете легко учить сложные предметы, используя нашу платформу с карточками и пробными тестами. Наши карточки помогут вам запомнить все ключевые понятия и термины, связанные с вашими учебными предметами. (текст поверх баннера)',
    }

    const cardContent = {
        title: 'Учитесь вместе с нами',
        text: 'Наш сервис позволит вам запоминать любую информацию, будь то иностранные слова, математические определения или что-то еще. Мы разработали специальные методики обучения, которые помогут вам    запомнить всю необходимуюинформацию быстро и легко.',
    }

    function getElements(content) {
        let resultArray = [];
        for (const key in content) {
            if (Object.hasOwnProperty.call(content, key)) {
                const text = content[key];
                resultArray.push(<div key={key}>{text}</div>)
            }
        }
        return resultArray
    }

    return (
        <div className='cards-field'>
            <div className={`row ${isAuthenticated ? 'none' : 'auth'}`}>
                <Card style={{}}>{getElements(cardContentIntro)}<Button label='Зарегистрироваться' link={'/registrationForm'} /></Card>
                <img src={logo} className="content_beautiful_picture" alt="content_beautiful_picture"></img>
            </div>
            
            <div className='row'>
                <Card style={{}}>{getElements(cardContent)}</Card>
                <Card style={{content: 'picture'}}/>
            </div>
            
            <div className='row'>
                <Card style={{}}/>
                <Card style={{}}/>
            </div>
            
        </div>
    )
}

/*
            <div className='row'>
                <Card style={{}}>{cardContentIntro} <button>asd</button></Card>
                <Card style={{content: 'picture'}}/>
            </div>

            <div className='row'>
                <Card style={{}}>{cardContent}</Card>
                <Card style={{content: 'picture'}}/>
            </div>

            <div className='row'>
                <Card style={{}}/>
                <Card style={{}}/>
            </div>
*/