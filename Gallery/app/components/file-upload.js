import Ember from 'ember';
import EmberUploader from 'ember-uploader';

export default EmberUploader.FileField.extend({
  filesDidChange (files) {
    const uploader = EmberUploader.Uploader.create({
      url: 'http://localhost:3000/upload'
    });

    if (!Ember.isEmpty(files)) {

      uploader.upload(files).then((data) => {
        this.send("fileUploaded");
      }, (error) => {

      });
      uploader.on('progress', e => {
        // this.get('progress').call(this._controller, e, docType);
      });
    }
  }
});
