const SMALL_NAV = 750;

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
  // If small size, close hamburger menu.
  if (window.innerWidth <= SMALL_NAV){
    navLinkContainer.style.display = 'none';
  }

  // Otherwise, animate in navlinks
  // console.log("page is fully loaded");
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


  //Projects
  handleOverlayResize(); //run once at beginning to set overlay sizes.
});


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



//Handling Navbar display: responsive design
//Basic idea: clicking hamburger icon should open dropdown menu
//Dropdown CSS pre-built in media query, but still need to activate the class
//with an on click listener
toggleLinksIcon.addEventListener('click', toggleDropDown);

function toggleDropDown(evt){
  //target navlinks container, switch display.
  let display = navLinkContainer.style.display;
  if (display === "none"){
    navLinkContainer.style.display = 'flex';
  } else {
    navLinkContainer.style.display = 'none';
  }
}



window.addEventListener('resize', resizeDisplay)

function resizeDisplay(evt){
  //console.log('window resized, inner width is: ', window.innerWidth);
  handleLinksDisplay();
  handleOverlayResize();
}


//Continue handling navbar:
//On viewport/window resize, should check overall width. If > 600px, then
//show links. If < 600px, hide links.
function handleLinksDisplay(){
  let display = navLinkContainer.style.display;

  if (window.innerWidth > SMALL_NAV){
    navLinkContainer.style.display = 'flex';
  } else {
    navLinkContainer.style.display = 'none';
  }
}


/*Updates image overlays in projects section
Working with client/offsetHeight led to some odd 1-2 pixel inaccuracies.
The current workaround is to find the largest height of the images, and treat
that as the standard. Seems to work. */
function handleOverlayResize(){
  let projectImages = [...document.querySelectorAll(".project-image")];
  let imageOverlays = [...document.querySelectorAll(".image-overlay")];

  let maxImageHeight = projectImages.reduce((currMax, el) => {
    return Math.max(currMax, el.offsetHeight);
  }, 0);

  for (let currOverlay of imageOverlays){
    currOverlay.style.height = `${maxImageHeight}px`;
  }

  // for (let i = 0; i < projectImages.length; i++){
  //   let currImage = projectImages[i];
  //   let currOverlay = imageOverlays[i];

  //   console.log('current image is: ', currImage);
  //   console.log('height is: ', currImage.offsetHeight);
  //   currOverlay.style.height = `${currImage.offsetHeight}px`;
  // }
}







// Below handles image overlay with javascript.
// Removes when mouse enters (to highlight site image)
// Then adds back when mouse leaves.
// https://javascript.info/mousemove-mouseover-mouseout-mouseenter-mouseleave

let imageContainers = [...document.querySelectorAll(".project-image-container")];

function removeOverlay(evt){
  //console.log(evt.target);
  let imageOverlay = evt.target.lastElementChild;
  imageOverlay.classList.add('hide');
}
function addOverlay(evt){
  let imageOverlay = evt.target.lastElementChild;
  imageOverlay.classList.remove('hide');
}

for (let container of imageContainers){
  container.addEventListener('mouseenter', removeOverlay);
  container.addEventListener('mouseleave', addOverlay);
}


// imageOverlays.forEach(container => {
//   //Somewhat janky: anchor tags also have image-container class, so we skip these
//   //since then overlays would double up and overlap.
//   if (container.nodeName !== 'A'){
//     container.addEventListener('mouseenter', removeOverlay);
//     container.addEventListener('mouseleave', addOverlay);
//   }
// });
