import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { Sequelize } from "sequelize";
import configObj from "../../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || "development";
const config = configObj[env];
const db = {};

// Initialize Sequelize instance
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

// Dynamically import all model files in this directory (except index.js)
const files = fs.readdirSync(__dirname).filter((file) => {
  return (
    file.indexOf(".") !== 0 &&                // Exclude hidden files (like .gitignore)
    file !== path.basename(__filename) &&    //  Exclude the file you're currently in (index.js)
    file.slice(-3) === ".js"                //   Only include files ending in '.js'
  );  
});

for (const file of files) {
  const filePath = pathToFileURL(path.join(__dirname, file)).href; // Convert to file:// URL
  const { default: modelDefiner } = await import(filePath);       // Dynamically importing model function and name it modelDefiner
  const model = modelDefiner(sequelize, Sequelize.DataTypes);    // Initialize model with the sequelize instance
  db[model.name] = model;
}

// Setup model associations if any
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;  // lets you sync, Manage transactions, Authenticate the connection etc with the database
db.Sequelize = Sequelize;  // gives access to things like Sequelize.Op (useful for advanced queries).

export default db;
