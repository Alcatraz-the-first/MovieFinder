import { useState } from 'react';
import './App.css';
import { useQuery } from 'react-query'


const movie_search = (m_name) => {
  return fetch(`http://www.omdbapi.com/?s=${m_name}&apikey=4cfd5522`).then(res => res.json())
}
const movie_find_id = (m_id) => {
  return fetch(`http://www.omdbapi.com/?i=${m_id}&apikey=4cfd5522`).then(res => res.json())
}

function App() {
  const [flag, set_flag] = useState(0);
  const [m_name, set_m_name] = useState("");
  const [i_name, set_i_name] = useState("");
  const [id, set_id] = useState(null);
  const { data: search_movie, isLoading: search_load, isError: search_error } = useQuery(['movie-name', m_name], () => movie_search(m_name))
  const { data: find_movie, isLoading: find_load, isError: find_error } = useQuery(['movie-id', id], () => movie_find_id(id))
  if (search_load)
    return <h1>loading</h1>;
  if (search_error)
    return <h1>error</h1>;
  if (find_load)
    return <h1>loading</h1>;
  if (find_error)
    return <h1>error</h1>;
  const handleClick = (imdb) => {
    set_flag(1);
    set_id(imdb);
  }
  const handleFind = (name) => {
    set_m_name(n => name);
  }
  return (
    <>
      {
        flag === 0 &&
        <div>
          <div className='topContainer'>
            <div>
              <a className='top-left' href='https://main--alca6996.netlify.app/' target='_blank' rel="noreferrer">
                Simple Calculator!
              </a>
            </div>
            <div className='title'>
              Movie Finder
            </div>
            <input type="text" placeholder="Enter movie name" className='input_box' onChange={(e) => set_i_name(e.target.value)} />
            <button onClick={() => handleFind(i_name)} className='find'>
              FIND
            </button>
          </div>
          <div>
            <ul>
              {
                search_movie.Search && search_movie.Search.map
                  (
                    (e, index) =>
                    (
                      <li key={index} className='movieSearch' >
                        <button onClick={() => handleClick(e.imdbID)}>
                          <img src={e.Poster} alt='No' className="search_poster" onError={(e) => e.target.src = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"} />
                        </button>
                        <div >
                          <button onClick={() => handleClick(e.imdbID)} className='movieSearchDesc'>
                            {`${e.Title} (${e.Year})`}
                          </button>
                        </div>
                      </li>
                    )
                  )
              }
            </ul>
          </div>
        </div>
      }

      {
        flag === 1 &&
        <div>
          <div className='topContainer'>
            <button className='top-left' onClick={() => { set_flag(0) }}>
              HOME
            </button>
            <div className='title-desc'>
              {find_movie.Title} {`(${find_movie.Year})`}
            </div>
          </div>
          <div className='movie-desc'>
            <div className='movie-desc-poster'>
              <img src={find_movie.Poster} alt="NO NO" onError={(e) => e.target.src = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"} />
            </div>
            <div className='movie-desc-body'>
              <div className='desc'>
                <div className='desc-title'> Genre :</div>{find_movie.Genre ? find_movie.Genre : "N/A"}.
              </div>
              <div className='desc'>
                <div className='desc-title'> Director{`(s)`} :</div>{find_movie.Director ? find_movie.Director : "N/A"}.
              </div>
              <div className='desc'>
                <div className='desc-title'> Main Cast :</div>{find_movie.Actors ? find_movie.Actors : "N/A"}.
              </div>
              <div className='desc'>
                <div className='desc-title'> Language{`(s)`}:</div>{find_movie.Language ? find_movie.Language : "N/A"}.
              </div>
              <div className='desc'>
                <div className='desc-title'> Release Date :</div>{find_movie.Released ? find_movie.Released : "N/A"}.
              </div>
              <div className='desc'>
                <div className='desc-title'>Plot:</div>{find_movie.Plot ? find_movie.Plot : "N/A"}
              </div>
              <div className='desc'>
                <div className='desc-title'>Runtime:</div>{find_movie.Runtime ? find_movie.Runtime : "N/A"}
              </div>
              <div className='desc'>
                <div className='desc-title'>Award{`(s)`} :</div>{find_movie.Awards ? find_movie.Awards : "N/A"}.
              </div>
              <div className='desc'>
                <div className='desc-title'>Box Office Earnings:</div>{find_movie.BoxOffice ? find_movie.BoxOffice : "N/A"}.
              </div>
              <div className='desc'>
                <div className='desc-title'>
                  Critical Ratings:
                  <br></br>
                </div>
                <div className='crits'>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg" width="50px" alt="NO"></img>-{find_movie.imdbRating ? find_movie.imdbRating : "N/A"} ,
                  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Rotten_Tomatoes_logo.svg" width="60px" alt="NO"></img>-{find_movie.Ratings[1] ? find_movie.Ratings[1].Value : "N/A"},
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Metacritic_logo.svg/1920px-Metacritic_logo.svg.png" width="100px" alt="NO"></img>-{find_movie.Ratings[2] ? find_movie.Ratings[2].Value : "N/A"}.
                </div>
              </div>
            </div>
          </div>
          <div className='imdb-link'>
            <a href={`https://www.imdb.com/title/${find_movie.imdbID}/`} target='_blank' rel="noreferrer">
              IMDb link
            </a>
          </div>
        </div>
      }
    </>
  );
}
export default App;