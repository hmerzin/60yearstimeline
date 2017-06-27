
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
      videoId: 'xy-77tsg8V8',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });

    v2 = new YT.Player('video2', {
      height: '390',
      width: '640',
      videoId: 'vJ9lGGHp8mI',
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


  const learnMore = jwplayer('learnMoreAudio').setup({
    width: 0,
    height: 0,
    file: 'https://s3.amazonaws.com/60-years-mv/1976+VO.mp3',
    autostart: false
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

    } else if($(e.target).is('#pause')) {
        //document.getElementById('learnMoreAudio').pause();
        learnMore.pause(true);
        document.getElementById('pause').style.display = "none";
        document.getElementById('play').style.display = "block";
    } else if($(e.target).is('#play')) {
        //document.getElementById('learnMoreAudio').play();
        learnMore.play(true);
        document.getElementById('pause').style.display = "block";
        document.getElementById('play').style.display = "none";
    } else {
      learnMore.stop();
      Array.from(document.getElementsByClassName('modal')).forEach(modal => { modal.style.display = 'none'; });
      document.getElementById('pause').style.display = "block";
      document.getElementById('play').style.display = "none";
      v1.stopVideo();
      v2.stopVideo();
      console.log('else');
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


  $( '#whispering' ).on('click', (e) => {
    presentModal('modal1');
    v1.playVideo();
  });

  $( '#signing' ).on('click', (e) => {
    presentModal('modal3');
  });

  $( '#handshake' ).on('click', (e) => {
    presentModal('modal2');
    v2.playVideo();
  });

  $( '#learnMore' ).on('click', (e) => {
    presentModal('1976modal');
    //playVideo('learnMoreAudio');
    learnMore.play(true);
  });

  $( '#pause' ).on('click', (e) => {
    document.getElementById('pause').style.display = "none";
    document.getElementById('play').style.display = "block";
    console.log('pause clicked');
  })

});
