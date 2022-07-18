import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFavorites } from '../../redux/reducer/reducer'
import FavoriteCard from './FavoriteCards/FavoriteCard'
import style from "./Favorite.module.css"


export class Favorite extends Component {


  render() {
    return (
      <div className={`${style.contExt}`}>
        <div>
            <ul>
                {this.props.favorites?.map((f)=>{return (<li><FavoriteCard props={f}/></li>)})}
            </ul>
        </div>
      </div>
    )
  }
}

export const mapStateToProps = (state) => {
    return {
        favorites: state.videogames.favorites
    }
};

export const mapDispatchToProps = (dispatch) => {
    return {
        getFavorites: (data) => dispatch(getFavorites(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorite)