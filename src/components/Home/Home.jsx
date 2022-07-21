import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getAllGames, getAllGenres, getItemSearch } from '../../redux/reducer/reducer';
import style from "./Home.module.css";
import { useState, useEffect } from 'react';
import { Cards } from '../Cards/Cards';
import headerVideo from "../../images/header_l77cMXfi.mp4";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import { HiRefresh } from "react-icons/hi"
import { BsArrowUpShort } from "react-icons/bs"
import Loading from '../Loading/Loading';



const Home = () => {

  const allGames = useSelector(state => state.videogames.allGames);
  const search = useSelector(state => state.videogames.search);
  const loading = useSelector(state => state.videogames.loading);
  const itemSearch = useSelector(state => state.videogames.itemSearch);
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
  var [filteredGenres, setFilteredGenres] = useState([])
  var [items, setItems] = useState([...allGames]?.splice(0, ITEMS_PER_PAGE))
  var [currentPage, setCurrentPage] = useState(0);
  let pageCount = dataFromApi.length / ITEMS_PER_PAGE;

  useEffect(() => {
    if (allGames.length === 0) updateState();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (items.length === 0) {
    if (allGames.length !== 0) {
      setItems([...dataFromApi].splice(0, ITEMS_PER_PAGE))
      satDataFromApi(allGames)
    }
  }

  window.onscroll = function () {
    console.log(document.documentElement.scrollTop)
    if (document.documentElement.scrollTop > 600 || document.documentElement.scrollTop > 700) {
      console.log(document.querySelector("#goTopCont"));
      document.querySelector("#goTopCont")?.classList.add("Home_show__KPDPq")
    } else {
      console.log(document.querySelector("#goTopCont")?.classList);
      document.querySelector("#goTopCont")?.classList.remove("Home_show__KPDPq")
    }
  }

  const goUp = () => {
     window.scrollTo({
      top: 0,
      behavior: "smooth" 
    })
  }




  const filteredGames = () => {

    if (search !== "" || search === undefined) {
      return itemSearch
      /*?.slice(currentPage, currentPage + ITEMS_PER_PAGE)*/
    }
    return items;
    /*?.slice(currentPage, currentPage + ITEMS_PER_PAGE)*/

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
        satDataFromApi(gameSearched)
        setFilteredGenres([])
        return dispatch(getItemSearch(gameSearched?.slice(currentPage, currentPage + ITEMS_PER_PAGE)))
        //return setItemsSearch(DataSearchedFromApi)
      }
      const filteredGames = gameSearched.filter((r) => {
        if (r.hasOwnProperty("genres")) {
          return r.genres?.map(g => g.name).includes(genre)
        }
      })
      if (filteredGenres.includes(genre)) return;
      setFilteredGenres([...filteredGenres, e.target.value])
      if (filteredGames.length === 0) {
        dispatch(getItemSearch([{ name: "Game not found", id: "1f8p", image: "https://www.purposegames.com/images/games/background/271/271929.png" }]))
        return;
      }
      satDataFromApi(filteredGames)
      return dispatch(getItemSearch(filteredGames?.slice(currentPage, currentPage + ITEMS_PER_PAGE)))
      //return setItemsSearch(filteredGames)

    } else {
      if (genre === "null") {
        setFilteredGenres([])
        setItems(allGames?.slice(currentPage, currentPage + ITEMS_PER_PAGE))
        return satDataFromApi(allGames)
      }

      const filteredGames = dataFromApi.filter((r) => {
        if (r.hasOwnProperty("genres")) {
          return r.genres?.map(g => g.name).includes(genre)
        }
      })
      if (filteredGenres.includes(genre)) return;
      setFilteredGenres([...filteredGenres, e.target.value])
      if (filteredGames.length === 0) {
        setItems([{ name: "Game not found", id: "1f8p", image: "https://www.purposegames.com/images/games/background/271/271929.png" }])
        return;
      }
      satDataFromApi(filteredGames)
      setItems(filteredGames?.slice(currentPage, currentPage + ITEMS_PER_PAGE))
    }
  };

  const alphaOrder = (e) => {
    const value = e.target.value;
    setCurrentPage(0);



    if (value === "up") {
      if (search !== "") {
        const neatArray = [...itemSearch].sort((prev, next) => {
          if (prev.name > next.name) {
            return 1;
          }
          if (prev.name < next.name) {
            return -1;
          }
          return 0;
        })
        return dispatch(getItemSearch(neatArray?.slice(currentPage, currentPage + ITEMS_PER_PAGE)))
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
        setItems(neatArray?.slice(0, 0 + ITEMS_PER_PAGE));
        return satDataFromApi(neatArray)
      }

    }
    if (value === "down") {
      if (search !== "") {
        const neatArray = [...itemSearch].sort((prev, next) => {
          if (prev.name > next.name) {
            return -1;
          }
          if (prev.name < next.name) {
            return 1;
          }
          return 0;
        })
        return dispatch(getItemSearch(neatArray?.slice(currentPage, currentPage + ITEMS_PER_PAGE)))
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
        setItems(neatArray?.slice(0, 0 + ITEMS_PER_PAGE));
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
        const neatArray = [...itemSearch].sort((next, prev) => {

          if (prev.rating < next.rating) {
            return 1;
          } else {
            return -1;
          }
        })
        return dispatch(getItemSearch(neatArray?.slice(currentPage, currentPage + ITEMS_PER_PAGE)))
      } else {
        const neatArray = [...dataFromApi].sort((next, prev) => {

          if (prev.rating < next.rating) {
            return 1;
          } else {
            return -1;
          }
        })
        setItems(neatArray?.slice(0, 0 + ITEMS_PER_PAGE));
        satDataFromApi(neatArray)
        return;
      }

    }

    if (value === "up") {
      if (search !== "") {
        const neatArray = [...itemSearch].sort((next, prev) => {

          if (prev.rating > next.rating) {
            return 1;
          } else {
            return -1;
          }

        })
        return dispatch(getItemSearch(neatArray?.slice(currentPage, currentPage + ITEMS_PER_PAGE)))
      } else {
        const neatArray = [...dataFromApi].sort((next, prev) => {

          if (prev.rating > next.rating) {
            return 1;
          } else {
            return -1;
          }
        })
        setItems(neatArray?.slice(0, 0 + ITEMS_PER_PAGE));
        satDataFromApi(neatArray)
        return;
      }

    }
  }

  const apiDataBase = async (e) => {
    let value = e.target.value;
    setCurrentPage(0);
    setFilteredGenres([]);
    var options = document.getElementById("selectGenre")
    for (var i = 0, l = options.length; i < l; i++) {
      options[i].selected = options[i].defaultSelected;
    }

    pageCount = 0;
    if (value === "api") {
      if (search !== "") {
        const neatArray = [...gameSearched].filter((e) => typeof (e.id) === "number")
        return dispatch(getItemSearch(neatArray))
      } else {
        const neatArray = [...allGames].filter((e) => typeof (e.id) === "number")
        setItems(neatArray.slice(0, 0 + ITEMS_PER_PAGE));
        //setGames(neatArray);
        satDataFromApi(neatArray)
        return;
      }
    }
    if (value === "db") {
      if (search !== "") {
        const neatArray = [...gameSearched].filter((e) => typeof (e.id) === "string")
        return dispatch(getItemSearch(neatArray))
      } else {
        const neatArray = [...allGames].filter((e) => typeof (e.id) === "string")
        setItems(neatArray.slice(0, 0 + ITEMS_PER_PAGE));
        //setGames(neatArray);
        satDataFromApi(neatArray)
        return;
      }
    }
  }

  const refreshHandler = () => {
    setCurrentPage(0);
    dispatch(getAllGames());
    setFilteredGenres([]);
    var options = document.getElementById("selectGenre")
    for (var i = 0, l = options.length; i < l; i++) {
      options[i].selected = options[i].defaultSelected;
    }
    if (search === "") {
      setItems(allGames?.slice(currentPage, currentPage + ITEMS_PER_PAGE))
      satDataFromApi(allGames)
    } else {
      dispatch(getAllGames());
      dispatch(getItemSearch(gameSearched?.slice(currentPage, currentPage + ITEMS_PER_PAGE)))
    }
  }


  return (
    <div id='top' className={`${style.homeAll}`}>
      <div className={`${style.homeVideo}`}>
        <video loop muted autoPlay="autoplay" src={`${headerVideo}`} poster="https://images4.alphacoders.com/903/thumb-1920-903637.jpg" />
      </div>
      <div className={`${style.filterContainer}`}>
        <ul>
          <div className={`${style.gridButton}`}>
            <li><button onClick={(e) => alphaOrder(e)} value={"up"}>▲name▲</button></li>
            <li><button onClick={(e) => alphaOrder(e)} value={"down"}>▼name▼</button></li>
            <li><button onClick={(e) => ratingOrder(e)} value={"down"}>▲rating▲</button></li>
            <li><button onClick={(e) => ratingOrder(e)} value={"up"}>▼rating▼</button></li>
            <li><button onClick={prevHandler}><AiOutlineArrowLeft /></button></li>
            <li><button onClick={nextHandler}><AiOutlineArrowRight /></button></li>
            <li><button onClick={(e) => apiDataBase(e)} value={"api"}>Api</button></li>
            <li><button onClick={(e) => apiDataBase(e)} value={"db"}>Data Base</button></li>
          </div>
          <li><select defaultValue={"Genres filter"} id='selectGenre' name="genres" onChange={e => genreSelect(e)}>
            <option value="" disabled hidden>Genres filter</option>
            <option value="null">All</option>
            {allGenres?.map((genre) => {
              return <option value={genre.name} key={genre.id}>{genre.name}</option>
            })}
          </select></li>
        </ul>
      </div>
      <div className={`${style.genresContainer}`}>
        <ul>
          {filteredGenres?.map((f) => {
            return (<li key={f}>
              <div className={`${style.eachGenre}`}><span>{f}</span></div>
            </li>)
          })}
        </ul>
      </div>
      <div className={`${style.refreshCont}`}>
        <button className={`${style.refreshButton}`} onClick={(e) => refreshHandler(e)} value={"db"}><HiRefresh /></button>
      </div>
      <div className={`${style.homeContainer}`}>
        <ul>
          {
            loading === true ?
              <div className={`${style.loading}`}><Loading></Loading></div> :
              search === "" ?
                <Cards allGames={filteredGames()} pageCount={pageCount} currentPage={currentPage} /> :
                <Cards allGames={filteredGames()} pageCount={1} currentPage={currentPage} />
          }
        </ul>
      </div>
      <div id='goTopCont' className={style.goTopCont}>
        <div className={style.goTopBut} onClick={goUp}>
          <i href='#top'><BsArrowUpShort></BsArrowUpShort></i>
        </div>
      </div>
    </div>
  )
}

export default Home