function init(){
    gsap.registerPlugin(ScrollTrigger);
const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
locoScroll.on("scroll", ScrollTrigger.update);
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
ScrollTrigger.refresh();
}
init()

function firstPageAnimate() {
    var tl = gsap.timeline()

    tl.from("#nav", {
        y: "-20",
        opacity: 0,
        duration: 1.1,
    })
    tl.to(".boundingelem", {
        y: 0,
        delay: -1,
        duration: 1.2,
        stagger: 0.3,
    })
    tl.from("#herofooter", {
        y: 10,
        opacity: 0,
        delay: -1,
        duration: 1.2,
    })
}

var timeout;
function circleChaptaKaro() {
    var yscale = 1
    var xscale = 1
    
    var xprev = 0
    var yprev = 0
    
    window.addEventListener("mousemove", function(dets) {
        clearTimeout(timeout)
        var xdiff  = dets.clientX - xprev
        var ydiff  = dets.clientY - yprev
        
        xprev = dets.clientX
        yprev = dets.clientY
        
        xscale = gsap.utils.clamp(.7, 1.2, xdiff)
        yscale = gsap.utils.clamp(.7, 1.2, ydiff)
        
        circleMouseFollower(xscale, yscale)
        
        timeout = setTimeout(function(){
            circle.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)` 
        }, 100)
    })
}

var circle = document.querySelector("#minicircle")
function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function(dets) {
        circle.style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})` 
    })
}
circleChaptaKaro()
circleMouseFollower()
firstPageAnimate()

document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate = 0;
    var diffrot = 0;
  
    elem.addEventListener("mouseleave", function (dets) {
      gsap.to(elem.querySelector("img"), {
        opacity: 0,
        ease: Power3,
        duration: 0.5,
      });
    });
  
    elem.addEventListener("mousemove", function (dets) {
      var diff = dets.clientY - elem.getBoundingClientRect().top;
      diffrot = dets.clientX - rotate;
      rotate = dets.clientX;
      gsap.to(elem.querySelector("img"), {
        opacity: 1,
        ease: Power3,
        // top: diff,
        left: dets.clientX,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
    });
    });
});
