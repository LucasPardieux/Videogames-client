import React, { Component } from 'react'
import style from "./About.module.css"
import { GoListOrdered } from "react-icons/go"
import { IoIosCreate } from "react-icons/io"
import { BiSearchAlt } from "react-icons/bi"
import { TbListDetails } from "react-icons/tb"
import { GrFavorite } from "react-icons/gr"
import imageBack from "../../images/uncharted.jpg"


export class About extends Component {
    render() {
        return (
            <div className={`${style.allCont}`}>
                <div className={`${style.contenedor}`}>
                    <img src={imageBack} alt="background" />
                </div>
                <div className={`${style.descriptionAbout}`}>
                    <p>Thanks for visiting <span>Gamer Cave</span>. This web application was created with <span className={`${style.spanDif}`}>React, Redux, Express, Sequelize and Postgres</span>.
                        All the functionalities and styles were created with Javascript and native css.</p>
                </div>
                <div className={`${style.information}`}>
                    <ul >
                        <li>
                            <div className={`${style.divInfo}`}>
                                <i><GoListOrdered></GoListOrdered></i>
                                <p>You can sort your games by name, rating or genre for a better search</p>
                            </div>
                        </li>
                        <li>
                            <div className={`${style.divInfo}`}>
                                <i><IoIosCreate></IoIosCreate></i>
                                <p>You can create your favorite video games and view them in the list</p>
                            </div>
                        </li>
                        <li>
                            <div className={`${style.divInfo}`}>
                                <i><BiSearchAlt></BiSearchAlt></i>
                                <p>You can search for the games you want within a large database</p>
                            </div>
                        </li>
                        <li>
                            <div className={`${style.divInfo}`}>
                                <i><TbListDetails></TbListDetails></i>
                                <p>You can see the details, rating and descriptions of the games you want</p>
                            </div>
                        </li>
                        <li>
                            <div className={`${style.divInfo}`}>
                                <i><GrFavorite></GrFavorite></i>
                                <p>You can save your favorite games during your search to store them in a list.</p>
                            </div>
                        </li>
                    </ul>
                    <div className={`${style.ButtonCont}`}>
                        <a href="/home">
                            <span>Go Back</span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }
}

export default About