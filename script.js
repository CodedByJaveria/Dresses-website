let cart = [];

// 🛒 Add to Cart
function orderNow(itemName, price) {
  cart.push({ item: itemName, price: price });
  updateCartCount();
  alert(`${itemName} added to cart!`);
}

function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.length;
}

// 🌙 Dark Mode
const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  themeToggle.textContent = document.body.classList.contains("dark-mode")
    ? "☀️"
    : "🌙";
});

const searchBox = document.querySelector(".search-bar input");
const header = document.querySelector("header");
const allSections = document.querySelectorAll("section:not(.search-results)");
const sectionDisplayMap = new Map();
allSections.forEach(sec => {
  sectionDisplayMap.set(sec, getComputedStyle(sec).display);
});

let resultsSection = document.createElement("section");
resultsSection.className = "search-results";
resultsSection.style.display = "none";
resultsSection.innerHTML = `
  <h2>Search Results</h2>
  <div class="results-container product-container"></div>
`;
header.insertAdjacentElement("afterend", resultsSection);

const resultsContainer = resultsSection.querySelector(".results-container");
function getAllCards() {
  return [
    ...document.querySelectorAll(".arrival-card"),
    ...document.querySelectorAll(".product-card"),
    ...document.querySelectorAll(".category-card"),
  ];
}
searchBox.addEventListener("input", () => {
  let query = searchBox.value.toLowerCase().trim();
  resultsContainer.innerHTML = "";

  if (query.length > 0) {
    allSections.forEach(sec => (sec.style.display = "none"));
    resultsSection.style.display = "block";

    let matches = 0;
    getAllCards().forEach(card => {
      let name = card.querySelector("h3")?.innerText.toLowerCase() || "";
      let desc = card.querySelector("p")?.innerText.toLowerCase() || "";
      let alt = card.querySelector("img")?.alt.toLowerCase() || "";

      if (name.includes(query) || desc.includes(query) || alt.includes(query)) {
        let clonedCard = card.cloneNode(true);

        let btn = clonedCard.querySelector("button");
        if (btn) {
          let priceText =
            clonedCard.querySelector(".price")?.innerText ||
            clonedCard.querySelector("h5")?.innerText ||
            "0";
          let price = parseInt(priceText.replace(/[^\d]/g, "")) || 0;
          let itemName = clonedCard.querySelector("h3")?.innerText || "Item";

          btn.addEventListener("click", () => orderNow(itemName, price));
        }

        resultsContainer.appendChild(clonedCard);
        matches++;
      }
    });

    if (matches === 0) {
      resultsContainer.innerHTML = `<p style="text-align:center;color:#ff5722;font-weight:bold;margin-top:20px;">😞 No items found!</p>`;
    }
  } else {
  
    allSections.forEach(sec => {
      sec.style.display = sectionDisplayMap.get(sec);
    });
    resultsSection.style.display = "none";
  }
});
document.querySelectorAll(".product-card, .arrival-card").forEach(card => {
  let name = card.querySelector("h3")?.innerText || "Item";
  let priceText = card.querySelector(".price")?.innerText || "0";
  let price = parseInt(priceText.replace(/[^\d]/g, "")) || 0;

  let button = card.querySelector("button");
  if (button) {
    button.addEventListener("click", () => orderNow(name, price));
  }
});
const bannerImgs = document.querySelectorAll(".banner-img img");
let currentBanner = 0;

setInterval(() => {
  bannerImgs[currentBanner].classList.remove("active");
  currentBanner = (currentBanner + 1) % bannerImgs.length;
  bannerImgs[currentBanner].classList.add("active");
}, 2000); 

const shopNowBtns = document.querySelectorAll(".shop-now-btn");

shopNowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    let itemName = "Special Deal";
    let itemPrice = 4999; 

    cart.push({ item: itemName, price: itemPrice });
    updateCartCount();

    alert(`${itemName} added to cart!`);
  });
});

