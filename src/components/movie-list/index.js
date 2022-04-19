import React, { useState } from "react";
import "./index.css";

function MovieList() {
  const [year, setYear] = useState(null);
  const [movies, setMovies] = useState([]);

  const handleYear = (e) => {
    setYear(e.target.value)
  }

  const onSearch = () => {
    resolveData(year)
  }

  const resolveData = (year) => {
    fetch(`https://jsonmock.hackerrank.com/api/movies?Year=${year}`)
      .then(res => res.json())
      .then(json => {
        setMovies(json.data)
      })
  }

  return (
    <div className="layout-column align-items-center mt-50">
      <section className="layout-row align-items-center justify-content-center">
        <input type="number" className="large" placeholder="Enter Year eg 2015" data-testid="app-input" onChange={handleYear} />
        <button className="" data-testid="submit-button" onClick={onSearch}>Search</button>
      </section>

      {year && movies.length > 0 && (
        <ul className="mt-50 styled" data-testid="movieList">
          {movies.map((movie, index) => {
            return (
              <li className="slide-up-fade-in py-10" key={movie.imdbID + index}>{movie.Title}</li>
            )
          })}
        </ul>
      )}
      {year && movies.length === 0 && <div className="mt-50 slide-up-fade-in" data- testid="no-result" >{'No Results Found'}</div>}
    </div >
  );
}

export default MovieList