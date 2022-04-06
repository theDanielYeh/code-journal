/* global data */
/* exported data */

var $photoURL = document.querySelector('#photo-url');
var $image = document.querySelector('#imgdisplay');
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
  $ul.unshift(entryToDOM(newObject));
  event.preventDefault();
  $form.reset();
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.className = 'container hidden';
  $entries.className = 'container entries-container';
}
// Issue #2 Below //
var $ul = document.querySelector('ul');
var $li = document.createElement('li');

function entryToDOM(entryObject) {

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
  $div3.setAttribute('class', 'column-half');
  $div1.appendChild($div3);

  var $div4 = document.createElement('div');
  $div4.setAttribute('class', 'flex');
  $div3.appendChild($div4);

  var $div5 = document.createElement('div');
  $div5.setAttribute('class', 'half-row');
  $div5.textContent = entryObject.Title;
  $div4.appendChild($div5);

  var $button6 = document.createElement('button');
  $button6.setAttribute('class', 'split-quarter-flex');
  $div4.appendChild($button6);

  var $img7 = document.createElement('img');
  $img7.setAttribute('class', 'editbuttons');
  $img7.setAttribute('src', '/images/Pencil.png');
  $img7.setAttribute('id', entryObject.EntryID);
  $button6.appendChild($img7);

  var $div8 = document.createElement('div');
  $div8.setAttribute('class', 'half-row');
  $div8.setAttribute('style', 'font-weight: normal; font-size: 1rem');
  $div8.textContent = entryObject.Notes;
  $div3.appendChild($div8);

  return $li;
}

window.addEventListener('DOMContentLoaded', createDOM);

function createDOM(event) {
  for (var i = 0; i < data.entries.length; i++) {
    entryToDOM(data.entries[i]);
    $ul.appendChild($li);
  }
}

var $body = document.querySelector('body');
$body.addEventListener('click', changeView);
var $entryForm = document.querySelector('#entry-form');
var $entries = document.querySelector('#entries');

function changeView(event) {
  if (event.target.matches('#entries-anchor')) {
    $entryForm.className = 'container hidden';
    $entries.className = 'container entries-container';
  }

  if (event.target.matches('#newbutton')) {
    $entryForm.className = 'container';
    $entries.className = 'container entries-container hidden';
  }

}

// Issue #3 Below //

$ul.addEventListener('click', switchToEntryView);

function switchToEntryView(event) {

  for (var j = 0; j < data.entries.length; j++) {
    if (JSON.stringify(data.entries[j].EntryID) === event.target.getAttribute('id')) {
      data.editing = data.entries[j];
      // console.log(data.editing);
    }
  }
  if (event.target.matches('img.editbuttons')) {
    $entryForm.className = 'container';
    $entries.className = 'container entries-container hidden';
  }

}
