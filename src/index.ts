import app from "./server.ts";

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});
