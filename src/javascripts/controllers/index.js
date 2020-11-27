export const indexPage = (req, res, next) => {
  res.render('layout', {
    content: 'index', 
    pageName: 'recipesPage',
    title: 'Recipes', 
    message: 'Keep track of all of your recipes in one place'})
}

export const aboutPage = (req, res, next) => {
  res.render('layout', {
    content: 'about', 
    pageName: 'aboutPage',
    title: 'About Us', 
    message: 'We think that delicious food is an important part of life'
  })
}

export const contactPage = (req, res, next) => {
  res.render('layout', {
    content: 'contact', 
    pageName: 'contactPage',
    title: 'Contact Us', 
    message: 'Send us a message'})
}

export const signInPage = (req, res, next) => {
  res.render('layout', {
    content: 'signin', 
    pageName: 'signInPage',
    title: 'Sign In',
    message: 'Log into your account'
  })
}

export const signUpPage = (req, res, next) => {
  res.render('layout', {
    content: 'signup', 
    pageName: 'signUpPage',
    title: 'Sign Up',
    message: 'Create an account'
  })
}