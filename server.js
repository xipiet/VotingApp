const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let candidates = [];
let votes = {};
let votingOpen = false;
let voters = new Set(); // Track users who have already voted

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/add-candidate', (req, res) => {
    if (votingOpen) return res.status(400).send("Voting is already open. Can't add candidates.");
    const { name } = req.body;
    if (!candidates.includes(name)) {
        candidates.push(name);
        votes[name] = 0;
        res.send("Candidate added.");
    } else {
        res.status(400).send("Candidate already exists.");
    }
});

app.post('/toggle-voting', (req, res) => {
    votingOpen = !votingOpen;
    if (!votingOpen) {
        io.emit('refresh'); // Notify all clients to refresh when voting stops
        res.send("Voting is now closed.");
    } else {
        votes = candidates.reduce((acc, candidate) => {
            acc[candidate] = 0;
            return acc;
        }, {});
        voters.clear(); // Clear voters for a new voting session
        io.emit('refresh'); // Notify all clients to refresh when voting starts
        res.send("Voting is now open. Previous votes have been reset.");
    }
});

app.get('/candidates', (req, res) => {
    res.json({ candidates, votingOpen });
});

app.post('/vote', (req, res) => {
    if (!votingOpen) return res.status(400).send("Voting is closed.");
    const userId = req.ip; // Use user's IP to identify
    const { name } = req.body;

    if (voters.has(userId)) {
        return res.status(400).send("You have already voted.");
    }

    if (candidates.includes(name)) {
        votes[name]++;
        voters.add(userId); // Mark the user as having voted
        res.send("Vote counted.");
    } else {
        res.status(400).send("Invalid candidate.");
    }
});

app.get('/results', (req, res) => {
    if (votingOpen) return res.status(400).send("Voting is still open.");
    res.json(votes);
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
