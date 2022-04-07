/* exported data */
// localStorage.clear();
var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

// var $motherIsListening = document.querySelector('form');
var previousdataJSON = localStorage.getItem('JS-local-storage');
if (previousdataJSON !== null) {
  data = JSON.parse(previousdataJSON);
}

window.addEventListener('beforeunload', recordAllInputs);

function recordAllInputs(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('JS-local-storage', dataJSON);

}
