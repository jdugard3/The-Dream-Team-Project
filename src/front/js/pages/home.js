import React, { useContext } from "react";
import { Context } from "../store/appContext";
import ShoeCard from "../component/ShoeCard.jsx";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

    return (
        <>
            <p>
                Hello, I'm the Home Page of the hooplegendsneaker.com
            </p>

        <div>
            {store.shoes.map((shoe) => (
                <ShoeCard key={shoe.id} shoes={shoe} />
            ))}
        </div>
        </>
    );
};
