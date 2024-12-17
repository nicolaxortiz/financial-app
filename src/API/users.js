const url = "http://localhost:3000/api/users";

export const usersAPI = {
  getbyEmailandPassword: async (data) => {
    const response = await fetch(`${url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dataResponse = await response.json();

    return dataResponse;
  },
};
