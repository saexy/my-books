import { app } from "./app";
import { env } from "./utils/env";

app.listen(env("PORT", 3000), () => {
  console.log(`running on port ${env("PORT", 3000)}`);
});
