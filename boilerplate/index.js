const $ = require('jquery');



$( 'document' ).ready(() => {


  $( '.modal' ).on('click', (e) => {
    handleModals(e);
  });

  function presentModal(modalId) {
   document.getElementById(modalId).style.display = 'block';
  }
  function playVideo(video) {
    document.getElementById(video).play();
  }

  function handleModals(e) {
    console.log('modalClicked');

    if($(e.target).is('video')) {
      const video = e.target;
      console.log('video pressed');
      if(! video.paused) {
        video.pause();
      } else {
        video.play();
      }

    } else if($(e.target).is('p')) {
    } else if($(e.target).is('#flagsModalImage')) {
        const audio = document.getElementById('learnMoreAudio');
        if(!audio.paused) {
          audio.pause();
        } else {
          audio.play();
        }
    } else {
      Array.from(document.getElementsByClassName('modal')).forEach(modal => { modal.style.display = 'none'; });
      console.log('else');
        if($(e.target).find('video')[0]) {
          $(e.target).find('video')[0].pause();
          $(e.target).find('video')[0].currentTime = 0;
        } else if($(e.target).find('audio')[0]) {
            $(e.target).find('audio')[0].pause();
            $(e.target).find('audio')[0].currentTime = 0;
        }
      }
  }


  $( '#jimmyCarter' ).on('click', (e) => {
    presentModal('modal1');
  });

  $( '#signing' ).on('click', (e) => {
    presentModal('modal2');
    playVideo('video1');
  });

  $( '#learnMore' ).on('click', (e) => {
    presentModal('modal3');

  });

  $( '#flags' ).on('click', (e) => {
    presentModal('modal4');
    playVideo('learnMoreAudio')
  });


});
