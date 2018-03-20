import { Meteor } from 'meteor/meteor'

import {User} from './schema'
var bcrypt = require('bcrypt')
const saltRounds = 10
const Future = Npm.require('fibers/future')

// export const User = new Mongo.Collection('user')

if (Meteor.isServer) {
  Meteor.publish('User', function userPublication () {
    return User.find()
  })

  Meteor.methods ({
    'insert' (email, password) {
      console.log('register')
      var myFuture = new Future()
      bcrypt.hash(password, saltRounds)
        .then((hash) => {
          User.insert({
            email: email,
            password: hash
          }, (err, resp) => {
            if (err) {
              console.log('Error @@@@@@@@@@', err)
              myFuture.throw(err)
            } else {
              console.log('REsponse @@@@@@@@@@@', resp)
              myFuture.return(resp)
            }
          })
        })
      return myFuture.wait()
    },
    'login' (email, password) {
      var myFuture = new Future()      
      console.log('@@@@@@@@@@@@')
      var x = User.findOne({
        email: email
      })
      var hash = x.password
      var setflag = 0
      console.log(hash)
      bcrypt.compare(password, hash).then(function (res) {
        // res == true
        setflag = 1
        console.log('Yes i am Here ', setflag)
        myFuture.return(x.email)
      })
      return myFuture.wait()
    }

  })
}
