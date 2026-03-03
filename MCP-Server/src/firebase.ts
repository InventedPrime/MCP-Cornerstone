import * as admin from "firebase-admin";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

dotenv.config();
// Find serviceAccount.json - check multiple possible locations
function loadServiceAccount(): admin.ServiceAccount {
  const possiblePaths = [
    path.join(process.cwd(), "serviceAccount.json"),
    path.join(__dirname, "../serviceAccount.json"),
  ];

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return JSON.parse(fs.readFileSync(p, "utf8"));
    }
  }

  throw new Error(
    `serviceAccount.json not found. Checked: ${possiblePaths.join(", ")}`,
  );
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(loadServiceAccount()),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

export const db = admin.database();
