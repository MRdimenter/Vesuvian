import './icon.scss'

const Icon = ({ iconName, iconFormat='png', width = 24, height = 24, styles, alt = 'icon' }) => {
  const iconStyles = `icon ${styles}`
  return (
    <img src={require(`../../common/assets/icons/${iconName}.${iconFormat}`)} width={width} height={height} className={iconStyles} alt={alt} />
  )
}

export {
  Icon,
}