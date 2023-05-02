const hamburgerMenuIcon = document.querySelector('.navigation-hamburger__menu');
const hamburgerMenuList = document.querySelector('.navigation-bar__list');
const navigationCurtain = document.querySelector('.navigation-curtain');

export function hamburgerMenu() {
  if (hamburgerMenuIcon) {
    hamburgerMenuIcon.addEventListener("click", function (e) {
      document.body.classList.toggle('_lock-scroll');
      // document.body.style.overflow = 'hidden';
      hamburgerMenuIcon.classList.toggle('_active-hamburger');
      hamburgerMenuList.classList.toggle('_active-hamburger');
      navigationCurtain.classList.toggle('_active-hamburger');
    });
  }
}

hamburgerMenu();
const navigationLinks = document.querySelectorAll('.navbar__item-href[data-link]');

export function navigationEvent() {
  if (navigationLinks.length > 0) {
    navigationLinks.forEach(navigationLink => {
      navigationLink.addEventListener("click", navigationLinkClick);
    })
  }
}

navigationEvent();

export function navigationLinkClick(e) {
  const navLink = e.target;
  console.log('navLink.data.link', navLink, navLink.parentNode.dataset.link)
  if (navLink.parentNode.dataset.link && document.querySelector(navLink.parentNode.dataset.link)) {
    const linkBlock = document.querySelector(navLink.parentNode.dataset.link);
    const linkBlockValue = linkBlock.getBoundingClientRect().top + pageYOffset;

    if (hamburgerMenuIcon.classList.contains('_active-hamburger')) {
      document.body.classList.remove('_lock-scroll');
      // document.body.style.overflow = 'auto';
      hamburgerMenuIcon.classList.remove('_active-hamburger');
      hamburgerMenuList.classList.remove('_active-hamburger');
      navigationCurtain.classList.remove('_active-hamburger');
    }
    window.scrollTo({
      top: linkBlockValue
    });
    e.preventDefault();
  }
}

export function OutOffHamburgerMenu() {
  window.addEventListener('click', e => {
    const target = e.target;

    if (!target.closest('.navigation-bar__list') && !target.closest('.navigation-hamburger__menu')) {

      document.body.classList.remove('_lock-scroll');
      // document.body.style.overflow = 'auto';
      hamburgerMenuIcon.classList.remove('_active-hamburger');
      hamburgerMenuList.classList.remove('_active-hamburger');
      navigationCurtain.classList.remove('_active-hamburger');
    }
  });
}
OutOffHamburgerMenu();