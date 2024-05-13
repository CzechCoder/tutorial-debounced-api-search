import { useEffect, useState } from "react";
import { getUsers } from "@/hooks/users";
import { useQuery } from "@tanstack/react-query";
import { clearTimeout, setTimeout } from "timers";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function Home() {
  const [searchParam, setSearchParam] = useState<string>("");

  const { data: users, refetch } = useQuery<User[]>({
    queryKey: ["getUsers"],
    queryFn: () => getUsers(searchParam),
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      refetch();
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [searchParam]);

  return (
    <div className="pt-7 flex justify-center min-h-screen">
      <div className="min-w-[500px]">
        <div className="w-full max-w-[500px] inline-flex mb-7">
          <input
            type="text"
            className="p-4 grow outline-none border-2 border-orange-500 rounded-l-lg"
            placeholder="Search for ..."
            value={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
          />
          <button
            className="bg-orange-500 px-5 text-white outline-none border-0 text-sm font-bold uppercase rounded-r-lg cursor-pointer user-select-none"
            type="submit"
          >
            Search!
          </button>
        </div>

        <div className="flex flex-col">
          {users ? (
            users.length > 0 ? (
              users.map((user) => (
                <div key={user.id} className="mb-3">
                  <b>Name:</b> {user.name}, <b>Email:</b> {user.email}
                </div>
              ))
            ) : (
              <div>Sorry, nothing found.</div>
            )
          ) : (
            <div>Please search the desired user(s).</div>
          )}
        </div>
      </div>
    </div>
  );
}
