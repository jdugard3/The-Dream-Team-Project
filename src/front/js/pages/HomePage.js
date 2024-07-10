import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import ShoeCard from "../component/ShoeCard.jsx";

export const HomePage = () => {
    const { store } = useContext(Context);

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

export default HomePage;