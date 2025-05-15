import Ajv from "ajv";
import fs from "fs";
import yaml from "js-yaml";

export function validateConfig(configFilePath, logData = false) {
    const schema = yaml.load(
        fs.readFileSync("src/trial-config.schema.yaml", "utf8")
    );
    
    const ajv = new Ajv({ allErrors: true, strict: false });
    const validate = ajv.compile(schema);
    const data = yaml.load(fs.readFileSync(configFilePath, "utf8"));
    const valid = validate(data);
    
    if (valid) {
      if (logData) console.log(data);
      console.log("✅ Config is valid!");
    } else {
      console.error("❌ Config is invalid:");
      console.error(validate.errors);
    }
}