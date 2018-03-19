import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

var bcrypt = require('bcrypt');
const saltRounds = 10;
Future = Npm.require('fibers/future');
var myFuture = new Future();

export const User = new Mongo.Collection('user');

if (Meteor.isServer) {
    Meteor.publish('User', function userPublication() {
        return User.find();

    });
}

Meteor.methods({
    'insert'(email, password) {
        console.log("register");
        console.log('----10--------', User)

        bcrypt.hash(password, saltRounds)
            .then(function (hash) {
                User.insert({
                    createdAt: new Date(),
                    username: email,
                    password: hash
                })
            });

    },
    'login'(email, password) {
        console.log("@@@@@@@@@@@@")

        var x = User.findOne({
            username: email,
        })
        var hash = x.password
        var setflag = 0;
        console.log(hash);


        bcrypt.compare(password, hash).then(function (res) {
            // res == true
            setflag = 1;
            console.log("Yes i am Here ", setflag);
            myFuture.return(x.username)

        })
        return myFuture.wait();



    }

});
