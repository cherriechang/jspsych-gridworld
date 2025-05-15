import Ajv from "ajv";
import fs from "fs";
import yaml from "js-yaml";

const ajv = new Ajv({ allErrors: true, strict: false });

// Step 1: Load and compile the schema
const schema = yaml.load(fs.readFileSync("src/trial-config.schema.yaml", "utf8"));
const validate = ajv.compile(schema);

// Step 2: Load the config to validate
const data = yaml.load(fs.readFileSync("src/trial-config-1.yaml", "utf8"));

// Step 3: Validate
const valid = validate(data);

if (valid) {
  console.log("✅ Config is valid!");
} else {
  console.error("❌ Config is invalid:");
  console.error(validate.errors);
}
