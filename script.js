const productsContainer = document.querySelector(".products-container")
const popOut = document.querySelector("#popUp")
const countDown = document.querySelector("#countdown")
const searchBtn = document.querySelector("#search-btn")


let countDownDate = new Date();
            countDownDate.setHours(countDownDate.getHours() + 17)
        
            let x = setInterval(function() {
            // Get today's date and time
            
            // Find the distance between now and the count down date
            let now = new Date().getTime();
   
            let countDownTime = countDownDate - now
            
            // Time calculations for days, hours, minutes, and seconds
                            
                let hours = Math.floor(countDownTime /(1000 * 60 * 60));
                let minutes = Math.floor((countDownTime % (1000 * 60 * 60)) / (1000 * 60));
                let seconds = Math.floor((countDownTime % (1000 * 60)) / 1000);

            // Display the result in the element with id="demo"
            countDown.innerText = hours + "h " + minutes + "m " + seconds + "s ";
    
            // If the count down is finished, write some text
            if (countDownTime < 0) {
                clearInterval(x);
                countDown.innerHTML = "EXPIRED";
            }
    

            
        }, 1000);

        
const popUp = () => {
    if(popOut.style.display === "none"){
        popOut.style.display = "block"
    } else{
        popOut.style.display = "none"
    }
}

const productsApi = async () => {
const res = await fetch("https://fakestoreapi.com/products")
const data = await res.json()

// console.log(data[0])

productsContainer.innerHTML = data.map(({id, title, price, description, category, image, rating }, index) => {

    return(
        `<div class="products-info">
        <p><img src="logos/white-medium-star.svg" width="16" height="16" alt="" srcset=""><span>${title}</span></p>
        <span>${category}</span>
        <span>${price}</span>
        <button type="button" data-detailName='my-detail' onclick='fetchDetail(${id})' id="${index}">View product</button>
        <hr>
        </div>`
    )
}).join("")


}

const fetchDetail = async (params) => {
// console.log(params)
const res = await fetch(`https://fakestoreapi.com/products/${params}`)
const data = await res.json()
 const {title, price, description, category, image, rating:{rate, count} } =  data

const productTitle = document.querySelector("#title")
const productPrice = document.querySelector(".price")
const productDescription = document.querySelector(".description")
const productImageUrl = document.querySelector("#productpic")
const ratings = document.querySelector(".verified")
const brand = document.querySelector("#category");
const slashedPrice = document.querySelector("#slashed-price")


productTitle.innerText = title
productPrice.innerText = `N${price}`
productDescription.innerText = description
productImageUrl.src = image
ratings.innerText = `${rate} verified ratings`
brand.innerText = category
const reducedPriced = price + (0.29 * price)
slashedPrice.innerText = `N${reducedPriced.toFixed(2)}`
}

// searchAPI()

productsApi()


searchBtn.addEventListener("click", () => {
    const searchInput = document.querySelector("#search")
    
    fetchDetail(searchInput.value)
    // console.log(e.target.value)
})
// fakeapi()