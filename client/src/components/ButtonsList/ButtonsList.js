import './ButtonsList.scss';

/**
* The component has two possible display types. To select one of them when creating a component, 
* specify the desired type in the props: "row" or "column". Default type is "row".
* <ButtonsList direction={'column'}.../>
**/

export const ButtonsList = ({style: {direction}, children}) => {
  
  const setStyle = direction ?? 'column';

  return (
    <ul className={`button-list ${setStyle}`}>
      {children.map((child) => 
              <li key={child} className="buttons-list-item">
                  {child}
              </li>
          )}
    </ul>
  )
}

