import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const StephenCurry = () => {
    const { store,actions } = useContext(Context);  

    return(
        <>
            This is Stephen Curry Page
        </>
    )
};