window.addEventListener('DOMContentLoaded', () => {
    const cartWrapper = document.querySelector('.cart__wrapper'),
        cart = document.querySelector('.cart'),
        close = document.querySelector('.cart__close'), // for closing cross
        open = document.querySelector('#cart'),
        goodsBtn = document.querySelectorAll('.goods__btn'),
        products = document.querySelectorAll('.goods__item'),
        confirm = document.querySelector('.confirm'),
        badge = document.querySelector('.nav__badge'), // quantity of goods
        totalCost = document.querySelector('.cart_total > span'),
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
                empty.remove();

            }
            
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
    function showConfirm () {
        confirm.style.display = 'block';
        let counter = 100;
        const id = setInterval(frame, 10);

        function frame() {
            if ( counter == 10) {
                clearInterval(id);
                confirm.style.display = 'none';
            } else {
                counter--;
                confirm.style.transform = `translateY(-${counter}px)`;
                confirm.style.opacity = '.' + counter;
            }
            

        }

    }


      
    
    


});


