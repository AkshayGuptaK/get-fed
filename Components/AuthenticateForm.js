import React from 'react'
import { Container, Col, Button, FormFeedback, FormGroup, Label, Input } from 'reactstrap'

import config from '../config'

class AuthenticateForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      status: '',
      passwordStatus: false,
      emailStatus: false,
      loggedIn: false
    }
  }
  componentDidMount () {
    console.log('The props in authenticateForm are ', this.props)
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
    if (event.target.name === 'password') {
      this.validatePassword(event.target.value)
    } else this.validateEmail(event.target.value)
  }
  validatePassword = (password) => {
    if (password.length >= 7) {
      this.setState({ passwordStatus: true })
    } else this.setState({ passwordStatus: false })
  }
  validateEmail = (email) => {
    this.setState({ emailStatus: /^(\S+)@(\S+).(\S+)$/.test(email) })
  }
  submit = async () => {
    let result = await fetch(`${config.domain}/auth/${this.props.route}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: this.state.email, password: this.state.password })
    })
    // .then(res => res.json())
    console.log('submit response is', result)
    if(result.ok) {
      this.props.reroute()
    }
    // this.setState({ status: this.props.statusMessage(result.code) })
    // if (result.code === 3 && this.props.reroute !== undefined) {
    //   this.props.reroute(result.user)
  }
  render () {
    return(
      <Container>
        <AuthenticationField id='email' label='Email' name='email' type='email' value={this.state.email} placeholder='Enter email address' valid={this.state.emailStatus} invalidMessage='This is not a valid email' handleChange={this.handleChange} />
        <AuthenticationField id='password' label='Password' name='password' type='password' value={this.state.password} placeholder='Enter password' valid={this.state.passwordStatus} invalidMessage='Password must be at least seven characters' handleChange={this.handleChange} />
        <Button onClick={this.submit} disabled={!(this.state.passwordStatus && this.state.emailStatus)} style={{ display: 'block', width: 15 + '%', margin: 'auto' }}>Continue</Button>
        <p>{this.state.status}</p>
      </Container>
    )
  }
}

function AuthenticationField (props) {
    return <FormGroup row>
        <Label for={props.name} sm={2}>{props.label}</Label>
        <Col sm={10}>
          <Input
            bsSize='lg'
            type={props.type}
            name={props.name}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.handleChange}
            valid={props.valid}
            invalid={!props.valid}
          />
          <FormFeedback valid>Nice</FormFeedback>
          <FormFeedback className={props.value.length > 0 ? '' : 'regular'}>{props.value.length > 0 ? props.invalidMessage : props.placeholder}</FormFeedback>
          <style jsx global>{ `.regular { color: #6c757d }` }</style>
        </Col>
      </FormGroup>
}

export default AuthenticateForm
