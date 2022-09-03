const loadAllCategories = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/news/categories"
  );
  const data = await res.json();
  return data.data.news_category;
};

const categoriesDisplay = async () => {
const data = await loadAllCategories();

const ulContainer = document.getElementById("categories-container");

data.forEach((categories) => {
  const {category_name, category_id}= categories
  



  const li = document.createElement('li')
  li.innerHTML=`
     <a  class="px-4 text-secondary" href="#" onclick="newsCategory('${category_id}')">${category_name}</a>
  
  `
  ulContainer.appendChild(li)
  });

};

categoriesDisplay();



const newsCategory =async (id)=>{
const res= await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
const data= await res.json()

return data.data
}

const displayCategory = async() =>{

    const data= await newsCategory()
    
    data.forEach(category =>{ 
     const {news_id,}=category


        })


}