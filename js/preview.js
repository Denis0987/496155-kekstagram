'use strict';

(function () {

  var bigPicture = document.querySelector('.big-picture');
  var socialComments = bigPicture.querySelectorAll('.social__comments li');
  var popupCloseBtn = bigPicture.querySelector('.big-picture__cancel');

  var renderBigPicture = function (picture) {
    bigPicture.classList.remove('hidden');
    bigPicture.querySelector('.big-picture__img img').src = picture.url;
    bigPicture.querySelector('.likes-count').textContent = picture.likes;
    bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
    for (var i = 0; i < socialComments.length; i++) {
      var commentItem = socialComments[i];
      commentItem.innerHTML = '';
      var avatar = window.util.getRandomInt(1, 6);
      var avatarPicture = document.createElement('img');
      commentItem.appendChild(avatarPicture);
      avatarPicture.classList.add('social__picture');
      avatarPicture.src = 'img/avatar-' + avatar + '.svg';
      avatarPicture.alt = 'Аватар комментатора фотографии';
      avatarPicture.width = 35;
      avatarPicture.height = 35;
      var textElem = document.createTextNode(picture.comments[i]);
      commentItem.appendChild(textElem);
    }
  };

  var onBigPicturePopupEscPress = function (evt) {
    window.util.isEscEvent(evt, closeBigPicturePopup);
  };

  var onBigPicturePopupEntPress = function (evt) {
    window.util.isEnterEvent(evt, closeBigPicturePopup);
  };

  var closeBigPicturePopup = function () {
    bigPicture.classList.add('hidden');
    document.removeEventListener('keydown', onBigPicturePopupEscPress);
    popupCloseBtn.removeEventListener('keydown', onBigPicturePopupEntPress);
  };

  var getBigPicturePopup = function (picture) {
    renderBigPicture(picture);
    popupCloseBtn.addEventListener('click', closeBigPicturePopup);
    document.addEventListener('keydown', onBigPicturePopupEscPress);
    popupCloseBtn.addEventListener('keydown', onBigPicturePopupEntPress);
  };

  window.pictures.pictureTable.addEventListener('click', function (evt) {
    var target = evt.target;
    while (target !== evt.currentTarget) {
      if (target.className === 'picture__link') {
        var i = target.getAttribute('data-position');
        getBigPicturePopup(window.data.usersPictures[i]);
        return;
      }
      target = target.parentNode;
    }
  });

  document.querySelector('.social__comment-count').classList.add('visually-hidden');
  document.querySelector('.social__comment-loadmore').classList.add('visually-hidden');

})();
