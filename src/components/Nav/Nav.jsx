import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import style from './Nav.module.css';
import logo from '../../images/gamerCaveLogo.png'
import Home from "../Home/Home.jsx"
import { putSearchedGames, getAllGames, getItemSearch, getRefreshPage } from '../../redux/reducer/reducer';
import { BiSearchAlt } from "react-icons/bi";
import inBuild from "../../images/Under-Construction-PNG-Images.png"
import {ImMenu} from "react-icons/im"
import {HiRefresh} from "react-icons/hi"




export class Nav extends Component {

    constructor(props) {
        super(props);
        this.searchHandler = this.searchHandler.bind(this);
    }

    async searchHandler(e) {
        const input = document.getElementById("inputSearch").value;
        this.props.history.push("/home")
        if (input === "" || input === " ") {
            this.props.putSearchedGames();
        } else {
            this.props.getItemSearch(await this.props.getAllGames(input));
            this.props.getAllGames(input);
        }
    }

    async refreshHandler (e){
        this.props.putSearchedGames();
        this.props.getAllGames();
    }


    render() {
        return (
            <div className={`${style.navContainer}`}>
                <nav className={`${style.nav}`}>
                    <ul className={`${style.navList}`}> 
                        <div className={`${style.navLogo}`}>
                            <Link to='/'><img src={logo} alt="gamerCave Logo" /></Link>
                        </div>
                        <li>
                            <Link to='/home' className={`${style.navLink}`}>Home</Link>
                        </li>
                        <li>
                            <Link to='/createVideogame' className={`${style.navLink}`}>Create</Link>
                        </li>
                        <li>
                            <Link to='/favorites' className={`${style.navLink}`}>Favorites</Link>
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
                            <button onClick={(e) => this.searchHandler(e)}><BiSearchAlt className={`${style.navSearchIcon}`} /></button>
                        </li>
                        <li>
                            <HiRefresh values='refresh' onClick={(e) => this.refreshHandler(e)} className={`${style.refreshIcon}`}/>
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
        getItemSearch: (data) => dispatch(getItemSearch(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav)