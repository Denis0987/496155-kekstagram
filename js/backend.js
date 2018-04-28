'use strict';

(function () {

  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var URL_LOAD = ' https://js.dump.academy/kekstagram/data';

  var upload = function (data, onSuccess) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', URL_LOAD);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.send();
  };

  window.backend = {
    upload: upload,
    load: load
  };

})();
