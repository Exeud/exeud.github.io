/* ── rsvp.js ─ RSVP definition stream, triggered by hovering the title ───────

   Timing knobs:
     THROTTLE  — ms per token during the flow (lower = faster)
     LINGER    — ms the primer token ('exude (v)') stays visible before the
                 flow begins; gives the reader's attention time to settle     */

(function () {
  var THROTTLE = 222;
  var LINGER   = 900;

  var TOKENS = [
    '', 'exude (v)', ':', '', 'To', 'radiate', 'or', 'project',
    'an', 'attitude', 'feeling', 'or', 'vibe', '.', ''
  ];

  var rsvp       = document.getElementById('rsvp-display');
  var title      = document.getElementById('title-rsvp');
  var hoverTimer = null;
  var rsvpTimer  = null;

  function runRsvp() {
    clearTimeout(rsvpTimer);

    var primerTok = 'exude (v)';
    rsvp.textContent = primerTok;
    rsvp.classList.add('rsvp-on');

    rsvpTimer = setTimeout(function () {
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

  title.addEventListener('mouseenter', function () { hoverTimer = setTimeout(runRsvp, 1000); });
  title.addEventListener('mouseleave', function () { clearTimeout(hoverTimer); });
})();
