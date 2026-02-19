const API_KEY = '9c9ebb8c';
const API_URL = 'https://www.omdbapi.com/';
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/300x450/1a1a1a/e50914?text=No+Poster';

const RANDOM_SEARCHES = ['action', 'comedy', 'drama', 'thriller', 'adventure', 'horror', 'romance', 'sci-fi', 'animation', 'fantasy'];

const state = {
    currentPage: 1,
    totalResults: 0,
    searchQuery: '',
    totalPages: 0,
    isInitialLoad: true
};

const elements = {
    searchInput: document.getElementById('searchInput'),
    searchBtn: document.getElementById('searchBtn'),
    loader: document.getElementById('loader'),
    errorMessage: document.getElementById('errorMessage'),
    resultsSection: document.getElementById('resultsSection'),
    resultsTitle: document.getElementById('resultsTitle'),
    resultsCount: document.getElementById('resultsCount'),
    moviesGrid: document.getElementById('moviesGrid'),
    pagination: document.getElementById('pagination'),
    prevBtn: document.getElementById('prevBtn'),
    nextBtn: document.getElementById('nextBtn'),
    currentPageSpan: document.getElementById('currentPage'),
    totalPagesSpan: document.getElementById('totalPages')
};

function init() {
    elements.searchBtn.addEventListener('click', handleSearch);
    elements.searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch();
    });
    elements.prevBtn.addEventListener('click', () => changePage(-1));
    elements.nextBtn.addEventListener('click', () => changePage(1));
    
    clearPreviousResults();
    loadRandomMovies();
}

function handleSearch() {
    const query = elements.searchInput.value.trim();
    
    if (!query) {
        showError('Please enter a movie name to search');
        return;
    }
    
    state.searchQuery = query;
    state.currentPage = 1;
    state.isInitialLoad = false;
    fetchMovies();
}

async function fetchMovies() {
    showLoader();
    hideError();
    hideResults();
    
    try {
        const response = await fetch(
            `${API_URL}?apikey=${API_KEY}&s=${encodeURIComponent(state.searchQuery)}&page=${state.currentPage}`
        );
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        hideLoader();
        
        if (data.Response === 'True') {
            state.totalResults = parseInt(data.totalResults);
            state.totalPages = Math.ceil(state.totalResults / 10);
            renderMovies(data.Search);
            renderPagination();
            showResults();
        } else {
            showError(data.Error || 'No movies found. Try a different search term.');
        }
    } catch (error) {
        hideLoader();
        showError('Failed to fetch movies. Please check your connection and API key.');
        console.error('Fetch error:', error);
    }
}

async function renderMovies(movies) {
    elements.moviesGrid.innerHTML = '';
    
    const movieDetailsPromises = movies.map(movie => fetchMovieDetails(movie.imdbID));
    const movieDetails = await Promise.all(movieDetailsPromises);
    
    movieDetails.forEach((movie, index) => {
        if (movie) {
            const movieCard = createMovieCard(movie, index);
            elements.moviesGrid.appendChild(movieCard);
        }
    });
    
    if (state.isInitialLoad) {
        elements.resultsTitle.textContent = 'Recent Movies';
        elements.resultsCount.textContent = `Showing ${movies.length} movies`;
    } else {
        elements.resultsTitle.textContent = `Results for "${state.searchQuery}"`;
        elements.resultsCount.textContent = `Found ${state.totalResults} results`;
    }
}

async function fetchMovieDetails(imdbID) {
    try {
        const response = await fetch(`${API_URL}?apikey=${API_KEY}&i=${imdbID}&plot=short`);
        const data = await response.json();
        return data.Response === 'True' ? data : null;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        return null;
    }
}

function createMovieCard(movie, index) {
    const card = document.createElement('div');
    card.className = 'movie-card';
    card.style.animationDelay = `${index * 0.05}s`;
    
    const poster = movie.Poster !== 'N/A' ? movie.Poster : PLACEHOLDER_IMAGE;
    const released = movie.Released !== 'N/A' ? movie.Released : 'Unknown';
    const director = movie.Director !== 'N/A' ? movie.Director : 'Unknown';
    const language = movie.Language !== 'N/A' ? movie.Language : 'Unknown';
    
    card.innerHTML = `
        <img 
            src="${poster}" 
            alt="${movie.Title} poster" 
            class="movie-card__poster"
            onerror="this.src='${PLACEHOLDER_IMAGE}'"
        >
        <div class="movie-card__content">
            <h3 class="movie-card__title">${movie.Title}</h3>
            <div class="movie-card__meta">
                <span class="movie-card__year">📅 ${movie.Year}</span>
                <span class="movie-card__type">${movie.Type}</span>
            </div>
            <div class="movie-card__details">
                <p class="movie-card__info">🎬 <strong>Released:</strong> ${released}</p>
                <p class="movie-card__info">🎥 <strong>Director:</strong> ${director}</p>
                <p class="movie-card__info">🌐 <strong>Language:</strong> ${language}</p>
            </div>
            <button class="movie-card__btn" onclick="viewDetails('${movie.imdbID}')">
                View Details
            </button>
        </div>
    `;
    
    return card;
}

function renderPagination() {
    elements.currentPageSpan.textContent = state.currentPage;
    elements.totalPagesSpan.textContent = state.totalPages;
    
    elements.prevBtn.disabled = state.currentPage === 1;
    elements.nextBtn.disabled = state.currentPage === state.totalPages;
    
    elements.pagination.classList.remove('hidden');
}

function changePage(direction) {
    const newPage = state.currentPage + direction;
    
    if (newPage >= 1 && newPage <= state.totalPages) {
        state.currentPage = newPage;
        fetchMovies();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function viewDetails(imdbID) {
    window.open(`https://www.imdb.com/title/${imdbID}`, '_blank');
}

function showLoader() {
    elements.loader.classList.remove('hidden');
}

function hideLoader() {
    elements.loader.classList.add('hidden');
}

function showError(message) {
    elements.errorMessage.textContent = `⚠️ ${message}`;
    elements.errorMessage.classList.remove('hidden');
}

function hideError() {
    elements.errorMessage.classList.add('hidden');
}

function showResults() {
    elements.resultsSection.classList.remove('hidden');
}

function hideResults() {
    elements.resultsSection.classList.add('hidden');
    elements.pagination.classList.add('hidden');
}

function clearPreviousResults() {
    try {
        localStorage.removeItem('lastSearch');
        localStorage.removeItem('lastResults');
    } catch (e) {
        console.warn('localStorage not available');
    }
}

function loadRandomMovies() {
    const randomSearch = RANDOM_SEARCHES[Math.floor(Math.random() * RANDOM_SEARCHES.length)];
    state.searchQuery = randomSearch;
    state.currentPage = 1;
    state.isInitialLoad = true;
    fetchMovies();
}

document.addEventListener('DOMContentLoaded', init);
