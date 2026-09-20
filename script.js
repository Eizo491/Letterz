(function(){
  "use strict";

  /* ============ EDIT ME ============
     Quick personalization guide:
     - Change "beautiful" in the hero heading (in the HTML above) to her name if you like.
     - Edit the 6 reason cards above with your own real reasons.
     - Edit SURPRISE_MESSAGE below with your own note.
     - Change the sign-off name below (currently "— me").
  =================================== */
  var SURPRISE_MESSAGE = "Just a reminder that you're the best part of my day, every day \u2014 not just on special occasions. Thanks for being you. I love you more than this admittedly kind of extra website can show. \uD83D\uDC96";

  /* ---------- floating hearts ---------- */
  var field = document.getElementById('heart-field');
  var emojis = ['💗','💕','💖','✨','💫'];
  var HEART_COUNT = window.innerWidth < 600 ? 10 : 18;
  for (var i = 0; i < HEART_COUNT; i++){
    var el = document.createElement('span');
    el.className = 'float-heart';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = (Math.random() * 100) + 'vw';
    el.style.setProperty('--size', (16 + Math.random() * 26) + 'px');
    el.style.setProperty('--dur', (10 + Math.random() * 10) + 's');
    el.style.setProperty('--delay', (Math.random() * 14) + 's');
    field.appendChild(el);
  }

  /* ---------- surprise button: confetti + typewriter ---------- */
  var btn = document.getElementById('press-btn');
  var msgBox = document.getElementById('surprise-message');
  var pressed = false;

  function fireConfetti(){
    if (typeof confetti !== 'function') return;
    var colors = ['#FF6FA5', '#B79CED', '#FFD166', '#7FE7C4', '#FF3D82'];
    confetti({ particleCount: 90, spread: 75, origin: { y: 0.6 }, colors: colors, scalar: 1.1 });
    setTimeout(function(){
      confetti({ particleCount: 50, spread: 100, origin: { y: 0.5 }, colors: colors, scalar: 0.9 });
    }, 250);
  }

  function typewrite(text, container, speed){
    container.innerHTML = '';
    var cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.textContent = '\u00A0';
    var textSpan = document.createElement('span');
    container.appendChild(textSpan);
    container.appendChild(cursor);
    var i = 0;
    function step(){
      if (i < text.length){
        textSpan.textContent += text.charAt(i);
        i++;
        setTimeout(step, speed);
      } else {
        cursor.remove();
      }
    }
    step();
  }

  btn.addEventListener('click', function(){
    fireConfetti();
    if (!pressed){
      pressed = true;
      msgBox.classList.add('visible');
      typewrite(SURPRISE_MESSAGE, msgBox, 28);
      btn.textContent = 'one more time? 🎉';
    }
    btn.blur();
  });

  /* ---------- moments gallery: lightbox + song button ---------- */
  var photoSources = [
    document.querySelectorAll('.heart-img')[0] ? document.querySelectorAll('.heart-img')[0].src : '',
    document.querySelectorAll('.heart-img')[1] ? document.querySelectorAll('.heart-img')[1].src : '',
    document.querySelectorAll('.heart-img')[2] ? document.querySelectorAll('.heart-img')[2].src : '',
    document.querySelectorAll('.heart-img')[3] ? document.querySelectorAll('.heart-img')[3].src : ''
  ];
  var modal = document.getElementById('photo-modal');
  var modalImg = document.getElementById('modal-img');
  var modalClose = document.getElementById('modal-close');

  window.openPhoto = function(i){
    modalImg.src = photoSources[i];
    modal.classList.add('open');
  };
  function closePhoto(){
    modal.classList.remove('open');
  }
  modalClose.addEventListener('click', closePhoto);
  modal.addEventListener('click', function(e){
    if (e.target === modal) closePhoto();
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') closePhoto();
  });

  /* Our song: plays a short original instrumental (our-song.mp3, bundled in
     this folder) right inside the page. The real "I'm Yours" by Jason Mraz
     can't be embedded here (that would mean redistributing a copyrighted
     recording), so the separate link below still opens the real song on
     YouTube for her. */
  var songBtn = document.getElementById('song-btn');
  var bgAudio = document.getElementById('bg-audio');
  var songPlaying = false;

  songBtn.addEventListener('click', function(){
    fireConfetti();
    if (!bgAudio) return;
    if (songPlaying){
      bgAudio.pause();
      songBtn.querySelector('.note-icon').textContent = '🎵';
    } else {
      bgAudio.play().catch(function(){ /* autoplay/interaction restrictions */ });
      songBtn.querySelector('.note-icon').textContent = '⏸';
    }
    songPlaying = !songPlaying;
  });
})();
