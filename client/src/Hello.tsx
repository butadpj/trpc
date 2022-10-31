import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { trpc } from "./utils/trpc";

function Hello() {
    const queryClient = useQueryClient();
    const user = trpc.userById.useQuery(1);
    const allUsers = trpc.allUsers.useQuery();

    const createUserMutation = trpc.createUser.useMutation();

    const handleCreateUser = (userName: string) => {
        createUserMutation.mutate(
            { name: userName },
            {
                onSuccess: (newUser) => {
                    queryClient.invalidateQueries(allUsers);
                },
            }
        );
    };

    if (allUsers.isLoading) return <h2>Loading...</h2>;

    return (
        <div>
            <div>
                {allUsers.data?.map((user) => {
                    return <h3 key={user.id}>{user.name}</h3>;
                })}
            </div>
            <br />
            <button onClick={() => handleCreateUser("ASDDSA")}>
                Create New User
            </button>
            {createUserMutation.error && (
                <p>Something went wrong! {createUserMutation.error.message}</p>
            )}
            {createUserMutation.isSuccess && (
                <p>New user added!</p>
            )}
        </div>
    );
}

export default Hello;
