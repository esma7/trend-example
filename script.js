
const slider = document.querySelector(".slider");
const li = document.querySelectorAll("li");
const searchArea = document.getElementById("searchProduct")
const next = document.getElementById("next");
const prev = document.getElementById("prev");

let index = 0;

function moveSlide() {
    slider.style.transform = `translateX(-${index * 100}%)`
}

function nextFunc() {
    if (index === 2) {
        index = 0;
        moveSlide()

    } else if (index === 1) {
        slider.style.transform = `translateX(-${index * 135}%)`
        index++;

    } else {
        index++;
        moveSlide()
    }
}

next.addEventListener("click", nextFunc);

function prevFunc() {
    if (index === 0) {
        index = 2;
        slider.style.transform = `translateX(-${index * 68}%)`
    } else {
        index--;
        moveSlide()
    }
}

prev.addEventListener("click", prevFunc)


function getData(filteredData) {
    let products = document.querySelector(".products");
   products.innerHTML = ""
   const dataToDisplay = filteredData || [];

   dataToDisplay.forEach((item) => {
    products.innerHTML += `
            <div class="product-item">
             <div class="favIcon"><i class="fa-regular fa-heart"></i></div>
            <img src="${item.image}" alt="">
            <p><span><b>${item.title}</b></span></p>
            <div class="rated">
                <span>4.6 </span>
                <div class="star">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-regular fa-star-half-stroke"></i>
                </div>
                <h5>(6432)</h5>
            </div>
            <h4>${item.price} Azn</h4>
        </div>          
            `
})
}

getData()

function searchProduct() {
    
    axios.get("https://fakestoreapi.com/products")
        .then((res) => {
            let data = res.data;
            getData(data)  
            searchArea.addEventListener("input", (e) => {
                let value = e.target.value.trim();
                const filtered = data.filter((item)=>{
                    return item.title.toUpperCase().includes(value.toUpperCase())
                })
        
                getData(filtered)
            })         
        })
    
}
searchProduct()



