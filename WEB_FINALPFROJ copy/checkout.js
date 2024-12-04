document.addEventListener('DOMContentLoaded', function () {
    loadCart();
});

function loadCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartTableBody = document.querySelector('#cart-table tbody');
    let totalPrice = 0;

    cartTableBody.innerHTML = ''; // Clear existing items

    cart.forEach(item => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price} Baht</td>
            <td>${item.price * item.quantity} Baht</td>
        `;
        cartTableBody.appendChild(row);
        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent = totalPrice;
}

function clearCart() {
    localStorage.removeItem('cart');
    loadCart();
}

function submitPayment() {
    const modal = document.getElementById('payment-modal');
    modal.style.display = 'block'; // Show the modal
    clearCart();
}

function closeModal() {
    const modal = document.getElementById('payment-modal');
    modal.style.display = 'none'; // Hide the modal
}
