const products = [
    {
        image: 'assets/images/image-waffle-desktop.jpg',
        type: 'Waffle',
        name: 'Waffle with Berries',
        price: 6.50,
        id: '001',
        thumbnail: 'assets/images/image-waffle-thumbnail.jpg'
    },
    {
        image: 'assets/images/image-creme-brulee-desktop.jpg',
        type: 'Crème Brûlée',
        name: 'Vanilla Bean Crème Brûlée',
        price: 7.00,
        id: '002',
        thumbnail: 'assets/images/image-creme-brulee-thumbnail.jpg',
    },
    {
        image: 'assets/images/image-macaron-desktop.jpg',
        type: 'Macaron',
        name: 'Macaron Mix of Five',
        price: 8.00,
        id: '003',
        thumbnail: 'assets/images/image-macaron-thumbnail.jpg'

    },
    {
        image: 'assets/images/image-tiramisu-desktop.jpg',
        type: 'Tiramisu',
        name: 'Classic Tiramisu',
        price: 5.50,
        id: '004',
        thumbnail: 'assets/images/image-tiramisu-thumbnail.jpg',
    },
    {
        image: 'assets/images/image-baklava-desktop.jpg',
        type: 'Baklava',
        name: 'Pistachio Baklava',
        price: 4.00,
        id: '005',
        thumbnail: 'assets/images/image-baklava-thumbnail.jpg'

    },
    {
        image: 'assets/images/image-meringue-desktop.jpg',
        type: 'Pie',
        name: 'Lemon Meringue Pie',
        price: 5.00,
        id: '006',
        thumbnail: 'assets/images/image-meringue-thumbnail.jpg',
    },
    {
        image: 'assets/images/image-brownie-desktop.jpg',
        type: 'Brownie',
        name: 'Salted Caramel Brownie',
        price: 4.50,
        id: '007',
        thumbnail: 'assets/images/image-brownie-thumbnail.jpg'
    },
    {
        image: 'assets/images/image-panna-cotta-desktop.jpg',
        type: 'Panna Cotta',
        name: 'Vanilla Panna Cotta',
        price: 6.50,
        id: '008',
        thumbnail: 'assets/images/image-panna-cotta-thumbnail.jpg'
    },
    {
        image: 'assets/images/image-cake-desktop.jpg',
        type: 'Cake',
        name: 'Red Velvet Cake',
        price: 4.50,
        id: '009',
        thumbnail: 'assets/images/image-cake-thumbnail.jpg'
    }
];


let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
        <div class="card">
          <img src="${product.image}" alt="">
          <div class="button-container">
            <button class="addtocart-btn" data-id="${product.id}">
                <div class="add-to-cart-items">
                    <img class="add-to-cart-icon" src="assets/images/icon-add-to-cart.svg" alt="">
                    <h4>Add to Cart</h4>
                </div>
            </button>
          </div><br>
          <small>${product.type}</small>
          <h2>${product.name}</h2>
          <p class="price">${product.price.toFixed(2)}</p>
        </div>
    `;
});



document.querySelector('.cards-grid-js').innerHTML = productsHTML;

const addtoCartBtns = document.querySelectorAll('.addtocart-btn');
let cart = [];

addtoCartBtns.forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.dataset.id;
        if (!cart.find(item => item.id === productId)) {
            const product = products.find(p => p.id === productId);
            cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                quantity: 1,
                thumbnail: product.thumbnail
            });
            
            calculateOrder();
            updateCartList();
            updateCartButton(button, productId);
            

        } else {
            console.log('Item already in cart');
        }
    });
});



function calculateOrder(){
    let itemPrice = 0
    let totalItemsQuantity = 0
    
    cart.forEach((item) =>{
        totalItemsQuantity += item.quantity;
        document.querySelector('.cart-items-quantity').innerHTML = `Your Cart (${totalItemsQuantity})`
        itemPrice += item.quantity*(item.price);
        document.querySelector('.total-order').innerHTML = `<h3>$${(itemPrice).toFixed(2)}</h3>`
        document.getElementById('totals-order').innerHTML = `<h3 id="totals-order">$${(itemPrice).toFixed(2)}</h3>`

    })
}






function updateCartList() {
    // cartItemsList.innerHTML = '';
    document.querySelector('.cart-items-list').innerHTML = ''
    document.querySelector('.total-order-cont').innerHTML = ''
    cart.forEach(item =>{
        const cartItemsList = document.querySelector('.cart-items-list');
        const confirmedContainer = document.querySelector('.total-order-cont');
    
        const cartItem = document.createElement('div');
        orderDetails = document.createElement('div');

        cartItem.classList.add('cart-item');
        orderDetails.classList.add('order-details')

        
        cartItemsList.appendChild(cartItem);
        confirmedContainer.appendChild(orderDetails);
        
        cartItem.innerHTML 
        += `        <div class="product-info">
                <h4>${item.name}</h4>
                <div class="item-info">
                <span>${item.quantity}x</span><p class="price-unit">@${item.price.toFixed(2)}</p><p class="total-price-item">$${(item.quantity*(item.price)).toFixed(2)}</p>
                </div>
            </div>
            <button class="delete-item">
                <div class="delete-items" data-id="${item.id}">
                    <img id="delete-icon" src="assets/images/icon-remove-item.svg" alt="">
                </div>
            </button>`


            orderDetails.innerHTML +=`              <div class="order-description-side">
          <div class="order-thumnail">
            <img src="${item.thumbnail}" alt="">
          </div>
          <div class="order-name-cost">
            <div class="order-name">
              <h4>${item.name}</h4>
            </div>
            <div class="order-price-unit">
              <span>${item.quantity}x</span>
              <p>@$${item.price.toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div class="order-price-unit">
          <p>$${(item.quantity*(item.price)).toFixed(2)}</p>
        </div>`

      

        });



    //     let cartlegth = cart.length
    // emptylist = document.querySelector('.cart-empty-content');
    // itemsList = document.querySelector('.cart-content');
    // if (cartlegth < 1){
    //     console.log('no items in the cart')

    //     emptylist.style.display = 'flex';
    //     itemsList.style.display = 'none';

    // }else if (cartlegth > 0){
    //     emptylist.style.display = 'none';
    //     itemsList.style.display = 'flex';

    // }
    document.querySelectorAll('.delete-item').forEach(button => {
        button.addEventListener('click', (event) => {
            const itemId = event.currentTarget.querySelector('div').getAttribute('data-id');
            console.log('Delete item with ID:', itemId);
            // Add your delete item logic here
            deleteItem(itemId);
            calculateOrder();
        });
    });       
}


function deleteItem(itemId) {
    // Remove the item from the cart array
    cart = cart.filter(item => item.id !== itemId);

    // Update the cart list display
    updateCartList();
}







startNewOrderBtn = document.getElementById('start-a-new-order-btn');
confirmOrderBtn = document.getElementById('confirm-order-btn');

startNewOrderBtn.addEventListener('click', () => {
    document.querySelector('.confirmed').style.display = 'none';
    
})

confirmOrderBtn.addEventListener('click', () => {
    document.querySelector('.confirmed').style.display = 'flex'
})



function updateCartButton(button, productId) {
    const cartItem = cart.find(item => item.id === productId);
    button.innerHTML = `
        <div class="decr-btn button-items">
            <img src="assets/images/icon-decrement-quantity.svg" class="button-items-icon" alt="">
        </div>
        <div class="cart-quantity quantity">${cartItem.quantity}</div>
        <div class="button-items incr-btn">
            <img src="assets/images/icon-increment-quantity.svg" class="button-items-icon" alt="">
        </div>
    `;
    button.style.background = 'var(--red)';
    button.style.justifyContent = 'space-between';
}









document.addEventListener('click', function(event) {
    if (event.target.closest('.incr-btn')) {
        const button = event.target.closest('.addtocart-btn');
        const productId = button.dataset.id;
        const cartItem = cart.find(item => item.id === productId);
        cartItem.quantity += 1;
        updateCartList();
        calculateOrder();
        updateCartButton(button, productId);
    } else if (event.target.closest('.decr-btn')) {
        updateCartList();
        calculateOrder();
        const button = event.target.closest('.addtocart-btn');
        const productId = button.dataset.id;
        const cartItem = cart.find(item => item.id === productId);
        cartItem.quantity -= 1;
        if (cartItem.quantity <= 0) {
            cart = cart.filter(item => item.id !== productId);
            resetCartButton(button);
        } else {
            updateCartButton(button);
        }
    }
});

function resetCartButton(button) {
    button.innerHTML = `
        <div class="add-to-cart-items">
            <img class="add-to-cart-icon" src="assets/images/icon-add-to-cart.svg" alt="">
            <h4>Add to Cart</h4>
        </div>
    `;
    button.style.background = 'white';
    button.style.justifyContent = 'center';
    document.querySelector('.cart-items-list').innerHTML = ''
}

