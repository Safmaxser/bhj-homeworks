const productList = document.querySelectorAll('.product');
const cartProducts = document.querySelector('.cart__products');
let cartObj = {};

productList.forEach(product => {
  const btnQuantityDec = product.querySelector('.product__quantity-control_dec');
  const btnQuantityInc = product.querySelector('.product__quantity-control_inc');
  const quantityValue = product.querySelector('.product__quantity-value');
  const btnProductAdd = product.querySelector('.product__add');
  let count;
  btnQuantityDec.addEventListener('click', () => {
    count = Number(quantityValue.innerText);
    if (count > 1) {
      quantityValue.innerText = count - 1;
    }
  });
  btnQuantityInc.addEventListener('click', () => {
    count = Number(quantityValue.innerText);
    quantityValue.innerText = count + 1;
  });

  btnProductAdd.addEventListener('click', () => {   
    const idList = Array.from(cartProducts.children, el => el.dataset.id);
    const findProduct = idList.indexOf(product.dataset.id);
    if (findProduct < 0) {    
      addProductToCart(idList.length, product.dataset.id, quantityValue.innerText);
    } else {
      changeProductToCart(findProduct, product.dataset.id, quantityValue.innerText);
    }
    quantityValue.innerText = 1;
  });
});

function addProductToCart(newNum, idProduct, countProduct) {
  const productCart = document.createElement('div');
  productCart.classList.add('cart__product');
  productCart.dataset.id = idProduct;
  const productCartImg = document.createElement('img');
  productCartImg.classList.add('cart__product-image');
  productCartImg.src = searchImageById(idProduct).src;
  productCartImg.alt = '';
  const productCartCount = document.createElement('div');
  productCartCount.classList.add('cart__product-count');
  productCartCount.innerText = countProduct;
  productCart.appendChild(productCartImg);
  productCart.appendChild(productCartCount);
  cartProducts.appendChild(productCart);   
  cartObj[newNum] = {
    id: idProduct,
    count: Number(countProduct),
  }
  localStorage.setItem("cart", JSON.stringify(cartObj));

  const removeProduct = document.createElement('img');
  removeProduct.src = 'remove.png';
  removeProduct.style.display = 'none';
  removeProduct.style.opacity = 0.7;
  removeProduct.style.cursor = 'pointer';
  productCart.appendChild(removeProduct);
  productCart.addEventListener('mouseover', () => {
    const leftImage = productCartImg.getBoundingClientRect().left;
    const topImage = productCartImg.getBoundingClientRect().top;
    const heightImage = productCartImg.getBoundingClientRect().height;
    const widthImage = productCartImg.getBoundingClientRect().width;
    removeProduct.style.position = 'fixed';
    removeProduct.style.display = 'block';
    removeProduct.style.left = `${leftImage}px`;
    removeProduct.style.top = `${topImage}px`;
    removeProduct.style.height = `${heightImage}px`;
    removeProduct.style.width = `${widthImage}px`;  
  });
  productCart.addEventListener('mouseout', () => {
    removeProduct.style.display = 'none';
  });

  removeProduct.addEventListener('click',() => {
    let newCartObj = {}
    let newCounter = 0;
    let counter = 0;
    let cartItem = cartObj[counter];
    while (cartItem) {
      if (counter !== newNum) {
        newCartObj[newCounter] = cartObj[counter];
        newCounter += 1;
      }
      counter += 1;
      cartItem = cartObj[counter];
    }
    cartObj = newCartObj;
    localStorage.setItem("cart", JSON.stringify(cartObj));
    productCart.remove();    
  });
}

function changeProductToCart(positionFound, idProduct, countProduct) {
  const productImage = searchImageById(idProduct);
  const currentProductCart = cartProducts.children[positionFound];
  const currentImage = currentProductCart.querySelector('img');
  const currentCount = currentProductCart.querySelector('.cart__product-count');
  const leftProductImage = productImage.getBoundingClientRect().left;
  const topProductImage = productImage.getBoundingClientRect().top;
  const leftCurrentImage = currentImage.getBoundingClientRect().left;
  const topCurrentImage = currentImage.getBoundingClientRect().top;
  const heightCurrentImage = currentImage.getBoundingClientRect().height;

  const productImageClone = productImage.cloneNode(false);
  productImageClone.style.position = 'fixed';
  productImageClone.style.left = `${leftProductImage}px`;
  productImageClone.style.top = `${topProductImage}px`;
  document.body.appendChild(productImageClone);     
  let NewCount = Number(currentCount.innerText) + Number(countProduct);
  setTimeout(() => {   
    productImageClone.style.transition = "all 500ms ease";  
    productImageClone.style.left = `${leftCurrentImage}px`;
    productImageClone.style.top = `${topCurrentImage}px`;
    productImageClone.style.height = `${heightCurrentImage}px`;
    productImageClone.style.opacity = 0.7;
    productImageClone.style.borderRadius = '50%';
    setTimeout(() => {
      productImageClone.remove();
      currentCount.innerText = NewCount;
    }, 500);        
  }, 100);
  cartObj[positionFound] = {
    id: currentProductCart.dataset.id,
    count: NewCount,
  }
  localStorage.setItem("cart", JSON.stringify(cartObj));
}

function searchImageById(idProduct) {    
  const arrayProducts = Array.from(productList, el => el.dataset.id);
  const foundNumber = arrayProducts.find(el => el === idProduct)-1;
  const foundProduct = productList[foundNumber];  
  return foundProduct.querySelector('.product__image');  
}

window.addEventListener('load', () => {
  const cartLS = JSON.parse(localStorage.getItem("cart"));
  let counter = 0;
  let cartItem = cartLS[counter];
  while (cartItem) {
    addProductToCart(counter, cartLS[counter].id, cartLS[counter].count);
    counter += 1;
    cartItem = cartLS[counter];
  }
});