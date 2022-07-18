import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getAllGames, getAllGenres, getItemSearch } from '../../redux/reducer/reducer';
import style from "./Home.module.css";
import { useState, useEffect } from 'react';
import { Cards } from '../Cards/Cards';
import headerVideo from "../../images/header_l77cMXfi.mp4";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import {HiRefresh} from "react-icons/hi"
import Loading from '../Loading/Loading';


const Home = () => {

  const allGames = useSelector(state => state.videogames.allGames);
  const search = useSelector(state => state.videogames.search);
  const itemSearch = useSelector(state => state.videogames.itemSearch);
  const loading = useSelector(state => state.videogames.loading);
  const gameSearched = useSelector(state => state.videogames.gameSearched);
  const allGenres = useSelector(state => state.videogames.allGenres);
  const dispatch = useDispatch();

  const updateState = () => {
    let res = dispatch(getAllGames());
    dispatch(getAllGenres());
    return res
  }

  const ITEMS_PER_PAGE = 15;

  var [dataFromApi, satDataFromApi] = useState(allGames)
  var [DataSearchedFromApi, setDataSearchedFromApi] = useState(gameSearched)
  var [items, setItems] = useState([...allGames]?.splice(0, ITEMS_PER_PAGE))
  var [currentPage, setCurrentPage] = useState(0);
  let pageCount = dataFromApi.length / ITEMS_PER_PAGE;

  useEffect(() => {
    setCurrentPage(0);
    if (allGames.length === 0) updateState();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  if (items.length === 0) {
    for (let index = 1; index < 100; index++) {
      if (allGames.length !== 0) {
        setItems([...allGames].splice(0, ITEMS_PER_PAGE))
        satDataFromApi(allGames)
      }
    }
  }

  if (DataSearchedFromApi.length === 0) {
    for (let index = 1; index < 100; index++) {
      if (gameSearched.length !== 0) {
        dispatch(getItemSearch([...gameSearched].splice(0, ITEMS_PER_PAGE)))
        //setItemsSearch([...gameSearched].splice(0, ITEMS_PER_PAGE))
        setDataSearchedFromApi(gameSearched)
      }
    }
  }
  
  const filteredGames = () => {

    if (search !== "" || search === undefined) {
      return itemSearch
      /*?.slice(currentPage, currentPage + ITEMS_PER_PAGE)*/
    }
    return items?.slice(currentPage, currentPage + ITEMS_PER_PAGE)

  }
  const nextHandler = () => {
    if (search !== "") return;
    const totalData = dataFromApi.length;
    const nextPage = currentPage + 1;
    const firstIndex = nextPage * ITEMS_PER_PAGE;
    if (firstIndex >= totalData) return;
    setItems([...dataFromApi]?.splice(firstIndex, ITEMS_PER_PAGE))
    setCurrentPage(nextPage)
  }

  const prevHandler = () => {
    if (search !== "") return;
    const prevPage = currentPage - 1;
    if (prevPage < 0) return;
    const firstIndex = prevPage * ITEMS_PER_PAGE;
    pageCount = pageCount - 1;
    setItems([...dataFromApi]?.splice(firstIndex, ITEMS_PER_PAGE))
    setCurrentPage(prevPage)
  }

  const genreSelect = (e) => {
    const genre = e.target.value;
    setCurrentPage(0);

    if (search !== "") {
      if (genre === "null") {
        return dispatch(getItemSearch(gameSearched))
        //return setItemsSearch(DataSearchedFromApi)
      }
      const filteredGames = gameSearched.filter((r) => {
        if (r.hasOwnProperty("genres")) {
          return r.genres?.map(g => g.name).includes(genre)
        }
      })
      return dispatch(getItemSearch(filteredGames))
      //return setItemsSearch(filteredGames)

    } else {
      if (genre === "null") {
        setItems(allGames)
        return satDataFromApi(allGames)
      }

      const filteredGames = dataFromApi.filter((r) => {
        if (r.hasOwnProperty("genres")) {
          return r.genres?.map(g => g.name).includes(genre)
        }
      })
      setItems(filteredGames)
      satDataFromApi(filteredGames)
    }


  }

  const alphaOrder = (e) => {
    const value = e.target.value;
    setCurrentPage(0);



    if (value === "up") {
      if (search !== "") {
        const neatArray = [...gameSearched].sort((prev, next) => {
          if (prev.name > next.name) {
            return 1;
          }
          if (prev.name < next.name) {
            return -1;
          }
          return 0;
        })
        return dispatch(getItemSearch(neatArray))
        //return setItemsSearch(neatArray)
      } else {
        const neatArray = [...dataFromApi].sort((prev, next) => {
          if (prev.name > next.name) {
            return 1;
          }
          if (prev.name < next.name) {
            return -1;
          }
          return 0;
        })
        setItems(neatArray);
        return satDataFromApi(neatArray)
      }

    }
    if (value === "down") {
      if (search !== "") {
        const neatArray = [...gameSearched].sort((prev, next) => {
          if (prev.name > next.name) {
            return -1;
          }
          if (prev.name < next.name) {
            return 1;
          }
          return 0;
        })
        return dispatch(getItemSearch(neatArray))
        //return setItemsSearch(neatArray)
      } else {
        const neatArray = [...dataFromApi].sort((prev, next) => {
          if (prev.name > next.name) {
            return -1;
          }
          if (prev.name < next.name) {
            return 1;
          }
          return 0;
        })
        setItems(neatArray);
        satDataFromApi(neatArray)
        return;
      }

    }
  }

  const ratingOrder = async (e) => {
    let value = e.target.value;

    setCurrentPage(0);

    if (value === "down") {
      if (search !== "") {
        const neatArray = [...gameSearched].sort((next, prev) => {

          if (prev.rating < next.rating) {
            return 1;
          } else {
            return -1;
          }
        })
        return dispatch(getItemSearch(neatArray))
      } else {
        const neatArray = [...dataFromApi].sort((next, prev) => {

          if (prev.rating < next.rating) {
            return 1;
          } else {
            return -1;
          }
        })
        setItems(neatArray);
        satDataFromApi(neatArray)
        return;
      }

    }

    if (value === "up") {
      if (search !== "") {
        const neatArray = [...gameSearched].sort((next, prev) => {

          if (prev.rating > next.rating) {
            return 1;
          } else {
            return -1;
          }

        })
        return dispatch(getItemSearch(neatArray))
      } else {
        const neatArray = [...dataFromApi].sort((next, prev) => {

          if (prev.rating > next.rating) {
            return 1;
          } else {
            return -1;
          }
        })
        setItems(neatArray);
        satDataFromApi(neatArray)
        return;
      }

    }
  }

  const apiDataBase = async (e) => {
    let value = e.target.value;
    setCurrentPage(0);
    
    pageCount = 0;
    if (value === "api") {
      if (search !== "") {
        const neatArray = [...gameSearched].filter((e) => typeof(e.id)==="number")
        return dispatch(getItemSearch(neatArray))
      }else{
        const neatArray = [...allGames].filter((e) => typeof(e.id)==="number")
        setItems(neatArray.slice(0, 0 + ITEMS_PER_PAGE));
        satDataFromApi(neatArray)
        return;
      }
    }
    if (value === "db") {
      if (search !== "") {
        const neatArray = [...gameSearched].filter((e) => typeof(e.id)==="string")
        return dispatch(getItemSearch(neatArray))
      }else{
        const neatArray = [...allGames].filter((e) => typeof(e.id)==="string")
        setItems(neatArray.slice(0, 0 + ITEMS_PER_PAGE));
        satDataFromApi(neatArray)
        return;
      }
    }
  }

  const refreshHandler = () => {
    setCurrentPage(0)
    if(search===""){
      setItems(allGames)
      satDataFromApi(allGames)
    }else{
      setDataSearchedFromApi(gameSearched)
      dispatch(getItemSearch(gameSearched))
    }
  }


  return (
    <div className={`${style.homeAll}`}>
      <div className={`${style.homeVideo}`}>
        <video loop muted autoPlay="autoplay" src={`${headerVideo}`} poster="https://images4.alphacoders.com/903/thumb-1920-903637.jpg" />
      </div>
      <div className={`${style.filterContainer}`}>
        <ul>
          <div className={`${style.gridButton}`}>
            <li><button onClick={(e) => alphaOrder(e)} value={"up"}>▲name▲</button></li>
            <li><button onClick={(e) => alphaOrder(e)} value={"down"}>▼name▼</button></li>
            <li><button onClick={(e) => ratingOrder(e)} value={"up"}>▲rating▲</button></li>
            <li><button onClick={(e) => ratingOrder(e)} value={"down"}>▼rating▼</button></li>
            <li><button onClick={prevHandler}><AiOutlineArrowLeft /></button></li>
            <li><button onClick={nextHandler}><AiOutlineArrowRight /></button></li>
            <li><button onClick={(e) => apiDataBase(e)} value={"api"}>Api</button></li>
            <li><button onClick={(e) => apiDataBase(e)} value={"db"}>Data Base</button></li>
          </div>
          <li><select defaultValue={"null"} name="genres" onChange={e => genreSelect(e)}>
            <option value="null">All</option>
            {allGenres?.map((genre) => {
              return <option key={genre.id}>{genre.name}</option>
            })}
          </select></li>

        </ul>
      </div>
      <div className={`${style.refreshCont}`}>
      <button className={`${style.refreshButton}`} onClick={(e) => refreshHandler(e)} value={"db"}><HiRefresh/></button>
      </div>
      <div className={`${style.homeContainer}`}>
        <ul>
          {
            loading=== true? <div className={`${style.loading}`}><Loading></Loading></div>: search === "" ? <Cards allGames={filteredGames()} pageCount={pageCount} currentPage={currentPage} /> : <Cards allGames={filteredGames()} pageCount={1} currentPage={currentPage} />
          }
        </ul>
      </div>
    </div>
  )
}

export default Home