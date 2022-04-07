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

var $motherIsListening = document.querySelector('#savebutton');
$motherIsListening.addEventListener('click', resetForm);

function resetForm(event) {
  // console.log(data.editing.EntryID);
  if (data.editing === null) {
    var newObject = {
      EntryID: data.nextEntryId,
      Title: $titleInput.value,
      PhotoURL: $photoURL.value,
      Notes: $notesInput.value
    };
    data.nextEntryId = ++data.nextEntryId;
    data.entries.unshift(newObject);
    $ul.prepend(entryToDOM(newObject));
  } else {
    var $entryinfo = {
      Title: $titleInput.value,
      PhotoURL: $photoURL.value,
      Notes: $notesInput.value,
      EntryID: data.editing
    };
    var $selectall = document.querySelectorAll('li');
    var $createReplacementObj = entryToDOM($entryinfo);
    for (var k = 0; k < data.entries.length; k++) {
      var $convertToString = String(data.editing);
      var $attributeMatch = $selectall[k].getAttribute('id');
      if ($convertToString === $attributeMatch) {
        $selectall[k].replaceWith($createReplacementObj);
        data.entries[k] = $entryinfo;
      }
    }

    // var oldObject = {
    //   EntryID: data.editing.EntryID,
    //   Title: $titleInput.value,
    //   PhotoURL: $photoURL.value,
    //   Notes: $notesInput.value
    // };
    // console.log(data.entries[data.editing.EntryID - 1]);
    // data.entries[data.editing.EntryID - 1] = oldObject;
    // var $closestReplace = document.getElementById(data.editing.EntryID);
    // $closestReplace.replaceWith(entryToDOM(oldObject));

    // console.log($closestReplace);
    // console.log(entryToDOM(oldObject));
    // console.log(data.editing);
    // console.log(data.editing.EntryID);

    data.editing = null;
  }

  event.preventDefault();
  $form.reset();
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryForm.className = 'container hidden';
  $entries.className = 'container entries-container';
}
// Issue #2 Below //
var $ul = document.querySelector('ul');

function entryToDOM(entryObject) {
  var $li = document.createElement('li');
  $li.setAttribute('id', entryObject.EntryID);

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
// var $li = document.createElement('li');
function createDOM(event) {
  for (var i = 0; i < data.entries.length; i++) {
    $ul.appendChild(entryToDOM(data.entries[i]));
  }
}

var $body = document.querySelector('body');
$body.addEventListener('click', changeView);
var $entryForm = document.querySelector('#entry-form');
var $entries = document.querySelector('#entries');

function changeView(event) {
  event.preventDefault();
  if (event.target.matches('#entries-anchor')) {
    $entryForm.className = 'container hidden';
    $entries.className = 'container entries-container';
    data.editing = null;
  }

  if (event.target.matches('#newbutton')) {
    $entryForm.className = 'container';
    $entries.className = 'container entries-container hidden';
    var $updateEditToHeader = document.querySelector('#onlyheader');
    $updateEditToHeader.textContent = 'New Entry';
    var $hideDeleteButton = document.querySelector('#deletebutton');
    $hideDeleteButton.className = 'hidden';
  }

}

// Issue #3 Below //

$ul.addEventListener('click', switchToEntryView);

function switchToEntryView(event) {
  var $selectEntries = document.querySelectorAll('li');
  if (event.target.tagName === 'IMG') {
    var $closestA = event.target.closest('LI');

    $closestA = $closestA.getAttribute('id');

    for (var j = 0; j < data.entries.length; j++) {
      var $correctList = $selectEntries[j].getAttribute('id');
      if ($correctList === $closestA) {
        var $editobject = data.entries[j];
        $prepopulate($editobject);
      }
      // if (data.entries[j].EntryID === parseInt(event.target.getAttribute('id'))) {
      //   data.editing = data.entries[j];
      // }
    }

  }
  var $updateHeaderToEdit = document.querySelector('#onlyheader');
  $updateHeaderToEdit.textContent = 'Edit Entry';
  var $showDeleteButton = document.querySelector('#deletebutton');
  $showDeleteButton.className = '';

  function $prepopulate(object) {

    $entryForm.className = 'container';
    $entries.className = 'container entries-container hidden';
    $titleInput.value = object.Title;
    $photoURL.value = object.PhotoURL;
    updateImage();
    $notesInput.value = object.Notes;
    data.editing = object.EntryID;
  }
  // if (event.target.matches('img.editbuttons')) {
  //   $entryForm.className = 'container';
  //   $entries.className = 'container entries-container hidden';
  //   $titleInput.value = data.editing.Title;
  //   $photoURL.value = data.editing.PhotoURL;
  //   updateImage();
  //   $notesInput.value = data.editing.Notes;
  // }

}
// Issue #4 Below //
var $toggledeletebutton = document.querySelector('#deletebutton');
var $modal = document.querySelector('.modal-hidden');
$toggledeletebutton.addEventListener('click', openModal);

function openModal(event) {
  $modal.className = 'modal-show';
}

var $togglecancelbutton = document.querySelector('#cancelbutton');
var $toggleconfirmbutton = document.querySelector('#confirmbutton');
$togglecancelbutton.addEventListener('click', closeModal);
$toggleconfirmbutton.addEventListener('click', deleteEntry);

function closeModal(event) {
  $modal.className = 'modal-hidden';
}

function deleteEntry(event) {
  var $allitems = document.querySelectorAll('li');
  for (var i = 0; i < $allitems.length && $allitems.length > 0; i++) {
    if ($allitems[i].getAttribute('id') === String(data.editing)) {
      data.entries.splice(i, 1);
      $allitems[i].remove();
    }
  }
  data.editing = null;
  $entryForm.className = 'container hidden';
  $entries.className = 'container entries-container';
  closeModal();
}
