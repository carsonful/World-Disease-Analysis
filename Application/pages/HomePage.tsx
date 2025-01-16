import React from 'react';
import { Link } from "react-router-dom";
import ParticlesComponent from "./components/ParticleBg.tsx";
import EntryBox from './components/EntryBox.tsx';
import "./HomePage.css"
import "./components/EntryBox.css"


export default function HomePage() {
    return (// EntryBox is taken from the components folder
        <div className="container">
            <ParticlesComponent id="particles" />
            <div className="content">
                <h1 id="prompt">Enter a year 2000-2024</h1>
                <EntryBox />
                
                

            </div>
        </div>
    );
}