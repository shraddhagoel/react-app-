import React, { Component } from 'react'
import Textarea from './Input.jsx'
// import { withTracker } from 'meteor/react-meteor-data'
// import ReactDOM from 'react-dom'

class Registration extends Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      message: ''
    }
    this.onsubmit = this.onsubmit.bind(this)
  }

  onsubmit (e) {
    console.log('going to register')
    const email = this.name.state.value
    const password = this.password.state.value
    console.log(email, password)

    Meteor.call ('insert', email, password, (err, res) => {
      // console.log("--------------",err)
      if (err) {
        console.log("Error @@@@@", err)

        this.setState({
          message: err.message
        })
      } else {
        console.log("Response @@@@@", res)
        this.setState({
          message: "Successfully Registered"
        })
      }
    })
  }

  render () {
    return (
      <center>
        <div>
          <h2>Registration</h2>
          <h4>email</h4>
          <Textarea name="email" type="email" placeholder="email" ref={(node) => { this.name = node }} />
          <h4>password</h4>
          <Textarea name="password" type="password" placeholder="password" ref={(node) => { this.password = node }} />
          <h4>Confirm Password</h4>
          <Textarea name="confirm" type="password" placeholder="confirm" />
          <br /><button onClick={this.onsubmit}> Sign Up </button>
          <h2>{this.state.message}</h2>

        </div>
      </center>

    )
  }
}
export default Registration
