const DECK_CONTRACT = "wise-ppt-deck@5";
const BUILD_CONTRACT = "wise-ppt-build@3";
const RUNTIME_VERSION = "wise-ppt-runtime@3";
const DELIVERY_FORMAT = "wise-ppt-delivery@2";
const EXPERIMENTAL_DELIVERY_CONTRACT = "wise-ppt-experimental-delivery@4";
const DEFAULT_SIGNATURE = "@\u6B6A\u65AFWise";
const MIN_NODE_MAJOR = 20;
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
  DEFAULT_SIGNATURE,
  DELIVERY_FORMAT,
  EXPERIMENTAL_DELIVERY_CONTRACT,
  EXPERIMENT_MARKER,
  MIN_CHROME_MAJOR,
  MIN_NODE_MAJOR,
  OUTPUT_MARKER,
  REQUIRED_RUNTIME_FILES,
  REQUIRED_THEME_FILES,
  RUNTIME_VERSION
};
