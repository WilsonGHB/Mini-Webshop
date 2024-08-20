document.addEventListener('DOMContentLoaded', function() {
    const aantalInputs = document.querySelectorAll('.aantal');
    const totaalElement = document.getElementById('totaal');
  
    function updateWinkelwagen() {
      let totaalBedrag = 0;
      aantalInputs.forEach(input => {
        const rij = input.closest('tr');
        const prijs = parseFloat(rij.querySelector('.prijs').innerText);
        const aantal = parseInt(input.value);
        const totaalItem = prijs * aantal;
        rij.querySelector('.totaal-item').innerText = totaalItem.toFixed(2);
        totaalBedrag += totaalItem;
      });
      totaalElement.innerText = totaalBedrag.toFixed(2);
    }
  
    aantalInputs.forEach(input => {
      input.addEventListener('change', updateWinkelwagen);
    });
  
    updateWinkelwagen(); // Update de winkelwagen bij het laden van de pagina
  });
  
  function addToCart(productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(productName + ' is toegevoegd aan de winkelwagen.');
}

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    let totalPrice = 0;
    cart.forEach(item => {
        let total = item.price * item.quantity;
        totalPrice += total;

        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>€${item.price.toFixed(2)}</td>
            <td><input type="number" value="${item.quantity}" min="1" onchange="updateQuantity('${item.name}', this.value)"></td>
            <td>€${total.toFixed(2)}</td>
        `;
        cartItems.appendChild(row);
    });

    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
}

function updateQuantity(productName, quantity) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let product = cart.find(item => item.name === productName);
    if (product) {
        product.quantity = parseInt(quantity);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function checkout() {
    alert('Afrekenen is nog niet geïmplementeerd.');
}

// Laad de winkelwagen bij het laden van de pagina
window.onload = function() {
    if (document.getElementById('cart-items')) {
        loadCart();
    }
};
