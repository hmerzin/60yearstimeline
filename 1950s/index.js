  function onPlayerReady(e) {

  }

  function onPlayerStateChange(e) {

  }  
  
  var v1;
  var v2;
  function onYouTubeIframeAPIReady() {
    console.log('ready');
    v1 = new YT.Player('video1', {
      height: '390',
      width: '640',
      videoId: '2B8R-umE0s0',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
    v2 = new YT.Player('video2', {
      height: '390',
      width: '640',
      videoId: 'qpZ4nDLvTdQ',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }


$( 'document' ).ready(() => {

  function presentModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
  }

  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  //https://www.youtube.com/watch?v=qpZ4nDLvTdQ

  function dismissModals(e) {
    console.log('modalClicked');
    v1.stopVideo ? v1.stopVideo() : null;
    v2.stopVideo ? v2.stopVideo() : null;
    if($(e.target).is('video')) {
      const video = e.target;
      console.log('video pressed');
      if(! video.paused) {
        video.pause();
      } else {
        video.play();
      }

    } else {
      Array.from(document.getElementsByClassName('modal')).forEach(modal => { modal.style.display = 'none'; });
      console.log('else');
      
      if($(e.target).find('video')[0]) {
          console.log($(e.target).find('video')[0]);
          $(e.target).find('video')[0].pause();
          $(e.target).find('video')[0].currentTime = 0;
        } else if ($(e.target).parent().find('video')[0]) {
          $(e.target).parent().find('video')[0].pause();
          $(e.target).parent().find('video')[0].currentTime = 0;
        }
      }
    }

  $('.modal').prepend('<p class="description">x</p>');
  //`<p class="x" style="font-size: 35px !important; align-content: right !important; font-family: 'Helvetica Neue'">x</p>`


  $( '#div2' ).on('click', (e) => {
    presentModal('modal1');
    //document.getElementById('video1').play();
    
    //document.getElementById('video1').play();
    v1.playVideo ? v1.playVideo() : null;
  });

  $( '#div1' ).on('click', (e) => {
    presentModal('modal2');
  });

$( '#div3' ).on('click', (e) => {
    presentModal('modal3');
  });
  
$( '#div4' ).on('click', (e) => {
  presentModal('modal4');
  v2.playVideo ? v2.playVideo() : null;

});

$( '#learnMore' ).on('click', (e) => {
  presentModal('modal5');
});


  $( '.modal' ).on('click', (e) => {
    dismissModals(e);
  });

});
