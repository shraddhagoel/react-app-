import SimpleSchema from 'simpl-schema'
import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

export const User = new Mongo.Collection('user')
const Schemas = {}

Schemas.UserSchema = new SimpleSchema({

//   name: {
//     type: String,
// ,    // match : /[a-z][A-z]/,
//     unique: true,
//     label: 'Name',
//     // validate: nameValidator,
//     required: true
//   }
  email: {
    type: String,
    label: 'Email',
    // match: /\S+@\S+\.\S+/,
    // type : mongoose.SchemaTypes.Email,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

// SimpleSchema.messages({
//   unique: '[label] should be unique'
// })

User.attachSchema(Schemas.UserSchema)
