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

// reveal section
const allSections=document.querySelectorAll('.section');

const revealSection=function(entries,observer){
  const [entry]=entries;

  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target)

};

const sectionObserver=new IntersectionObserver
(
    revealSection,{
      root:null,
      threshold:0.15
  }
);

allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');

});

// lazy images
const imgTargets = document.querySelectorAll('img[data-src]');


const loadImg = function(entries,observer){
  const [entry]=entries;
// console.log(entry)


if(!entry.isIntersecting) return;

// replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.classList.remove('lazy-img');
  entry.target.addEventListener('load',function(){

  });
  observer.unobserve(entry.target)
}
const imgObserver = new IntersectionObserver(loadImg,
{  root:null,
  threshold:0,
  rootMargin: '200px'
}
);

imgTargets.forEach(img=>imgObserver.observe(img));

// building Slider

const slider = function(){
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer=document.querySelector('.dots')
const slides =document.querySelectorAll('.slide');
// const slider = document.querySelector('.slider');

let curSlide=0;
const maxSlide=slides.length;

// slider.style.overflow='hidden';
slides.forEach((s,i)=>s.style.transform=`translateX(${100*i}%)`);


// functions for slider------------------
const createDots=function(){
  slides.forEach(function(_,i){
    dotContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide="${i}"></button>`)
  })
}

const activateDot=function(slide){
  document.querySelectorAll('.dots__dot').
  forEach(dot=>dot.classList.
    remove('dots__dot--active'));

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');

};

const goToSlide=function(slide){
  slides.forEach((s,i)=>s.style.transform=`translateX(${100*(i-slide)}%)`)

}


// next slide function
const nextSlide =function(){
  if(curSlide === maxSlide-1){
    curSlide=0;
  }
  else{
    curSlide++;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
}

// previous slide function
const prevSlide=function(){
  if(curSlide === 0){
    curSlide=maxSlide-1;
  }
  else{
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
}


const init = function(){
  goToSlide(0);
  createDots();
  activateDot(0);
  
}
init();
// Event handlers
btnRight.addEventListener('click',nextSlide)
btnLeft.addEventListener('click',prevSlide)


document.addEventListener('keydown', function(e){
  console.log(e.key)
  if(e.key==='ArrowLeft') prevSlide();
  e.key==='ArrowRight'&& nextSlide();
})


dotContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    const { slide }=e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});
}
slider();

// document.addEventListener('DOMContentLoaded', function(e){
//   console.log("html parsed",e)
// });

// window.addEventListener('load',function(e){
//   console.log("page loaded",e)
// });

// window.addEventListener('beforeunload',function(e){
//   e.preventDefault();
//   console.log(e);
//   e.returnValue=';'

// })