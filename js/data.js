'use strict';

(function () {
  var NUMBER_OF_PICTURES = 25;
  var MINIMUM_NUMBER_OF_LIKES = 15;
  var MAXIMUM_NUMBER_OF_LIKES = 200;
  var PICTURES_DESCRIPTIONS = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят',
    'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья.',
    'Не обижайте всех словами......', 'Вот это тачка!'];
  var PICTURES_COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

  var getRandomPictureComments = function () {
    var randomPictureCommentsLength = window.util.getRandomInt(1, PICTURES_COMMENTS.length);
    var randomPictureComments = [];
    for (var i = 0; i < randomPictureCommentsLength; i++) {
      var randomCommentsItem = window.util.getRandomItem(PICTURES_COMMENTS);
      randomPictureComments.push(randomCommentsItem);
    }
    return randomPictureComments;
  };

  var generatePictures = function () {
    var pictures = [];
    for (var i = 0; i < NUMBER_OF_PICTURES; i++) {
      var picture = {};
      var randomPictureComments = getRandomPictureComments();
      picture.url = 'photos/' + (i + 1) + '.jpg';
      picture.likes = window.util.getRandomInt(MINIMUM_NUMBER_OF_LIKES, MAXIMUM_NUMBER_OF_LIKES);
      picture.comments = randomPictureComments;
      picture.description = window.util.getRandomItem(PICTURES_DESCRIPTIONS);
      pictures.push(picture);
    }
    return pictures;
  };

  var usersPictures = generatePictures();

  window.data = {
    usersPictures: usersPictures
  };

})();
