// opening & closing cart

let cart = document.querySelector('.cart')
let navCart = document.querySelector('.nav-cart')
let closeCart = document.querySelector('.close')
let listProductHTML = document.querySelector('.products-container')
let listCartHTML = document.querySelector('.cart-list')
let iconCartSpan = document.querySelector('.nav-cart span')

let listProducts = [];
let carts = [];

navCart.addEventListener('click', function(){
    cart.style.right= 0;
})

closeCart.addEventListener('click', function(){
    cart.style.right = '-400px';
})

// getting id of the product when button clicked

listProductHTML.addEventListener('click',(event)=>{
    let positionClick = event.target;
    if(positionClick.classList.contains('addtocart')){
        let productElement = positionClick.closest('.product');
        let product_id = productElement.dataset.id; 
        addToCart(product_id);

    }
})

// adding products to cats array

const addToCart = (product_id) =>{
    let positionThisProductInCart = carts.findIndex((value)=>value.product_id == product_id);//***//
    if(carts.length <=0){
        carts = [{
            product_id:product_id,
            quantity:1
        }]
    }else if(positionThisProductInCart < 0){
        carts.push({
            product_id:product_id,
            quantity:1
        })

    }else{
        carts[positionThisProductInCart].quantity = carts[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();

    addCartToMemory();
}



// adding carts list to HTML

const addCartToHTML = ()=>{
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalPrice = 0; 

    if (carts.length > 0){
        carts.forEach(cart =>{
            totalQuantity =totalQuantity+cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('item');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex((value)=> value.id == cart.product_id);
            let info = listProducts[positionProduct];
            let itemTotalPrice = info.price * cart.quantity; 

            totalPrice += itemTotalPrice;

          
            
            newCart.innerHTML = `
             <div>
                    <img src="${info.image}" alt="">
                </div>

                <div>
                    <p>${info.name}<p>
                    <p>₹${info.price}</p>
                </div>

                <div>
                    <div class="minus">-</div>
                    <div class="quantity">${cart.quantity}</div>
                    <div class="plus">+</div>
                </div>
            `;
            listCartHTML.appendChild(newCart)
        })
    }
    iconCartSpan.innerText = totalQuantity;

    document.querySelector('.total span:last-child').innerText = `₹${totalPrice}`;
}



// updating quantity when it is modified inside cart using plus and minus

listCartHTML.addEventListener('click',(event)=>{
    let positionClick =event.target;
    if(positionClick.classList.contains('minus')|| positionClick.classList.contains('plus')){
        let product_id = positionClick.closest('.item').dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus'
        }
        changeQuantity(product_id, type);
    } 
})

const changeQuantity =(product_id,type)=>{
    let positionItemInCart = carts.findIndex((value)=>value.product_id == product_id)//***//
    if(positionItemInCart >=0){
        switch (type) {
            case "plus":
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity +1;
                break;
        
            default:
                let valueChange = carts[positionItemInCart].quantity -1;
                if(valueChange > 0){
                    carts[positionItemInCart].quantity =valueChange;
                }else{
                    carts.splice(positionItemInCart, 1)
                }
                break;
        }
        addCartToHTML();
    }
}



// Search Functionality
const searchInput = document.getElementById('search-input');

searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = listProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );

    displayFilteredProducts(filteredProducts);
});

// Function to display filtered products
function displayFilteredProducts(filteredProducts) {
    productsDiv.innerHTML = '';

    if (filteredProducts.length > 0) {
        filteredProducts.forEach(product => {
            const productContainer = document.createElement('div');
            productContainer.classList.add('product');
            productContainer.dataset.id = product.id;
            productContainer.innerHTML = `
                <img class="product-image" src="${product.image}" alt="${product.name}">
                <p class="product-name"><strong>${product.name}</strong></p>
                <p class="product-price">Price: ₹${product.price}</p>
                <button class="addtocart">Add to Cart</button>
            `;
            productsDiv.appendChild(productContainer);
        });
    } else {
        productsDiv.innerHTML = '<p>No products found.</p>';
    }
}

