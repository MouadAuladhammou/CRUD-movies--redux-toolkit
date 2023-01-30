import React, { useEffect } from "react";

import MovieList from "../movie_list/MovieList";

import { useDispatch } from "react-redux";
// import { addMovies } from "../../redux/movies/movieSlice";
// import movieApi, { API_KEY } from "../../common/api/movieApi";

import {
  fetchAsyncMovies,
  fetchAsyncShows,
} from "../../redux/movies/movieSlice";

const Home = () => {
  const dispatch = useDispatch();
  const movieText = "harry";
  const seriesText = "Friends";

  useEffect(() => {
    // // Methode (1) de recuperation de données de Store State Redux : (voir le fichier: src\redux\movies\movieSlice.js)
    // // ===============================================================================================================
    // const fetchMovies = async () => {
    //    const movieText = "Harry";
    //    const response = await movieApi
    //      .get(`?apiKey=${API_KEY}&s=${movieText}&type=movie`)
    //      .catch((err) => console.log("Err: ", err));
    //    // console.log("response: ", response);
    //    dispatch(addMovies(response.data));
    // };
    // fetchMovies();
    //
    // // Methode (2) de recuperation de données de Store State Redux en utilsant les fonctions de type "Async Thunk" (Recommandée) : (voir le fichier: src\redux\movies\movieSlice.js)
    // // =============================================================================================================================================================================
    // il s'agit de faire dispatch directement avec une action Reducer
    dispatch(fetchAsyncMovies(movieText)); // recuperer des films

    dispatch(fetchAsyncShows(seriesText)); // recuperer des series
  }, [dispatch]);

  return (
    <>
      <div className="banner-img"></div>
      <MovieList />
    </>
  );
};

export default Home;
