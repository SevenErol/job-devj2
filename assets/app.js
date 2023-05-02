import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from './components/Index';
import SelectedCategoryMovies from './components/SelectedCategoryMovies';
import NotFound from './components/NotFound';
import './app.css';

const App = props => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route exact path="/oldest" element={<Index />} />
          <Route exact path="/recent" element={<Index />} />
          <Route exact path="/rating" element={<Index />} />
          <Route path="/categories/:genre" element={<SelectedCategoryMovies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);


