import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/shoecard.css"

const ShoeCard = ({ shoes }) => {
    const { store, actions } = useContext(Context);

    const handleFavorites = () => {
        if (!store.favorites.includes(shoes)) {
            actions.addFavorite(shoes);
        } else {
            actions.removeFavorite(shoes.id); // Ensure removeFavorite uses shoes.id
        }
    };

    return (
        <div className="card shoe-card">
            <div className="shoe-card-header">
                <h2 className="shoe-card-title">{shoes.name}</h2>
                <p className="shoe-card-brand">{shoes.brand}</p>
            </div>
            <div className="shoe-card-body">
                <p className="shoe-card-price">${shoes.retailPrice}</p>
                <p className="shoe-card-story">{shoes.story}</p>
                <button className="btn btn-custom-favorite" onClick={handleFavorites}>
                    {store.favorites.includes(shoes) ? "Remove from Favorites" : "Add to Favorites"}
                </button>
            </div>
        </div>
    );
};

export default ShoeCard;
