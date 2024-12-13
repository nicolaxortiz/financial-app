import React from "react";
import { Button, Divider, Pagination } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoveModal from "./MoveModal";
import TotalAmount from "./TotalAmount";
import SearchMoves from "./SearchMoves";
import MovesList from "./MovesList";

export default function Balance() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <p className="accounts-title">Nombre de la cuenta</p>
      <Divider />
      {/* Conteo del dinero */}
      <TotalAmount />

      <Divider />

      <SearchMoves />

      <Button
        variant="contained"
        color="indigoDye"
        sx={{ color: "#fff" }}
        startIcon={<AddIcon />}
        onClick={handleOpen}
      >
        Añadir movimiento
      </Button>

      <MoveModal handleClose={handleClose} open={open} />

      <MovesList />

      <Pagination
        count={4}
        color="prussianBlue"
        size="large"
        sx={{ mt: "30px", mb: "30px", justifySelf: "center" }}
      />
    </>
  );
}
