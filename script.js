// category call from api

async function loadCategory() {
  try {
    const response = await fetch('https://openapi.programming-hero.com/api/categories');
    const data = await response.json();

    const categoryContainer = document.getElementById('category-container');
    data.categories.forEach(element => {
      const category = document.createElement('li');

      category.innerHTML = `
            <span id="${element.id}" class="category-item block hover:text-white hover:rounded-lg cursor-pointer p-2 w-full hover:bg-[#15803D]">
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
  } catch (error) {
    console.error(error);
  }
}
loadCategory();