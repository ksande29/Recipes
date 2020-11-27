import React, {useContext, useState} from 'react'
import {RecipeContext} from './RecipeList'
import {useHistory, useParams} from 'react-router-dom'
import { format } from 'date-fns';
import Modal from 'react-modal'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default function RecipeDetails() {
  let {recipes, setRecipes, authenticated, setAuthenticated} = useContext(RecipeContext)
  let [modalOpen, setModalOpen] = useState(false)
  let {rid} = useParams()
  let recipe = rid ? recipes.find(r => r.id == rid) : {}

  const history = useHistory()
  const deleteRecipe = () => {
    fetch(`/api/recipes/${rid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: 'same-origin',
    }).then(() => {
      toast('Successfully deleted', {
        onClose: () => {
          document.location = "/recipes"
        }
      })
      setModalOpen(false)
    }).catch((error) => {
      toast('Failed to submit', {
        onClose: () => {
          document.location = "/recipes"
        }
      })
    })
  }

  let [name, setName] = useState(recipe.name)
  let [description, setDescription] = useState(recipe.description)
  let [source, setSource] = useState(recipe.source)
  let [foodImage, setFoodImage] = useState(recipe.foodImage)
  let [type, setType] = useState(recipe.type)
  let [time, settime] = useState(recipe.time)
  let [serves, setServes] = useState(recipe.serves)
  let [ingredients, setIngredients] = useState(recipe.ingredients)
  let [directions, setDirections] = useState(recipe.directions)

  return (
   <>
      <div className="section">
        <div className="container">
          <figure className="image">
            <img src={foodImage} alt={name} />
          </figure>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <h2 className="title darkBlueText has-text-centered capitalize">{name}</h2>
          <p className="has-text-centered has-text-black">{description}</p>
          <br/>
          <button className="button lightBlueBackground has-text-white is-pulled-left" onClick={() => history.push('/recipes')}>Back</button>
          <div className="buttons is-pulled-right">
            <button className="button darkBlueBackground has-text-white" onClick={() => history.push(`/recipes/${recipe.id}/edit`)}>Edit Recipe</button>
            <button className="button darkBlueBorder darkBlueText" onClick={() => {
              if (authenticated) setModalOpen(true)
              else document.location = '/signin'
            }}>Delete Recipe</button>
          </div>
        </div>
      </div>
      <div className="section lightGreenBackground">
        <div className="container">
          <h3 className="darkBlueText subtitle"><strong>Recipe Overview</strong></h3>
          <p className="capitalize"> Takes &nbsp;
          {(()=> {
              if (Math.floor(time / 60) !== 0) {
                return <>{Math.floor(time / 60)} hours  </>
              } 
            })()}
            {(()=> {
              if (time % 60 !== 0) {
                return <>{time % 60} minutes</>
              } 
            })()}
          </p>
          <p className="capitalize">Serves {serves} people</p>
          <p>Requires {ingredients.length} ingredients</p>
          {(()=> {
            if (source != "") {
              return <> 
              <br/>
              <p>View the <strong><a className="darkBlueText" href={source}>Original recipe</a></strong></p>
              </>
            } 
          })()}
        </div>
      </div>
      <div className="section">
        <div className="container">
          <h3 className="darkBlueText subtitle"><strong>Ingredients List</strong></h3>
          <ul>{ingredients.toString().split('\n').map(ingredient => <li key={ingredient}>{ingredient}</li>)}</ul>
        </div>
      </div>
      <div className="section lightGreenBackground">
        <div className="container">
          <h3 className="darkBlueText subtitle"><strong>Directions</strong></h3>
          <ul>{directions.toString().split('\n').map(direction => <li key={direction}>{direction}</li>)}</ul>
        </div>
      </div>

      <Modal isOpen={modalOpen} onRequestClose={()=>setModalOpen(false)} style={customStyles} contentLabel="Are you sure?">
        <p>Are you sure you want to <strong>delete</strong> this recipe?</p>
        <br/>
        <div className="buttons">
          <button className="button darkBlueBackground has-text-white" onClick={deleteRecipe}>Confirm Delete</button>
          <button className="button darkBlueBorder darkBlueText" onClick={() => setModalOpen(false)}>Cancel</button>
        </div>
      </Modal>
   </>
 )

}