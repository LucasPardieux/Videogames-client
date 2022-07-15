import React from 'react'
import Card from '../Card/Card';
import style from "./Cards.module.css"
import { useSelector } from 'react-redux';


export const Cards = (props) => {

    const search = useSelector(state => state.videogames.search);

    const eachGame = props.allGames?.map((g) => {
        return (
            <div key={g.id} className={`${style.eachGame}`}>
                <li key={g.id}>
                    <Card
                        key={g.id}
                        id={g.id}
                        name={g.name}
                        image={g.image}
                        genres={g.genres}
                        rating={g.rating}
                        platforms={g.platforms}
                    />
                </li>
            </div>
        )
    })


  return (
    <div className={`${style.contenedor}`}>
            {search!==""?<div className={`${style.prevNext}`}>
                <p>{props.currentPage+1}</p>
                <span>/</span>
                <p>{Math.ceil(props.pageCount)}</p>
            </div>:<div></div>}
            <ul className={`${style.ulGame}`}>
                {props.allGames?.length!==0?eachGame:"No games found"}
            </ul>
        </div>
  )
}
