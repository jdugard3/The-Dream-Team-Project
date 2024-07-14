import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const KobeBryant = () => {
    const { store,actions } = useContext(Context);  

    return(
        <>
            This is Kobe Page
        </>
    )
};