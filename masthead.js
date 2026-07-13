/* ── masthead.js ────────────────────────────────────────────────────────────
   Pronunciation buttons and RSVP definition stream for the Exeud profile page.

   Timing knobs:
     THROTTLE  — ms per token during the flow (lower = faster)
     LINGER    — ms the primer token ('exude (v)') stays visible before the
                 flow begins; gives the reader's attention time to settle     */

var THROTTLE = 222;
var LINGER   = 900;

var TOKENS = [
  '', 'exude (v)', ':', '', 'To', 'radiate', 'or', 'project',
  'an', 'attitude', 'feeling', 'or', 'vibe', '.', ''
];

/* ── pronunciation ── */
var shared = document.getElementById('ipa-shared');
document.querySelectorAll('.audio-btn[data-audio]').forEach(function(btn) {
  var audio = document.getElementById(btn.dataset.audio);
  btn.addEventListener('click', function() {
    audio.currentTime = 0;
    audio.play();
  });
  audio.addEventListener('play', function() {
    shared.textContent = btn.dataset.ipaVal;
    shared.classList.add('ipa-playing');
  });
  audio.addEventListener('ended', function() { shared.classList.remove('ipa-playing'); });
  audio.addEventListener('pause', function() { shared.classList.remove('ipa-playing'); });
});

/* ── RSVP definition stream ── */
var rsvp       = document.getElementById('rsvp-display');
var title      = document.getElementById('title-rsvp');
var hoverTimer = null;
var rsvpTimer  = null;

function runRsvp() {
  clearTimeout(rsvpTimer);

  /* show the primer token and hold for LINGER ms */
  var primerTok = 'exude (v)';
  rsvp.textContent = primerTok;
  rsvp.classList.add('rsvp-on');

  /* after LINGER, advance past the primer and run the rest at THROTTLE */
  rsvpTimer = setTimeout(function() {
    /* find the index of the first token after the primer */
    var i = TOKENS.indexOf(primerTok) + 1;

    function step() {
      if (i >= TOKENS.length) {
        rsvp.textContent = '';
        rsvp.classList.remove('rsvp-on');
        return;
      }
      var tok = TOKENS[i++];
      rsvp.textContent = tok;
      rsvp.classList.toggle('rsvp-on', tok !== '');
      rsvpTimer = setTimeout(step, THROTTLE);
    }
    step();
  }, LINGER);
}

title.addEventListener('mouseenter', function() {
  hoverTimer = setTimeout(runRsvp, 1000);
});
title.addEventListener('mouseleave', function() {
  clearTimeout(hoverTimer);
});
