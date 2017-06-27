  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var v1;
  function onYouTubeIframeAPIReady() {
    console.log('ready');
    v1 = new YT.Player('video1', {
      height: '390',
      width: '640',
      videoId: 'DXWbqOqtv-0',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }

  function onPlayerReady(event) {
    //player.playVideo();
  }

  function onPlayerStateChange() {

  }


$( 'document' ).ready(() => {
  const learnMore = jwplayer('learnMoreAudio').setup({
    width: 0,
    height: 0,
    file: 'https://s3.amazonaws.com/60-years-mv/1988+VO.mp3'
  })

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

    } else if($(e.target).is('#flagsModalImage')) {
        learnMore.getState() === 'playing' ? learnMore.pause(true) : learnMore.play(true);
    } else {
      learnMore.stop();
      Array.from(document.getElementsByClassName('modal')).forEach(modal => { modal.style.display = 'none'; });
      console.log('else');
      v1.stopVideo();
        if($(e.target).find('video')[0]) {
          $(e.target).find('video')[0].pause();
          $(e.target).find('video')[0].currentTime = 0;
        } else if($(e.target).find('audio')[0]) {
            $(e.target).find('audio')[0].pause();
            $(e.target).find('audio')[0].currentTime = 0;
        }
        else if ($(e.target).parent().find('video')[0]) {
          $(e.target).parent().find('video')[0].pause();
          $(e.target).parent().find('video')[0].currentTime = 0;
        }
        else if ($(e.target).parent().find('audio')[0]) {
          $(e.target).parent().find('audio')[0].pause();
          $(e.target).parent().find('audio')[0].currentTime = 0;
        }
      }
  }


  $( '#jimmyCarter' ).on('click', (e) => {
    presentModal('modal1');
  });

  $( '#signing' ).on('click', (e) => {
    presentModal('modal2');
    v1.playVideo();
  });

  $( '#learnMore' ).on('click', (e) => {
    presentModal('modal3');

  });

  $( '#flags' ).on('click', (e) => {
    presentModal('modal4');
    //playVideo('learnMoreAudio')
    learnMore.play(true);
  });


});
