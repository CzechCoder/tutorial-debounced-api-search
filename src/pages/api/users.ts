import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

interface User {
  id: number;
  name: string;
  email: string;
}

const users = [
  {
    id: 1,
    name: "John Balcar",
    email: "john.balcar@gmail.com",
  },
  {
    id: 2,
    name: "David Holzenberg",
    email: "david.holzenberg@gmail.com",
  },
  {
    id: 3,
    name: "Dianna Apone",
    email: "dianna.apone@gmail.com",
  },
  {
    id: 4,
    name: "Vivienne Jacques",
    email: "vivienne.jacques@gmail.com",
  },
  {
    id: 5,
    name: "Marianne Davidson",
    email: "marianne.davidson@gmail.com",
  },
  {
    id: 6,
    name: "James Sterling",
    email: "james.sterling@gmail.com",
  },
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ users: User[] }>
) {
  const searchParam = req.query.q as string;
  let filtered_users_data;

  if (searchParam) {
    filtered_users_data = users.filter((user) =>
      user.name.toLowerCase().includes(searchParam.toLowerCase())
    );
  } else filtered_users_data = users;

  res.status(200).json({ users: filtered_users_data });
}
