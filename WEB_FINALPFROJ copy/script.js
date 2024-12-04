document.addEventListener('DOMContentLoaded', () => {
  fetchProducts();
  const imageCollections = {
    "glasting-star-image": ["GS.jpeg","GS1.jpg", "GS2.jpg"],
    "cheekmyblush-image": ["Blush.jpeg", "CMB2.jpeg", "CMB1.jpeg"],
    "PND-image": ["PND.jpeg", "PND2.jpg", "PND.jpg"],
    "B2S-image": ["Back2School.jpeg", "B2S5.jpeg", "B2S7.jpeg"],
    "FT-image": ["Fluffy Touch.jpeg", "FT3.jpg","FT4.jpg"],
    "BBB-image": ["ButterBesties.jpeg","BBB9.jpg","BBB2.jpg"],
  };
  
  Object.keys(imageCollections).forEach(id => {
    const imgElement = document.getElementById(id);
    if (imgElement) {
      let currentIndex = 0;
      const images = imageCollections[id];
  
      const prevButton = document.createElement('button');
      prevButton.textContent = '<';
      prevButton.classList.add('prev-button');
      prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        imgElement.src = images[currentIndex];
      });
  
      const nextButton = document.createElement('button');
      nextButton.textContent = '>';
      nextButton.classList.add('next-button');
      nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        imgElement.src = images[currentIndex];
      });
  
      const container = document.createElement('div');
      container.classList.add('image-container');
      imgElement.parentNode.insertBefore(container, imgElement);
      container.appendChild(imgElement);
      container.appendChild(prevButton);
      container.appendChild(nextButton);
  
      container.addEventListener('mouseover', () => {
        prevButton.style.display = 'inline';
        nextButton.style.display = 'inline';
      });
  
      container.addEventListener('mouseout', () => {
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';
      });
    }
  });
});



  function fetchProducts() {
    fetch('https://api.example.com/products') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => {
        const productContainer = document.querySelector('.product-table tbody');
        productContainer.innerHTML = ''; // Clear existing content
  
        data.forEach(product => {
          const productRow = document.createElement('tr');
          productRow.innerHTML = `
            <td>${product.collection}</td>
            <td>${product.releaseDate}</td>
            <td>${product.category}</td>
            <td>${product.description}</td>
          `;
          productContainer.appendChild(productRow);
        });
      })
      .catch(error => console.error('Error fetching products:', error));
  }

        function scrollToNewSection() {
          document.getElementById('new').scrollIntoView({ behavior: 'smooth' });
        }




      document.getElementById('feedback-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form values
        const name = document.getElementById('name').value.trim();
        const contact = document.getElementById('contact').value.trim();
        const email = document.getElementById('email').value.trim();
        const date = document.getElementById('date').value.trim();
        const review = document.getElementById('review-text').value.trim();
        const errorMessage = document.getElementById('error-message');

        // Check if all fields are filled
        if (!name || !contact || !email || !date || !review) {
          errorMessage.textContent = 'Please fill out all fields.'; // Show error message if any field is empty
          showErrorModal(); // Call the showErrorModal function
        } else {
          errorMessage.textContent = ''; // Clear error message
          showModal(); // Show the modal
          document.getElementById('feedback-form').reset(); // Reset the form
        }
      });

      function showModal() {
        document.getElementById('feedback-modal').style.display = 'block';
      }

      function closeModal() {
        document.getElementById('feedback-modal').style.display = 'none';
      }

      function showErrorModal() {
        const fields = document.querySelectorAll('#feedback-form input, #feedback-form textarea');
        fields.forEach(field => {
          if (!field.value.trim()) {
            field.classList.add('shake');
            field.style.borderColor = 'red'; // Add red border color to the field
            // Remove the shake class after the animation completes
            setTimeout(() => {
              field.classList.remove('shake');
              field.style.borderColor = ''; // Reset the border color
            }, 500); // Adjust the timeout to match the duration of your shake animation
          }
        });
      }



function increaseQuantity(id) {
    let quantityInput = document.getElementById(id);
    quantityInput.value = parseInt(quantityInput.value) + 1;
  }

function decreaseQuantity(id) {
    let quantityInput = document.getElementById(id);
    if (quantityInput.value > 1) {
      quantityInput.value = parseInt(quantityInput.value) - 1;
    }
  }

function addToCart(productName, id, price) {
    let quantity = parseInt(document.getElementById(id).value);
    price = parseInt(price); // Ensure price is an integer
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let productIndex = cart.findIndex(item => item.name === productName);

    if (productIndex > -1) {
      cart[productIndex].quantity += quantity;
    } else {
      cart.push({ name: productName, quantity: quantity, price: price });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Added ${quantity} ${productName} to cart!`);
  }            


