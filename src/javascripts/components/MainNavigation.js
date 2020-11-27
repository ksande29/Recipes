import React from 'react'

export function MainNavigation() {
  return (
    <header>
      <div className="section removePaddingTop removePaddingBottom darkBlueBackground">
        <div className="container">
          <nav className="navbar darkBlueBackground" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
              <a className="navbar-item has-text-white" href="">
                YUMMY
              </a>
              <a role="button" className="navbar-burger has-text-white darkBlueBackground" data-target="recipeNavbar" aria-label="menu" aria-expanded="false">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>
            <div id="recipeNavbar" className="navbar-menu darkBlueBackground">
              <div className="navbar-end darkBlueBackground">
                <a className="navbar-item has-text-white" href="">
                  Recipes
                </a>
                <a className="navbar-item has-text-white" href="">
                  About Us
                </a>
                <a className="navbar-item has-text-white" href="">
                  Contact Us
                </a>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}