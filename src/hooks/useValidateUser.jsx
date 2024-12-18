import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { UseContext } from "./useContext.js";

export default function useValidateUser() {
  const { setUser } = useContext(UseContext);
  const [isValidUser, setIsValidUser] = useState(false);

  useEffect(() => {
    const searchUser = localStorage.getItem("user");

    if (searchUser === null) {
      setIsValidUser(false);
    } else {
      setUser(JSON.parse(searchUser));
      setIsValidUser(true);
    }
  }, []);

  return isValidUser;
}