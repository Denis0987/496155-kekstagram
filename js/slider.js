'use strict';

(function () {

  var EFFECTS = ['effects__preview--none', 'effects__preview--chrome', 'effects__preview--sepia',
    'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat'];
  var CHROME_MIN = 0;
  var CHROME_MAX = 1;
  var SEPIA_MIN = 0;
  var SEPIA_MAX = 1;
  var MARVIN_MIN = 0;
  var MARVIN_MAX = 100;
  var PHOBOS_MIN = 0;
  var PHOBOS_MAX = 3;
  var HEAT_MIN = 1;
  var HEAT_MAX = 3;
  var MIN_X = 0;
  var MAX_X = 455;

  var getSliderPinStyle = function (number) {
    var element = Math.floor(number / (MAX_X / 100));
    return element;
  };

  var uploadForm = document.querySelector('.img-upload__form');
  var imgEditingForm = uploadForm.querySelector('.img-upload__overlay');
  var previewPicture = imgEditingForm.querySelector('.img-upload__preview img');
  var effectsTable = document.querySelector('.effects__list');
  var effectsItem = effectsTable.querySelectorAll('.effects__item');
  var slider = document.querySelector('.scale');
  var sliderPin = slider.querySelector('.scale__pin');
  var sliderlevel = slider.querySelector('.scale__level');
  var effectLevelInput = slider.querySelector('.scale__value');

  var setEffectNumber = function () {
    for (var i = 0; i < effectsItem.length; i++) {
      effectsItem[i].setAttribute('data-position', i);
    }
    return effectsItem;
  };

  setEffectNumber();

  var calculateEffect = function (min, max) {
    var effectIndex = min + ((max - min) / 100 * parseInt(sliderPin.style.left, 10));
    return effectIndex;
  };

  var setCalculatedEffect = function () {
    switch (previewPicture.className) {
      case 'effects__preview--none':
        previewPicture.style.filter = 'none';
        break;
      case 'effects__preview--chrome':
        previewPicture.style.filter = 'grayscale(' + calculateEffect(CHROME_MIN, CHROME_MAX) + ')';
        break;
      case 'effects__preview--sepia':
        previewPicture.style.filter = 'sepia(' + calculateEffect(SEPIA_MIN, SEPIA_MAX) + ')';
        break;
      case 'effects__preview--marvin':
        previewPicture.style.filter = 'invert(' + calculateEffect(MARVIN_MIN, MARVIN_MAX) + '%)';
        break;
      case 'effects__preview--phobos':
        previewPicture.style.filter = 'blur(' + calculateEffect(PHOBOS_MIN, PHOBOS_MAX) + 'px)';
        break;
      case 'effects__preview--heat':
        previewPicture.style.filter = 'brightness(' + calculateEffect(HEAT_MIN, HEAT_MAX) + ')';
        break;
    }
  };

  var hideScaleInput = function () {
    if (previewPicture.classList.contains('effects__preview--none')) {
      slider.classList.add('hidden');
    } else {
      slider.classList.remove('hidden');
    }
  };

  var setEffect = function (index) {
    previewPicture.className = '';
    previewPicture.classList.add(EFFECTS[index]);
    hideScaleInput();
    sliderPin.style.left = MAX_X + 'px';
    sliderlevel.style.width = MAX_X + 'px';
    effectLevelInput.value = getSliderPinStyle(MAX_X);
  };

  effectsTable.addEventListener('click', function (evt) {
    var target = evt.target;
    while (target !== evt.currentTarget) {
      if (target.className === 'effects__item') {
        var i = target.getAttribute('data-position');
        setEffect(i);
        setCalculatedEffect();
        return;
      }
      target = target.parentNode;
    }
  });

  sliderPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
      };

      startCoords = {
        x: moveEvt.clientX,
      };

      var sliderPinLeft = sliderPin.offsetLeft - shift.x;

      if (sliderPinLeft >= MIN_X && sliderPinLeft <= MAX_X) {
        var sliderPinStyle = getSliderPinStyle(sliderPinLeft);
        sliderPin.style.left = sliderPinLeft + 'px';
        sliderlevel.style.width = sliderPinLeft + 'px';
        effectLevelInput.value = sliderPinStyle;
        setCalculatedEffect();
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.slider = {
    uploadForm: uploadForm,
    imgEditingForm: imgEditingForm,
    hideScaleInput: hideScaleInput,
    effectsTable: effectsTable,
    previewPicture: previewPicture
  };

})();
