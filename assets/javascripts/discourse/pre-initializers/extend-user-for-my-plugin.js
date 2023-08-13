// assets/javascripts/discourse/pre-initializers/extend-user-for-my-plugin.js

import { withPluginApi } from "discourse/lib/plugin-api";

export default {
  name: "extend-user-for-my-plugin",
  before: "inject-discourse-objects",
  
  initializeWithApi(api){
    api.modifyClass('model:user', {
      pluginId: 'customProfileLink',
      customProfileLink: Ember.computed('user_fields.@each.value', function() {
        const fieldName = settings.custom_profile_link_user_field;
        const siteUserFields = Site.currentProp('user_fields');
        
        if (Ember.isEmpty(siteUserFields)) return null;
        
        const field = siteUserFields.filterBy('name', fieldName)[0];
        if (!field) return null;
        const fieldId = field.get('id');
        const userFields = this.get('user_fields');
        if (!userFields || !userFields[fieldId]) return null;
        
        return userFields[fieldId];
      })
    }
  },
  initialize() {
    withPluginApi("0.12.1", this.initializeWithApi);
  },
};
