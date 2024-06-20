import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';

// Define Submission interface
interface Submission {
    id: string; // Assuming each submission has a unique ID
    name: string;
    email: string;
    phone: string;
    github_link: string;
    stopwatch_time: string;
}

// Express setup
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const dbFilePath = path.join(__dirname, './db.json');

// Ensure db.json exists, if not create an empty file
try {
    fs.accessSync(dbFilePath);
} catch (error) {
    fs.writeFileSync(dbFilePath, '[]');
    console.log('Created new db.json file.');
}

// Endpoint to ping server
app.get('/ping', (req: Request, res: Response) => {
    res.json(true);
});

// Endpoint to submit form data
app.post('/submit', (req: Request, res: Response) => {
    try {
        const submissions: Submission[] = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
        const newSubmission: Submission = { ...req.body, id: (submissions.length + 1).toString() }; // Add unique ID
        submissions.push(newSubmission);
        fs.writeFileSync(dbFilePath, JSON.stringify(submissions, null, 2));
        res.status(201).json(newSubmission);
    } catch (error) {
        console.error('Error saving submission:', error);
        res.status(500).json({ error: 'Failed to save submission.' });
    }
});

// Endpoint to read all form data
app.get('/read', (req: Request, res: Response) => {
    try {
        const submissions: Submission[] = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
        res.json(submissions);
    } catch (error) {
        console.error('Error reading submissions:', error);
        res.status(500).json({ error: 'Failed to read submissions.' });
    }
});

// Endpoint to read form data by index
app.get('/read/:index', (req: Request, res: Response) => {
    const { index } = req.params;

    try {
        const data = fs.readFileSync(dbFilePath, 'utf-8');
        let submissions: Submission[] = [];
        if (data.trim() !== '') {
            submissions = JSON.parse(data);
        }

        const idx = Number(index);
        if (idx >= 0 && idx < submissions.length) {
            res.json(submissions[idx]);
        } else {
            res.status(404).json({ error: 'Submission not found.' });
        }
    } catch (error) {
        console.error('Error reading submissions:', error);
        res.status(500).json({ error: 'Failed to read submissions.' });
    }
});

// Endpoint to update form data
app.put('/update/:id', (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const submissions: Submission[] = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
        const index = submissions.findIndex(sub => sub.id === id);

        if (index !== -1) {
            submissions[index] = { ...submissions[index], ...req.body };
            fs.writeFileSync(dbFilePath, JSON.stringify(submissions, null, 2));
            res.status(200).json(submissions[index]);
        } else {
            res.status(404).json({ message: 'Submission not found' });
        }
    } catch (error) {
        console.error('Error updating submission:', error);
        res.status(500).json({ error: 'Failed to update submission.' });
    }
});

// Endpoint to delete form data
app.delete('/delete/:id', (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const submissions: Submission[] = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
        const index = submissions.findIndex(sub => sub.id === id);

        if (index !== -1) {
            submissions.splice(index, 1);
            fs.writeFileSync(dbFilePath, JSON.stringify(submissions, null, 2));
            res.status(200).json({ message: 'Submission deleted successfully' });
        } else {
            res.status(404).json({ message: 'Submission not found' });
        }
    } catch (error) {
        console.error('Error deleting submission:', error);
        res.status(500).json({ error: 'Failed to delete submission.' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
