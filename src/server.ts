import app from './app';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

const connectionOptions: mongoose.ConnectOptions = {};
const result = dotenv.config();
if (result.error) {
    dotenv.config({ path: '.env.default' });
}

const PORT = process.env.PORT || 3000;

if (process.env.MONGO_URL == null) {
    console.log('MONGO_URL not specified in environment');
    process.exit(1);
} else {
    mongoose.connect(process.env.MONGO_URL, (err) => {
        if (err) {
            console.log(err.message);
            console.log(err);
            process.exit(1)
        } else {
            console.log(`Connected to MongoDB at ${process.env.MONGO_URL}`);
        }
    });
}

app.listen(PORT, () => {
    console.log(`🌏 Express server started at http://localhost:${PORT}`);
    console.log(`⚙️  Swagger UI hosted at http://localhost:${PORT}/api-docs`);
});

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => {
    console.log('\n'); /* eslint-disable-line */
    console.log('Gracefully shutting down');
    console.log('Closing the MongoDB connection');
    mongoose.connection.close((err) => {
        if (err) {
            console.log({
                level: 'error',
                message: 'Error shutting closing mongo connection',
                error: err
            });
        } else {
            console.info('Mongo connection closed successfully');
        }
        process.exit(0);
    });
});