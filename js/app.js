


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
     <a  class="px-4  text-secondary" href="#" onclick="newsCategory('${category_id}')">${category_name}</a>
  
  `
  ulContainer.appendChild(li)
  
  });

};

categoriesDisplay();



const newsCategory = async (category_id)=>{

  const spinner = document.getElementById('spinner-container')
  spinner.classList.remove("d-none")

const res= await fetch(`https://openapi.programming-hero.com/api/news/category/${category_id}`)
const data= await res.json()

const allData = data.data
displayCategory(allData)
}


const displayCategory = async(allData)=>{
let foundIteam = allData.length

const iteam = document.getElementById("found-iteam")
iteam.innerText= foundIteam

const cardContainer= document.getElementById("categories-card")
const spinner = document.getElementById('spinner-container')
spinner.classList.add("d-none")
cardContainer.textContent="";


allData.forEach(data => {
const {_id, total_view, details, author, title, image_url}= data
const {name,img,published_date} = author
const div = document.createElement("div")
 div.classList.add("col")

 div.innerHTML= `
 <div class="card mt-5 mb-4">
            <div class="row">

                    <div class="col-md-4">
                        <img src="${image_url}" class="img-fluid rounded-start h-100" alt="...">
                    </div>   

                    <div class="col-md-8">
                        <div class="card-body p-4">
                            <h5 class="card-title">${title.length > 60 ? title.slice(0, 60)+ '...' :title}</h5>
                            <p class="card-text">${details.length > 350 ? details.slice(0, 350)+ '...' : details}</p>

                            <div class="d-flex justify-content-between align-items-center mt-3">
                                    <img class="author-img" src="${img}">
                                    <div class="ps-2">
                                        <p>${name ? name  : "N/A"}</p>

                                        <p>${published_date}</p>
                                    </div>
                                <p>${total_view ? total_view : "N/A"}</P>
                                
                                <button onclick="newsDetails('${_id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                               Details
                                   </button>
                              
                            </div>
                            
                        <div>
                    </div>
    </div>

 
 
 
 `

 cardContainer.appendChild(div)
 
 
 
}  ) 


  
}



const newsDetails= async (_id)=>{
  const res= await fetch(`https://openapi.programming-hero.com/api/news/${_id}`)

  const data =  await res.json()
  
  const allData = data.data

displayNewsDetails(allData)


}


const displayNewsDetails = async (allData) =>{
 
  

   const data = allData.forEach(data=>{

    const {total_view, author,thumbnail_url,}= data
    const {name,published_date, img} = author
    
    // console.log(total_view)

    const modalBody= document.getElementById('modal-iteam')

    modalBody.innerHTML= `
    
    <div class="p-4">
            <div class="d-flex align-items-center justify-content-between">
                <p>Author : ${name  ? name  : "N/A"}</p>
                <img class="author-image" src="${img}">
            </div>
            <p>Total View : ${total_view   ? total_view  : "N/A"}</p>
            <p>Publish Date : ${published_date.length >10 ? published_date.slice(0,11): published_date}</p>
        </div>
    
    `
   })

  

}

