import SimpleSchema from 'simpl-schema'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

export const User = new Mongo.Collection('user')
const Schemas = {}

Schemas.UserSchema = new SimpleSchema({
  email: {
    type: String,
    label: 'Email',
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})
User.attachSchema(Schemas.UserSchema)
