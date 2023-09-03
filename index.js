let navbar = document.querySelector('.navbar');
let navLinkContainer = document.querySelector('.navlinks');
let navLinkList = document.querySelectorAll('.navlink');
let toggleLinksIcon = document.querySelector('.toggle-links-icon');

let heroChildren = document.querySelector('.hero-text-container').children;
[...heroChildren].forEach(child => child.classList.add('hero-unloaded'));

//Handling initial load in:

navbar.classList.add('nav-unloaded');

//Add unloaded tag to navlinks:
for (link of navLinkList){
  link.classList.add('navlink-unloaded');
}

window.addEventListener("load", (event) => {
  //Navbar
  console.log("page is fully loaded");
  navbar.classList.add('nav-loaded');
  for (let i = 0; i < navLinkList.length; i++){
    let link = navLinkList[i];
    link.classList.add('navlink-loaded');
    link.style['transition-delay'] = `${i * 100}ms`;
  }

  setTimeout(() => {
    navbar.classList.remove('nav-unloaded');
    for (link of navLinkList){
      link.classList.remove('navlink-unloaded');
      link.style['transition-delay'] = '0ms';
    }
  }, 1000);


  //Hero
  for (let i = 0; i < heroChildren.length; i++){
    let heroText = heroChildren[i];
    heroText.style['transition-delay'] = `${600 + i*100}ms`;
    heroText.classList.add('hero-loaded');
  }
  setTimeout(() => {
    for (heroText of heroChildren){
      heroText.classList.remove('hero-unloaded');
      heroText.style['transition-delay'] = '0ms';
    }
  }, 1500);
});


//Handling Navbar display: responsive design
//Basic idea: clicking hamburger icon should open dropdown menu
//Dropdown CSS pre-built in media query, but still need to activate the class
//with an on click listener
toggleLinksIcon.addEventListener('click', openDropdown);

function openDropdown(evt){
  //target navlinks container, switch display.
  let display = navLinkContainer.style.display;
  if (display === "none"){
    navLinkContainer.style.display = 'flex';
  } else {
    navLinkContainer.style.display = 'none';
  }
}


//Handling Navbar display when scrolling:
//Goal: Navbar should disappear on scroll bar, and reappear when scrolling up.
//If not at top of the page, should additionally have a dropshadow/other styling.
//One possible additional style is semi-transparency with a blur:
//backdrop-filter: blur(6px);
let lastPositionY = 0;

function scrollHandler(evt) {
  let positionY = window.scrollY;

  if (positionY > lastPositionY){
    //scrolling down. Remove navbar.
    if (positionY > 200){
      navbar.classList.remove('navbar-sticky');
      navbar.classList.add('navbar-hidden');
    }
  } else {
    //scrolling up. Add navbar back.
    navbar.classList.add('navbar-sticky');
    navbar.classList.remove('navbar-hidden');
  }
  lastPositionY = positionY;
}

window.addEventListener('scroll', scrollHandler);


//Below handles image overlay with javascript.
//adds image overlay by default. Removes when mouse enters (to highlight site image)
//Then readds when mouse leaves.
//https://javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave

let imgContainers = document.querySelectorAll('.project-image-container');
imgContainers = [...imgContainers];


function removeOverlay(evt){
  evt.target.classList.remove('image-overlay');
  console.log(evt.target);
}
function addOverlay(evt){
  evt.target.classList.add('image-overlay');
  console.log(evt.target);
}

imgContainers.forEach(container => {
  //Somewhat janky: anchor tags also have image-container class, so we skip these
  //since then overlays would double up and overlap.
  if (container.nodeName !== 'A'){
    container.addEventListener('mouseenter', removeOverlay);
    container.addEventListener('mouseleave', addOverlay);
  }
});
