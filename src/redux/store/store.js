import { configureStore } from "@reduxjs/toolkit";
import videogames from "../reducer/reducer.js"

const store = configureStore({
    reducer: {
        videogames
    }
})

export default store;