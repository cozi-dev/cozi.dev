/* Switch and persist theme */
(function () {
  var checkbox = document.getElementById('themer');
  var logo = document.getElementById('logo');
  var logoDark = document.getElementById('logo-dark');

  function darkTheme(media) {
    if (media === 'screen') {
      logo.style.display = 'none'
      logoDark.style.display = ''
    } else {
      logo.style.display = ''
      logoDark.style.display = 'none'
    }
  }

  checkbox.addEventListener('change', function () {
    darkTheme(this.checked ? 'screen' : 'none');
  });
}());
