import React, { useEffect, useState } from 'react';
import { Button, Rating, Spinner } from 'flowbite-react';
import { Link, useParams } from 'react-router-dom';

const Index = props => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [success, setSuccess] = useState(false);

  const [appState, changeState] = useState({
    activeObject: null,
    objects: []
  });

  const [linkState, setLinkState] = useState({
    activeLink: null,
    links: ['recent', 'oldest', 'rating']
  });

  let { genre } = useParams();

  const fetchMovies = () => {
    setLoading(true);

    if ({ genre }.genre === undefined) {
      return fetch('/api/movies')
        .then(response => response.json())
        .then(data => {
          setMovies(data.movies);
          setLoading(false);
        });
    }

    fetchMovieCategory({ genre }.genre);


  }

  const fetchGenres = () => {
    setLoading(true);

    return fetch('/api/movies/genres')
      .then(response => response.json())
      .then(data => {
        setGenres(data.genres);
        setLoading(false);
        changeState({ ...appState, objects: data.genres });
      });
  }

  const fetchSpecificMovies = (string) => {
    setLoading(true);

    return fetch('/api/movies/' + string)
      .then(response => response.json())
      .then(data => {
        setMovies(data.movies);
        setLoading(false);
      });
  }

  const fetchMovieCategory = (genre) => {
    setLoading(true);

    return fetch('/api/movies/genres/' + genre)
      .then(response => response.json())
      .then(data => {
        setMovies(data.movies);
        setLoading(false);
        setSuccess(data.success);
      });
  }

  const toggleActive = (key) => {
    setLinkState({ ...linkState, activeLink: null });
    changeState({ ...appState, activeObject: appState.objects[key] });
  };

  const toggleActiveLink = (key) => {
    changeState({ ...appState, activeObject: null });
    setLinkState({ ...linkState, activeLink: key });
  };

  const toggleActiveStyle = (key) => {
    if (appState.objects[key] === appState.activeObject) {
      return "active"
    } else {
      return "inactive"
    }
  }

  const toggleActiveStyleLink = (key) => {
    if (linkState.links[key] === linkState.activeLink) {
      return "active"
    } else {
      return "inactive"
    }
  }

  useEffect(() => {
    fetchMovies();
    fetchGenres();
  }, []);

  return (
    <Layout>
      <Heading />

      <NavBar fetchSpecificMovies={fetchSpecificMovies} toggleActiveLink={toggleActiveLink} toggleActiveStyleLink={toggleActiveStyleLink} />

      <GenreList loading={loading}>
        {genres.map((item, key) => (
          < GenreItem fetchMovieCategory={fetchMovieCategory} toggleActiveStyle={toggleActiveStyle} toggleActive={toggleActive} key={key} {...item} index={key} genres={genres} />
        ))}
      </GenreList>


      <MovieList loading={loading} movies={movies}>
        {movies.map((item, key) => (
          <MovieItem key={key} {...item} />
        ))}
      </MovieList>
    </Layout>
  );
};

const Layout = props => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        {props.children}
      </div>
    </section>
  );
};

const Heading = props => {
  return (
    <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
      <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
        Movie Collection
      </h1>

      <p className="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">
        Explore the whole collection of movies
      </p>
    </div>
  );
};

const NavBar = props => {
  return (
    <nav className='nav flex flex-row justify-center space-x-4 py-4'>
      <ul className='flex gap-x-4'>
        <li id='recent' className={props.toggleActiveStyleLink(0)}>
          <Link to="/recent" onClick={() => { props.fetchSpecificMovies('recent'); props.toggleActiveLink('recent') }} className={props.toggleActiveStyleLink(0) + ' font-bold px-3 py-2 text-slate-700'}>Recent films</Link >
        </li>

        <li id='oldest' className={props.toggleActiveStyleLink(1)}>
          <Link to="/oldest" onClick={() => { props.fetchSpecificMovies('oldest'); props.toggleActiveLink('oldest') }} className={props.toggleActiveStyleLink(1) + ' font-bold px-3 py-2 text-slate-700'}>Oldest films</Link >
        </li>

        <li id='rating' className={props.toggleActiveStyleLink(2)}>
          <Link to="/rating" onClick={() => { props.fetchSpecificMovies('rating'); props.toggleActiveLink('rating') }} className={props.toggleActiveStyleLink(2) + ' font-bold px-3 py-2 text-slate-700'}>Highest ratings</Link >
        </li>

      </ul>
    </nav >
  );
};

const GenreList = props => {
  if (props.loading) {
    return (
      <div className="text-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className='py-4'>
      <p className='mb-4 text-4xl tracking-tight font-bold text-gray-900 dark:text-white'>Available categories:</p>
      <div className='grid gap-4 py-4 md:gap-y-2 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3'>
        {props.children}
      </div>
    </div>
  );

}

const GenreItem = props => {
  return (
    <Link to={`/categories/${props.value}`} onClick={() => { props.toggleActive(props.index); props.fetchMovieCategory(props.value) }} className={props.toggleActiveStyle(props.index) + ' italic px-3 py-2 text-slate-700 categories'} > {props.value}</Link >
  );
}

const MovieList = props => {
  if (props.loading) {
    return (
      <div className="text-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (props.movies.length === 0 && !props.success) {
    return (
      <div className='flex justify-center items-center'>
        <h1 className='text-4xl tracking-tight font-bold text-gray-900 dark:text-white text-center'>Non ci sono film che corrispondono ai criteri di ricerca</h1>
      </div>
    )
  } else if (props.movies.length === 0 && props.success) {
    return (
      <div className='flex justify-center items-center'>
        <h1 className='text-4xl tracking-tight font-bold text-gray-900 dark:text-white'>Non ci sono film che corrispondono ai criteri di ricerca</h1>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:gap-y-8 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3">
      {props.children}
    </div>
  );
};

const MovieItem = props => {
  return (
    <div className="flex flex-col w-full h-full rounded-lg shadow-md lg:max-w-sm">
      <div className="grow">
        <img
          className="object-cover w-full h-60 md:h-80"
          src={props.image}
          alt={props.title}
          loading="lazy"
        />
      </div>

      <div className="grow flex flex-col h-full p-3">
        <div className="grow mb-3 last:mb-0">
          {props.year || props.rating
            ? <div className="flex justify-between align-middle text-gray-900 text-xs font-medium mb-2">
              <span>{props.year}</span>

              {props.rating
                ? <Rating>
                  <Rating.Star />

                  <span className="ml-0.5">
                    {props.rating}
                  </span>
                </Rating>
                : null
              }
            </div>
            : null
          }

          <h3 className="text-gray-900 text-lg leading-tight font-semibold mb-1">
            {props.title}
          </h3>

          <p className="text-gray-600 text-sm leading-normal mb-4 last:mb-0">
            {props.plot.substr(0, 80)}...
          </p>
        </div>

        {props.wikipedia_url
          ? <Button
            color="light"
            size="xs"
            className="w-full"
            onClick={() => window.open(props.wikipedia_url, '_blank')}
          >
            More
          </Button>
          : null
        }
      </div>
    </div>
  );
};

export default Index;
