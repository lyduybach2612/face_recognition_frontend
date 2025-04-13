const USER_CREATION_URL = "http://127.0.0.1:8000/user/";

const createUser = async (username) => {
  const response = await fetch(USER_CREATION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
    }),
  });
  return response.json();
};

export { createUser };
