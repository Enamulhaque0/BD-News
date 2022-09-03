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



const newsCategory = async (category_id)=>{
const res= await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
const data= await res.json()

const allData = data.data

displayCategory(allData)


  
}

const displayCategory = async(allData)=>{


  const cardContainer= document.getElementById("categories-card")
  cardContainer.textContent=""

  allData.forEach(data => {

  const {_id, total_view, thumbnail_url, details, author, title}= data

  const {name,img} = author

 const div = document.createElement("div")
 div.classList.add('d-flex' )
 div.classList.add('justify-content-center')

 div.innerHTML= `
 <div class="card mb-3" style="width: 800px; height: 232px;">
 <div class="row g-4">
   <div class="col-md-4">
     <img src="${thumbnail_url}" class=" w-75 rounded-start" alt="...">
   </div>
   <div class="col-md-8">
     <div class="card-body">
       <h5 class="card-title">${title.length > 45 ? title.slice(0, 45)+ '...' :title}</h5>
       <p class="card-text">${details.length > 150 ? details.slice(0, 150)+ '...' : details} </p>
       
       
       <div class="mt-5 d-flex justify-content-between align-items-center">

       <div class="d-flex align-items-center "> 
       <div>                    
       <div><img class="img-fluid" src="images/Avatar.png" alt=""></div>
       
       </div>

      <div> <p class="ms-3">${name}</p></div>
   
   </div>

         <p>${total_view ? total_view +"M" : "N/A"}</p>

       
        <button class="border-0 rounded-5">

         <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
             <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
           </svg>

        </button>

       </div>

     </div>
   </div>
 </div>
</div>
 
 
 
 `

 cardContainer.appendChild(div)

  
});

}