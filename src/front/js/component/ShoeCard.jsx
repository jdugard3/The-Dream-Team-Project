import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/shoecard.css";

const ShoeCard = ({ shoe }) => {
    const { store, actions } = useContext(Context);

    // useEffect(() => {
    //    if (!store.shoeImages[shoe.id]) {
    //     actions.getShoeImage(shoe.id);
    //    }
    // }, [store.shoeImages, shoe.id, actions]);

    const handleFavorites = () => {
        if (!store.favorites.includes(shoe)) {
            actions.addFavorite(shoe);
        } else {
            actions.removeFavorite(shoe.id); 
        }
    };

    const handleOrders = () => {
        if (!store.orders.includes(shoe)) {
            actions.addToCart(shoe);
        } else {
            actions.removeFromCart(shoe.id); 
        }
    };

    return (
        <div className="card shoe-card">
            <div className="shoe-card-header">
                <h2 className="shoe-card-title">{shoe.name}</h2>
                <p className="shoe-card-brand">{shoe.brand}</p>
            </div>
            <div className="shoe-card-body">
                {store.shoeImages[shoe.id] && <img src={store.shoeImages[shoe.id]} className="shoe-card-image" />}
                <p className="shoe-card-price">${shoe.price}</p>
                <p className="shoe-card-story">{shoe.story}</p>
                <button className="btn btn-custom-favorite" onClick={handleFavorites}>
                    {store.favorites.includes(shoe) ? "Remove from Favorites" : "Add to Favorites"}
                </button>
                <button className="btn btn-custom-cart" onClick={handleOrders}>
                    {store.orders.includes(shoe) ? "Remove from Cart" : "Add to Cart"}
                </button>
            </div>
        </div>
    );
};

export default ShoeCard;
