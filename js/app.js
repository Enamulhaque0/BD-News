const loadAllcategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const data = await res.json();

  return data.data.news_category;
};

const categoryDisplay = async () => {
const data = await loadAllcategory();

const ulContainer = document.getElementById("category-container");

data.forEach((category) => {
  const {category_name}= category
    
  const li = document.createElement('li')

  li.innerHTML=`
  <a class="px-4 text-secondary" href="#">${category_name}</a>
  
  `
  ulContainer.appendChild(li)
  });

};

categoryDisplay();
