import { Drawer, List, ListItem, ListItemText, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFilmContext } from "../context/filmContext";

export default function ViewPanel({ open, onClose }) {
  const { views, runView, activeView } = useFilmContext();

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div style={{ width: 320, padding: 16, height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">Saved Views</Typography>
          <IconButton onClick={onClose}><CloseIcon /></IconButton>
        </div>
        <List>
          {views.length === 0 && <Typography sx={{ mt: 2 }}>No saved views.</Typography>}
          {views.map((view) => (
            <ListItem
              button
              key={view.name}
              selected={activeView === view.name}
              onClick={() => {
                runView(view);
                onClose();
              }}
            >
              <ListItemText primary={view.name} />
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
}