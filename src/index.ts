import { JsPsych, JsPsychPlugin, ParameterType, TrialType } from "jspsych";
import { startGridWorldTrial } from './GridWorldPluginWrapper'

const info = <const>{
  name: "plugin-gridworld",
  version: "0.0.1",
  parameters: {
    /** TODO: Provide a clear description of the parameter_name that could be used as documentation. We will eventually use these comments to automatically build documentation and produce metadata. */
    configYaml: {
      type: ParameterType.STRING, // BOOL, STRING, INT, FLOAT, FUNCTION, KEY, KEYS, SELECT, HTML_STRING, IMAGE, AUDIO, VIDEO, OBJECT, COMPLEX
      default: undefined,
    },
  },
  data: {
    /** TODO: Provide a clear description of the data that could be used as documentation. We will eventually use these comments to automatically build documentation and produce metadata. */
    inventory: {
      type: ParameterType.OBJECT,
    },
  },
  // When you run build on your plugin, citations will be generated here based on the information in the CITATION.cff file.
  citations: '__CITATIONS__',
};

type Info = typeof info;

/**
 * **plugin-gridworld**
 *
 * Makes 2d gridworlds with flexible task conditions'
 *
 * @author Cherrie Chang, Justin Yang
 * @see {@link /plugin-gridworld/README.md}}
 */
class GridworldPlugin implements JsPsychPlugin<Info> {
  static info = info;

  constructor(private jsPsych: JsPsych) {}

  trial(display_element: HTMLElement, trial: TrialType<Info>) {

    startGridWorldTrial(display_element, trial.configYaml, this.jsPsych)
    // data saving
    var trial_data = {
      inventory: {'hello': 'world'}, // TODO: replace with actual inventory data
    };
    // end trial
    this.jsPsych.finishTrial(trial_data);
  }
}

export default GridworldPlugin;
