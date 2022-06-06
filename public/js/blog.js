const blogSubmit= document.querySelector("#form-submit");
const blogList= document.querySelector(".blogList");
async function fetchingData(){
    const response = await axios.get('/get-blogs');
    const data =  response.data;
    displayBlogList(data);
}

fetchingData();

blogSubmit.addEventListener('click',fetchingData);

function displayBlogList(data){

    const displayData= data.map((item)=>{
           return `<div class="col-md-4 col-12 mt-3">
           <div class="blog-card p-3">
               <div class="image">
                   <img src="https://images.pexels.com/photos/4331891/pexels-photo-4331891.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="">
               </div>
               <div class="d-flex justify-content-between mt-1 p-2">
                   <div class="name text-secondary">By Neeraj choubisa</div>
                   <div class="date text-danger">${item.createdAt}</div>
               </div>
               <div class="p-2 mt-1 content">
                   <h6 class="text-capitalize">${item.title}</h6>
               <p class="text-muted">
                ${item.description.substr(0,200)}...
               </p>
               </div>
               <div class="readmore px-4 py-1">
                    <a href="/blog/${item._id}">Read More</a>
               </div>
           </div>
       </div>`; 
    }).join("");

    blogList.innerHTML=displayData;

}