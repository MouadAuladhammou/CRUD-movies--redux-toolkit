import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import user from "../../images/user.png";
import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../redux/movies/movieSlice";
import "./Header.scss";

const Header = () => {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(term);
    if (term === "") alert("Please enter search term");

    // // Methode (2) de recuperation de données de Store State Redux en utilsant les fonctions de type "Async Thunk" (Recommandée) : (voir le fichier: src\redux\movies\movieSlice.js)
    // // =============================================================================================================================================================================
    dispatch(fetchAsyncMovies(term)); // recuperer des films
    dispatch(fetchAsyncShows(term)); // recuperer des series
    setTerm("");
  };

  return (
    <div className="header">
      <div className="logo">
        <Link to="/">Movie App</Link>
      </div>

      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            value={term}
            placeholder="Search Movies or Shows"
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="user-image">
        <img src={user} alt="user" />
      </div>
    </div>
  );
};

export default Header;
