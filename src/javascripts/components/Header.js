import React from 'react'

export function Header(props) {
  return (
    <>
    <div className="section is-medium" id="topImage">
    </div>
    <div className="section lightBlueBackground">
      <div className="container">
        <h1 className="title has-text-white has-text-centered">{props.heading}</h1>
        <p className="subtitle has-text-white has-text-centered">{props.message}</p>
      </div>
    </div>
    </>
  )
}