import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "../components/List";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";

export default function Searchkeyword() {
  const urlParams = new URLSearchParams(window.location.search);

  const [name, setname] = useState(urlParams.get("name"));

  const [results, setresult] = useState([]);
  const [results2, setresult2] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const [type, setType] = useState("movies");
  const [count, setcount] = useState(1);
  const navigate = useNavigate();

  const fetchData = async (id) => {
    const url = `https://api.themoviedb.org/3/discover/movie?with_keywords=${urlParams.get(
      "id"
    )}&page=${count}`;
    const url2 = `https://api.themoviedb.org/3/discover/tv?with_keywords=${urlParams.get(
      "id"
    )}&page=${count}`;

    const options = {
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_GAPI_KEY_ENV,
      },
    };
    try {
      const response1 = await axios.get(url, { ...options });
      const response2 = await axios.get(url2, { ...options });

      setresult(response1.data);
      setresult2(response2.data);
      //console.log(response1.data);
    } catch (error) {
      console.error("error:", error);
    }
  };
  useEffect(() => {
    fetchData();
    document.title = 'MyMovieList';
  }, []);
  useEffect(() => {
    fetchData();
  }, [count]);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  useEffect(() => {

    const images = gsap.utils.toArray(".boxks > div");
    images.forEach((image) => {
      gsap.to(image, {
        opacity: 1,
        scale: 1,
        duration: 0.1,
        scrollTrigger: {
          trigger: image,
          start: "top 100%", // Start the animation when the top of the image reaches 80% of the viewport height
          toggleActions: "play none none none", // Actions for enter, leave, enter back, and leave back
        },
      });
    });
  }, [document.querySelectorAll('.boxks > div')]);

  return (
    <div className="wholepageofkeywordsearch" id="wpks">
      
      <svg
              xmlns="http://www.w3.org/2000/svg"
              onClick={(event) => {
                
                document.getElementById('wpks').style.opacity = 0;
                document.getElementById('gl4').style.opacity = 0;
                setTimeout(()=>window.history.back(),300);
              }}
              className="gotolink4"
              id="gl4"
              height="1px"
              viewBox="0 -960 960 960"
              width="1px"
              fill="white"
            >
              <path d="M760-200v-160q0-50-35-85t-85-35H273l144 144-57 56-240-240 240-240 57 56-144 144h367q83 0 141.5 58.5T840-360v160h-80Z" />
            </svg>
      {results && (
        <div>
          <div className="boxthathastbt">
            <div id="titleks">
              Search {type} by keyword :{" "}
              <div className="nameofkeyword" >
                {name}
              </div>
             
              {/* <input
                className="searchkeywordinput"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={`"${name}"`}
              /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                id="svginfinite"
                fill="white"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
              </svg>
            </div>

            <div className="wishlistbtms">
              <div
                id="moviebt"
                onClick={() => {
                  setType("movies");
                  let bt = document.getElementById("moviebt");
                  bt.style.background = "white";
                  bt.style.color = "black";
                  let bt1 = document.getElementById("seriesbt");
                  bt1.style.background = "black";
                  bt1.style.color = "white";
                }}
              >
                movies
              </div>
              <div
                id="seriesbt"
                onClick={() => {
                  setType("series");
                  let bt = document.getElementById("seriesbt");
                  bt.style.background = "white";
                  bt.style.color = "black";
                  let bt1 = document.getElementById("moviebt");
                  bt1.style.background = "black";
                  bt1.style.color = "white";
                }}
              >
                series
              </div>
            </div>
          </div>

          <div className="boxks">
            {type == "movies" ? (
              <List tren={results} movies="true" mbk= {true}/>
            ) : (
              <List tren={results2} movies="false"mbk = {true} />
            )}
          </div>
          {results.results && (
            <>
              {" "}
              <div className="leftrightsym">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    if (count == 1) {
                      return null;
                    } else {
                      setcount(count - 1);
                      document.documentElement.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }
                  }}
                  fill="white"
                  height="34"
                  viewBox="0 -960 960 960"
                  width="34"
                >
                  <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    setcount(count + 1);
                    document.documentElement.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  fill="white"
                  height="34"
                  viewBox="0 -960 960 960"
                  width="34"
                >
                  <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                </svg>
              </div>
              <div className="pagecountr">Page {count}</div>
            </>
          )}
        </div>
      )}

    </div>
  );
}
