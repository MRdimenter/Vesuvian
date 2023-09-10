import './title.scss';

const Title = ({text}) => {
  return (
    <div className='title h2-promo'>
      <span>{text}</span>
    </div>
  )
}

export {
  Title,
}