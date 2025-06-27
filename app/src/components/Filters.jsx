import { useEffect, useState } from "react";
import { MenuItem, TextField, Button, Box } from "@mui/material";
import { useFilmContext } from "../context/filmContext";
import axios from "axios";

export default function Filters({ onSaveFilter }) {
  const { filters, setFilters, fetchFiles, sortBy, sortOrder } = useFilmContext();
  const [categories, setCategories] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [actors, setActors] = useState([]);
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/categories`).then(res => setCategories(res.data.data));
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/languages`).then(res => setLanguages(res.data.data));
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/actors`).then(res => setActors(res.data.data));
  }, []);

  const handleChange = (e) => {
    setLocalFilters({ ...localFilters, [e.target.name]: e.target.value });
  };

  const handleApply = () => {
    setFilters(localFilters);
    fetchFiles(1, sortBy, sortOrder, localFilters);
  };

  const handleClear = () => {
    setLocalFilters({});
    setFilters({});
    fetchFiles(1, sortBy, sortOrder, {});
  };

  return (
    <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
      <TextField
        select label="Category" name="category"
        value={localFilters.category || ""}
        onChange={handleChange} size="small" sx={{ minWidth: 120 }}
      >
        <MenuItem value="">All</MenuItem>
        {categories.map(cat => (
          <MenuItem key={cat.category_id} value={cat.category_id}>{cat.name}</MenuItem>
        ))}
      </TextField>
      <TextField
        select label="Language" name="language"
        value={localFilters.language || ""}
        onChange={handleChange} size="small" sx={{ minWidth: 120 }}
      >
        <MenuItem value="">All</MenuItem>
        {languages.map(lang => (
          <MenuItem key={lang.language_id} value={lang.language_id}>{lang.name}</MenuItem>
        ))}
      </TextField>
      <TextField
        label="Release Year" name="release_year"
        value={localFilters.release_year || ""}
        onChange={handleChange} size="small" sx={{ minWidth: 120 }}
      />
      <TextField
        select label="Length Op" name="lengthOp"
        value={localFilters.lengthOp || ""}
        onChange={handleChange} size="small" sx={{ minWidth: 80 }}
      >
        <MenuItem value=""></MenuItem>
        <MenuItem value="eq">=</MenuItem>
        <MenuItem value="gt">&gt;</MenuItem>
        <MenuItem value="lt">&lt;</MenuItem>
      </TextField>
      <TextField
        label="Length" name="length"
        value={localFilters.length || ""}
        onChange={handleChange} size="small" sx={{ minWidth: 80 }} type="number"
      />
      <TextField
        select label="Actor" name="actor"
        value={localFilters.actor || ""}
        onChange={handleChange} size="small" sx={{ minWidth: 120 }}
      >
        <MenuItem value="">All</MenuItem>
        {actors.map(actor => (
          <MenuItem key={actor.actor_id} value={actor.actor_id}>
            {actor.first_name} {actor.last_name}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="contained" size="small" onClick={handleApply}>Apply</Button>
      <Button variant="outlined" size="small" onClick={handleClear}>Clear</Button>
      <Button variant="outlined" size="small" onClick={onSaveFilter}>Save Filter</Button>
    </Box>
  );
}