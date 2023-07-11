const CustomersList = ({customersList}) => {
  return customersList.map((customer) => {
    return (
      <li className="list=item"
        key={customer.id}>
        {customer.userName}
      </li>
    )
  })
}

export {
  CustomersList,
}