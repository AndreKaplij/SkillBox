let burger = document.querySelector('.burger');
let menu = document.querySelector('.nav');
let menuLinks = menu.querySelectorAll('.nav__link');
let a,b;

burger.addEventListener('click', function (){
    burger.classList.toggle('burger--active');

    menu.classList.toggle('nav--active');

    document.body.classList.toggle('stop-scroll');
})

menuLinks.forEach(function (el) {
    el.addEventListener('click', function () {

        burger.classList.remove('burger--active');

        menu.classList.remove('nav--active');

        document.body.classList.remove('stop-scroll');
    })
})

let btnSearch = document.querySelector('.btn-svg');
let search = document.querySelector('.search');
let btnClosed = document.querySelector('.search__btn-closed');


btnSearch.addEventListener('click', function () {

  search.classList.toggle('search--active');
})

btnClosed.addEventListener('click', function () {

  search.classList.remove('search--active');
})

let tabsBtn = document.querySelectorAll('.work__btn');
let tabsItem = document.querySelectorAll('.work__descr');
let tabsItem1 = document.querySelectorAll('.work__subtitle');
let tabsItem2 = document.querySelectorAll('.work__right');

tabsBtn.forEach(function(element){
  element.addEventListener('click', function(e){
    const path = e.currentTarget.dataset.path;

    tabsBtn.forEach(function(btn){ btn.classList.remove('tabs__btn--active')});
    e.currentTarget.classList.add('tabs__btn--active');

    tabsItem.forEach(function(element){ element.classList.remove('tabs-item--active')});
    document.querySelector(`[data-target="${path}"]`).classList.add('tabs-item--active');
  });
});

tabsBtn.forEach(function(element){
  element.addEventListener('click', function(e){
    const path = e.currentTarget.dataset.path1;

    tabsItem1.forEach(function(element){ element.classList.remove('tabs-item--active')});
    document.querySelector(`[data-target1="${path}"]`).classList.add('tabs-item--active');
  });
});

tabsBtn.forEach(function(element){
  element.addEventListener('click', function(e){
    const path = e.currentTarget.dataset.path2;

    tabsItem2.forEach(function(element){ element.classList.remove('tabs-item--active')});
    document.querySelector(`[data-target2="${path}"]`).classList.add('tabs-item--active');
  });
});

new Accordion('.accordion-list', {
	elementClass: 'accordion',
	triggerClass: 'accordion__control',
	panelClass: 'accordion__content',
	activeClass: 'accordion--active'
});

const swiper = new Swiper('.swiper', {
	slidesPerView: 1,
	loop: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
		clickable: true
  }
});











