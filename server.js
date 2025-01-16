// server.js
import express from 'express';
import { exec } from 'child_process';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// server.js
app.post('/run', (req, res) => {
    const { year } = req.body;
    const exePath = path.join(__dirname, 'Application/back-end/main.exe');
    
    console.log('Received year:', year); // Log the received year
    
    exec(`${exePath} ${year}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error}`);
            return res.status(500).json({ error: error.message });
        }
        
        console.log('Program output:', stdout); // Log the program output
        console.log('Program errors:', stderr); // Log any errors
        
        res.json({ 
            output: stdout,
            error: stderr 
        });
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});