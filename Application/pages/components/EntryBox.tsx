// EntryBox.tsx
import React, { useState } from 'react';
import './EntryBox.css'; // Create this file with your CSS
import { submitYear } from '../services/yearService';
import Analysis from '../Analysis';
import { useNavigate } from 'react-router-dom';


export default function EntryBox() {
    const [year, setYear] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async () => {
        const isValid = parseInt(year, 10);
        if(!isValid){
            setYear('Invalid input please try again!');
            return;
        }
        const digYear: unknown = year;
        digYear as number;
        if(digYear as number < 2000 || digYear as number > 2024){
            setYear('Invalid year please try again!')
            return;
        }
        const result = await submitYear(year);
        console.log('Year:', year);
        setYear('');
        navigate('/analysis');




    };

    const handleKeyPress = (pressedKey: React.KeyboardEvent) => {
        if (pressedKey.key === 'Enter') {
            handleSubmit();
        }
    };





    return (
        <div className="wrapper">
            <input 
                className="input"
                type="text" 
                placeholder="ex. 2004"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                onKeyDown={handleKeyPress}
                id = "inputBox"
                
            />
            <button className="button" onClick={handleSubmit}>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"
                    viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                    strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M5 12l14 0"></path>
                    <path d="M13 18l6 -6"></path>
                    <path d="M13 6l6 6"></path>
                </svg>
            </button>
        </div>
    );
}