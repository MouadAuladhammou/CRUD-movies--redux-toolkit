import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi, { API_KEY } from "../../common/api/movieApi";

// // Methode (2) de recuperation de données de Store State Redux (Recomandée) : (voir le fichier: src\components\home\Home.js) => dispatch(fetchAsyncMovies());
export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies", // "movies" => c'est le nom de Reducer | "fetchAsyncMovies" => la fonction concernée (dans la partie extraReducers: {...} )
  async (term) => {
    // const movieText = "Harry";
    const movieText = term;
    const response = await movieApi.get(
      `?apiKey=${API_KEY}&s=${movieText}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term) => {
    // const seriesText = "Friends";
    const seriesText = term;
    const response = await movieApi.get(
      `?apiKey=${API_KEY}&s=${seriesText}&type=series`
    );
    return response.data;
  }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
    const response = await movieApi.get(`?apiKey=${API_KEY}&i=${id}&Plot=full`);
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectMovieOrShow: {},
};

// Important : Les retours du Reducer peuvent être appelés directement à partir de reducers: {...} ou à partir de extraReducers: {...}
const movieSlice = createSlice({
  name: "movies", // ce nome doit etre unique, car celui qui distingue ce Reducer d'autre Reducers
  initialState, // initialiser State de cette Reducer

  // Important: ici dans cette partie: reducers: {...}, Il est préférable de n'utiliser que des actions qui gèrent les States qui se produit dans l'app, des actions qui n'ont rien à voir avec les API pour réinitialisation de State
  reducers: {
    // // Methode (1) de recuperation de données de Store State Redux : (voir le fichier: src\components\home\Home.js) => dispatch(addMovies(response.data));
    // // NB: on utilise des fonctions basées sur la méthode Async Thunk (createAsyncThunk()) qui permet de suivre l'état des requêtes dans la partie [extraReducers] : "pending", "fulfilled" ou "rejected"
    // // ==================================================================================================================================================================================================
    // addMovies: (state, { payload }) => { // alors ici, on utilise ici la fonction "fetchAsyncMovies()" au lieu de ceci
    //   state.movies = payload;
    // },

    // NB: ici dans cette partie de trairement, on a pas des requêtes à suivre ou à traiter, il n'est donc pas nécessaire de les mettre dans la partie [extraReducers], on peut l'appeler directement depuis reducers: {...}
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },

  // Important: ici dans cette partie: extraReducers: {...}, il est preferable d'utiliser ici les actions (async actions) qui sont conçu pour consommer des API en mode Async (en general pour les actions basées sur Async => Async middleware)
  extraReducers: {
    // get Movies
    [fetchAsyncMovies.pending]: () => {
      // pendant l'exécution
      console.log("Pending");
    },
    [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
      // Si le processus de récupération s'est terminé avec succès
      console.log("Fetched Successfully!");
      return { ...state, movies: payload };
    },
    [fetchAsyncMovies.rejected]: () => {
      // Si le processus de récupération échoue
      console.log("Rejected!");
    },

    // get Series
    [fetchAsyncShows.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncShows.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return { ...state, shows: payload };
    },
    [fetchAsyncShows.rejected]: () => {
      console.log("Rejected!");
    },

    // get Movie Or Serie detail
    [fetchAsyncMovieOrShowDetail.pending]: () => {
      console.log("Pending");
    },
    [fetchAsyncMovieOrShowDetail.fulfilled]: (state, { payload }) => {
      console.log("Fetched Successfully!");
      return { ...state, selectMovieOrShow: payload };
    },
    [fetchAsyncMovieOrShowDetail.rejected]: () => {
      console.log("Rejected!");
    },
  },
});

// Exporter les actions afin que nous puissions les utiliser dans Dispatch. c'est si j'utiliser la permeiere Methode (si les fonctions etaient dans cette partie: reducers {...})
// // Methode (1) de recuperation de données de Store State Redux : (voir le fichier: src\components\home\Home.js) => dispatch(addMovies(response.data));
// export const { addMovies } = movieSlice.actions;
export const { removeSelectedMovieOrShow } = movieSlice.actions;

// premier "movies" pour le nom de Reducer et deuxième pour son data State
// c'est juste pour simplifier la recuperation de données de State (voir le fichier: src\components\movie_list\MovieList.js => const movies = useSelector(getAllMovies) au lieu d'ecrire: const movies = useSelector((state) => state.movies.movies);
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;

export default movieSlice.reducer;
