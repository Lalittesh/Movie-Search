import { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "3e510d9c";

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search.trim()) {
      setError("Please enter a movie name.");
      return;
    }

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
          search
        )}&type=movie`
      );

      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error || "No movies found.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <span>🎬</span>
          CineFind
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#movies">Movies</a>
          <a href="#about">About</a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-content">
          <span className="hero-badge">
            ✦ MOVIE DISCOVERY
          </span>

          <h1>
            Find your next
            <span>favorite movie.</span>
          </h1>

          <p>
            Search movies, explore ratings, and discover
            something worth watching tonight.
          </p>

          {/* Search */}
          <form
            className="search-form"
            onSubmit={handleSearch}
          >
            <div className="search-input">
              <span>🔍</span>

              <input
                type="text"
                placeholder="Search for a movie..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          <div className="search-hint">
            Try: <b>Inception</b>, <b>Avatar</b>,{" "}
            <b>Interstellar</b>
          </div>
        </div>
      </section>

      {/* Movies */}
      <section className="movies-section" id="movies">
        <div className="section-header">
          <div>
            <span className="section-label">
              EXPLORE
            </span>

            <h2>Movie Results</h2>
          </div>

          {movies.length > 0 && (
            <span className="result-count">
              {movies.length} movies found
            </span>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="empty-state">
            <div className="empty-icon">⏳</div>

            <h3>Searching movies...</h3>

            <p>
              Please wait while we find your movies.
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="empty-state">
            <div className="empty-icon">😕</div>

            <h3>No results</h3>

            <p>{error}</p>
          </div>
        )}

        {/* Initial State */}
        {!loading &&
          !error &&
          movies.length === 0 && (
            <div className="empty-state">
              <div className="empty-icon">🍿</div>

              <h3>Ready to discover?</h3>

              <p>
                Search for a movie to see posters,
                release years and more.
              </p>
            </div>
          )}

        {/* Movie Cards */}
        {!loading && movies.length > 0 && (
          <div className="movie-grid">
            {movies.map((movie) => (
              <article
                className="movie-card"
                key={movie.imdbID}
              >
                <div className="poster-container">
                  <img
                    src={
                      movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/300x450?text=No+Poster"
                    }
                    alt={movie.Title}
                  />

                  <div className="poster-overlay">
                    <button className="details-button">
                      View Details
                    </button>
                  </div>
                </div>

                <div className="movie-info">
                  <div className="movie-meta">
                    <span>{movie.Year}</span>
                    <span>•</span>
                    <span>{movie.Type}</span>
                  </div>

                  <h3>{movie.Title}</h3>

                  <button className="mobile-details">
                    View Details →
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="logo">
          <span>🎬</span>
          CineFind
        </div>

        <p>
          Built with React • Movie discovery made simple.
        </p>
      </footer>
    </div>
  );
}

export default App;