import React from 'react'
import fetch from 'isomorphic-unfetch'

import Restaurants from '../Components/Restaurants'

import {
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Row
} from 'reactstrap'

class RestaurantScaffold extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      query: ''
    }
  }
  onChange = (e) => {
    this.setState({ query: e.target.value.toLowerCase() })
  }
  render () {
    return (
      <div className='container-fluid'>
        <Row>
          <Col>
            <div className='search'>
              <InputGroup>
                <InputGroupAddon addonType='append'> Search </InputGroupAddon>
                <Input onChange={this.onChange} />
              </InputGroup>
            </div>
            <Restaurants restaurants={this.props.restaurants} />
          </Col>
        </Row>
        <style jsx>
          {`
            .search {
              margin: 20px;
              width: 500px;
            }
          `}
        </style>
      </div>
    )
  }
}

RestaurantScaffold.getInitialProps = async function (obj) {
  const res = await fetch(`${process.env.DOMAIN}/restaurant`)
  const data = await res.json()
  console.log('The user id defined is ', obj)
  console.log(`The data fetched : ${data.length}`)

  return {
    restaurants: data
  }
}

export default RestaurantScaffold
