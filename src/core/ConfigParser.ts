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

  private validateEndCondition(): boolean {
    const evalualable = true // TODO: vhevk if the end condition can be evaluated
    const alwaysTrue = true // TODO: check if end condition is such that it will alwats be true
    const alwaysFalse = true // TODO: check if end condition is such that it will always be false

    // evaluatable -- just because it follows the schema doesn't mean it works
    // e.g., it references items/properties that are not defined
    // TODO: (syntax handling) we don't enforce or check some schema of the form of properties supplied to end condition; we should

    // always true splits into two cases:
    // it will always be true due to some tautology (e.g., apples < 1 or apples > 0)
    // it starts out true because of some default conditions (e.g., apples < 5 and steps_remaining > 0)

    // always false splits into two cases:
    // from the start, it will always be false due to some logical contradiction (e.g., apples > 0 and apples < 0)
    // it can also be due to the trial config (e.g., apples > 3 but only 2 apples exist)

    return true
  }




}