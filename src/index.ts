import app, { PORT } from "./server.ts";

app.listen(PORT, () => {
    console.log(`The server is running on port ${PORT}`);
});
