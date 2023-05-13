import "./introChapter.scss"
import logo from '../../img/pictures/beautiful_picture.jpg';

export const IntroChapter = () => {
    return(
        <section className="intro-chapter">
            <div className="content">

            </div>
            <img src={logo} class="content_beautiful_picture" alt="content_beautiful_picture"></img>
        </section>
    )
}