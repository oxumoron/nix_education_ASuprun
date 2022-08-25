import {items} from './items.js';

const products = document.getElementById('products');
const productWrapper = document.querySelector('li.product__wrapper');

const newName = document.getElementById('product__name');
const newImage = document.getElementById('product__photo');
const newOrders = document.getElementById('product__orders');
const newPrice = document.getElementById('product__price');
const newReviews = document.getElementById('product__reviews');
const newStock = document.getElementById('product__stock');
const like = document.getElementById('like');
like.addEventListener('click', (filled) => like.classList.toggle('filled'));
// console.log(like);

items.forEach((el) => {
  let newCard = document.createElement("li");
  newCard.classList = "product__wrapper";
  newImage.src = `./img/${el.imgUrl}`;
  newName.textContent = el.name;
  newStock.textContent = el.orderInfo.inStock;
  // if(+newStock.textContent === 0){
  //   newStock.classList.add('nostock')
  // }
  newPrice.textContent = el.price;
  newOrders.textContent = Math.floor(300 + 700 * Math.random());
  newReviews.textContent = el.orderInfo.reviews;
  newCard.innerHTML = productWrapper.innerHTML;
  products.appendChild(newCard);
});


const colList = document.getElementById('color-cat__list');
const memList = document.getElementById('memory-cat__list');
const osList = document.getElementById('os-cat__list');


let colorAll = [];
let memoryAll = [];
let osAll = [];

items.map(item => {
  colorAll.push(...item.color);
  memoryAll.push(item.storage);
  osAll.push(item.os)
})

colorAll = [... new Set(colorAll)];
memoryAll = [... new Set(memoryAll)];
osAll = [... new Set(osAll)];
// const newResult = new Set(result)

colorAll.map(elem => {
  let newCol = document.createElement("li");
      newCol.classList.add('cat__item');
      newCol.innerHTML = `
          <label class="item__label" for="${elem}">${elem}</label>
          <input class="item__check" type="checkbox" id="${elem}">
      `

      colList.appendChild(newCol);
});

memoryAll.map(elem => {
  let newMem = document.createElement("li");
      newMem.classList.add('cat__item');
      newMem.innerHTML = `
          <label class="item__label" for="${elem}">${elem}</label>
          <input class="item__check" type="checkbox" id="${elem}">
      `

      memList.appendChild(newMem);
});

osAll.map(elem => {
  let newOs = document.createElement("li");
      newOs.classList.add('cat__item');
      newOs.innerHTML = `
          <label class="item__label" for="${elem}">${elem}</label>
          <input class="item__check" type="checkbox" id="${elem}">
      `

      osList.appendChild(newOs);
});

// console.log(colorAll);


// console.log(newStock.textContent);

// if (localStorage.prompt1) {
//   document.getElementById('input').value = localStorage.prompt1;
// }else{
//   localStorage.prompt1
// }
// localStorage.prompt1 = prompt('Enter user name')

// let result = new Promise((resolve, reject) => {
   
//   setTimeout(() => {
//        resolve(value);
//      else
//        reject(value);
//    }, 1000);
//   });
  
//   result
//     .then(result => console.log('Success: ', result))
//     .catch(error => console.log('Error: ', error))
//     .finally(() => console.log('JavaScript Promise finished'));