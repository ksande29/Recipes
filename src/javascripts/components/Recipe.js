import React from 'react'
import {useHistory} from 'react-router-dom'
import { format } from 'date-fns';

export function Recipe(props) {
  const r = props.recipe
  const history = useHistory()
 
  return (
    <>
    <div className="column is-half has-text-centered">
      <div className="card">
        <div className="card-image">
            <figure className="image is-3by2">
              <img 
                src={r.foodImage} alt={r.title} />
            </figure>
        </div>
        <div className="card-content">
          <div className="content">
            <h2 className="title capitalize">{r.name}</h2>
            <p className="">{r.description}</p>
            <p className="has-text-left capitalize">{r.type}</p>
            <p className="has-text-left capitalize">
            {(()=> {
              if (Math.floor(r.time / 60) !== 0) {
                return <>{Math.floor(r.time / 60)} hours &nbsp;</>
              } 
            })()}
            {(()=> {
              if (r.time % 60 !== 0) {
                return <>{r.time % 60} minutes</>
              } 
            })()}
            </p>
            <p className="has-text-left capitalize">Serves {r.serves}</p>
          </div>
        </div>
        <footer className="card-footer lightGreenBackground">
          <div className="card-footer-item">
            <div className="buttons">
              <button className="button greenBackground has-text-white" onClick={() => history.push(`/recipes/${r.id}/view`)}>Recipe Details</button>
              <button className="button greenBorder greenText" onClick={() => history.push(`/recipes/${r.id}/edit`)}>Edit Recipe</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
    </>
  )
}