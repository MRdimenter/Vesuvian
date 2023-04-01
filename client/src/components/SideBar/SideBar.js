import './SideBar.scss'

import { ButtonsList } from '../ButtonsList/ButtonsList'

export const SideBar = () => {
    return (
        <div className='side-bar'>
            <ButtonsList direction={'column'}/>
        </div>
        
    )
}

/*

        <ul className='side-bar'>
            <li><Button /></li>
            <li><Button /></li>
            <li><Button /></li>
            <li><Button /></li>
            <li><Button /></li>
        </ul>
*/