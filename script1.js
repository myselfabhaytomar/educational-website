var mainContent = document.querySelector("#main");
var cursor = document.querySelector("#cursor");
mainContent.addEventListener("mousemove", function (dets) {
    gsap.to(cursor,{
        x:dets.x,
        y:dets.y
    })
}); 

mainContent.addEventListener("mouseenter",function(){
    gsap.to(cursor,{
        scale:1,
        opacity:1
    })
})
mainContent.addEventListener("mouseleave",function(){
    gsap.to(cursor,{
        scale:0,
        opacity:0
    })
});

var swiper = new Swiper(".mySwiper", {
    effect: "cube",
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    },
    pagination: {
      el: ".swiper-pagination",
    },
  });

 

  var canvas = document.getElementById('myCanvas');
  var ctx = canvas.getContext('2d');
  var x = 0;

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(x, 20, 50, 50);
    x += 2;
    requestAnimationFrame(draw);
  }

  draw();

