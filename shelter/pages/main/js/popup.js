const popupBacground = document.querySelector('.popup-window');
const popupWindow = document.querySelector('.popup-window__modal');
export let popupOpenCard = document.querySelectorAll('.wrapper-cards__card');
const popupCloseBtn = document.querySelector('.popup-window__close');
const popupImagePet = document.querySelector('.popup-window__image');
const popupHeaderPet = document.querySelector('.popup-window__header-pet');
const descriptionPet = document.querySelector('.popup-window__description-pet');
const contentPet = document.querySelector('.popup-window__content-pet');
const agePet = document.querySelector('.personal-data-age');
const inoculationsPet = document.querySelector('.personal-data-inoculations');
const diseasesPet = document.querySelector('.personal-data-diseases');
const parasitesPet = document.querySelector('.personal-data-parasites');
const bodyTag = document.querySelector('body');

export async function openPopupWindow(param) {
  console.log('popupOpenCard', param);
  param.forEach(element => {
    element.addEventListener('click', (e) => {
      e.preventDefault();
      popupBacground.classList.add('_active-popup');
      popupWindow.classList.add('_active-popup');
      element.classList.add('_active-pet');
      bodyTag.style.overflow = 'hidden';
      getDescriptionPopup();
    })
  });
}

export async function closePopupWindow() {
  popupCloseBtn.addEventListener('click', () => {
    popupBacground.classList.remove('_active-popup');
    popupWindow.classList.remove('_active-popup');
    bodyTag.style.overflow = 'auto';
  })
}

export async function closePopupWindowWithBgc() {
  document.addEventListener('click', (e) => {
    if (e.target === popupBacground) {
      popupBacground.classList.remove('_active-popup');
      popupWindow.classList.remove('_active-popup');
      bodyTag.style.overflow = 'auto';
    }
  })
}

openPopupWindow(popupOpenCard);
closePopupWindow();
closePopupWindowWithBgc();

/////////////////////////////////////////

export async function getDescriptionPopup() {
  let description = ``;
  let windowHref = window.location.pathname;
  console.log(windowHref);
  if (windowHref === `/l1senochek-JSFE2023Q1/shelter/pages/pets/index.html` || windowHref === `/shelter/pages/pets/index.html` || windowHref === `/pages/pets/index.html`) {
    description = `../main/js/pets.json`;
  } else {
    description = `./js/pets.json`;
  }

  await fetch(description).then(res => res.json()).then(pets => {
    let classPets = classPetsCheck();
    console.log('classPets', classPets);
    if (windowHref === `/l1senochek-JSFE2023Q1/shelter/pages/pets/index.html` || windowHref === `/shelter/pages/pets/index.html` || windowHref === `/pages/pets/index.html`) {
      popupImagePet.style.background = `url(${pets[classPets].img})`;
      console.log('classPets', pets);

    } else {
      popupImagePet.style.background = `url(${pets[classPets].img})`;
      console.log('classPets', pets);

    }
    popupImagePet.style.background = `url(${pets[classPets].img})`;
    popupImagePet.style.backgroundSize = 'cover';
    popupHeaderPet.textContent = pets[classPets].name;
    descriptionPet.textContent = `${pets[classPets].type} - ${pets[classPets].breed}`;
    contentPet.textContent = pets[classPets].description;
    agePet.textContent = pets[classPets].age;
    inoculationsPet.textContent = pets[classPets].inoculations[0];
    diseasesPet.textContent = pets[classPets].diseases[0];
    parasitesPet.textContent = pets[classPets].parasites[0];
  })
}

export function classPetsCheck() {
  popupOpenCard = document.querySelectorAll('.wrapper-cards__card');
  for (let i = 0; i < popupOpenCard.length; i++) {
    console.log(popupOpenCard[i]);
    if (popupOpenCard[i].classList.contains('card-katrine') && popupOpenCard[i].classList.contains('_active-pet')) {
      popupOpenCard[i].classList.remove('_active-pet');
      return 4;
    } else if (popupOpenCard[i].classList.contains('card-jennifer') && popupOpenCard[i].classList.contains('_active-pet')) {
      popupOpenCard[i].classList.remove('_active-pet');
      return 0;
    } else if (popupOpenCard[i].classList.contains('card-woody') && popupOpenCard[i].classList.contains('_active-pet')) {
      popupOpenCard[i].classList.remove('_active-pet');
      return 2;
    } else if (popupOpenCard[i].classList.contains('card-sophia') && popupOpenCard[i].classList.contains('_active-pet')) {
      popupOpenCard[i].classList.remove('_active-pet');
      return 1;
    } else if (popupOpenCard[i].classList.contains('card-timmy') && popupOpenCard[i].classList.contains('_active-pet')) {
      popupOpenCard[i].classList.remove('_active-pet');
      return 5;
    } else if (popupOpenCard[i].classList.contains('card-charly') && popupOpenCard[i].classList.contains('_active-pet')) {
      popupOpenCard[i].classList.remove('_active-pet');
      return 7;
    } else if (popupOpenCard[i].classList.contains('card-scarlett') && popupOpenCard[i].classList.contains('_active-pet')) {
      popupOpenCard[i].classList.remove('_active-pet');
      return 3;
    } else if (popupOpenCard[i].classList.contains('card-freddie') && popupOpenCard[i].classList.contains('_active-pet')) {
      popupOpenCard[i].classList.remove('_active-pet');
      return 6;
    }
  }
}