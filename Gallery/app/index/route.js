import Ember from 'ember';
import {
  task
} from 'ember-concurrency';

import ENV from 'gallery/config/environment';

export default Ember.Route.extend({
  getImages: task(function*() {
    let xhr, ajax_params = {
        url: ENV.APP.api.url,
        type: ENV.APP.api.method,
        contentType: "application/json; charset=utf-8",
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        dataType: 'json'
      },
      promise = new Promise((resolve /*, reject */ ) => {
        xhr = Ember.$.ajax(ajax_params);
        xhr.done((response /*, textStatus, jqXHR*/ ) => {
          this.controllerFor('index').set('model', {files : response});
          resolve(response);
        });
        xhr.fail((jqXHR /*, textStatus, errorThrown */ ) => {
          resolve({
            responseJSON: jqXHR.responseJSON,
            status: jqXHR.status
          });
        });
      });

    try {
      return yield promise;
    } catch (e) {
      return yield e && e.responseJSON && e.responseJSON.message && alert(e.responseJSON.message) && e.responseJSON;
    } finally {
      if (xhr && xhr.abort) {
        xhr.abort();
      }
    }

  }).drop(),

  model() {
    return this.get('getImages').perform();
  },

  setupController(controller, model) {
    controller.set('model', {
      files: model,
      collage: []
    });
  },
  actions: {
    fetchImages: function()  {
      this.controller.set('model.files', this.get('getImages').perform());
    }
  }

});
