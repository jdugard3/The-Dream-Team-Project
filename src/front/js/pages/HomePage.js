import React, { useContext } from "react";

export const HomePage = () => {
    const { store, actions } = useContext(Context);

    return (
        <>
            <p>
                Hello, I'm the Home Page of the hooplegendsneaker.com
            </p>


        </>
    );
};

export default HomePage;