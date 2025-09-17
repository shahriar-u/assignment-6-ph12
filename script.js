// category call from api

async function loadCategory() {
  try {
    const response = await fetch('https://openapi.programming-hero.com/api/categories');
    const data = await response.json();

    const categoryContainer = document.getElementById('category-container');
    data.categories.forEach(element => {
      const category = document.createElement('li');

      category.innerHTML = `
            <span id="${element.id}" class="category-item block hover:text-white hover:rounded-lg cursor-pointer p-2 w-[300px] hover:bg-[#15803D]">
            ${element.category_name}
            </span>
          `;
      categoryContainer.appendChild(category);
    });
    // active click 


    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
      item.addEventListener('click', (e) => {

        categoryItems.forEach(i => i.classList.remove('bg-[#15803D]', 'text-white'));

        item.classList.add('bg-[#15803D]', 'text-white', 'rounded-lg');
        loadCardsByCategory(e.target.id)
      });
    });
    // category wise cards 
    async function loadCardsByCategory(catId) {
      try {
        const response = await fetch(`https://openapi.programming-hero.com/api/category/${catId}`);
        const data = await response.json();
        console.log(data);
        const cardContainer = document.getElementById('card-container');
        cardContainer.innerHTML = "";
        data.plants.forEach(element => {
          const card = document.createElement('div')
          card.innerHTML = `
          <div class=" bg-white p-3 rounded-xl">
            <img class="h-[150px] w-full" src="${element.image}" alt="">
                        <h2 class="font-bold">${element.name}</h2>
                        <p class="text-xs text-[#425158]">${element.description}</p>
                        <div class="flex justify-between items-center my-2">
                            <h2 class="bg-[#DCFCE7] text-[#15803D] px-3 py-1 rounded-3xl">${element.category}</h2>
                            <p><span>৳</span>${element.price}</p>
                        </div>
                        <button class="btn btn-active bg-[#15803D] text-white w-full rounded-3xl">Add to Cart</button>
          </div>
          `
          cardContainer.appendChild(card);

        // event listener for cart functionality
          card.querySelector("button").addEventListener("click", () => {
            addToCart({
              name: element.name,
              price: element.price
            });
          });
        })
      }
      catch (error) {
        console.error(error)
      }
    }
  } catch (error) {
    console.error(error);
  }
}
loadCategory();

// load cards for home page
async function loadCards() {
  try {
    const response = await fetch('https://openapi.programming-hero.com/api/plants');
    const data = await response.json();

    const cardContainer = document.getElementById('card-container');
    data.plants.forEach(element => {
      const card = document.createElement('div')
      card.innerHTML = `
      <div class=" bg-white p-3 rounded-xl">
        <img class="h-[150px] w-full" src="${element.image}" alt="">
                    <h2 class="font-bold">${element.name}</h2>
                    <p class="text-xs text-[#425158]">${element.description}</p>
                    <div class="flex justify-between items-center my-2">
                        <h2 class="bg-[#DCFCE7] text-[#15803D] px-3 py-1 rounded-3xl">${element.category}</h2>
                        <p><span>৳</span>${element.price}</p>
                    </div>
                    <button class="btn btn-active bg-[#15803D] text-white w-full rounded-3xl">Add to Cart</button>
      </div>
      `
      cardContainer.appendChild(card);
      // event listener for cart functionality
      card.querySelector("button").addEventListener("click", () => {
        addToCart({
          name: element.name,
          price: element.price
        });
      });
    })
  }
  catch (error) {
    console.error(error);
  }
}

loadCards()


// cart functionality 


let cart = []; // to keep data in cart

function addToCart(tree) {
  cart.push(tree); 
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1); 
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById('cart-list');
  const cartTotal = document.getElementById('cart-total');

  cartList.innerHTML = ""; 

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const li = document.createElement('li');
    li.classList.add("flex", "justify-between", "items-center", "bg-white", "p-2", "rounded-md", "text-sm");

    li.innerHTML = `
      <div class="flex flex-col">
        <h1 class="font-bold">${item.name}</h1>
        <p>${item.price}</p>
      </div>
      <button class="hover:cursor-pointer text-red-600 font-bold">❌</button>
    `;

    li.querySelector("button").addEventListener("click", () => {
      removeFromCart(index);
    });

    cartList.appendChild(li);
  });

  cartTotal.textContent = total;
}