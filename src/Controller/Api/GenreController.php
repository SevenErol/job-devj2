<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\DBAL\Connection;


class GenreController extends AbstractController
{
    #[Route('/api/movies/genres/{genre}')]
    public function List(Connection $db, $genre): Response
    {


        $string_genre = strval($genre);

        // Get all genres records from DB
        $genresDB = $db->createQueryBuilder()
            ->select("g.*")
            ->from("genres", "g")
            ->orderBy("g.value", "DESC")
            ->setMaxResults(50)
            ->executeQuery()
            ->fetchAllAssociative();

        // Get all movies records from DB
        $movies = $db->createQueryBuilder()
            ->select("m.*")
            ->from("movies", "m")
            ->setMaxResults(50)
            ->executeQuery()
            ->fetchAllAssociative();

        // Get Pivot table from DB
        $movies_genres = $db->createQueryBuilder()
            ->select("m.*")
            ->from("movies_genres", "m")
            ->setMaxResults(50)
            ->executeQuery()
            ->fetchAllAssociative();

        $values_genres = [];

        foreach ($genresDB as $key => $single_genre) {
            array_push($values_genres, $single_genre['value']);
        }

        if(!in_array($string_genre, $values_genres)) {
            return $this->json([
                "success" => false,
                "movies" => []
            ]);
        }

        foreach($genresDB as $single_genre) {
            if ($single_genre['value'] === $string_genre) {
                $selected_genre_id = $single_genre['id'];
            }
        }

        $movies_genre_id = [];

        foreach ($movies_genres as $key => $movie_genre) {

            if ($movie_genre['genre_id'] === $selected_genre_id) {
                array_push($movies_genre_id, $movie_genre['movie_id']);
            }
        }

        $filtered_movies = [];

        foreach ($movies_genre_id as $key => $movie_genre_id) {
            
            foreach ($movies as $key => $movie) {
                if ($movie['id'] === $movie_genre_id) {
                    array_push($filtered_movies, $movie);
                }
            }
        }
        
        return $this->json([
            "success" => true,
            "movies" => $filtered_movies
        ]);
    }
}