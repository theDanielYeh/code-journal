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
