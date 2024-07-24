import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const KevinDurant = () => {
    const { store,actions } = useContext(Context);  

    return(
        <>
            This is Kevin Durant Page
        </>
    )
};