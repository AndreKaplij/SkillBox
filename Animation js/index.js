
gsap.from(".hero__title", {duration: 1, y: 200, opacity: 0});
gsap.from(".hero__btn", {duration: 1, y: 200, opacity: 0});

setTimeout(() => {
  gsap.to(".hero__descr", {duration: 2, opacity: 1});
},1000)

setTimeout(() => {
  gsap.to(".img1", {duration: 1, opacity: 1});
},1500)

setTimeout(() => {
  gsap.to(".img2", {duration: 1, opacity: 1});
},1750)

setTimeout(() => {
  gsap.to(".img3", {duration: 1, opacity: 1});
},2000)

setTimeout(() => {
  gsap.to(".photos__author", {duration: 1, opacity: 1});
},2500)

var burger = document.querySelector(".burger");
var menu = document.querySelector(".menu");
var close = document.querySelector(".close");


var tl = gsap.timeline({paused: true});

tl.from(".menu__top", {duration: 1, y: -200, opacity: 0})
  .from(".nav__list", {duration: 1, opacity: 0, y: 200})
  .from(".menu__right", {duration: 0.7, opacity: 0, y: 200})
  .from(".social", {duration: 0.7, opacity: 0, y: 200})

burger.addEventListener('click', function (){
  menu.classList.toggle('menu--open');
  tl.play();
});

close.addEventListener('click', function (){
  tl.reverse();
  setTimeout(() => {
    menu.classList.remove('menu--open');
  }, 3000)
});





