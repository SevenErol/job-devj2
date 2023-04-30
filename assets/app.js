import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './components/Index';
import OldestMovies from './components/OldestMovies';
import RecentMovies from './components/RecentMovies';
import RatingMovies from './components/RatingMovies';
import GenreMovies from './components/GenreMovies';
import SelectedCategoryMovies from './components/SelectedCategoryMovies';
import './app.css';

const App = props => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route exact path="/oldest" element={<OldestMovies />} />
          <Route exact path="/recent" element={<RecentMovies />} />
          <Route exact path="/rating" element={<RatingMovies />} />
          <Route path="/categories/:genre" element={<SelectedCategoryMovies />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


