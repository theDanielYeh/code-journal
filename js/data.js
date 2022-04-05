/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var $titleInput = document.querySelector('#title');
var $photoURL = document.querySelector('#photo-url');
var $notesInput = document.querySelector('#notes');
var $image = document.querySelector('img');

var $motherIsListening = document.querySelector('form');
$motherIsListening.addEventListener('submit', recordAllInputs);

function recordAllInputs(event) {
  var newObject = {
    EntryID: data.nextEntryId,
    Title: $titleInput.value,
    PhotoURL: $photoURL.value,
    Notes: $notesInput.value
  };
  data.nextEntryId = ++data.nextEntryId;
  data.entries.unshift(newObject);

  var dataJSON = JSON.stringify(data);
  localStorage.setItem('JS-local-storage', dataJSON);

  event.preventDefault();
  $photoURL.value = '';
  $titleInput.value = '';
  $notesInput.value = '';
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
}
