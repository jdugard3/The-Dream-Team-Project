import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const LeBronJames = () => {
    const { store,actions } = useContext(Context);  

    return(
        <>
            This is Lebron Page
        </>
    )
};