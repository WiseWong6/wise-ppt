const DECK_CONTRACT = "wise-ppt-deck@7";
const DECK_PLAN_CONTRACT = "wise-ppt-deck-plan@5";
const LAYOUT_QUERY_FORMAT = "wise-ppt-layout-query@2";
const BUILD_CONTRACT = "wise-ppt-build@4";
const RUNTIME_VERSION = "wise-ppt-runtime@4";
const DELIVERY_FORMAT = "wise-ppt-delivery@3";
const EXPERIMENTAL_DELIVERY_CONTRACT = "wise-ppt-experimental-delivery@5";
const DEFAULT_SIGNATURE = "";
const SUPPORTED_NODE_MAJORS = Object.freeze([22, 24]);
const MIN_CHROME_MAJOR = 132;
const OUTPUT_MARKER = ".wise-ppt-output";
const EXPERIMENT_MARKER = ".wise-ppt-experiment";
const REQUIRED_RUNTIME_FILES = [
  "runtime/deck-runtime.js",
  "runtime/deck-shell.css",
  "runtime/stage-fit.js",
  "runtime/component-behavior.js",
  "runtime/component-behavior.css",
  "runtime/deck-component-contract.css"
];
const REQUIRED_THEME_FILES = [
  "themes/paper-ink/assets/design-tokens.css",
  "themes/paper-ink/assets/slide-components.css"
];
export {
  BUILD_CONTRACT,
  DECK_CONTRACT,
  DECK_PLAN_CONTRACT,
  DEFAULT_SIGNATURE,
  DELIVERY_FORMAT,
  EXPERIMENTAL_DELIVERY_CONTRACT,
  EXPERIMENT_MARKER,
  LAYOUT_QUERY_FORMAT,
  MIN_CHROME_MAJOR,
  OUTPUT_MARKER,
  REQUIRED_RUNTIME_FILES,
  REQUIRED_THEME_FILES,
  RUNTIME_VERSION,
  SUPPORTED_NODE_MAJORS
};
