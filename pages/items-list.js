import React from 'react'
import fetch from 'isomorphic-unfetch'
// import Layout from '../Components/Layout'
import { withContext } from '../Components/Context/ItemsContextProvider'
import { withRouter } from 'next/router'
import { compose } from 'recompose'
import Cart from '../Components/Cart'

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Container,
  Row
} from 'reactstrap'

class Items extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      items: {}
    }
  }

  componentDidMount () {
    fetch('http://localhost:3000/items')
      .then(res => res.json())
      .then(dish => {
        this.setState({
          items: dish
        })
      })
  }

  addItem (item) {
    this.props.context.addItem(item)
  }

  render () {
    console.log('The props for items-list are ', this.props)
    const items = this.state.items.menu
    console.log('Items in render are ', items)
    let display = []
    if (items) {
      items.map((names) => {
        Object.entries(names).map(([key, res]) => {
          display.push(...res.map(dish => {
            return <Card
              style={{ width: '30%', margin: '10px 10px 10px 0' }}
              key={dish._id}
              className='h-100'
            >
              <CardImg
                top
                style={{ height: 250 }}
                src={dish.img}
              />
              <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
              </CardBody>
              <div className='card-footer'>
                <Button
                  outline color='primary'
                  onClick={this.addItem.bind(this, dish)}
                >
                  + Add To Cart
                </Button>
              </div>
            </Card>
          })
          )
        })
        console.log('The names after map are ', names)
      })
    }
    console.log(display)
    if (items) {
      return (
        <React.Fragment>
          <div className='container-fluid'>
            <Row>
              <Col xs='9' style={{ padding: 0 }}>
                <div className='h-100'>
                  <Container fluid>
                    {display}
                  </Container>
                  <style jsx global>
                    {`
                    a {
                      color: white;
                    }
                    a:link {
                      text-decoration: none;
                      color: white;
                    }
                    .container-fluid {
                      margin-bottom: 30px;
                    }
                    .btn-outline-primary {
                      color: #007bff !important;
                    }
                    a:hover {
                      color: white !important;
                    }
                    .card-columns {
                      column-count: 3;
                    }
                    .card {
                      display: inline-block !important;
                    }
                  `}
                  </style>
                </div>
              </Col>
              <Col xs='3' style={{ padding: 0 }}>
                <div>
                  <h1>Cart</h1>
                  <Cart />
                </div>
              </Col>
            </Row>
          </div>
        </React.Fragment>)
    }
    return <h1>Loading</h1>
  }
}

Items.getInitialProps = async function () {
  const res = await fetch('http://localhost:3000/items')
  const data = await res.json()

  console.log(`The menu items fetched are : ${JSON.stringify(data, null, 4)}`)
  console.log(`The menu items fetched are : ${data.length}`)
  return {
    items: data
  }
}

export default compose(
  withRouter,
  withContext
)(Items)
