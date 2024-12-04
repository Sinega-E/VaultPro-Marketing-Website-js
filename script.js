'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click',openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

////////////////////////////////////////////////////////
// // cookie message
// const header = document.querySelector('.header');
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML = 'We use cookies for improved functionality and analytics.<button class="btn btn--close-cookie">Got it!</button>';
// header.append(message);
// console.log(message.innerHTML);

// // styles
// message.style.backgroundColor='#37383d';
// message.style.width='120%';
// message.style.height=Number.parseFloat(getComputedStyle(message).height,10)+30+'px';
document.documentElement.style.setProperty('--color-primary', '#0A97B0')

// // Attributes
// const logo=document.querySelector('.nav__logo')


////////////////////////////////////////////////////////////

const btnScrollTo=document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e){
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords)

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll(X/Y)',window.pageXOffset, pageYOffset);

  console.log('height/width of viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // window.scrollTo(s1coords.left, s1coords.top + window.pageYOffset);

  window.scrollTo({
    left: s1coords.left + window.pageXOffset, 
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth'
});
// modern way of scrolling---works only in modern browsers
// section1.scrollIntoView({behavior:'smooth'})
// })
console.log("----------------end of smooth scrolling feature-------------------------------")
});

// event propagation---bubbling--- events travel through all the elemts
// const randomInt=(min,max)=>
//   Math.floor(Math.random()*(max-min+1)+min);
// const randomColor=()=>
//   `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;

// document.querySelector('.nav__link').addEventListener
// ('click',function(e){
//   this.style.backgroundColor=randomColor();
// });

// document.querySelector('.nav__links').addEventListener
// ('click',function(e){
//   this.style.backgroundColor=randomColor();

// });

// document.querySelector('.nav').addEventListener
// ('click',function(e){
//   this.style.backgroundColor=randomColor();

// });

//////////////////////////////////////////////////////////////////
// page navigation

// document.querySelectorAll('.nav__link').forEach
// (function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault();

//     const id=this.getAttribute('href');

//     document.querySelector(id).scrollIntoView({
//       behavior:'smooth'
//     })
//   })
// })

////////////important technique////////////////

// 1. add event listener to common parent element
// 2. determinewhat element originated the event


document.querySelector('.nav__links').addEventListener
('click',function(e){
  e.preventDefault();
  
  // Matching Strategy
  if (e.target.classList.contains('nav__link')){
    const id=e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior:'smooth'
    })
  }

});

// Tabbed component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer= document.querySelector('.operations__tab-container');
const tabsContent= document.querySelector('.operations__content');


