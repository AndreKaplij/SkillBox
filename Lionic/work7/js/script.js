let btnSearch = document.querySelector('.header__search');
let search = document.querySelector('.search');
let btnClosed = document.querySelector('.search__btn-closed');


btnSearch.addEventListener('click', function () {

  search.classList.toggle('search--active');
})

btnClosed.addEventListener('click', function () {

  search.classList.remove('search--active');
})

let burger = document.querySelector('.burger');
let burgerOpen = document.querySelector('.burger__menu');
let burgerClosed = document.querySelector('.burger__btn-closed');
let menuLinks = document.querySelectorAll('.burger__list');


burger.addEventListener('click', function (){

    burgerOpen.classList.toggle('burger--active');
    document.body.classList.toggle('stop-scroll');
})

burgerClosed.addEventListener('click', function () {

      burgerOpen.classList.remove('burger--active');
      document.body.classList.remove('stop-scroll');
})

menuLinks.forEach(function (el) {
  el.addEventListener('click', function () {

    burgerOpen.classList.remove('burger--active');
    document.body.classList.remove('stop-scroll');
  })
})




//     // Функция ymaps.ready() будет вызвана, когда
//     // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
//     ymaps.ready(init);
//     function init(){
//     // Создание карты.
//     var myMap = new ymaps.Map("map", {
//     // Координаты центра карты.
//     // Порядок по умолчанию: «широта, долгота».
//     // Чтобы не определять координаты центра карты вручную,
//     // воспользуйтесь инструментом Определение координат.
//     center: [48.872185, 2.354224],
//     // Уровень масштабирования. Допустимые значения:
//     // от 0 (весь мир) до 19.
//     zoom: 16
//     });
//     //     // Создание геообъекта с типом точка (метка).
//     // var myGeoObject = new ymaps.GeoObject({
//     //   geometry: {
//     //       type: "Point", // тип геометрии - точка
//     //       coordinates: [55.8, 37.8] // координаты точки
//     //   }
//     // });
//     var myPlacemark = new ymaps.Placemark([55.769383, 37.638521], {}, {
//       iconLayout: 'default#image',
//       iconImageHref: 'img/location.svg',
//       iconImageSize: [48, 48],
//       iconImageOffset: [0, 0]
//       });


// // Размещение геообъекта на карте.
// // myMap.geoObjects.add(myGeoObject);
// myMap.geoObjects.add(myPlacemark);
// }



// // form
// let selector = document.querySelector("input[type='tel']");

// let im = new Inputmask("+7 (999)-999-99-99");
// im.mask(selector);

// new JustValidate('.form', {
//   rules: {
//     email: {
//       required: true,
//       email: true
//     },
//     tel: {
//       required: true,
//       function: (name, value) => {
//         const phone = selector.inputmask.unmaskedvalue();
//         return Number(phone) && phone.length === 10;
//       }
//     },
//     name: {
//       required: true
//     },
//   },
//   messages: {
//     email: {
//       required: 'Укажите ваш e-mail',
//     },
//     tel: {
//       required: 'Укажите ваш телефон',
//     },
//     name: {
//       required: 'Как вас зовут?',
//     }
//   },
//   colorWrong: '#FF5C00',
// });



