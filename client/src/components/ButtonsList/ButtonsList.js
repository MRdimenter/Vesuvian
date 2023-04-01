import React, { useState } from 'react';
import { Button } from '../Button/Button';

import './ButtonsList.scss';

/**
* The component has two possible display types. To select one of them when creating a component, 
* specify the desired type in the props: "row" or "column". Default type is "row".
* <ButtonsList direction={'column'}.../>
**/

export const ButtonsList = (direction = 'row') => {

  const style = (direction === 'row') ? 'row' : 'column';

  console.log('direction= ', direction);
  return (
    <ul className={`button-list ${style}`}>
      <li><Button label='exercise_1' /></li>
      <li><Button label='exercise_2' /></li>
      <li><Button label='exercise_3' /></li>
      <li><Button label='exercise_4' /></li>
      <li><Button label='exercise_5' /></li>
    </ul>
  )
    

}

