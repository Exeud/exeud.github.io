/* ── pronunciation.js ─ UK/US audio buttons with a shared IPA readout ─────── */

(function () {
  var shared = document.getElementById('ipa-shared');

  document.querySelectorAll('.audio-btn[data-audio]').forEach(function (btn) {
    var audio = document.getElementById(btn.dataset.audio);
    btn.addEventListener('click', function () {
      audio.currentTime = 0;
      audio.play();
    });
    audio.addEventListener('play', function () {
      shared.textContent = btn.dataset.ipaVal;
      shared.classList.add('ipa-playing');
    });
    audio.addEventListener('ended', function () { shared.classList.remove('ipa-playing'); });
    audio.addEventListener('pause', function () { shared.classList.remove('ipa-playing'); });
  });
})();
