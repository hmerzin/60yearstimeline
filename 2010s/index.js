
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.
  var v1;
  var v2;
  function onYouTubeIframeAPIReady() {
    console.log('ready');
    v1 = new YT.Player('presentDay', {
      height: '390',
      width: '640',
      videoId: 'wfo3xkfB0WQ',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
    v2 = new YT.Player('mapPhoto', {
      height: '390',
      width: '640',
      videoId: 'nPsOzfLFE9A',
      events: {
        'onReady': onPlayerReady1,
        'onStateChange': onPlayerStateChange1
      }
    });
  }

  function onPlayerReady(event) {
    //player.playVideo();
  }

  function onPlayerStateChange() {

  }

  function onPlayerReady1(event) {
    //player.playVideo();
  }

  function onPlayerStateChange1() {

  }

$( 'document' ).ready(() => {

  const a1 = jwplayer('audio1').setup({
    width: 0,
    height: 0,
    file: 'https://s3.amazonaws.com/60-years-mv/2010+VO.mp3'
  });

  const a2 = jwplayer('audio2').setup({
    width: 0,
    height: 0,
    file: 'https://s3.amazonaws.com/60-years-mv/2014+VO.mp3'
  });

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

    } else if($(e.target).is('#signingImage')) {
        a1.getState() === 'playing' ? a1.pause(true) : a1.play(true);
    } else if($(e.target).is('#rose')) {
        a2.getState() === 'playing' ? a2.pause(true) : a2.play(true);
    } else {
      Array.from(document.getElementsByClassName('modal')).forEach(modal => { modal.style.display = 'none'; });
      a1.stop();
      a2.stop();
      console.log('else');
      v1.stopVideo();
      v2.stopVideo();
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


  $( '#summit' ).on('click', (e) => {
    presentModal('modal1');
    a1.play(true);
  });

  $( '#signing' ).on('click', (e) => {
    presentModal('modal2');
  });

  $( '#graphic' ).on('click', (e) => {
    presentModal('modal3');

  });

  $( '#woman' ).on('click', (e) => {
    presentModal('modal4');
    a2.play(true);
  });

  $( '#map' ).on('click', (e) => {
    presentModal('modal5');
    v2.playVideo();
  });

  $( '#group' ).on('click', (e) => {
    presentModal('modal6');
    v1.playVideo();
  });

  let fullscreen = false;

  let mapPhoto = document.getElementById('mapPhoto');
  mapPhoto.on('click', () => {
    //if(document.isFullScreen) {
      window.postMessage('fullscreen');
      console.log('fullchanged');
    //}
  });
});
