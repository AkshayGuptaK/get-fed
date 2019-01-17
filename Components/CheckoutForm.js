import React from 'react'
import Link from 'next/link'

import { FormGroup, Label, Input, button } from 'reactstrap'
// import Router from 'next/router'

class CheckoutForm extends React.Component {
  constructor (props) {
    super(props)
    console.log('Checkout props are', props) // debug
    this.state = {
      data: {
        address: '',
        city: '',
        state: '',
        country: ''
      },
      error: '',
      addressId: null // For the user
    }
    // this.submitOrder = this.submitOrder.bind(this)
  }

  componentDidMount () {
    this.props.userContext.socket.on('restaurantAddress', address => {
      console.log('The restaurant address received is ', address)
      this.props.cartContext.restaurantAddress = address
      console.log('The props are ', this.props)
    }) // take address and load track-order page
    fetch(`${this.props.userContext.domain}/user/addresses/${this.props.userContext.userId}/home`, {
      method: 'PUT',
      body: {address: {
        latitude: this.props.userContext.userLocation.coords.latitude,
        longitude: this.props.userContext.userLocation.coords.longitude,
        value: this.props.userContext.userAddress,
        apartment: '',
        landmark: ''
      }
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log('The received address is ', response)
        this.setState({addressId: response.addresses.home.id})
        console.log('After setting state ', this.state.addressId)
      })
  }

  onChange (propertyName, e) {
    const { data } = this.state
    data[propertyName] = e.target.value
    this.setState({ data })
  }

  submitOrder () {
    this.props.userContext.socket.emit('placeOrder', this.props.userContext.userId, this.state.addressId) // also address id
  }

  render () {
    return (
      <div className='paper'>
        <h5>Your information:</h5>
        <hr />
        <h4><Label>Home</Label></h4>
        <h5>{this.props.userContext.userAddress}</h5>
        <hr />
        {/* <FormGroup style={{ display: 'flex' }}>
          <div style={{ flex: '0.90', marginRight: 10 }}>
            <Label>Address</Label>
            <Input onChange={this.onChange.bind(this, 'address')} />
          </div>
        </FormGroup>
        <FormGroup style={{ display: 'flex' }}>
          <div style={{ flex: '0.65', marginRight: '6%' }}>
            <Label>City</Label>
            <Input onChange={this.onChange.bind(this, 'city')} />
          </div>
          <div style={{ flex: '0.25', marginRight: 0 }}>
            <Label>State</Label>
            <Input onChange={this.onChange.bind(this, 'state')} />
          </div>
        </FormGroup> */}
        <FormGroup style={{ display: 'flex' }}>
          <button>
            <Link href='/track-order'>
              <a onClick={this.submitOrder.bind(this)}>Place Order</a>
            </Link>
          </button>
        </FormGroup>

        <style jsx global>
          {`
            .paper {
              border: 1px solid lightgray;
              box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
                0px 1px 1px 0px rgba(0, 0, 0, 0.14),
                0px 2px 1px -1px rgba(0, 0, 0, 0.12);
              height: 550px;
              padding: 30px;
              background: #fafafa;
              border-radius: 6px;
              margin-top: 90px;
            }
            .form-half {
              flex: 0.5;
            }
            * {
              box-sizing: border-box;
            }
            body,
            html {
              background-color: #f6f9fc;
              font-size: 18px;
              font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
            }
            h1 {
              color: #32325d;
              font-weight: 400;
              line-height: 50px;
              font-size: 40px;
              margin: 20px 0;
              padd-> https://github.com/sharathgeorgem/get-feding: 0;
            }
            .Checkout {
              margin: 0 auto;
              max-width: 800px;
              box-sizing: border-box;
              padding: 0 5px;
            }
            label {
              color: #6b7c93;
              font-weight: 300;
              letter-spacing: 0.025em;
            }
            button {
              white-space: nowrap;
              border: 0;
              outline: 0;
              display: inline-block;
              height: 40px;
              line-height: 40px;
              padding: 0 14px;
              box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
                0 1px 3px rgba(0, 0, 0, 0.08);
              color: #fff;
              border-radius: 4px;
              font-size: 15px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.025em;
              background-color: #6772e5;
              text-decoration: none;
              -webkit-transition: all 150ms ease;
              transition: all 150ms ease;
              margin-top: 10px;
            }
            form {
              margin-bottom: 40px;
              padding-bottom: 40px;
              border-bottom: 3px solid #e6ebf1;
            }
            button:hover {
              color: #fff;
              cursor: pointer;
              background-color: #7795f8;
              transform: translateY(-1px);
              box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1),
                0 3px 6px rgba(0, 0, 0, 0.08);
            }
            input {
              display: block;
              margin: 10px 0 20px 0;
              max-width: 500px;
              padding: 10px 14px;
              font-size: 1em;
              font-family: "Source Code Pro", monospace;
              box-shadow: rgba(50, 50, 93, 0.14902) 0px 1px 3px,
                rgba(0, 0, 0, 0.0196078) 0px 1px 0px;
              border: 0;
              outline: 0;
              border-radius: 4px;
              background: white;
            }
            input::placeholder {
              color: #aab7c4;
            }
            input:focus {
              box-shadow: rgba(50, 50, 93, 0.109804) 0px 4px 6px,
                rgba(0, 0, 0, 0.0784314) 0px 1px 3px;
              -webkit-transition: all 150ms ease;
              transition: all 150ms ease;
            }
          `}
        </style>
      </div>
    )
  }
}

export default CheckoutForm
