import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/news') 
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        return response.json();
      })
      .then((data) => {
        setNews(data.articles || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-cream flex flex-col items-center p-6">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Tech News</h1>
        <p className="text-gray-500 mt-2 text-lg">Your daily dose of the latest in technology</p>
      </header>
      <main className="w-full max-w-5xl rounded-lg shadow-lg p-6 glassy">
        {loading && <p className="text-center text-lg font-medium text-gray-600 animate-pulse">Loading...</p>}
        {error && <p className="text-center text-red-500 font-medium">Error: {error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((article, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={article.image || "https://via.placeholder.com/300"}
                alt={article.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">{article.title}</h2>
              <p className="text-gray-600 mt-2 text-sm line-clamp-3">{article.description}</p>
              {article.url ? (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline mt-2 block"
                >
                  Read more
                </a>
              ) : (
                <p className="text-gray-400 mt-2">No link available</p>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
