import { writeFileSync } from "fs";

writeFileSync("./.env", `PRODUCTION=${process.env.NETLIFY}\n`);
