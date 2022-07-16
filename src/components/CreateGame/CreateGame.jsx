import React, { Component } from 'react'
import { getAllGames, getAllGenres, postGame } from '../../redux/reducer/reducer';
import style from "./CreateGame.module.css"
import { connect } from "react-redux";
import Card from '../Card/Card';


export class CreateGame extends Component {

    constructor() {
        super();
        this.state = {
            gamePlatforms: ["pc", "playstation", "xbox", "ios", "android", "nintendo", "macOS", "Linux", "ps-vita", "psp", "wii", "gamecube", "gameBoy", "snes", "nes", "macintosh", "apple", "commodore", "atari", "genesis", "sega", "dreamcast", "3do", "jaguar", "game gear", "neo geo"],
            name: "",
            released: "",
            rating: 0,
            description: "",
            image: "",
            genres: [],
            platforms: [],
            preview: {
                name: "",
                rating: 0,
                genres: [],
                image: "",
            },
            errors: {
                name: "",
                released: "",
                rating: "",
                description: "",
                image: "",
            },
            disabled: true
        }
    }

    componentDidMount() {
        this.props.getAllGenres()
    }

    fillPreview(e) {
        const value = e.target.value;
        const name = e.target.name;
        let preview = this.state.preview;
        const check = e.target.checked;

        if(name === "rating" && this.state.rating.length>=5) return;
        
        if (name === "genres" && check === false) {
            let newArr = preview.genres;
            let index = newArr.findIndex((element) => element.name === value)
            if (index !== -1) {
                newArr.splice(index, 1)
                preview.genres = newArr
            }
            return this.setState({ preview });
        }

        if (name === "genres") {
            preview.genres = [...preview.genres, { name: value }]
        }

        switch (name) {
            case "name":
                preview.name = value;
                break;
            case "rating":
                preview.rating = value;
                break;
            case "image":
                preview.image = value;
                break;
            default:
                break;
        }
        this.setState({
            preview
        });
    }

    firstWordUpperCase(word) {
        return word[0].toUpperCase() + word.slice(1);
    }

    validarForm(errors) {
        let valid = true;
        Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
        if (valid) {
            this.setState({
                disabled: false
            })
        } else {
            this.setState({
                disabled: true
            })
        }
    }

    handleChange(e) {
        const value = e.target.value;
        const name = e.target.name;
        const check = e.target.checked;
        let errors = this.state.errors;

        if (name === 'genres' && check === false) {
            this.setState((state) => {
                let newArr = state.genres;
                let index = newArr.findIndex((element) => element === value)
                console.log(index);
                if (index !== -1) {
                    newArr.splice(index, 1)
                    return { [name]: newArr }
                }
            })
            return;
        }


        if (name === 'genres') {
            this.setState((state) => {
                return { [name]: [...state.genres, value] }
            });
            return;
        }
        //gamePlatform
        if (name === 'platforms' && check === false) {
            this.setState((state) => {
                let newArr = state.platforms;
                let index = newArr.findIndex((element) => element === value)
                if (index !== -1) {
                    newArr.splice(index, 1)
                    return { [name]: newArr }
                }
            })
            return;
        }


        if (name === 'platforms') {
            this.setState((state) => {
                return { [name]: [...state.platforms, value] }
            });
            return;
        }

        switch (name) {
            case 'name':
                let namePattern = /[a-zA-Z]{2,20}/
                errors.name = namePattern.test(value) ? '' : 'The title must have at least 2 characters and not contain any special characters or numbers'
                break;
            case 'released':
                let fechas = value
                let date = new Date()
                let dateNow = (date.getFullYear() + "-"+0+ (date.getMonth()+1)+ "-" +date.getDate())
                errors.released = dateNow<fechas? 'The date entered is invalid.' : '';
                break;
            case 'rating':
                errors.rating = (value < 0 || value > 5) || this.state.rating.length>=5 ? 'The rating must be in a range between 0 and 5 and you must enter less than 5 characters' : '';
            break;
            case 'image':
                let urlPattern = /[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_.~#?&//=]*)?/gi;
                errors.image = urlPattern.test(value) ? '' : 'The image url is not valid';
                break;
            case 'description':
                let descriptionPattern = /[a-zA-Z]{5,500}/;
                errors.description = descriptionPattern.test(value) ? '' : 'The description must be between 5 and 500 characters and contain no special characters or numbers.';
                break;
            default:
                break;
        }

        this.setState({
            [name]: value,
            errors
        });
        this.validarForm(this.state.errors)
    }


    handleSubmit(e){
        e.preventDefault();
        let { name, description, released, rating, image, genres, platforms } = this.state;
        name = this.firstWordUpperCase(name);
            const idGenres = this.props.allGenres?.map((g) => {
                for(let x in genres){
                    if(genres[x]===g.name){
                        return g.id;
                    }
                }
            })
            genres=idGenres.filter((g)=>g!==undefined);

            const newGame = {
                name, description, released, rating, image, genres, platforms
            }
            console.log(newGame);
            postGame(newGame)
            .then(()=> {
                let form = document.getElementById("form")
                form.reset();
                this.props.getAllGames();
                window.alert("successfully created Game")
            })
    }


    render() {
        return (
            <div>
                <div className={`${style.contenedor}`}>
                    <h1>Create your own Game</h1>
                    <div className={`${style.form}`}>
                        <form id='form' /*onSubmit={(e) => e.preventDefault()}*/>
                            <div className={`${style.inputs}`}>
                                <h5>Game title:*</h5>
                                <input name="name" type="text" maxLength={22} onChange={(e) => { this.fillPreview(e); this.handleChange(e) }} />
                                {!this.state.errors.name ? null : <div className={`${style.error}`}>{this.state.errors.name}</div>}
                                <h5>Released date:*</h5>
                                <input name="released" type="date" onChange={(e) => {this.handleChange(e)}} />
                                {!this.state.errors.released ? null : <div className={`${style.error}`}>{this.state.errors.released}</div>}
                                <h5>Rating:</h5>
                                <input name="rating" type="number" step={0.01} min={0} max={5} onChange={(e) => { this.fillPreview(e); this.handleChange(e) }} />
                                {!this.state.errors.rating ? null : <div className={`${style.error}`}>{this.state.errors.rating}</div>}
                                <h5>image URL:</h5>
                                <input name="image" type="text" onChange={(e) => { this.fillPreview(e); this.handleChange(e) }} />
                                {!this.state.errors.image ? null : <div className={`${style.error}`}>{this.state.errors.image}</div>}
                                <h5>Description:</h5>
                                <textarea className={`${style.stepByStep}`} onChange={(e) => {this.handleChange(e)}} id='buttonStep' name="description" type="text" minLength={5} maxLength={500} />
                                {!this.state.errors.description ? null : <div className={`${style.error}`}>{this.state.errors.description}</div>}
                            </div>
                            <h5>Genres:*</h5>
                            <div className={`${style.checkCont}`}>
                                <ul className={`${style.UndordenedList}`}>
                                    {this.props.allGenres && this.props.allGenres?.map((genre, index) => {
                                        return (
                                            <li className={`${style.listItem}`} key={index}>
                                                <label htmlFor={genre.name}>{genre.name}</label><input type="checkbox" name="genres" value={genre.name} onChange={(e) => { this.fillPreview(e); this.handleChange(e) }} />
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <h5>Platforms:*</h5>
                            <div className={`${style.checkCont}`}>
                                <ul className={`${style.UndordenedList}`}>
                                    {this.state.gamePlatforms && this.state.gamePlatforms?.map((platform, index) => {
                                        return (
                                            <li className={`${style.listItem}`} key={index}>
                                                <label htmlFor={platform}>{platform}</label><input type="checkbox" name="platforms" value={platform} onChange={(e) => {this.handleChange(e)}} />
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                            <input className={`${style.button}`} disabled={this.state.disabled} name="button" type="submit" value="Create Game" onClick={(e) => this.handleSubmit(e)} />
                        </form>
                    </div>
                </div>
                <div className={`${style.preview}`}>
                    <Card
                        id={0}
                        name={this.state.preview.name}
                        image={this.state.preview.image?this.state.preview.image:"https://res.cloudinary.com/lmn/image/upload/e_sharpen:100/f_auto,fl_lossy,q_auto/v1/gameskinnyop/d/7/d/orig_d7dec62511f8a78172d019fbbbb66e36.jpg"}
                        genres={this.state.preview.genres}
                        rating={this.state.preview.rating}
                        platforms={[]}
                    />
                </div>

            </div>
        )
    }
}

export const mapStateToProps = (state) => {
    return {
        allGenres: state.videogames.allGenres
    }
};

export const mapDispatchToProps = (dispatch) => {
    return {
        getAllGenres: () => dispatch(getAllGenres()),
        getAllGames: () => dispatch(getAllGames()),
        postGame: () => dispatch(postGame()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateGame)