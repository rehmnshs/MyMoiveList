import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import logo from "./assets/Logonetflix.png";
import imdb from "./assets/imdb.png";
import bg from "./assets/p2.jpg";
import pic1 from "./assets/jaws.jpg";
import axios from "axios";
import List from "./components/List";
import { gsap } from "gsap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useNavigate } from "react-router-dom";
import SwiperList from "./components/SwiperList";
import "swiper/css/pagination";
import { useSwiper } from "swiper/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import {
  EffectFade,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { Autoplay } from "swiper/modules";
import "swiper/css/effect-fade";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";

import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import LogOutbt from "./components/LogOutbt";
import GBTT from "./components/GBTT";
function App() {
  const [tren, settrend] = useState([]);
  const [tren1, settrend1] = useState([]);
  const [overlay, setoverlay] = useState(false);
  const [overlay1, setoverlay1] = useState(false);
  const [movies, setmovies] = useState("true");
  const [randomNumber, setrandom] = useState();
  const [movieName, setMovieName] = useState("");
  const [searchList, setsl] = useState("");
  const [LoggedIn, setlogged] = useState(false);
  const [isPC, setPC] = useState(true);

  const [userName, setusername] = useState("Rehman");
  const [clmovies, setclmov] = useState([]);
  const navigate = useNavigate();

  const [mylistfinal, setmylistfinal] = useState({ results: [] });
  const [menu, setmenu] = useState(false);
  const [menureal, setmenureal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const swiper = useSwiper();
  const [moverlay,setmoverlay ] =useState(false);
  function getCookie(cookieName) {
    const cookies = document.cookie.split("; ");

    for (const cookie of cookies) {
      const [name, encodedValue] = cookie.split("=");

      if (name === cookieName) {
        const decodedValue = decodeURIComponent(encodedValue);

        try {
          // Try to parse the cookie value as JSON
          return JSON.parse(decodedValue);
        } catch (error) {
          // If parsing fails, return the original value
          return decodedValue;
        }
      }
    }

    return null; // Return null if the cookie with the specified name is not found
  }
  function generateRandomNumbers() {
    var numbers = [];

    while (numbers.length < 3) {
      var randomNumber = Math.floor(Math.random() * 20);

      if (numbers.indexOf(randomNumber) === -1) {
        numbers.push(randomNumber);
      }
    }
    return numbers;
  }
  const handleInputChange = (event) => {
    setMovieName(event.target.value);
  };
  function NumToTime(num) {
    var hours = Math.floor(num / 60);
    var minutes = num % 60;
    if (minutes + "".length < 2) {
      minutes = "0" + minutes;
    }
    return hours + "hr " + minutes + "m";
  }
  const searchmovies = async () => {
    const urlForMovie = "https://api.themoviedb.org/3/search/movie";
    const urlFortv = "https://api.themoviedb.org/3/search/tv";
    const params = {
      query: movieName,
      include_adult: false,
      language: "en-US",
      page: 1,
    };

    const options = {
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_GAPI_KEY_ENV,
      },
    };
    const url = movies == "true" ? urlForMovie : urlFortv;
    try {
      const response = await axios.get(url, { params, ...options });
      console.log(response.data);
      setsl(response.data);
    } catch (error) {
      console.error("error:", error);
    }
  };
  const fetchData = async () => {
    const urlfortrnd = "https://api.themoviedb.org/3/trending/movie/day";
    const urlfortrndS = "https://api.themoviedb.org/3/tv/popular";
    const urlfortrndSforcl = "https://api.themoviedb.org/3/movie/top_rated";

    const params = {
      query: "drive",
      include_adult: false,
      language: "en-US",
      page: 1,
    };

    const options = {
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_GAPI_KEY_ENV,
      },
    };

    try {
      const response = await axios.get(urlfortrnd, { ...options });
      const response1 = await axios.get(urlfortrndS, { ...options });
      const response2 = await axios.get(urlfortrndSforcl, { ...options });

      settrend(response.data);
      settrend1(response1.data);
      setclmov(response2.data);
    } catch (error) {
      console.error("error:", error);
    }
  };

  const putInDbSeries = async (id, url, name) => {
    const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
    try {
      const resp = await axios.post(
        "https://mymovielistserver.onrender.com/putIDSeries",
        {
          username,
          id: id,
          url: url,
          name: name,
        }
      );
      console.log(resp.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const putInDbMovies = async (id, url, title) => {
    const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
    try {
      const resp = await axios.post(
        "https://mymovielistserver.onrender.com/putIDMovies",
        {
          username,
          id: id,
          url: url,
          title: title,
        }
      );

      console.log(resp.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const deleteindb = async (id) => {
    const username = getCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`);
    try {
      const resp = await axios.delete(
        "https://mymovielistserver.onrender.com/delete",
        {
          data: {
            username,
            postText: id,
          },
        }
      );
      console.log(resp.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };





  useEffect(() => {
 

    const handleResize = () => {
      setPC(window.innerWidth > 767 ? true : false);
    };
    window.addEventListener("resize", handleResize);

    handleResize();
    console.log(isPC)
  }, [window.innerWidth]);
  useEffect(() => {
  

    var ran = generateRandomNumbers();
    setrandom(ran);
    fetchData();

    setlogged(checkCookie(`${import.meta.env.VITE_COOKIENAME_ENV}`));

  }, []);
  useEffect(() => {

    gsap.from("#ovai", { opacity: 0, duration: 0.5, delay: 0.5 });
    let input = document.getElementById('inputbox');
    let send = document.getElementById('nextsymbol1');
    
    if (input && send) {
        input.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
send.click()

            }
        });
    }
    
  }, [overlay]);
  useEffect(() => {

    gsap.fromTo(
      ".searchdisplay",
      { opacity: 0 },
      { opacity: 1, duration: 0.5, delay: 0.5 }
    );
  }, [searchList]);
  useEffect(() => {
    gsap.fromTo(
      ".ov1box",
      { opacity: 0 },
      { opacity: 1, duration: 0.5, delay: 0.5 }
    );
  }, [overlay1]);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  function displayAllCookies() {
    const allCookies = document.cookie;

    if (allCookies) {
      const cookiesArray = allCookies.split("; ");

      cookiesArray.forEach((cookie) => {
        const [name, value] = cookie.split("=");
        console.log(`${name}: ${value}`);
      });
    } else {
      console.log("No cookies found.");
    }
  }
  function checkCookie(name) {
    // Get all cookies from document.cookie and split into an array
    const cookies = document.cookie.split("; ");

    // Iterate over the array of cookies
    for (const cookie of cookies) {
      // Split the cookie into name and value
      const [cookieName, cookieValue] = cookie.split("=");

      // Trim any leading or trailing spaces
      const trimmedCookieName = cookieName.trim();

      // Check if the current cookie matches the specified name
      if (trimmedCookieName === name) {
        return true; // Cookie found
      }
    }

    return false; // Cookie not found
  }

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLEID_KEY_ENV}>
      <>
        {tren && (
          <div className="wholeweb">
            <div className="overlay" id="oy">
              <div id="menu">
                {menu && (
                  <div className="menuinner">
                    <svg
                      id="close1"
                      onClick={() => {
                        setmenu(false);
                        const c = document.getElementById("menu");

                        c.style.width = "0%";
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      height="27"
                      fill="white"
                      viewBox="0 -960 960 960"
                      width="27"
                    >
                      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                    </svg>

                    <div
                      className="sbt"
                      onClick={() => {
                        setmenu(false);
                        const c1 = document.getElementById("menu");
                        c1.style.width = "0vw";
                        setoverlay(true);
                        const c = document.getElementById("oy");
                        c.style.height = "50vh";
                      }}
                    >
                      Search
                    </div>
                    <div
                      className="sbt"
                      onClick={async () => {
                        setmenu(false);
                        const c1 = document.getElementById("menu");
                        c1.style.width = "0%";

                        setoverlay1(true);
                        const c = document.getElementById("oy");
                        c.style.height = "100%";
                        setTimeout(() => {
                          navigate("/mylist");
                        }, 500);
                      }}
                    >
                      MyList
                    </div>
                  </div>
                )}
              </div>

              {overlay && (
                <div className="overlayinner">
                  <div className="ovainput" id="ovai">
                    <svg
                      id="close"
                      onClick={() => {
                        setoverlay(false);
                        const c = document.getElementById("oy");

                        c.style.height = "0vh";
                        setsl("");
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      height="27"
                      fill="white"
                      viewBox="0 -960 960 960"
                      width="27"
                    >
                      <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                    </svg>
                    <div className="inputsearchbox">
                      {" "}
                      <input
                        id="inputbox"
                        autocomplete="off"
                        placeholder="Enter movie or series name"
                        value={movieName}
                        onChange={handleInputChange}
                      />
                      <svg
                        id="nextsymbol"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          const c = document.getElementById("oy");
                          const inputbix = document.getElementById("ovai");
                          inputbix.style.height = "20vh";
                          c.style.height = "110vh";
                          searchmovies();
                        }}
                        fill="white"
                        opacity="0.5"
                        height="24"
                        viewBox="0 -960 960 960"
                        width="24"
                      >
                        <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
                      </svg>
                      <div id="nextsymbol1"      onClick={() => {
                          const c = document.getElementById("oy");
                          const inputbix = document.getElementById("ovai");
                          inputbix.style.height = "20vh";
                          c.style.height = "110vh";
                          searchmovies();
                        }}></div>
                      <div className="btmvser">
                        <div
                          id="mvbt"
                          onClick={() => {
                            setmovies("true");
                            let bt = document.getElementById("mvbt");
                            bt.style.background = "white";
                            bt.style.color = "black";
                            let bt1 = document.getElementById("svbt");
                            bt1.style.background = "black";
                            bt1.style.color = "white";
                          }}
                        >
                          movie
                        </div>
                        <div
                          id="svbt"
                          onClick={() => {
                            setmovies("false");
                            let bt = document.getElementById("svbt");
                            bt.style.background = "white";
                            bt.style.color = "black";
                            let bt1 = document.getElementById("mvbt");
                            bt1.style.background = "black";
                            bt1.style.color = "white";
                          }}
                        >
                          series
                        </div>
                      </div>
                    </div>
                  </div>

                  {searchList && (
                    <div className="displaysearch">
                      <div className="searchdisplay">
                        <List tren={searchList} movies={movies} />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
         {isPC &&     <div className="header1main" style={{top: imageLoaded ? '0%' : '-200px'}}>
         <img src={logo} id="logo1" onClick={()=>{document.getElementById('logo1').style.top='-200px';}} />
              
              {/*    <div
              onClick={async () => {
                getIds();
                mylistimpl();

                setoverlay1(true);
                const c = document.getElementById("oy");
                c.style.height = "100%";
              }}
            >
              {" "}
              MyList
            </div>
      
            <div
              onClick={() => {
                setoverlay(true);
                const c = document.getElementById("oy");

                c.style.height = "50vh";
              }}
            >
              <svg
                id="searchsymbol"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                fill="white"
                width="24"
              >
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
              </svg>
            </div>
            */}

              <div
                className="options"
                onClick={() => {
                  /* const c = document.getElementById("menu");
                c.style.width = "20vw";
                setmenu(true); */
                  setmenureal(!menureal);
                  let value = !menureal;
                  const c = document.getElementById("opexpan");
                  c.style.width = value ? "200px" : "0px";
                }}
              >
                <div className="opexpand" id="opexpan">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => {
                      setmenu(false);

                      const c1 = document.getElementById("menu");
                      c1.style.width = "0vw";
                      setoverlay(true);
                      const c = document.getElementById("oy");
                      c.style.height = "50vh";
                    }}
                    fill="white"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
                  </svg>
                  <svg
                    onClick={async () => {
                      setmenu(false);
                      const c1 = document.getElementById("menu");
                      c1.style.width = "0%";

                      setoverlay1(true);
                      const c = document.getElementById("oy");
                      c.style.height = "100%";
                      setTimeout(() => {
                        navigate("/mylist");
                      }, 500);
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                  >
                    <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Z" />
                  </svg>
                  {LoggedIn ? <LogOutbt /> : <GBTT />}
                  <svg
                    onClick={() => {
                      setmenu(false);
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    height="27"
                    fill="white"
                    viewBox="0 -960 960 960"
                    width="27"
                  >
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                  </svg>
                </div>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
            </div>}
          
           
            <div className="dots"></div>
            {/*  <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y,Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
    //  navigation

// Custom class for individual slides
      autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
          >
           {tren.results &&
              randomNumber.map((num, index) => (
                
                  <SwiperSlide>
                      <img
                        src={
                          tren.results
                            ? `https://image.tmdb.org/t/p/original${
                                tren.results[randomNumber[index]].poster_path
                              }`
                            : ""
                        }
                        onLoad={handleImageLoad}
                        id="posternext"
                      />
                  </SwiperSlide>
              ))}
              </Swiper>
      */}
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={0}
              slidesPerView={1}
              className="mainwrapper"
              //  navigation
              containerClass="poster-1" // Set the main Swiper container class
              pagination={{ clickable: true }}
              paginationClassName="swiper-pagination"
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              loop={true}
            >
              {tren.results &&
                randomNumber.map((num, index) => (
                  <>
                    <SwiperSlide key={index}>
                      <div className="darkcorner" >
                        <img
                          src={
                            tren.results
                              ? `https://image.tmdb.org/t/p/original${
                                  tren.results[randomNumber[index]]
                                    .backdrop_path
                                }`
                              : ""
                          }
                          onLoad={handleImageLoad}
                          id="bgimg"
                        />
                      </div>

                      {isPC && tren.results && (
                        <div className="detes">
                          <div>
                            <h1>
                              {tren.results
                                ? tren.results[randomNumber[index]].title
                                : "null"}
                            </h1>
                            <div className="detesdetes1">
                              <div id="imdbrating">
                                <img src={imdb} />
                                <div>
                                  {tren.results
                                    ? tren.results[
                                        randomNumber[index]
                                      ].vote_average.toFixed(1) > 0
                                      ? tren.results[
                                          randomNumber[index]
                                        ].vote_average.toFixed(1)
                                      : "Not rated"
                                    : "null"}
                                </div>
                              </div>
                              <div id="randommyear">
                                {" "}
                                {tren.results
                                  ? tren.results[
                                      randomNumber[index]
                                    ].release_date.slice(0, 4)
                                  : "null"}{" "}
                              </div>
                              <div id="randomm18">
                                {tren.release_date
                                  ? NumToTime(tren.runtime)
                                  : null}
                              </div>
                            </div>
                            <p id="moviedetes1">
                              {tren.results
                                ? tren.results[randomNumber[index]].overview
                                : ""}
                            </p>

                            <div className="btlist">
                              <div id="viewbt">Watch now</div>{" "}
                              <div
                                id="watchbt"
                                onClick={() => {
                                  putInDbMovies(
                                    tren.results[randomNumber[index]].id,
                                    tren.results[randomNumber[index]]
                                      .poster_path,
                                    tren.results[randomNumber[index]].title
                                  );
                                }}
                              >
                                <svg
                                  fill="white"
                                  id="watchbt2"
                                  xmlns="http://www.w3.org/2000/svg"
                                  height="24"
                                  viewBox="0 -960 960 960"
                                  width="24"
                                >
                                  <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                                </svg>{" "}
                                Watchlist
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {!isPC && 
                      <div className="mdetes">
                      <div id="mtitle">
                      {tren.results
                                ? tren.results[randomNumber[index]].title
                                : "null"}
                      </div>
                      <div id="mdms">
                        <div> {tren.results
                                  ? tren.results[
                                      randomNumber[index]
                                    ].release_date.slice(0, 4)
                                  : "null"}</div>
                        <div> {tren.results
                                    ? tren.results[
                                        randomNumber[index]
                                      ].vote_average.toFixed(1) > 0
                                      ? tren.results[
                                          randomNumber[index]
                                        ].vote_average.toFixed(1)
                                      : "Not rated"
                                    : "null"}</div>
                        <div>  duration</div>
                      </div>
                      <div id="mpw">
                      <div id="mplaybt">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="white" height="24" viewBox="0 -960 960 960" width="24"><path d="M152-160q-23 0-35-20.5t1-40.5l328-525q12-19 34-19t34 19l328 525q13 20 1 40.5T808-160H152Z"/></svg>

                      </div>
                      <div id="mwishlistbt">
                      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="white"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                      </div>
                      </div>
                      </div>}
                    </SwiperSlide>
                  </>
                ))}
            </Swiper>
            {!overlay && !overlay1 && tren.results && (
              <div className="secpage">
                <div id="blackcover"></div>
                <div className="trndingpage">
                  <div className="trnbox">
                    <div id="trenheader">
                   {isPC &&<svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="red"
                        height="55"
                        viewBox="0 -960 960 960"
                        width="55"
                      >
                        <path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" />
                      </svg>}
                      <div className="tmfont">Trending Movies</div>
                    </div>
                    <div className="trenlist">
                      <SwiperList
                        tren={tren}
                        putInDbMovies={putInDbMovies}
                        movies={"true"}
                        isPC = {isPC}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="trnbox">
                      <div id="trenheader">
                        { isPC && <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="red"
                          height="55"
                          viewBox="0 -960 960 960"
                          width="55"
                        >
                          <path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z" />
                        </svg>}
                        <div className="tmfont">Trending Series</div>
                      </div>
                      <div className="trenlist">
                        <SwiperList
                          tren={tren1}
                          putInDbSeries={putInDbSeries}
                          movies={"false"}
                          isPC = {isPC}

                        />
                      </div>
                    </div>
                  </div>
                  <div className="trnbox">
                    <div id="trenheader">
                     {isPC && <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="red"
                        height="55"
                        viewBox="0 -960 960 960"
                        width="55"
                        
                      >
                        <path d="m233-80 65-281L80-550l288-25 112-265 112 265 288 25-218 189 65 281-247-149L233-80Z" />
                      </svg>
                     }
                      <div className="tmfont">All Time Classics</div>
                    </div>
                    <div className="trenlist">
                      <SwiperList
                        tren={clmovies}
                        putInDbMovies={putInDbMovies}
                        movies={"true"}
                        isPC = {isPC}

                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </>
    </GoogleOAuthProvider>
  );
}

export default App;
