<?php

namespace App\Controller\Api;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\DBAL\Connection;

class OldestMoviesController extends AbstractController
{
    #[Route('/api/movies/oldest')]
    public function list(Connection $db): Response
    {
        $rows = $db->createQueryBuilder()
            ->select("m.*")
            ->from("movies", "m")
            ->orderBy("m.release_date", "ASC")
            ->setMaxResults(50)
            ->executeQuery()
            ->fetchAllAssociative();

        return $this->json([
            "movies" => $rows
        ]);
    }
}
