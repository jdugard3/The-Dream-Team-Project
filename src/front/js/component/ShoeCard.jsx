import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/shoecard.css";

const ShoeCard = ({ shoes }) => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
       if (!store.shoeImages[shoes.id]) {
        actions.getShoeImage(shoes.id);
       }
    }, [store.shoeImages, shoes.id, actions]);

    const handleFavorites = () => {
        if (!store.favorites.includes(shoes)) {
            actions.addFavorite(shoes);
        } else {
            actions.removeFavorite(shoes.id); 
        }
    };

    const handleOrders = () => {
        if (!store.orders.includes(shoes)) {
            actions.addToCart(shoes);
        }
    };

    return (
        <div className="card shoe-card">
            <div className="shoe-card-header">
                <h2 className="shoe-card-title">{shoes.name}</h2>
                <p className="shoe-card-brand">{shoes.brand}</p>
            </div>
            <div className="shoe-card-body">
                {store.shoeImages[shoes.id] && <img src={store.shoeImages[shoes.id]} className="shoe-card-image" />}
                <p className="shoe-card-price">${shoes.retailPrice}</p>
                <p className="shoe-card-story">{shoes.story}</p>
                <button className="btn btn-custom-favorite" onClick={handleFavorites}>
                    {store.favorites.includes(shoes) ? "Remove from Favorites" : "Add to Favorites"}
                </button>
                <button className="btn btn-custom-cart" onClick={handleOrders}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ShoeCard;
