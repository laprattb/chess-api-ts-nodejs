import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🌏 Express server started at http://localhost:${PORT}`);
    console.log(`⚙️  Swagger UI hosted at http://localhost:${PORT}/api`);
});