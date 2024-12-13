import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import { IconButton, TextField } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FilterModal from "./FilterModal";

export default function SearchMoves() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box sx={{ flexGrow: 1, mb: "20px", mt: "20px" }}>
      <Grid
        container
        spacing={3}
        sx={{
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <Grid size={{ xs: 10, md: 11 }}>
          <TextField
            id="filled-basic"
            label="Buscar movimiento"
            variant="filled"
            color="prussianBlue"
            size="small"
            fullWidth
          />
        </Grid>

        <Grid size={{ xs: 2, md: 1 }}>
          <IconButton aria-label="filter" onClick={handleOpen}>
            <FilterAltIcon />
          </IconButton>
        </Grid>

        <FilterModal handleClose={handleClose} open={open} />
      </Grid>
    </Box>
  );
}
