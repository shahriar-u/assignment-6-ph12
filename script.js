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
    } catch (error) {
    console.error(error);
  }
}
loadCategory();