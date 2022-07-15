import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    allGames: [],
    gameSearched: [],
    itemSearch:[],//[...this.gameSearched]?.splice(0, 15),
    game: {},
    allGenres: [],
    loading: false,
    search: "",
}

export const gameSlice = createSlice({
    name: "videogames",
    initialState,
    reducers: {
        setAllGames: function (state, action) {
            state.allGames = action.payload;
        },
        setGame: function (state, action) {
            state.game = action.payload
        },
        setAllGenres: function (state, action) {
            state.allGenres = action.payload
        },
        setLoading: function (state, action) {
            state.loading = action.payload
        },
        setSearch: function (state, action) {
            state.search = action.payload
        },
        gameSearched: function (state, action) {
            state.gameSearched = action.payload
        },
        setItemSearch: function (state, action) {
            state.itemSearch = action.payload
        },
    }
})

export const { setAllGames, setAllGenres, setGame, setLoading, setSearch, gameSearched } = gameSlice.actions;

export default gameSlice.reducer;

export const getAllGames = (input) => async (dispatch) => {
    try {
        if(input===""||input===undefined){
            dispatch(setLoading(true));
            const games = await axios.get("https://gamer-cave-api.herokuapp.com/videogames");
            dispatch(setAllGames(games.data));
            dispatch(setLoading(false));
        }else{
            dispatch(setSearch(input))
    return axios.get(`https://gamer-cave-api.herokuapp.com/videogames?name=${input}`)
        .then((response) => response.data)
        .then((data) => {
            console.log(data)
            dispatch(gameSearched(data))
            return data;
        })
        .catch((err) => console.log(err))
        }
        
    } catch (error) {
        alert("Error al requerir los games")
    }
}


export const putSearchedGames = (input) => (dispatch) => {
    if(input===undefined) dispatch(setSearch(""))
    else dispatch(setSearch(input))
    return dispatch(gameSearched([]))
}

export const getAllGenres = () => (dispatch) => {

    return axios.get(`https://gamer-cave-api.herokuapp.com/genres`)
        .then((response) => response.data)
        .then((data) => {
            dispatch(setAllGenres(data))
        })
        .catch((error) => console.log(error))
}

export const getGame = (idGame) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        const game = await axios.get(`https://gamer-cave-api.herokuapp.com/videogame/${idGame}`)
        console.log(game)
        dispatch(setGame(game.data));
        dispatch(setLoading(false));
    } catch (error) {
        console.log(error);
    }
}

export const getItemSearch = (info) => async (dispatch) => {
    dispatch(setItemSearch(info))
}

export const postGame = (data) =>{
    try {
        return axios({
            method: "post",
            url: "https://gamer-cave-api.herokuapp.com/videogames/",
            data: data
        })
    } catch (error) {
        return error
    }
}