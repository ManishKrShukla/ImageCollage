import Ember from 'ember';

export default Ember.Controller.extend({
  collage: [],
  triggerRefetch: Ember.observer('imageUploaded', function() {
    if (this.get('model.files')) {
      this.send('fetchImages');
    }
  }),

  init() {
    let self = this;
    Ember.run.schedule("afterRender", this, function() {
      $('html').keyup(function(e) {
        if (e.keyCode == 46) {
          let selectedDiv = $(".selected-div");

          if (selectedDiv.length) {
            self.get('collage').removeAt(parseInt(selectedDiv.data("id")));
          }

        }
      });

      $('.dropper').click(function(e) {
        $(".selected-div").removeClass(".selected-div");
      });
    });
  },

  fileUploaded: Ember.computed(function() {
    return () => {
      this.toggleProperty('imageUploaded');
    }
  }),

  actions: {
    dragResult: function(obj, ops) {
      let length = this.get('model.collage.length');

      this.get('collage').pushObject({
        imageUrl: obj.url,
        counter: length
      });

    },
    draggingOverTarget: function() {
      console.log('Over target');
    },
    leftDragTarget: function() {
      console.log('Off target');
    }

  }
});
