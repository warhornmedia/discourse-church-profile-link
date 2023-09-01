// assets/javascripts/discourse/pre-initializers/extend-user-for-my-plugin.js
import  { Site } from "discourse/models/site";
import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "extend-user-for-my-plugin",
  before: "inject-discourse-objects",
  
  initialize() {
    console.log("[DEBUG] Init CPL");
    withPluginApi("0.8.7", function(api) {
      api.modifyClass("model:user", {
        pluginId: "customProfileLink",
        customProfileLink: Ember.computed("user_fields.@each.value", function() {
          console.log("[DEBUG] Modifiying");
          const fieldName = settings.custom_profile_link_user_field_id;
          const siteUserFields = Site.currentProp("user_fields");
          if (Ember.isEmpty(siteUserFields)) {return "Fields empty";}
          const field = siteUserFields.filterBy("name", fieldName)[0];
          if (!field) {return null;}
          const fieldId = field.get("id");
          const userFields = this.get("user_fields");
          if (!userFields || !userFields[fieldId]) {return "User fields or field missing";}
          console.log("[DEBUG] Finished");
          return userFields[fieldId];
          })
        });
      });
    }
  }
