import "./introChapter.scss"

import logo from '../../img/pictures/beautiful_picture.jpg';
import { Button } from "../Button/Button";

export const IntroChapter = () => {
    return(
        <section className="intro-chapter">
            <div className="content">
                <p>
                    Вы можете легко учить сложные предметы, используя
                    нашу платформу с карточками и пробными тестами.
                    Наши карточки помогут вам запомнить все ключевые
                    понятия и термины, связанные с вашими учебными
                    предметами. (текст поверх баннера)
                </p>
                <Button label='Зарегистрироваться' link={'/dashboard'} />
            </div>
            <img src={logo} className="content_beautiful_picture" alt="content_beautiful_picture"></img>
        </section>
    )
}