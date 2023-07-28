import './guiSwitch.scss';

const GuiSwitch = ({text}) => {
  return (
    <label for="switch" class="gui-switch">
      {text}
      <input type="checkbox" role="switch" id="switch"></input>
    </label>
  )
}

export {
  GuiSwitch,
}