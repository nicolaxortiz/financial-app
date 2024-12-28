import React, { useContext, useEffect } from "react";
import { UseContext } from "../hooks/useContext";
import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid2";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Delete, Edit } from "@mui/icons-material";
import { movesAPI } from "../API/moves";
import AddIcon from "@mui/icons-material/Add";
import dateParser from "../functions/dateParser";

export default function MovesList() {
  const {
    selectedAccount,
    user,
    setMoves,
    moves,
    setLoadingMoves,
    loadingMoves,
    fetchMoves,
    filterMoves,
  } = useContext(UseContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    async function fetchMovesList() {
      const response = await movesAPI.getByAccountId(
        selectedAccount.id,
        filterMoves
      );
      setLoadingMoves(true);

      if (response.status === 200) {
        setMoves(response.rows);
      }

      if (response.status === 404) {
        setMoves([]);
      }
    }

    if (user) {
      fetchMovesList();
    }
  }, [selectedAccount, fetchMoves]);

  useEffect(() => {
    if (moves) {
      setTimeout(() => {
        setLoadingMoves(false);
      }, 2000);
    }
  }, [moves]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        {loadingMoves &&
          Array.from({ length: 6 }).map((_, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <Skeleton
                variant="rounded"
                height={"80px"}
                animation="wave"
                className="move-list-skeleton"
              />
            </Grid>
          ))}

        {!loadingMoves &&
          moves.map((move) => (
            <Grid size={{ xs: 12, md: 6 }} key={move.id}>
              <div className="move-list" onClick={handleClick}>
                <div className="first-line-move">
                  <p className="move-price">${move.amount.toLocaleString()}</p>
                  <p className="move-date">{dateParser(move.date)}</p>
                </div>

                <div className="second-line-move">
                  <p className="move-name">{move.name}</p>
                </div>

                <div className="third-line-move">
                  <p className="move-type">{move.type}</p>
                </div>
              </div>
            </Grid>
          ))}

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose} disableRipple>
            <Edit sx={{ mr: "10px" }} />
            Editar movimiento
          </MenuItem>
          <MenuItem onClick={handleClose} disableRipple>
            <Delete sx={{ mr: "10px" }} />
            Eliminar movimiento
          </MenuItem>
        </Menu>

        {!loadingMoves &&
          Array.from({ length: 6 - moves.length }).map((_, index) => (
            <Grid size={{ xs: 12, md: 6 }} key={index}>
              <div
                className="move-list-empty"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "#6B6B6B",
                }}
              >
                <div style={{ padding: "40px" }}></div>
              </div>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
