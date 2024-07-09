import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const PlayerPage = () => {
    const {store, actions} = useContext(Context)

    return (
        <>
            This is the Player Page that will the player's shoes 

            <div>
                <h1>Shoe Test</h1>
                <ul>
                    {store.shoes.map(shoe => (
                        <li key={shoe.id}>
                            {shoe.name} - {shoe.brand} - ${shoe.retailPrice} - {shoe.story}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default PlayerPage;