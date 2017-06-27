  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.

  var v1;
  function onYouTubeIframeAPIReady() {
    console.log('ready');
    v1 = new YT.Player('video2', {
      height: '390',
      width: '640',
      videoId: '7hQNsYDO6gE',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });

    v2 = new YT.Player('video1', {
      height: '390',
      width: '640',
      videoId: '-77h3MOBWVM',
      events: {
        'onReady': onPlayerReady2,
        'onStateChange': onPlayerStateChange2
      }
    });
  }

  function onPlayerReady(event) {
    //player.playVideo();
  }

  function onPlayerStateChange() {

  }

  function onPlayerReady2(event) {
    //player.playVideo();
  }

  function onPlayerStateChange2() {

  }


$( 'document' ).ready(() => {
  let audio1 = jwplayer('audio1').setup({
    file: 'https://s3.amazonaws.com/60-years-mv/1968+VO.mp3',
    width: 0,
    height: 0,
    autostart: false
  });

  $( '.modal' ).on('click', (e) => {
    handleModals(e);
  });

  function presentModal(modalId) {
   document.getElementById(modalId).style.display = 'block';
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

    } else if($(e.target).is('#otherSigning')) {
      console.log('img');
      console.log(audio1.getState());
      audio1.getState() === 'playing' ? audio1.pause(true) : audio1.play();
      /*Array.from(document.getElementsByTagName('audio')).forEach(wav => {
        if(!wav.paused) {
          wav.pause();
        } else {
          wav.play();
        }
      });*/
    } else {
      Array.from(document.getElementsByClassName('modal')).forEach(modal => { modal.style.display = 'none'; });
      audio1.stop();
      v1.stopVideo();
      v2.stopVideo();
      console.log('else');

      }
  }


  $( '#bomb' ).on('click', (e) => {
    presentModal('bombModal');
  });

  $( '#signing1' ).on('click', (e) => {
    presentModal('colorSigningModal');
    v1.playVideo();
  });

  $( '#handshake' ).on('click', (e) => {
    presentModal('handshakeModal');
    v2.playVideo();
  });

  $( '#bottom' ).on('click', (e) => {
    presentModal('bwSigningModal');
    //document.getElementById('audio1').play();
    audio1.play(true);
  });

});
