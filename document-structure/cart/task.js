const productList = document.querySelectorAll('.product');
const cartProducts = document.querySelector('.cart__products');
const keyStorage = 'cartList';
const dataList = [];

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
    const productImage = product.querySelector('.product__image'); 
    const idList = Array.from(cartProducts.children, el => el.dataset.id);
    const findProduct = idList.indexOf(product.dataset.id);
    if (findProduct < 0) {    
      addProductToCart(product.dataset.id, productImage.src, quantityValue.innerText);
      localStorage.setItem(keyStorage, JSON.stringify(dataList));
    } else {
      changeProductToCart(productImage, findProduct, product.dataset.id, quantityValue.innerText);
    }
    quantityValue.innerText = 1;
  });
});

function addProductToCart(idProduct, srcImage, countProduct) {
  dataList.push({
    id: idProduct,
    srcImg: srcImage,
    count: Number(countProduct),
  });   
  
  cartProducts.insertAdjacentHTML('beforeEnd', `
    <div class="cart__product" data-id="${idProduct}">
      <img class="cart__product-image" src="${srcImage}">
      <div class="cart__product-count">${countProduct}</div>
    </div>
    `);
  const productCart = cartProducts.lastElementChild;
  const productCartImg = productCart.querySelector('.cart__product-image');
  const removeProduct = productCartImg.cloneNode(false);
  productCart.appendChild(removeProduct); 
  removeProduct.src = 'remove.png';
  removeProduct.style.cssText = `display: none; opacity: 0.7; cursor: pointer;
    position: absolute; margin-top: ${-productCartImg.offsetHeight}px;`;

  productCart.addEventListener('mouseover', () => {
    removeProduct.style.display = 'block';
  });
  productCart.addEventListener('mouseout', () => {
    removeProduct.style.display = 'none';
  });
  removeProduct.addEventListener('click',() => {
    const idList = Array.from(cartProducts.children, el => el.dataset.id);
    const findProduct = idList.indexOf(idProduct);
    dataList.splice(findProduct, 1);
    localStorage.setItem(keyStorage, JSON.stringify(dataList));
    productCart.remove();    
  });
}

function changeProductToCart(productImage, positionFound, idProduct, countProduct) {
  const currentProductCart = cartProducts.children[positionFound];
  const currentImage = currentProductCart.querySelector('img');
  const currentCount = currentProductCart.querySelector('.cart__product-count');
  const leftProductImage = productImage.getBoundingClientRect().left;
  const topProductImage = productImage.getBoundingClientRect().top;
  const leftCurrentImage = currentImage.getBoundingClientRect().left;
  const topCurrentImage = currentImage.getBoundingClientRect().top;
  const heightCurrentImage = currentImage.getBoundingClientRect().height;

  const imagePlay = productImage.cloneNode(false);
  document.body.appendChild(imagePlay);    
  imagePlay.style.cssText = `position: fixed; left: ${leftProductImage}px; top: ${topProductImage}px;`     
  let NewCount = Number(currentCount.innerText) + Number(countProduct);
  setTimeout(() => {  
    imagePlay.style.cssText += `transition: all 500ms ease; opacity: 0.7; border-radius: 50%;
      left: ${leftCurrentImage}px; top: ${topCurrentImage}px; height: ${heightCurrentImage}px;`;
    setTimeout(() => {
      imagePlay.remove();
      currentCount.innerText = NewCount;
    }, 500);        
  }, 100);
  dataList.splice(positionFound, 1, {
    id: idProduct,
    srcImg: productImage.src,
    count: NewCount,
  });
  localStorage.setItem(keyStorage, JSON.stringify(dataList));
}

window.addEventListener('load', () => {
  dataList.length = 0;
  const cartStorage = JSON.parse(localStorage.getItem(keyStorage));
  if (cartStorage?.length) {    
    cartStorage.forEach(productItem => {
      addProductToCart(productItem.id, productItem.srcImg, productItem.count);
    });
  }
});