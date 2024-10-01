
const API_KEY = 'e439cb8c-2775-48f5-b482-0ecf6c9b47f3';
const API_URL_POPULAR = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1';
const API_SEARCH_URL = 'https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=';

async function getMovies(url, callback) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
        }
    });
    const respData = await resp.json();
    if (callback) {
        callback(respData);
    } else {
        showMovies(respData);
    }
}

function showMovies(data) {
    const moviesEl = document.querySelector(".movies");
    while (moviesEl.firstChild) {
        moviesEl.removeChild(moviesEl.firstChild);
    }

    data.films.forEach((movie) => {
        const movieEl = document.createElement("div");
        movieEl.className = "movie";

        const imgEl = document.createElement("img");
        imgEl.src = movie.posterUrlPreview;
        imgEl.alt = movie.nameRu;
        imgEl.className = "movie__cover";

        const titleEl = document.createElement("div");
        titleEl.textContent = movie.nameRu;
        titleEl.className = "movie__title";

        const genresEl = document.createElement("div");
        genresEl.textContent = movie.genres.map(genre => genre.genre).join(', ');
        genresEl.className = "movie__category";

        const ratingEl = document.createElement("div");
        ratingEl.textContent = movie.rating || "Нет"; 
        ratingEl.classList.add("movie__average");
        ratingEl.classList.add(getClassByRate(movie.rating || 0));

        movieEl.appendChild(imgEl);
        movieEl.appendChild(titleEl);
        movieEl.appendChild(genresEl);
        movieEl.appendChild(ratingEl);
        moviesEl.appendChild(movieEl);
    });
}

const form = document.querySelector("form");
const search = document.querySelector(".header__search");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const apiSearch = `${API_SEARCH_URL}${encodeURIComponent(search.value)}`;

    if (search.value) {
        getMovies(apiSearch, showMovies);
        search.value = "";
    }
});

function getClassByRate(vote) {
    if (vote >= 7) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}

getMovies(API_URL_POPULAR, showMovies);
