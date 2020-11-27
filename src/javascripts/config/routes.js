import express from 'express'
import {indexPage, aboutPage, contactPage, signInPage, signUpPage} from '../controllers/index'
import {allRecipesAPI, oneRecipeAPI, createRecipeAPI, updateRecipeAPI, deleteRecipeAPI} from '../controllers/recipes'
import {contactAPI} from '../controllers/contacts'
import {registerUserAPI, signUserInAPI} from '../controllers/users'
import jwt from 'jsonwebtoken'
import {APP_SECRET} from './vars'

let router = express.Router()

function isSignedIn(req) {
  try {
    jwt.verify(req.cookies.token, APP_SECRET)
    return true
  } catch(err) {
    console.log(err)
    return false
  }
}

function requireSignIn(req, res, next) {
  if (isSignedIn(req)) {
    next()
  } else {
    res.status(401)
    res.end()
  }
}

export function configureRoutes(app) {
  app.all('*', (req, res, next) => {
    app.locals.signedIn = isSignedIn(req)
    next()
  })
  
  router.get('/', indexPage)
  router.get('/about', aboutPage)
  router.get('/contact', contactPage)
  router.get('/signin', signInPage)
  router.get('/signup', signUpPage)
  router.get('/recipes*', indexPage)
  router.get('/register', indexPage)
  router.get('/signin', indexPage)

  //recipe API endpoints
  router.get('/api/recipes', allRecipesAPI)
  router.get('/api/recipes/:id', oneRecipeAPI)
  router.post('/api/recipes', requireSignIn, createRecipeAPI)
  router.put('/api/recipes/:id', requireSignIn, updateRecipeAPI)
  router.delete('/api/recipes/:id', requireSignIn, deleteRecipeAPI)

  //contact API endpoints
  router.post('/api/contact', contactAPI)

  //users API endpoints
  router.post('/api/users/register', registerUserAPI)
  router.post('/api/users/signin', signUserInAPI)

  app.use('/', router)
}