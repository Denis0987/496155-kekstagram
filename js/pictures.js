'use strict';

(function () {

  var pictureTable = document.querySelector('.pictures');
  var similarPictureTemplate = document.querySelector('#picture').content;

  var renderPicture = function (picture, position) {
    var pictureElement = similarPictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__link').setAttribute('data-position', position);
    pictureElement.querySelector('img').src = picture.url;
    pictureElement.querySelector('.picture__stat--likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;

    return pictureElement;
  };

  var renderSimilarPictures = function () {
    var similarPicturesElement = document.createDocumentFragment();
    for (var i = 0; i < window.data.usersPictures.length; i++) {
      similarPicturesElement.appendChild(renderPicture(window.data.usersPictures[i], i));
    }
    pictureTable.appendChild(similarPicturesElement);
  };

  renderSimilarPictures();

  window.pictures = {
    pictureTable: pictureTable
  };

})();
