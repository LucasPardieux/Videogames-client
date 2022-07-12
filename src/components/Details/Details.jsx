import React, { Component } from 'react'
import { connect } from "react-redux";
import style from "./Details.module.css"
import { getGame } from '../../redux/reducer/reducer';
import { ImStarEmpty, ImStarHalf, ImStarFull } from "react-icons/im"
import user from "../../images/pinpng.png"

export class Details extends Component {

    componentDidMount() {
        this.props.getGame(this.props.match.params.idGame);
    }


    mapGenres(genres) {
        const newArray = genres?.map((g) => g.name)
        return newArray?.join(" | ")
    }

    mapPlatforms(platforms) {
        const newArray = platforms?.map((p) => {
            console.log(p);
            if(p.hasOwnProperty("platform")){
                return p.platform.name
            }else{
                return p
            }
        });
        return newArray?.join(" | ");
    }

    mapDevelopers(developers) {
        const newArray = developers?.map((d) => d.name);
        return newArray?.join(" , ");
    }

    ratingStars(r) {
        switch (true) {
            case r === 0:
                return [<ImStarEmpty />, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>]
                
            case r > 0 && r < 0.5:
                return [<ImStarEmpty />, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>]
                
            case r >= 0.5 && r < 1:
                return [<ImStarHalf />, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>]
                
            case r === 1:
                return [<ImStarFull />, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>]
                
            case r > 1 && r < 1.5:
                return [<ImStarFull />, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>]
                
            case r >= 1.5 && r < 2:
                return [<ImStarFull />, <ImStarHalf />, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>]
                
            case r === 2:
                return [<ImStarFull />, <ImStarFull />, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>]
                
            case r > 2 && r < 2.5:
                return [<ImStarFull />, <ImStarFull />, <ImStarEmpty/>, <ImStarEmpty/>, <ImStarEmpty/>]
                
            case r >= 2.5 && r < 3:
                return [<ImStarFull />, <ImStarFull />, <ImStarHalf />, <ImStarEmpty/>, <ImStarEmpty/>]
                
            case r === 3:
                return [<ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarEmpty/>, <ImStarEmpty/>]
                
            case r > 3 && r < 3.5:
                return [<ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarEmpty/>, <ImStarEmpty/>]
                
            case r >= 3.5 && r < 4:
                return [<ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarHalf />, <ImStarEmpty/>]
                
            case r === 4:
                return [<ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarEmpty/>]
                
            case r > 4 && r < 4.5:
                return [<ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarEmpty/>]
                
            case r >= 4.5 && r < 5:
                return [<ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarHalf />]
                
            case r ===5:
                return [<ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarFull />, <ImStarFull />]
                
            default:
                break;
        }
    }

    ratingComments(ratings){
        const commets = ratings?.map((r) => {return {name: r.title, image: user}})
        return commets;
    }

    showHtml() {
        return (<div>
            {console.log(this.props)}
            <div className={`${style.headerImage}`}>
                <img src={this.props.game.background_image?this.props.game.background_image:this.props.game.image} alt={`${this.props.game.name} background`} />
            </div>
            <div className={`${style.gameImage}`}>
                <img src={this.props.game.background_image?this.props.game.background_image:this.props.game.image} alt={`${this.props.game.name} game`} />
            </div>
            <div className={`${style.gameDetails}`}>
                <h1>{this.props.game.name}</h1>
                <h3>Genres: <span>{this.mapGenres(this.props.game.genres)}</span> </h3>
                <h3>Platforms: <span>{this.mapPlatforms(this.props.game.platforms)}</span></h3>
                <h3>Developers: <span>{this.props.game.developers?this.mapDevelopers(this.props.game.developers):"N/D"}</span></h3>
                <h3>Released: <span>{this.props.game.released}</span> </h3>
            </div>
            <div className={`${style.gameScore}`}>
                <div className={`${style.gameRating}`}>
                    <div className={`${style.ratingSpan}`}>
                        <span>{this.props.game.rating}</span>
                    </div>
                    <div className={`${style.starsSpan}`}>
                        <span>{this.ratingStars(this.props.game.rating)}</span>
                    </div>

                    <div className={`${style.gameComents}`}>
                        {this.props.game.ratings?this.ratingComments(this.props.game.ratings)?.map((r)=>{return (<div>
                            <div className={`${style.eachComment}`}>
                            <img src={r.image} alt="user" /> <span>"{r.name}"</span>
                            </div>
                        </div>)}):<span>"No game comments"</span>}
                    </div>
                    
                </div>
            </div>
            <div className={`${style.gameDescription}`}>
                <h1>Game description: </h1>
                <div />
                <p>{this.props.game.description_raw?this.props.game.description_raw:this.props.game.description}</p>
            </div>
        </div>)
    }


    render() {
        return (
            <div>
                {this.props.loading === true ? "Loading..." : this.showHtml()}
            </div>
        )
    }
}

export const mapStateToProps = (state) => {
    return {
        game: state.videogames.game,
        loading: state.videogames.loading
    }
};

export const mapDispatchToProps = (dispatch) => {
    return {
        //getAllDiets: () => dispatch(getAllDiets()),
        getGame: (idGame) => dispatch(getGame(idGame))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Details)