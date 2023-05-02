import { openPopupWindow, closePopupWindow, closePopupWindowWithBgc, getDescriptionPopup, classPetsCheck, popupOpenCard } from './popup.js';
const standardWrapperCard = document.querySelector('.wrapper-cards__card');

const wrapperCardsSliderPets = document.querySelector('.slider-pets__inner-wrapper');
const petsArrow = document.querySelector('.slider-pets__arrow');
const arrowLeft = document.querySelector('.arrow-left');
const arrowRight = document.querySelector('.arrow-right');

const secTimeSlider = 3.5;
const msecTimeSlider = secTimeSlider * 1000;

const arrCardNumbers = [1, 3, 5, 6, 7];
const arrCardNumbersOnPage = [4, 0, 2];

let direction = '';

export function checkWindowSize() {
  let windowSize = window.innerWidth;

  if (windowSize >= 1105) {
    return 3;
  } else if (windowSize >= 749 && windowSize <= 1104) {
    return 2;
  } else if (windowSize <= 748) {
    return 1;
  }
}

export async function cardGenerator(direction) {
  let numberCardsQuantity = checkWindowSize();

  for (let i = 0; i < numberCardsQuantity; i++) {
    let card = document.createElement("div");

    card.classList.add('wrapper-cards__card');
    card.innerHTML = standardWrapperCard.innerHTML;

    let imgPets = card.children[0];
    let namePets = card.children[1];

    imgPets.classList.remove('image-katrine');

    let numberRandom = numberGenerator(0, arrCardNumbers.length - 1);
    let cardId = arrCardNumbers[numberRandom];

    arrCardNumbers.splice(numberRandom, 1);
    arrCardNumbersOnPage.push(cardId);

    const description = `./js/pets.json`;

    await fetch(description).then(res => res.json()).then(pets => {
      card.classList.add(`${pets[cardId].class}`);
      imgPets.classList.add(`${pets[cardId].imgClass}`);
      namePets.textContent = `${pets[cardId].name}`;
    });

    if (direction === 'left') {
      wrapperCardsSliderPets.appendChild(card);
    } else if (direction === 'right') {
      wrapperCardsSliderPets.prepend(card);
    }
  }

  let wrapperCards = document.querySelectorAll('.wrapper-cards__card');
  openPopupWindow(wrapperCards);

  if (direction === 'left') {
    wrapperCardsSliderPets.style.transition = `transform ${secTimeSlider}s ease`;
    wrapperCardsSliderPets.style.transform = `translateX(-${getDivWidth() - 25}px)`;
    setTimeout(() => {
      wrapperCardsSliderPets.style.transition = ``;
      wrapperCardsSliderPets.style.transform = `translateX(0px)`;
    }, msecTimeSlider);
  } else if (direction === 'right') {
    wrapperCardsSliderPets.style.transform = `translateX(-${getDivWidth() - 25}px)`;
    setTimeout(() => {
      wrapperCardsSliderPets.style.transition = `transform ${secTimeSlider}s ease`;
      wrapperCardsSliderPets.style.transform = 'translateX(0)';

    }, 10);
    wrapperCardsSliderPets.style.transition = ``;
  }
  ///
  arrCardNumbers.push(arrCardNumbersOnPage[0], arrCardNumbersOnPage[1], arrCardNumbersOnPage[2]);
  arrCardNumbersOnPage.splice(0, numberCardsQuantity);
}
closePopupWindow();
closePopupWindowWithBgc();

classPetsCheck();
getDescriptionPopup();

export function getDivWidth() {
  return wrapperCardsSliderPets.clientWidth;
}

export function numberGenerator(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

arrowLeft.addEventListener('click', clickLeft);
arrowRight.addEventListener('click', clickRight);

export async function clickLeft() {
  direction = 'left';
  cardGenerator(direction);
  setTimeout(() => {
    deleteCardsLeft();
  }, msecTimeSlider);
}

export async function clickRight() {
  direction = 'right';
  cardGenerator(direction);
  setTimeout(() => {
    deleteCardsRight();
  }, msecTimeSlider);
}

export async function deleteCardsRight() {
  let cardNum = checkWindowSize();
  let cardList = document.querySelector('.slider-pets__inner-wrapper');
  for (let i = 0; i < cardNum; i++) {
    const lastChild = cardList.lastElementChild;
    if (lastChild) {
      await new Promise(resolve => setTimeout(resolve, 0));
      lastChild.remove();
    }
  }
}

export async function deleteCardsLeft() {
  let cardNum = checkWindowSize();
  let cardList = document.querySelector('.slider-pets__inner-wrapper');
  for (let i = 0; i < cardNum; i++) {
    const firstChild = cardList.firstElementChild;
    if (firstChild) {
      await new Promise(resolve => setTimeout(resolve, 0));
      firstChild.remove();
    }
  }
}