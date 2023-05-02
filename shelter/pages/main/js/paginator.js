const arrowForward = document.querySelector('.navigation__arrow-forward');
const cardsOnPage = document.querySelector(".container__wrapper-cards");
const cardStructure = document.querySelector(".wrapper-cards__card");
let defaultCard = cardStructure;

const countPets = 48;
let countPetsOnPage = 5
let countPages = Math.ceil(countPets / countPetsOnPage);

let windowHref = window.location.pathname;
console.log(windowHref);
function paginatorPets() {
  if (windowHref === `/shelter/pages/pets/index.html`) {
    // description = `../main/js/pets.json`;

    console.log(cardsOnPage);


  }
}

const arrMain = [];

arrowForward.addEventListener('click', nextStructure);

function pushingElementFirst() {
  let teken = [];
  let count = 8;
  for (let i = 0; i < count;) {
    let randomNumber = Math.floor(Math.random() * (0 - count) + count);
    if (arrMain.indexOf(randomNumber) === -1) {
      arrMain.push(randomNumber);
      i++;
    }
  }
}
pushingElementFirst();
console.log(arrMain);

function checkedWidth() {
  let windowSize = window.innerWidth;

  if (windowSize >= 1181 && windowSize >= 1280) {
    return 8;
  } else if (windowSize <= 1180 && windowSize >= 731) {
    return 6;
  } else if (windowSize <= 730) {
    return 2;
  }
}

function addCard() {
  let arrTeken = [];
  let newCard = checkedWidth();
  if (newCard === 8) {
    pushNextElement(newCard, arrTeken);
  } else if (newCard === 6) {
    arrTeken.push(arrMain[(arrMain.length - 1)]);
    arrTeken.push(arrMain[(arrMain.length - 2)]);
    pushNextElement(newCard, arrTeken);
  } else if (newCard === 2) {
    pushNextElement(newCard, arrTeken);
  }
  console.log(arrMain);

}

function pushNextElement(newCard, arrTeken) {
  for (let i = 0; i < newCard;) {
    let randomNum = Math.floor(Math.random() * (0 - 8) + 8);
    if (arrMain.length === 48) {
      i = newCard;
    } else if (arrTeken.indexOf(randomNum) === -1) {
      arrTeken.push(randomNum);
      arrMain.push(randomNum);
      i++;
    }
  }
  arrTeken = [];
}

function deleteCardsReloadPage() {
  cardsOnPage.innerHTML = '';
}

async function initialStucture() {
  let quantity = checkedWidth();
  for (let i = 0; i < quantity; i++) {
    let card = document.createElement("div");
    card.classList.add('wrapper-cards__card');
    card.innerHTML = defaultCard.innerHTML;
    let imgPets = card.children[0];
    let namePets = card.children[1];
    imgPets.classList.remove('image-katrine');
    cardsOnPage.appendChild(card);
    const description = `../main/js/pets.json`;
    await fetch(description).then(res => res.json()).then(pets => {
      let cardId = arrMain[i];
      card.classList.add(`${pets[cardId].class}`);
      imgPets.classList.add(`${pets[cardId].imgClass}`);
      namePets.textContent = `${pets[cardId].name}`;
    });
  }
}

deleteCardsReloadPage();
initialStucture();

function nextStructure() {
  addCard();
  const allCardsOnPage = document.querySelectorAll(".wrapper-cards__card");

  allCardsOnPage.forEach(element => {
    element.style.display = 'none';
  });
  let widthNewCard = checkedWidth();
  let allCardsOnPageLength = allCardsOnPage.length;
  let n;
  for (let j = 0; j < widthNewCard; j++) {
    n = allCardsOnPageLength - 1 - j;
    console.log(allCardsOnPage, allCardsOnPageLength, n)
    allCardsOnPage.children[n];
  }
}
