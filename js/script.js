window.addEventListener('DOMContentLoaded', () => {

    const cartWrapper = document.querySelector('.cart__wrapper'),
        cart = document.querySelector('.cart'),
        close = document.querySelector('.cart__close'), // for closing cross
        open = document.querySelector('#cart'),
        goodsBtn = document.querySelectorAll('.goods__btn'),
        products = document.querySelectorAll('.goods__item'),
        confirm = document.querySelector('.confirm'),
        badge = document.querySelector('.nav__badge'), // quantity of goods
        totalCost = document.querySelector('.cart__total > span'),
        titles = document.querySelectorAll('.goods__title');
  
        function openCart() {
        cart.style.display = 'block';
        document.body.style.overflow = 'hidden'; // closes other page elements
        }

        function closeCart() {
        cart.style.display = 'none';
        document.body.style.overflow = '';
        }

        open.addEventListener('click', openCart);
        close.addEventListener('click', closeCart);

            goodsBtn.forEach(function(btn, i) {
            btn.addEventListener('click', () => {
                let item = products[i].cloneNode(true),
                    trigger = item.querySelector('button'),
                    removeBtn = document.createElement('div'),
                    empty = cartWrapper.querySelector('.empty');
                
                trigger.remove();

                showConfirm(); // shopping cart 

                
        
                removeBtn.classList.add('goods__item-remove');
                removeBtn.innerHTML = '&times'; 
                item.appendChild(removeBtn);
                
                cartWrapper.appendChild(item);
                if (empty) {
                    empty.style.display = 'none';

                }

                calcGoods(); // display the quantity of goods in the red badge
                calcTotal(); // calculation of the amount of goods
                removeFromCart(); // func remove item
            
                
            });
        });

        // function to reduce information about the product 
        function sliceTitle() {
            titles.forEach(function(item){
                if (item.textContent.length < 60) {
                    return;

                } else { 
                    const str = item.textContent.slice(0, 61) + '...';
                    //const str = `${item.textContent.slice(0, 61)}...`;
                    item.textContent = str;
                }
            });
        }
        sliceTitle();

        // function to create a shopping cart 
        function showConfirm() {
            confirm.style.display = 'block';
            let counter = 100;
            const id = setInterval(frame, 10);

            function frame() {
                if ( counter == 10) {
                    clearInterval(id);
                    confirm.style.display = 'none';
                } else {
                    counter--;
                    
                    confirm.style.opacity = '.' + counter;
                    confirm.style.transform = `translateY(-${counter}px)`;
                }
                

            }

        }
        // function to display the quantity of goods in the shopping cart in the badge
        function calcGoods() {
            const items = cartWrapper.querySelectorAll('.goods__item');
            badge.textContent =  items.length;
        }

        //function to calculate the amount of goods in the shopping cart
        function calcTotal() {
            const prices = document.querySelectorAll('.cart__wrapper > .goods__item > .goods__price > span');
            let total = 0;
            prices.forEach(function(item) {
                total += +item.textContent; // convert string to number 
            });
            totalCost.textContent = total;
    
        }
        // a function that removes an item from the cart and calculates the final amount
        function removeFromCart() {
           const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
           removeBtn.forEach(function(btn) {
               btn.addEventListener('click', () => {
                    btn.parentElement.remove();
                    calcGoods();
                    calcTotal();

                    // return label your cart is empty after removing all items from the cart
                    let i = document.querySelectorAll('.cart__wrapper > .goods__item');
                    if (i.length === 0) {
                        let empty = cartWrapper.querySelector('.empty');
                        empty.style.display = 'block';

                    }
               });
           });
        }
});
//function to load data from json file
const loadContent = (url) => {
    fetch(url) // Promis
        .then(response => response.json())
        .then(json => createElement(json.goods));


}
// function of dynamic crete of products on the page through the server
function createElement(arr) {
    const goodsWrapper = document.querySelector('.goods__wrapper');

    arr.forEach(function(item) {
        let card = document.createElement('div');
        card.classList.add('goods__item');
        card.innerHTML = `
            <img class="goods__img" src="${item.url}" alt="phone">
            <div class="goods__colors">Доступно цветов: 4</div>
            <div class="goods__title">
                ${item.title}
            </div>
            <div class="goods__price">
                <span>${item.price}</span> руб/шт
            </div>
            <button class="goods__btn">Добавить в корзину</button>
        
        `;
        goodsWrapper.appendChild(card);
    });
}

loadContent('js/db.json');






