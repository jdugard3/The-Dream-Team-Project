import React from 'react';
import './AboutUs.css';

const teamMembers = [
    {
        name: 'Brandon Panavelil',
        title: 'Software Developer',
        bio: 'Brandon is the visionary behind HoopLegends Sneakers, with a passion for basketball and a keen eye for sneaker culture.',
        image: 'path_to_brandon_image.jpg',
    },
    {
        name: 'James Dugard',
        title: 'Software Developer',
        bio: 'James is responsible for our marketing strategy and making sure our message reaches basketball fans around the world.',
        image: 'path_to_james_image.jpg',
    },
    {
        name: 'Giancarlo Alcantara',
        title: 'Software Developer',
        bio: 'Giancarlo brings creativity and innovation to our designs, ensuring every sneaker tells a story.',
        image: 'path_to_giancarlo_image.jpg',
    },
    {
        name: 'Adam Kurz',
        title: 'Software Developer',
        bio: 'Adam ensures our customers have a seamless experience from browsing to purchasing their favorite sneakers.',
        image: 'path_to_adam_image.jpg',
    },
];

const AboutUs = () => {
    return (
        <div className="about-us">
            <h1>About Us</h1>
            <p>Meet the team behind HoopLegends Sneakers.</p>
            <div className="team">
                {teamMembers.map((member, index) => (
                    <div className="team-member" key={index}>
                        <img src={member.image} alt={member.name} className="team-member-image" />
                        <h2>{member.name}</h2>
                        <h3>{member.title}</h3>
                        <p>{member.bio}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutUs;
