import React, { useContext, useState } from "react";
import Modal from "@mui/material/Modal";
import { set, useForm } from "react-hook-form";
import { Box, Stack, Button, Collapse, Alert, TextField } from "@mui/material";
import "../app.css";
import { accountsAPI } from "../API/accounts";
import { UseContext } from "../hooks/useContext";
import { LoadingButton } from "@mui/lab";

export default function AccountModal({
  handleClose,
  open,
  method,
  selectedAccount,
}) {
  const { setAccounts, user, setLoadingAccounts } = useContext(UseContext);

  const [openAlert, setOpenAlert] = useState(false);
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 400,
    minWidth: 250,
    bgcolor: "#F4F9E9",
    border: "2px solid #284b63",
    borderRadius: "5px",
    boxShadow: 24,
    p: 4,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoadingAccounts(true);
    setOpenAlert(false);
    setAlert("");
    setLoading(true);

    const response =
      method === "create"
        ? await accountsAPI.create({ name: data.name, id_user: user.id })
        : await accountsAPI.update({ name: data.name, id: selectedAccount.id });

    if (response.status === 200) {
      const responseGet = await accountsAPI.getByID(user.id);

      if (responseGet.status === 200) {
        setTimeout(() => {
          localStorage.setItem("accounts", JSON.stringify(responseGet.rows));
          setAccounts(responseGet.rows);
          setLoading(false);
          reset();
          handleClose();
        }, 2000);
      }
    }

    if (response.status === 500) {
      setTimeout(() => {
        setAlert(response.message);
        setOpenAlert(true);
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <p className="title-modal">¿Cual es el nuevo nombre de la cuenta</p>

        <Collapse in={openAlert}>
          <Alert severity="error" sx={{ mb: "10px" }}>
            {alert}
          </Alert>
        </Collapse>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="filled-basic"
            label="Nombre de la cuenta"
            placeholder={method === "update" ? selectedAccount.name : ""}
            variant="filled"
            color="indigoDye"
            disabled={loading}
            fullWidth
            {...register("name", {
              required: true,
              pattern: /^[A-Za-z ]+$/i,
            })}
          />

          {errors.name?.type === "required" && (
            <p className="input-information">
              * El nombre de la cuenta es obligatorio
            </p>
          )}
          {errors.name?.type === "pattern" && (
            <p className="input-information">
              * El nombre no puede contener números o caracteres especiales
            </p>
          )}

          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "end", mt: "30px" }}
          >
            <Button variant="outlined" color="indigoDye" onClick={handleClose}>
              Cancelar
            </Button>
            <LoadingButton
              variant="contained"
              loading={loading}
              color="indigoDye"
              sx={{ color: "#fff" }}
              type="submit"
            >
              Guardar
            </LoadingButton>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
}
