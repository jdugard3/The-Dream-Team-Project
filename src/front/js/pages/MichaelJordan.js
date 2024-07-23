import React, { useContext } from "react";
import { Context } from "../store/appContext";
import ShoeCard from "../component/ShoeCard.jsx";
import "../../styles/home.css";

const PlayerProfile = ({ player }) => (
    <section className="player-profile">
        <img src={player.image} alt={player.name} />
        <h2>{player.name}</h2>
        <p>Position: {player.position}</p>
        <p>Team: {player.team}</p>
        <p>Achievements: {player.achievements}</p>
    </section>
);

const SneakerPair = ({ sneaker }) => (
    <div className="sneaker-pair">
        <img src={sneaker.image} alt={sneaker.name} />
        <div>
            <h3>{sneaker.name}</h3>
            <p>{sneaker.description}</p>
        </div>
    </div>
);

const Story = ({ story }) => (
    <div className="story">
        <h3>{story.title}</h3>
        <p>{story.content}</p>
    </div>
);

export const MichaelJordan = () => {
    const { store, actions } = useContext(Context);

    const player = {
        name: "Michael Jordan",
        position: "Shooting Guard",
        team: "Chicago Bulls",
        achievements: "6x NBA Champion",
        image: "/path/to/michael-jordan.jpg"
    };

    const sneakerPairs = [
        {
            name: "Air Jordan 1",
            image: "/path/to/air-jordan-1.jpg",
            description: "The iconic sneaker that started it all. Worn by the player in their rookie season."
        },
        {
            name: "Air Jordan 6",
            image: "/path/to/air-jordan-6.jpg",
            description: "Worn during the player's first NBA championship win in 1991."
        },
        {
            name: "Air Jordan 11",
            image: "/path/to/air-jordan-11.jpg",
            description: "Known for its patent leather finish, worn during the 1995-96 season."
        }
    ];

    const stories = [
        {
            title: "The Birth of a Legend",
            content: "The Air Jordan 1 was first introduced in 1985. The player wore these during their rookie season, marking the beginning of a legendary career."
        },
        {
            title: "First Championship",
            content: "In 1991, the player led the Chicago Bulls to their first NBA Championship, wearing the Air Jordan 6. This marked the start of their dominance in the league."
        },
        {
            title: "The Comeback",
            content: "After a brief retirement, the player returned to the NBA in 1995 and wore the Air Jordan 11, leading the Bulls to a historic 72-10 season and another championship."
        }
    ];

    return (
        <div>
            <header>
                <nav>
                    <div className="logo">HoopLegendSneakers</div>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/michael-jordan">Michael Jordan Collection</a></li>
                    </ul>
                </nav>
            </header>
            <main>
                <PlayerProfile player={player} />
                    <div>
                        {store.shoes.map((shoe) => (
                            <ShoeCard key={shoe.id} shoes={shoe} />
                        ))}
                    </div>
                <section className="sneaker-pairs">
                    <h2>Legendary Sneaker Pairs</h2>
                    {sneakerPairs.map((sneaker, index) => (
                        <SneakerPair key={index} sneaker={sneaker} />
                    ))}
                </section>
                <section className="stories-behind">
                    <h2>Stories Behind the Sneakers</h2>
                    {stories.map((story, index) => (
                        <Story key={index} story={story} />
                    ))}
                </section>
            </main>
            <footer>
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
            </footer>
        </div>
    );
};
