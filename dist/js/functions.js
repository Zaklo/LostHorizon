document.getElementById("title-rotate").onmousemove = event => {
  document.querySelector(".image-background").style.background = "none";
  document.getElementById("image3d").classList.add('initial_background');
  document.querySelector(".cursor").style.background= "none!important";
}

document.getElementById("title-rotate").onmouseout = event => {
  document.querySelector(".image-background").style.background = "rgba(0,0,0,.3)";
  document.getElementById("image3d").classList.remove('initial_background');
}



document.onmousemove = event => {
  let valX = (100 * event.clientX / window.innerWidth) / 100 * 2 - 1;
  let valY = (100 * event.clientY / window.innerHeight) / 100  * 2 - 1;

  document.getElementById("image3d").style.setProperty('transform', "perspective(100px) rotateX(" + valY + "deg) rotateY(" + (-valX) * 2 + "deg) scale(1.4)");

  document.getElementById("title-rotate").style.setProperty('transform', "perspective(100px) rotateX(" + valY * 5 + "deg) rotateY(" + (-valX) * 5 + "deg) scale(1)");
}

document.onmouseout = event => {
  document.getElementById("image3d").style.setProperty('transform', "perspective(100px) rotateX(0deg) rotateY(0deg) scale(1.4)");
  document.getElementById("title").style.setProperty('transform', "perspective(100px) rotateX(0deg) rotateY(0deg) scale(1)");
}





document.querySelector(".map_button").onclick = event => {
  document.querySelector(".map").classList.add("animate__fadeInUp");
}



function launchSound(element){
  document.querySelector(element).play();
}


function cinematic(){
  setTimeout(function(){ 
    $(".cinematic_1").fadeIn();
  
    setTimeout(function(){
      $(".cinematic_1").fadeOut();
      setTimeout(function(){ $(".cinematic_2").fadeIn(); }, 500 );

      setTimeout(function(){
        $(".cinematic_2").fadeOut();
        setTimeout(function(){ $(".cinematic_3").fadeIn(); }, 500 );

        setTimeout(function(){
          $(".cinematic_3").fadeOut();

          setTimeout(function(){ 
            document.getElementById('video_cinematic').style.display = 'block';
            launchSound('#video_cinematic');
          }, 500 );

          setTimeout(function(){
            $(".cinematic_4").fadeIn();
            
            setTimeout(function(){
              $(".cinematic_4").fadeOut();
              setTimeout(function(){ $(".cinematic_5").fadeIn(); }, 500 );

                setTimeout(function(){ 
                  $(".cinematic_5").fadeOut(); 
                  setTimeout(function(){ $(".cinematic_6").fadeIn(); }, 500 );
                }, 6000 );

            }, 6000);
        
          }, 29000);
      
        }, 9000);
    
      }, 8000);
  
    }, 8000);

  }, 2000);
}



function muteAudio() {
  let audio = document.getElementById('homemusic');

  if (document.getElementById("homemusic").muted == false) {
    document.getElementById("homemusic").muted = true;
  }
    
    if (document.getElementById("homemusic").muted == true) {
        document.getElementById("homemusic").muted = false;
    }  
  }

function route(remove, action, classes){
  let selectClass = '' + remove;
  
  if( selectClass != '.home'){ $( "body" ).addClass( "no-home" ); }
  else{ $( "body" ).removeClass( "no-home" ); }

  let selecteur = '$("' + selectClass + '").';
  let fn1 = action + '()';
  let fn2 = '.addClass("' + classes + '");';

  cmd = selecteur + fn1 + fn2;
  
  eval(cmd);
} 

function launchExperience(){
  $( ".navigation-top" ).fadeOut();
  $( ".home .content" ).fadeOut();
  $( ".navigation-bottom" ).fadeOut();
  $( ".image-background" ).addClass('animation_enter');
  setTimeout(function(){ window.location.replace('experience.html'); }, 2000 );

}

let cursor = document.createElement("div");
cursor.classList.add("cursor");
document.body.appendChild(cursor);
document.addEventListener("mousemove", e => {
  cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
})

function noHome(){
  document.querySelector("body").classList.remove("no-home");
}

if (window.location.href.indexOf("") > -1) {
  route('section', 'hide');
  route('.loader', 'show');
  noHome();
}


if (window.location.href.indexOf("#home") > -1) {
  route('section', 'hide');
  noHome();
  route('.home', 'show');
}

if (window.location.href.indexOf("#book") > -1) {
  route('section', 'hide');
  route('.book', 'show');
}


if (window.location.href.indexOf("#notes") > -1) {
  route('section', 'hide');
  route('.notes', 'show');
}

if (window.location.href.indexOf("#credits") > -1) {
  route('section', 'hide');
  route('.credits', 'show');
}