/* global data */
/* exported data */
var $photoURL = document.querySelector('#photo-url');
var $image = document.querySelector('img');
$photoURL.addEventListener('input', updateImage);

function updateImage(event) {
  if (isImage($photoURL.value) === true) {
    $image.setAttribute('src', $photoURL.value);
  }
}

function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

var $form = document.querySelector('form');
var $titleInput = document.querySelector('#title');
var $notesInput = document.querySelector('#notes');

var $motherIsListening = document.querySelector('form');
$motherIsListening.addEventListener('submit', resetForm);

function resetForm(event) {
  var newObject = {
    EntryID: data.nextEntryId,
    Title: $titleInput.value,
    PhotoURL: $photoURL.value,
    Notes: $notesInput.value
  };
  data.nextEntryId = ++data.nextEntryId;
  data.entries.unshift(newObject);
  event.preventDefault();
  $form.reset();
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
}
