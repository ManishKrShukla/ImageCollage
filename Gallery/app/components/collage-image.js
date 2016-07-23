import Ember from 'ember';

export default Ember.Component.extend({
  imageUrl: '',
  tagName: '',
  counter: 0,
  didInsertElement() {
    let self = this;

    $(`#target${this.counter}`).resizable({
      handles: {
        'nw': `#nwgrip-${this.counter}`,
        'ne': `#negrip-${this.counter}`,
        'sw': `#swgrip-${this.counter}`,
        'se': `#segrip-${this.counter}`,
        'n': `#ngrip-${this.counter}`,
        'e': `#egrip-${this.counter}`,
        's': `#sgrip-${this.counter}`,
        'w': `#wgrip-${this.counter}`
      },
      containment: ".dropper"
    });

    $(`#target${this.counter}`).rotatable({
      handle: $(`<span id="rotator-${this.counter}" class="glyphicon glyphicon-repeat rotation-handle"></span>`),
      stop: function(event, ui) {
        $(this).addClass("handled");
      },
      // containment: ".dropper"
    });

    $(`#draggable${this.counter}`).draggable({
      // containment: ".dropper",
      stop: function(e) {
        $(this).addClass("handled");
      }
    });

    $(`#target${this.counter}`).click(function(e) {
      if (!$(this).hasClass("handled")) {
        var wasPreviouslySelected = $(this).hasClass("selected-div");
        wasPreviouslySelected ? $(this).removeClass("selected-div") : $(this).addClass("selected-div");
        self.wireUpHandlers(!wasPreviouslySelected);
      }

      $(this).removeClass("handled");
    });

    this.wireUpHandlers(false);

    //
    // $(`#image_${this.counter}`).resizable({
    //   handles: 'all',
    //   helper: "resizable-helper",
    //   containment: ".dropper"
    // });
    //
    // $(`#img-draggable-${this.counter}`).draggable({
    //   containment: '.dropper'
    // });
    //
    // $(`#img-rotateable-${this.counter}`).rotatable();
  },

  wireUpHandlers(enable) {
    let state = enable ? 'enable' : 'disable';
    enable ? $(`#rotator-${this.counter}`).show() : $(`#rotator-${this.counter}`).hide();

    $(`#target${this.counter}`).resizable(state);
    $(`#target${this.counter}`).rotatable(state);
    $(`#draggable${this.counter}`).draggable(state);
  },

  willDestroyElement() {
    $(`#target${this.counter}`).resizable('destroy').rotatable('destroy');
    $(`#draggable${this.counter}`).draggable('destroy').unbind('click');
  }
});
