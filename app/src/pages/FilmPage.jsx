import { useState } from "react";
import { TablePagination } from "@mui/material";
import {
  Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Table, TableHead, TableRow, TableCell, TableSortLabel
} from "@mui/material";
import FilmTable from "../components/FilmTable";
import Filters from "../components/Filters";
import ViewPanel from "../components/ViewPanel";
import { useFilmContext } from "../context/filmContext";

export default function FilmPage() {
  const {
    sortBy, setSortBy, sortOrder, setSortOrder, fetchFiles, saveView, filters, currentPage, totalPages, totalCount
  } = useFilmContext();

  const [showFilters, setShowFilters] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [viewName, setViewName] = useState("");

  const handleSave = () => {
    saveView(viewName, filters, sortBy, sortOrder);
    setSaveModalOpen(false);
    setViewName("");
  };

  const handleSort = (field) => {
    const isAsc = sortBy === field && sortOrder === "asc";
    setSortBy(field);
    setSortOrder(isAsc ? "desc" : "asc");
    fetchFiles(1, field, isAsc ? "desc" : "asc");
  };

  const createSortHandler = (field) => () => handleSort(field);


  const handleChangePage = (event, newPage) => {
    fetchFiles(newPage + 1, sortBy, sortOrder);
  };

  return (
    <div className="film-page">
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16,
      }}>
        <h3 style={{ margin: 0 }}>Film Page</h3>
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="outlined" onClick={() => setShowFilters(f => !f)}>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
          <ViewPanelButton />
        </div>
      </div>
      {showFilters && (
        <Filters onSaveFilter={() => setSaveModalOpen(true)} />
      )}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sortBy === "title"}
                direction={sortBy === "title" ? sortOrder : "asc"}
                onClick={createSortHandler("title")}
              >Title</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === "release_year"}
                direction={sortBy === "release_year" ? sortOrder : "asc"}
                onClick={createSortHandler("release_year")}
              >Release Year</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === "language"}
                direction={sortBy === "language" ? sortOrder : "asc"}
                onClick={createSortHandler("language")}
              >Language</TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === "length"}
                direction={sortBy === "length" ? sortOrder : "asc"}
                onClick={createSortHandler("length")}
              >Length</TableSortLabel>
            </TableCell>
            <TableCell>Replacement Cost</TableCell>
            <TableCell>
              <TableSortLabel
                active={sortBy === "rating"}
                direction={sortBy === "rating" ? sortOrder : "asc"}
                onClick={createSortHandler("rating")}
              >Rating</TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <FilmTable />
      </Table>
      <TablePagination 
        component="div"
        count={totalCount}
        page={currentPage - 1}
        onPageChange={handleChangePage}
        rowsPerPage={10}
        rowsPerPageOptions={[]}
      />
      <Dialog open={saveModalOpen} onClose={() => setSaveModalOpen(false)}>
        <DialogTitle>Save Current View</DialogTitle>
        <DialogContent>
          <TextField
            label="View Name"
            value={viewName}
            onChange={e => setViewName(e.target.value)}
            fullWidth
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSaveModalOpen(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={!viewName.trim()}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function ViewPanelButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Views
      </Button>
      <ViewPanel open={open} onClose={() => setOpen(false)} />
    </>
  );
}