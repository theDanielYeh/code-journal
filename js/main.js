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
// Issue 2 Below

function entryToDOM(entryObject) {
  var $ul = document.querySelector('ul');
  var $li = document.createElement('li');
  $ul.appendChild($li);

  var $div1 = document.createElement('div');
  $div1.setAttribute('class', 'row');
  $li.appendChild($div1);

  var $div2 = document.createElement('div');
  $div2.setAttribute('class', 'column-half');
  $div1.appendChild($div2);

  var $img = document.createElement('img');
  $img.setAttribute('src', entryObject.PhotoURL);
  $div2.appendChild($img);

  var $div3 = document.createElement('div');
  $div2.setAttribute('class', 'column-half');
  $div1.appendChild($div3);

  var $div4 = document.createElement('div');
  $div4.setAttribute('class', 'half-row');
  $div4.textContent = entryObject.Title;
  $div3.appendChild($div4);

  var $div5 = document.createElement('div');
  $div5.setAttribute('class', 'half-row');
  $div5.setAttribute('style', 'font-weight: normal; font-size: 1rem');
  $div5.textContent = entryObject.Notes;
  $div3.appendChild($div5);

}

window.addEventListener('DOMContentLoaded', createDOM);

function createDOM(event) {
  for (var i = 0; i < data.entries.length; i++) {
    entryToDOM(data.entries[i]);
  }
}
