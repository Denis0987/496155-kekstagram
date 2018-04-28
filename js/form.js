'use strict';

(function () {

  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var SIZE_STEP = 25;

  var uploadFileInput = window.slider.uploadForm.querySelector('.img-upload__input');
  var imgEditingFormCloseBtn = window.slider.uploadForm.querySelector('.img-upload__cancel');
  var hashtagInput = window.slider.imgEditingForm.querySelector('.text__hashtags');
  var commentsInput = window.slider.imgEditingForm.querySelector('.text__description');
  var uploadInputStartValue = uploadFileInput.value;

  var onPopupEscPress = function (evt) {
    if (document.activeElement !== hashtagInput) {
      if (document.activeElement !== commentsInput) {
        window.util.isEscEvent(evt, closeFormPopup);
      }
    }
  };

  var onPopupEntPress = function (evt) {
    window.util.isEnterEvent(evt, closeFormPopup);
  };

  var openFormPopup = function () {
    window.slider.imgEditingForm.classList.remove('hidden');
    window.slider.previewPicture.classList.add('effects__preview--none');
    window.slider.hideScaleInput();
    document.addEventListener('keydown', onPopupEscPress);
    imgEditingFormCloseBtn.addEventListener('keydown', onPopupEntPress);
    imgEditingFormCloseBtn.addEventListener('click', closeFormPopup);
  };

  var closeFormPopup = function () {
    window.slider.imgEditingForm.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    imgEditingFormCloseBtn.removeEventListener('keydown', onPopupEntPress);
    imgEditingFormCloseBtn.removeEventListener('click', closeFormPopup);
    uploadFileInput.value = uploadInputStartValue;
  };

  uploadFileInput.addEventListener('change', openFormPopup);

  // effects

  var resizeInput = window.slider.imgEditingForm.querySelector('.resize__control--value');
  var resizeIncreaseHandler = window.slider.imgEditingForm.querySelector('.resize__control--plus');
  var resizeDecreaseHandler = window.slider.imgEditingForm.querySelector('.resize__control--minus');

  var resizePicture = function (scaleIndex) {
    if (scaleIndex !== MAX_SCALE) {
      window.slider.previewPicture.style.transform = 'scale(0.' + scaleIndex + ')';
    } else {
      window.slider.previewPicture.style.transform = 'none';
    }
  };

  var increasePictureSize = function () {
    var carrentInputValue = parseInt(resizeInput.value, 10);
    if (carrentInputValue < MAX_SCALE) {
      resizeInput.value = (carrentInputValue + SIZE_STEP) + '%';
      carrentInputValue = parseInt(resizeInput.value, 10);
      resizePicture(carrentInputValue);
    }
  };

  var decreasePictureSize = function () {
    var carrentInputValue = parseInt(resizeInput.value, 10);
    if (carrentInputValue > MIN_SCALE) {
      resizeInput.value = (carrentInputValue - SIZE_STEP) + '%';
      carrentInputValue = parseInt(resizeInput.value, 10);
      resizePicture(carrentInputValue);
    }
  };

  resizeIncreaseHandler.addEventListener('click', increasePictureSize);
  resizeDecreaseHandler.addEventListener('click', decreasePictureSize);

  var sortingHashtags = function (array) {
    for (var i = 0; i < array.length; i++) {
      var hashtagElement = array[i];
      for (i = 0; i < array.length; i++) {
        if (hashtagElement === array[i]) {
          hashtagInput.setCustomValidity('"Хештеги"" не должны повторяться.');
        } else {
          hashtagInput.setCustomValidity('');
        }
      }
    }
  };

  hashtagInput.addEventListener('input', function () {
    var hashTags = hashtagInput.value.split(' ');
    if (hashTags.length > 5) {
      hashtagInput.setCustomValidity('Вы можете использовать не более 5-ти "хештегов".');
    } else {
      for (var i = 0; i < hashTags.length; i++) {
        var hashtagElement;
        hashtagElement = hashTags[i].split('');
        if (hashtagElement.length < 20) {
          if (hashtagElement[0] === '#') {
            if (hashtagElement.length >= 2) {
              hashtagInput.setCustomValidity('');
            } else {
              hashtagInput.setCustomValidity('"Хештег" не может состоять только из символа "#".');
            }
          } else {
            hashtagInput.setCustomValidity('"Хештег" должен начинаться с символа "#".');
          }
        } else {
          hashtagInput.setCustomValidity('"Хештег" не может быть длиннее 20-ти символов.');
        }
      }
    }
    sortingHashtags(hashTags);
  });

})();
