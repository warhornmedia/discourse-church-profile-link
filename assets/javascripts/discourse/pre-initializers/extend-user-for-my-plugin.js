// assets/javascripts/discourse/pre-initializers/extend-user-for-my-plugin.js

import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "extend-user-for-my-plugin",
  before: "inject-discourse-objects",

  initializeWithApi(api){
    api.modifyClass("model:user", {
      myNewUserFunction() {
        return "hello world";
      }
    });
  },

  initialize() {
    withPluginApi("0.12.1", this.initializeWithApi);
  },
};
