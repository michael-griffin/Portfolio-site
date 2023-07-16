
//Handling Navbar display when scrolling:
//Goal: Navbar should disappear on scroll bar, and reappear when scrolling up.
//If not at top of the page, should additionally have a dropshadow/other styling.
//One possible additional style is semi-transparency with a blur:
//backdrop-filter: blur(6px);
let lastPositionY = 0;
let navbar = document.querySelector('.navbar');

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
  container.addEventListener('mouseenter', removeOverlay);
  container.addEventListener('mouseleave', addOverlay);
});
