import React, {useContext, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {RecipeContext} from './RecipeList'
import {useFormik} from 'formik'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { format, parse } from 'date-fns';
import * as yup from 'yup'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { updateRecipeAPI } from '../controllers/recipes'

toast.configure()

export function VHelp({message}) {
  return <p className="has-text-danger">{message}</p>
  }

const validationSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  source: yup.string(),
  type: yup.string().required(),
  time: yup.number().required(),
  serves: yup.number().required(),
  foodImage: yup.string().url().required()
})

export default function NameForm() {
  let {recipes, setRecipes, authenticated, setAuthenticated} = useContext(RecipeContext)
  let {rid} = useParams()

  if(!authenticated) {
    document.location = '/signin'
    return <></>
  }

  let recipe = rid ? recipes.find(r => r.id == rid) : {}
  let is_new = rid === undefined
  let pageTitle = is_new ? "Create a New Recipe" : "Edit Recipe"
  let {handleSubmit, handleChange, values, errors, setFieldValue} = useFormik({
    initialValues: is_new ? {
      name: "",
      description: "",
      source: "",
      type: "",
      time: "",
      serves: "",
      foodImage: "",
      ingredients: "",
      directions: ""
    } : {...recipe},
    validationSchema,
    onSubmit(values){
      fetch(`/api/recipes${is_new ? '' : '/' + recipe.id}`, {
        method: is_new ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'same-origin',
        body: JSON.stringify(values)
      }).then(() => {
        toast('Successfully submitted', {
          onClose: () => {
            document.location = "/recipes"
          }
        })
      }).catch((error) => {
        toast('Failed to submit', {
          onClose: () => {
            document.location = "/recipes"
          }
        })
      })
    }
  })

  let [id, setId] = useState(recipe.id)
  
  const history = useHistory()
  const submit = e => {
    e.preventDefault();
  }

  return (
    <>
    <div className="section">
      <div className="container">
        <h2 className="title has-text-centered darkBlueText">{pageTitle}</h2>
      </div>
    </div>
    <div className="section lightGreenBackground">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label" htmlFor="name">Recipe Name</label>
            <div className="control">
            <input className="input" type="text" name="name" value={values.name} onChange={handleChange}></input>
              <VHelp message={errors.name} />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="description">Recipe Description</label>
            <div className="control">
              <textarea className="textarea" type="text" name="description" value={values.description} onChange={handleChange}></textarea>
              <VHelp message={errors.description} />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="source">Recipe Source Website (optional)</label>
            <div className="control">
            <input className="input" type="text" name="source" value={values.source} onChange={handleChange}></input>
              <VHelp message={errors.source} />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="type">Type of Recipe</label>
            <div className="control">
            <input className="input" type="text" name="type" value={values.type} onChange={handleChange}></input>
              <VHelp message={errors.type} />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="time">Prep / Cook Time (in minutes)</label>
            <div className="control">
            <input className="input" type="text" name="time" value={values.time} onChange={handleChange}></input>
              <VHelp message={errors.time} />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="serves">Number of People the Recipe Serves</label>
            <div className="control">
            <input className="input" type="text" name="serves" value={values.serves} onChange={handleChange}></input>
              <VHelp message={errors.serves} />
            </div>
          </div>
          <div className="field">
            <label className="label" htmlFor="name">Image Url</label>
            <div className="control">
            <input className="input" type="text" name="foodImage" value={values.foodImage} onChange={handleChange}></input>
              <VHelp message={errors.foodImage} />
            </div>
          </div>   

          <div className="field">
            <label className="label" htmlFor="ingredients">Ingredients</label>
            <div className="control">
              <textarea className="textarea" type="text" name="ingredients" value={values.ingredients} onChange={handleChange}></textarea>
              <VHelp message={errors.ingredients} />
            </div>
          </div>   
          <div className="field">
            <label className="label" htmlFor="directions">Directions</label>
            <div className="control">
              <textarea className="textarea" type="text" name="directions" value={values.directions} onChange={handleChange}></textarea>
              <VHelp message={errors.directions} />
            </div>
          </div>   

          <div className="field">
            <label></label>
            <div className="control">
              <div className="buttons">
                <button className="button greenBackground has-text-white">Submit</button>
                <button className="button greenBorder greenText" onClick={() => history.push('/recipes')}>Cancel</button>
              </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  </>
  )
}