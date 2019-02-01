import React from 'react'
import fetch from 'isomorphic-unfetch'

import RestaurantPortal from '../Components/RestaurantPortal'
import config from '../config'

class RestaurantView extends React.Component {
  constructor () {
    super()
    this.state = {}
  }
  render () {
    return (
      <RestaurantPortal id={this.props.id} domain={config.domain} />
    )
  }
}

RestaurantView.getInitialProps = async function () {
  let res = await fetch(`${config.domain}/dev/restaurant/dummy`)
    .then(res => res.json())
  console.log('id is', res.id)
  return { id: res.id }
}

export default RestaurantView
