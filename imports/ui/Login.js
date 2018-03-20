import React, { Component } from 'react'
import Textarea from './Input.jsx'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router-dom'
import App from './App.js'

class Login extends Component {
  constructor (props) {
    super(props)
    this.onsubmit = this.onsubmit.bind(this)
  }
  onsubmit (e) {
    console.log(this.name.state.value)
    const email = this.name.state.value
    const password = this.password.state.value
    th = this
    console.log(email, password)
    Meteor.call('login', email, password, (err, res) => {
      if (res == null) { console.log('Invalid Details', res) } else {
        console.log('Logged In')
        this.props.history.push('/dashboard')
      }
      if (err)
      {
        console.log(err)
      }
    })
  }
  render () {
    return (
      <center>
        <div>
          <h2>Login</h2>
          <h4>Email</h4>
          <Textarea name="email" type="email" placeholder="email" ref={(node) => { this.name = node }} />
          <h4>password</h4>
          <Textarea name="password" type="password" placeholder="password" ref={(node) => { this.password = node }} />
          <br /><button onClick={this.onsubmit}> Login </button>

        </div>
      </center>
    )
  }
}
export default Login
