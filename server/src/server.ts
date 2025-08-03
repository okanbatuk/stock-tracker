import { app, config } from "./config";

app.listen(config.port, (err) => {
  if (err) throw err;
  console.log(`🚀 Express listening on http://localhost:${config.port}`);
});
