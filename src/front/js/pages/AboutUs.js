import React from 'react';
import './../../styles/AboutUs.css';

const teamMembers = [
    {
        name: 'Brandon Panavelil',
        title: 'Software Developer',
        bio: "Hello! I’m Brandon Panavelil, a motivated software developer who loves bringing ideas to life with coding and software. After writing my first program in a biostatistics course in undergrad, I became fascinated by technology's potential to solve real-world problems. When I'm not coding, you can find me playing basketball, reading books, spending time with family and friends, and volunteering at my local church. I enjoy learning and seeking new challenges. We hope you enjoy our website!",
    },
    {
        name: 'James Dugard',
        title: 'Team Lead/Software Developer',
        bio: "Hello! I’m James Dugard, a passionate software developer who loves bringing ideas to life through code. I've always been fascinated by technology's potential to solve real-world problems. When I'm not coding, you can find me adventuring with my family, at the gym, or with friends. Leading this team has been such a great learning experience and I will utilize everything I have learned in my future projects. Lets collaborate and create something amazing together!",
    },
    {
        name: 'Giancarlo Alcantara',
        title: 'Software Developer',
        bio: "Hello! I'm Giancarlo Alcantara, a dedicated software developer with a strong interest in learn. I enjoy collaborating and communicating with others as a team, as it has shown me how much I can learn from my teammates compared to working alone. In my free time, I love exploring New York City, discovering new food spots, swimming, and having fun with friends and family.",
    },
    {
        name: 'Adam Kurz',
        title: 'Software Developer',
        bio: "Adam, an inquisitive and idealistic individual, loves putting his ideas to the metaphorical notepad, so as to breathe life into coding. From his humble beginnings in college computer classes, he’s been gobsmacked by the limitless potential of technology and its power to bring joy to others. He thrives in creative, collaboration-centered environments with others where he can continuously learn and grow. Outside of my work as a software developer, he enjoys working out, video games, and going for walks. These experiences serve inspire and help him. He’s gone on the record to say, “lifelong learning is crucial to a life well-lived. Challenges should serve as a forefront to that learning!",
    },
];

export const AboutUs = () => {
    return (
        <div className="about-us">
            <h1>About Us</h1>
            <p>Meet the team behind HoopLegends Sneakers.</p>
            <div className="team">
                {teamMembers.map((member, index) => (
                    <div className="team-member" key={index}>
                        <h2>{member.name}</h2>
                        <h3>{member.title}</h3>
                        <p>{member.bio}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
