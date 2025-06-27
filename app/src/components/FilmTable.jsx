import { TableBody, TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
import FilmDetailsPanel from "./FilmDetailsPanel";
import { useFilmContext } from "../context/filmContext";

export default function FilmTable({ onRowClick }) {
  const { films, currentPage, fetchFiles, sortBy, sortOrder } = useFilmContext();

  const [selectedFilm, setSelectedFilm] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const handleRowClick = (film) => {
    setSelectedFilm(film);
    setPanelOpen(true);
    // if (onRowClick) onRowClick(film);
  };

  useEffect(() => {
    fetchFiles(currentPage, sortBy, sortOrder);
  }, [sortBy, sortOrder]);

  return (
    <>
      <TableBody>
        {films.map((film, index) => (
          <TableRow
            key={film.film_id}
            sx={{
              backgroundColor:
                index % 2 === 0 ? "rgba(0 ,0, 0, 0.04)" : "white",
            }}
            onClick={() => handleRowClick(film)}
          >
            <TableCell>{film.title}</TableCell>
            <TableCell>{film.release_year}</TableCell>
            <TableCell>{film.language?.name}</TableCell>
            <TableCell>{film.length}</TableCell>
            <TableCell>{film.replacement_cost}</TableCell>
            <TableCell>{film.rating}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <FilmDetailsPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        film={selectedFilm}
      />
    </>
  );
}
