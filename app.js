let controller;
let slideScene;
let pageScene;

function animateSlides() {
  //init controller
  controller = new ScrollMagic.Controller();
  //select some things
  const sliders = document.querySelectorAll(".slide");
  //loop over each slider
  sliders.forEach((slide, index, slides) => {
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");
    //GSAP
    // gsap.to(revealImg, 1, {x: '100%'});
    const slideTl = gsap.timeline({
      defaults: {duration: 1, ease: "power2.inOut"},
    });
    slideTl.fromTo(revealImg, {x: "0%"}, {x: "100%"});
    slideTl.fromTo(img, {scale: 2}, {scale: 1}, "-=1");
    slideTl.fromTo(revealText, {x: "0%"}, {x: "100%"}, "-=0.75");
    //creating scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
      reverse: false,
    })
      .setTween(slideTl)
      .addTo(controller);
    //new animation
    const pageTl = gsap.timeline();
    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    if (nextSlide === "end") {
      return false;
    }
    pageTl.fromTo(nextSlide, {y: "0%"}, {y: "50%"});
    pageTl.fromTo(slide, {opacity: 1, scale: 1}, {opacity: 0, scale: 0.5});
    pageTl.fromTo(nextSlide, {y: "50%"}, {y: "0%"}, "-=0.5");
    //create new scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    })
      .setPin(slide, {pushFollowers: false})
      .setTween(pageTl)
      .addTo(controller);
  });
}
animateSlides();

window.addEventListener("mousemove", cursor);
window.addEventListener("mouseover", activeCursor);
const mouse = document.querySelector(".cursor");

function cursor(e) {
  mouse.style.top = e.pageY + "px";
  mouse.style.left = e.pageX + "px";
}
function activeCursor(e) {
  const item = e.target;
  if (item.classList.contains("explore")) {
    mouse.classList.add("explore-active");
    gsap.to(".title-swipe", 1, {y: "0%"});
  } else {
    mouse.classList.remove("explore-active");
    gsap.to(".title-swipe", 1, {y: "100%"});
  }
}
