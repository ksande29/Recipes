import React, {useState, createContext, useEffect} from 'react'
import {Switch, Route, Link, Redirect, useHistory} from 'react-router-dom'
import {Recipe} from './Recipe'
import {Header} from './Header'
import RecipeForm from './RecipeForm'
import RecipeDetails from './RecipeDetails'
import {useCookies} from 'react-cookie'

export const RecipeContext = createContext()

export function RecipeList() {
  const [recipes, setRecipes] = useState()
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  let [authenticated, setAuthenticated] = useState(cookies.token !== undefined)
  const history = useHistory()

  useEffect(() => {
    if (!recipes) {
      fetch('/api/recipes', {
        credentials: 'same-origin'
      })
      .then(response => response.text())
      .then((data) => {
        setRecipes(JSON.parse(data, (key, value) => {
          const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:.*Z$/
          if(typeof value === 'string' && dateFormat.test(value)){
            return new Date(value)
          }
          return value
        }))
      })
      .catch(console.error)
    }
  })
  if(!recipes)
      return <p>Loading...</p>

  if(!authenticated) {
    document.location = '/signin'
    return <></>
  }

  return (
    <RecipeContext.Provider value={{recipes, setRecipes, authenticated, setAuthenticated}}>

    <div className="section">
      <div className="container">
        <div className="columns">
          <div className="column buttons is-right">
            <Route exact path="/recipes">
              <button className="button greenBackground has-text-white" onClick={() => history.push('/recipes/new')}>
                Add a New Recipe
              </button>
            </Route>
            <div className=" dropdown is-hoverable">
              <div className="dropdown-trigger">
                <Route exact path="/recipes">
                  <button className="button greenBorder greenText" aria-haspopup="true" aria-controls="dropdown-menu">
                    Sort Recipes
                  </button>
                </Route>
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  <a className="dropdown-item" onClick={() => {
                    recipes.sort((a, b) => {
                      if (a.type < b.type) {
                        return -1;
                      }
                      if (b.type < a.type) {
                          return 1;
                      }
                      return 0;
                    })
                    setRecipes(recipes.map(m => m))
                    console.log(recipes)
                  }}
                    >
                    Sort by recipe type
                  </a>
                  <a className="dropdown-item" onClick={() => {
                    recipes.sort((a, b) => {
                      if (a.serves < b.serves) {
                        return -1;
                      }
                      if (b.serves < a.serves) {
                          return 1;
                      }
                      return 0;
                    })
                    setRecipes(recipes.map(m => m))
                    console.log(recipes)
                  }}
                    >
                    Sort by number of servings
                  </a>
                  <a className="dropdown-item" onClick={() => {
                    recipes.sort((a, b) => {
                      if (a.id < b.id) {
                        return -1;
                      }
                      if (b.id < a.id) {
                          return 1;
                      }
                      return 0;
                    })
                    setRecipes(recipes.map(m => m))
                    console.log(recipes)
                  }}
                    >
                    Sort by default
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>


        <Switch>
          <Route exact path="/recipes">
            <div className="columns is-multiline">
              {recipes.map(recipe => <Recipe key={recipe.id} recipe={recipe} {...recipe}/>)}
            </div>
          </Route>
          <Route path="/recipes/new"><RecipeForm/></Route>
          <Route path="/recipes/:rid/edit"><RecipeForm/></Route>
          <Route path="/recipes/:rid/view"><RecipeDetails/></Route>
          <Redirect from="" to="/recipes"></Redirect>
        </Switch>
      </div>
    </div>
    </ RecipeContext.Provider>
  )
}