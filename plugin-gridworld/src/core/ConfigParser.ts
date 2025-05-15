import Ajv from "ajv";
import yaml from "js-yaml";
import { type TrialConfig } from "./types";

export class ConfigParser {
  private config: any;
  private schema: any;

  constructor(configYaml: string, schemaYaml: string) {
    this.config = yaml.load(configYaml);
    this.schema = yaml.load(schemaYaml);
    this.validateConfig(this.config, this.schema);
  }

  /**
   * Validates the given config object against the schema at schemaFilePath.
   * @param config The parsed config object
   * @param schema The parsed schema object
   */
  private validateConfig(config: any, schema: any, logData: boolean = false): void {
    const ajv = new Ajv({ allErrors: true, strict: false });
    const validate = ajv.compile(schema);
    const valid = validate(config);

    if (valid) {
      if (logData) console.log(config);
      console.log("✅ Config is valid!");
    } else {
      console.error("❌ Config is invalid:");
      console.error(validate.errors);
      throw new Error("Invalid configuration file.");

      // TODO: @cherriechang trial4config does not work (forall)
    }
  }

  public getRawConfig(): any {
    return this.config;
  }

  public getParsedConfig(): TrialConfig {
    return ConfigParser.parse(this.config);
  }

  /**
   * Parses and transforms a raw config into a typed TrialConfig.
   * @param config The raw config object
   * @returns A normalized TrialConfig object
   */
  static parse(config: any): TrialConfig {
    // Optional: Add any normalization logic here

    return config as TrialConfig;
  }
}