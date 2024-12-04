'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');


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
const tabsContent= document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click',function(e){
  const clicked=e.target.closest('.operations__tab');
  // console.log(clicked);
  // guard class
  if(!clicked) return;

  //remove active classes
  tabs.forEach(t=>t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c=>c.classList.remove('operations__content--active'));
  
  // activate tab
  clicked.classList.add('operations__tab--active');

  // activate content area
  // console.log(clicked.dataset.tab);
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).
  classList.add('operations__content--active');

});

// link hover and fade out
// menu fade animation
const handleHover=function(e,opacity){
  if(e.target.classList.contains('nav__link')){
    const link=e.target;
    const siblings= link.closest('.nav').querySelectorAll('.nav__link');
    const logo=link.closest('.nav').querySelector('img');
    siblings.forEach(el=>{
      if(el!==link) el.style.opacity=this;
    });
    logo.style.opacity=this;
  }}
// }passing "argument into handler"

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout',handleHover.bind(1));

// sticky navigation
/*
const initialCoords = section1.getBoundingClientRect();
console.log(initialCoords);
window.addEventListener('scroll',function(e){
  console.log(window.scrollY);
  if(this.window.scrollY>initialCoords.top) nav.classList.add('sticky')
    else nav.classList.remove('sticky')
});
*/


//sticky navigation---intersection observer API

// const obsCallback=function(entries,observer){
//   entries.forEach(entry=>{
//     console.log(entry)
//   })
// };

// const obsOptions={
//   root:null,
//   threshold:[0,0.2]
// }

// const observer=new IntersectionObserver(obsCallback,obsOptions);
// observer.observe(section1);


const header=document.querySelector('.header');
const navHeight=nav.getBoundingClientRect().height;
const stickyNav=function(entries){
  const [entry] = entries;
  // console.log(entry);
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky')
};

const headerObserver=new IntersectionObserver(
  stickyNav,{
    root:null,
    threshold:0,
    rootMargin:`-${navHeight}px`
  });
headerObserver.observe(header);

