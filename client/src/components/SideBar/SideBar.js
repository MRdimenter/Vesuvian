import './SideBar.scss'

import { ButtonsList } from '../ButtonsList/ButtonsList'

const exercises = [
    'exercise_1',
    'exercise_2',
    'exercise_3',
    'exercise_4',
    'exercise_5',
  ]

export const SideBar = () => {
    return (
        <div className='side-bar none'>
            <ButtonsList style={{}}>{exercises}</ButtonsList>
        </div>
        
    )
}