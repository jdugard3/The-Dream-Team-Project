import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const ProfilePage = () => {
    const { store, actions } = useContext(Context);

    return(
        <>
            This is the User Profile Page! 
        </>
    )
};