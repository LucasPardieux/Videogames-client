import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import style from './Nav.module.css';
import logo from '../../images/gamerCaveLogo.png'
import { putSearchedGames, getAllGames, getItemSearch } from '../../redux/reducer/reducer';
import { BiSearchAlt } from "react-icons/bi";
import inBuild from "../../images/Under-Construction-PNG-Images.png"


export class Nav extends Component {

    constructor(props){
        super(props);
        this.searchHandler = this.searchHandler.bind(this);
    }

    async searchHandler (){
        const input = document.getElementById("inputSearch").value;
        if(input === "" || input === " "){
            this.props.putSearchedGames();
        }else{
            this.props.getItemSearch(await this.props.getAllGames(input));
            this.props.getAllGames(input);
        }
    }


    render() {
        return (
            <div className={`${style.navContainer}`}>
                <nav className={`${style.nav}`}>
                    <ul className={`${style.navList}`}> 
                        <div className={`${style.navLogo}`}>
                            <img src={logo} alt="gamerCave Logo" />
                        </div>
                        <li>
                            <Link to='/home' className={`${style.navLink}`}>Home</Link>
                        </li>
                        <li>
                            <Link to='/createVideogame' className={`${style.navLink}`}>Create</Link>
                        </li>
                        <li>
                            <Link to='/home' className={`${style.navLink}`}>Rankings</Link>
                        </li>
                        <li>
                            <Link to='/home' className={`${style.navLink}`}>About</Link>
                        </li>
                        <div className={`${style.inBuild}`}>
                            <img src={inBuild} alt="inBuild" />
                        </div>
                        <div className={`${style.inBuild1}`}>
                            <img src={inBuild} alt="inBuild" />
                        </div>
                        <li className={`${style.navSearch}`}>
                            <input id='inputSearch' placeholder="Search..." type="text" />
                            <button onClick={this.searchHandler}><BiSearchAlt className={`${style.navSearchIcon}`} /></button>
                        </li>
                        <li>
                            <HiRefresh className={`${style.refreshIcon}`}/>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export const mapStateToProps = (state) => {
  return {
    search: state.videogames.search,
    itemSearch: state.videogames.itemSearch,
  }
};

export const mapDispatchToProps = (dispatch) => {
  return {
    putSearchedGames: () => dispatch(putSearchedGames()),
    getAllGames: (input) => dispatch(getAllGames(input)),
    getItemSearch: (data) => dispatch(getItemSearch(data))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav)