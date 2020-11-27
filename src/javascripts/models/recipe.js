import mongoose from 'mongoose'

const Schema = mongoose.Schema

export let recipeSchema = new Schema({
  name: String,
  description: String,
  source: String,
  type: String,
  time: Number,
  serves: Number,
  foodImage: String,
  ingredients: String,
  directions: String
})

recipeSchema.virtual('id').get(function() {
  return this._id.toHexString()
})

recipeSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret, options) => {
    delete ret._v
    delete ret._id
  }
})

export let Recipe = mongoose.model("Recipe", recipeSchema, "food")