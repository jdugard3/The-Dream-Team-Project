import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import ShoeCard from "../component/ShoeCard.jsx";
import "../../styles/home.css";

const PlayerProfile = ({ player }) => (
    <section className="player-profile">
        <img style={{boxShadow: "none", borderRadius: "20%"}} src={player.topImage} alt={`${player.name} Top`} className="top-image" />
        <h2>{player.name}</h2>
        <p>Position: {player.position}</p>
        <p>Team: {player.team}</p>
        <p>Achievements: {player.achievements}</p>
    </section>
);

const SneakerPair = ({ sneaker }) => (
    <div className="sneaker-pair">
        <img style={{boxShadow: "none"}} src={sneaker.image} alt={sneaker.name} />
        <div>
            <h3>{sneaker.name}</h3>
            <p>{sneaker.description}</p>
        </div>
    </div>
);

export const MichaelJordan = () => {
    const { store, actions } = useContext(Context);

    const player = {
        name: "Michael Jordan",
        position: "Shooting Guard",
        team: "Chicago Bulls",
        achievements: "6x NBA Champion",
        image: "/path/to/michael-jordan.jpg",
        topImage: "https://globalgrind.com/wp-content/uploads/sites/16/2016/02/75317063.jpg?w=688&h=1024&strip=all&quality=80"
    };

    const sneakerPairs = [
        {
            name: "Air Jordan 1",
            image: "https://image.goat.com/attachments/product_template_pictures/images/100/714/828/original/DZ5485_106.png.png",
            description: "The Air Jordan 1 is a high-top basketball shoe first produced by Nike for Michael Jordan in 1984 and released to the public in 1985. It features a sleek design with a prominent Nike Swoosh, the iconic Air Jordan Wings logo, and a durable leather upper. The original Bred (Black and Red) colorway became instantly recognizable and controversial, as it violated NBA uniform policies, leading Nike to capitalize on the Banned storyline for marketing. Its success on and off the court, driven by Jordan's legendary performance and Nike's innovative marketing, cemented the Air Jordan 1 as a cultural icon in both sports and fashion.",
            link: "https://image.goat.com/attachments/product_template_pictures/images/100/714/828/original/DZ5485_106.png.png"
        },
        {
            name: "Air Jordan 6",
            image: "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/100/378/770/original/1255244_01.jpg.jpeg?action=crop&width=600",
            description: "The Air Jordan 6, released in 1991, is a celebrated basketball shoe designed by Tinker Hatfield for Michael Jordan, featuring a high-top silhouette, perforated side panels, and a distinctive heel tab for easy on-off access. Its design, inspired by Jordan's German sports car, includes visible Air cushioning in the sole for enhanced comfort and support. The Air Jordan 6 gained legendary status when Michael Jordan wore it during his first NBA championship win with the Chicago Bulls. Its blend of performance and style, coupled with its historic significance, has solidified its place as a beloved sneaker in the Air Jordan lineage.",
            link: "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/100/378/770/original/1255244_01.jpg.jpeg?action=crop&width=600"
        },
        {
            name: "Air Jordan 11",
            image: "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/099/941/848/original/478948_01.jpg.jpeg?action=crop&width=600",
            description: "The Air Jordan 11, released in 1995, is an iconic basketball shoe designed by Tinker Hatfield, known for its sleek patent leather upper, mesh fabric, and translucent rubber sole. It was designed to be both a high-performance athletic shoe and a stylish off-court option, showcasing a unique blend of luxury and technology. Michael Jordan wore the Air Jordan 11 during the 1995-96 NBA season, leading the Chicago Bulls to a historic 72-10 record and his fourth NBA championship. Its debut on the court and in the movie Space Jam solidified its legendary status, making it one of the most beloved and sought-after models in the Air Jordan series.",
            link: "https://image.goat.com/transform/v1/attachments/product_template_additional_pictures/images/099/941/848/original/478948_01.jpg.jpeg?action=crop&width=600"
        }
    ];

    return (
        <div>
                {/* <PlayerProfile player={player} />
                <div className="shoe-card-container">
                    {store.shoes.map((shoe) => (
                        <ShoeCard key={shoe.id} shoe={shoe} />
                    ))}
                </div> */}

            {/* <header>
                <nav>
                    <div className="logo">HoopLegendSneakers</div>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/michael-jordan">Michael Jordan Collection</a></li>
                    </ul>
                </nav>
            </header> */}
            <main>
                <PlayerProfile player={player} />
                    <div>
                        {store.shoes.map((shoe) => (
                            <ShoeCard key={shoe.id} shoe={shoe} />
                        ))}
                    </div>

                <section className="sneaker-pairs">
                    <h2>Legendary Sneaker Pairs</h2>
                    {sneakerPairs.map((sneaker, index) => (
                        <SneakerPair key={index} sneaker={sneaker} />
                    ))}
                </section>
            </main>
            {/* <footer>
                <p>© 2024 HoopLegendSneakers. Celebrating the history and significance of legendary basketball sneakers.</p>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Terms of Service</a></li>
                </ul>
                <div className="social-media">
                    <a href="#"><img src="/path/to/facebook-icon.png" alt="Facebook" /></a>
                    <a href="#"><img src="/path/to/twitter-icon.png" alt="Twitter" /></a>
                    <a href="#"><img src="/path/to/instagram-icon.png" alt="Instagram" /></a>
                </div>
            </footer> */}
        </div>
    );
};