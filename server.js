import config from './config/config.js';
import app from './server/express.js';
import mongoose from 'mongoose';  // Import mongoose for MongoDB connection

// Connect to MongoDB using the URI from the config file
mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);  // Exit the process if the connection fails
});

// Route for testing server
app.get("/", (req, res) => {
    res.json({ message: "Welcome to User application." });
});

// Start the serverhow
app.listen(config.port, (err) => {
    if (err) {
        console.log(err);
    }
    console.info('Server started on port %s.', config.port);
});
