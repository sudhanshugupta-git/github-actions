import { Drawer, Tabs, Tab, Box, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";

export default function FilmDetailsPanel({ open, onClose, film }) {
  const [tab, setTab] = useState(0);
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tab === 1 && film) {  // film should be not null or undefined
      setLoading(true);
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/films/${film.film_id}/actors`)
        .then((res) => setActors(res.data.data || []))
        .finally(() => setLoading(false));
    }
  }, [tab, film]);

  if (!film) return null;

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 2 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="Info" />
          <Tab label="Actors" />
        </Tabs>
        {tab === 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">{film.title}</Typography>
            <Typography variant="body2">{film.description}</Typography>
            <Typography variant="body2">Release Year: {film.release_year}</Typography>
            <Typography variant="body2">Language: {film.language?.name}</Typography>
            <Typography variant="body2">Length: {film.length} min</Typography>
            <Typography variant="body2">Rating: {film.rating}</Typography>
          </Box>
        )}
        {tab === 1 && (
          <Box sx={{ mt: 2 }}>
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <ul>
                {actors.map((actor) => (
                  <li key={actor.actor_id}>
                    {actor.first_name} {actor.last_name}
                  </li>
                ))}
              </ul>
            )}
          </Box>
        )}
      </Box>
    </Drawer>
  );
}