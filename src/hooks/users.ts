import axios from "axios";

const client = axios.create();

export const getUsers = async (searchParam: string) => {
  const { data } = await client.get("/api/users", {
    params: {
      q: searchParam,
    },
  });

  return data.users;
};
