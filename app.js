//global variable
const petCardContainer = document.getElementById("pet-card-container");
const likedPetContainer = document.getElementById("liked-pet-container");
const sortBtn = document.getElementById("sort-btn");

//Categoty button loaded
async function loadCategory() {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/peddy/categories"
    );
    const data = await res.json();
    displayCategoryBtn(data.categories);
  } catch (error) {
    console.log(error);
  }
}
//Pet card loaded
async function loadPetCard() {
  try {
    petCardContainer.classList.add("hidden");
    const loader = document.getElementById("loader");
    loader.classList.add(
      "grid",
      "place-items-center",
      "h-[50vh]",
      "w-[100%]",
      "xl:w-[75%]"
    );
    loader.classList.remove("hidden");
    const res = await fetch(
      "https://openapi.programming-hero.com/api/peddy/pets"
    );
    const data = await res.json();

    await new Promise((resolve) => setTimeout(resolve, 3000));
    loader.classList.remove(
      "grid",
      "place-items-center",
      "h-[50vh]",
      "w-[75%]"
    );
    loader.classList.add("hidden");
    petCardContainer.classList.remove("hidden");

    displayPetCard(data.pets);
    //sort button work
    sortBtn.addEventListener("click", () => {
      data.pets.sort((a, b) => b.price - a.price);
      petCardContainer.innerHTML = "";
      displayPetCard(data.pets);
    });
  } catch (error) {
    console.log(error);
  }
}

//loaded pet card category wised
async function loadPetCardByCategory(petname) {
  try {
    petCardContainer.classList.add("hidden");
    const loader = document.getElementById("loader");
    loader.classList.add(
      "grid",
      "place-items-center",
      "h-[50vh]",
      "w-[100%]",
      "xl:w-[75%]"
    );
    loader.classList.remove("hidden");
    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/category/${petname}`
    );
    const data = await res.json();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    loader.classList.remove(
      "grid",
      "place-items-center",
      "h-[50vh]",
      "w-[75%]"
    );
    loader.classList.add("hidden");
    petCardContainer.classList.remove("hidden");
    displayPetCard(data.data);
    sortBtn.addEventListener("click", () => {
      data.data.sort((a, b) => b.price - a.price);
      petCardContainer.innerHTML = "";
      displayPetCard(data.data);
    });
  } catch (error) {
    console.log(error);
  }
}

//load pet data
async function loadPetData(petId) {
  try {
    document.querySelector("#details-btn").showModal();
    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
    );
    const data = await res.json();
    displayPetData(data.petData);
  } catch (error) {
    console.log(error);
  }
}
//display pat data in modal
function displayPetData(petData) {
  const modalBox = document.querySelector(".pet-details-container");
  modalBox.innerHTML = `
  <div>
     <img src="${
       petData.image
     }" alt="" class="mx-auto h-full w-full object-cover rounded-md"/>
  </div>
  <div class="font-bold text-3xl">
     ${petData.pet_name ? petData.pet_name : "Not Found"}
  </div>
  <div class="flex justify-between">
     <div>
        <div class="flex gap-2">
           <div>
              <i class="ri-dashboard-line"></i>
           </div>
           <div>
              Breed: ${petData.breed ? petData.breed : "Not Found"}
           </div>
        </div>
        <div class="flex gap-2">
           <div>
              <i class="ri-calendar-line"></i>
           </div>
           <div>
              Birth: ${
                petData.date_of_birth ? petData.date_of_birth : "Not Found"
              }
           </div>
        </div>
        <div class="flex gap-2">
           <div>
             <i class="ri-award-line"></i>
           </div>
           <div>
              Vaccinated Status: ${
                petData.vaccinated_status
                  ? petData.vaccinated_status
                  : "Not Found"
              }
           </div>
        </div>
     </div>
     <div>
        <div class="flex gap-2">
           <div>
              <i class="ri-women-line"></i>
           </div>
           <div>
              Gender: ${petData.gender ? petData.gender : "Not Found"}
           </div>
        </div>
        <div class="flex gap-2">
           <div class="ml-1">$</div>
           <div>
              Price: ${petData.price ? `${petData.price}$` : "Not Found"}
           </div>
        </div>
     </div>
     
  </div>
  <div>
        <p class="font-bold text-xl">Details Information</p>
        <p>${petData.pet_details}</p>
     </div>
`;
  document.querySelector(".close-btn").addEventListener("click", () => {
    modalBox.innerHTML = "";
  });
}

//display category button
function displayCategoryBtn(categories) {
  const categoryContainer = document.getElementById("category-btn-container");
  categories.forEach((category) => {
    const categoryBtn = document.createElement("button");
    categoryBtn.classList.add(
      "btn",
      "btn-ghost",
      "flex",
      "border-gray-300",
      "rounded-[100px]",
      "px-8",
      "category-btn"
    );
    categoryBtn.innerHTML = `
    <img src=${category.category_icon} alt="" class="w-7 h-7">
     <div class="font-bold text-lg font-inter">${category.category}</div>`;
    categoryContainer.appendChild(categoryBtn);
    categoryBtn.addEventListener("click", () => {
      const categoryBtns = document.querySelectorAll(".category-btn");
      categoryBtns.forEach((btn) => {
        btn.classList.remove("bg-[#0E7A81]");
        btn.classList.remove("text-white");
        btn.classList.add("text-black");
        btn.classList.add("border");
      });

      categoryBtn.classList.add("bg-[#0E7A81]");
      categoryBtn.classList.add("text-white");
      petCardContainer.innerHTML = "";
      loadPetCardByCategory(category.category);
    });
  });
}
console.log(likedPetContainer);

//display liked pet
function displayLikedPet(petsImage) {
  const imageDiv = document.createElement("div");
  imageDiv.classList.add("rounded-md", "h-[150px]", "xl:h-[100px]");
  imageDiv.innerHTML = `<img src="${petsImage}" alt="Liked Pet Image" class="rounded-md h-full object-cover w-full"/>`;
  likedPetContainer.appendChild(imageDiv);
}

//count Down modal show
function CountDownModal(petId) {
  const countdownDetailContainer = document.querySelector(
    ".countdownDetailContainer"
  );
  const adoptBtn = document.querySelector("#adopt-btn");
  countdownDetailContainer.innerHTML = `
      <div class="space-y-4">
        <div class="text-4xl font-bold text-center">Congrats</div>
        <div class="text-xl font-bold text-center">Adoption Process is start for your pet!!</div>
        <div class="mx-auto">
          <img src="./images/hand.png" alt="logo" class="mx-auto"/>
        </div>
        <div class="text-6xl font-bold text-center" id="countdown">3</div>
      </div>
    `;

  // Show the modal
  adoptBtn.showModal();
  let countdownValue = 3;
  const countdownDisplay = document.getElementById("countdown");
  const countdownInterval = setInterval(() => {
    countdownValue--;
    if (countdownValue >= 1) {
      countdownDisplay.textContent = countdownValue;
    } else {
      clearInterval(countdownInterval);
      const adoptButton = document.querySelector(`#adopt-btn-${petId}`);
      adoptButton.textContent = "Adopted";
      adoptButton.classList.remove("text-[#0E7A81]", "bg-[#0E7A81]");
      adoptButton.classList.add("text-white", "bg-[#0E7A81]");
      adoptBtn.close();
    }
  }, 1000);
}

//display pet card
function displayPetCard(pets) {
  if (pets.length === 0) {
    petCardContainer.classList.remove("grid", "grid-cols-1", "gap-5");
    petCardContainer.classList.add(
      "bg-gray-100",
      "p-5",
      "rounded-md",
      "h-[50vh]",
      "flex",
      "justify-center",
      "items-center"
    );
    petCardContainer.innerHTML = `
    <div class="text-center md:w-[55%] mx-auto space-y-4">
            <img src="./images/error.webp" alt="error image" class="w-[150px]  xl:w-[100px]  mx-auto"/>    
            <div class="text-3xl font-bold">No Information Available</div>
            <p class="text-gray-500">It is a long established fact that a reader will be distracted by the readable content of a page when looking at 
its layout. The point of using Lorem Ipsum is that it has a.</p>
    </div>
    `;
  } else {
    petCardContainer.classList.remove(
      "bg-gray-100",
      "p-5",
      "rounded-md",
      "h-[50vh]",
      "w-full",
      "flex",
      "justify-center",
      "items-center"
    );
    petCardContainer.classList.add("grid", "grid-cols-1", "gap-5");
    pets.forEach((pet) => {
      const petCard = document.createElement("div");
      petCard.classList.add(
        "bg-base-100",
        "p-5",
        "border",
        "rounded-md",
        "space-y-3"
      );
      petCard.innerHTML = `   
    <figure>
        <img
          src=${pet.image}
          alt="Shoes" class="h-[200px] md:h-[150px] w-full object-cover rounded-md"/>
      </figure>
      <div class="">      
        <div class="text-xl font-bold font-inter">${pet.pet_name}</div>
        <div class="border-b border-gray-300 pb-3">
      <div class="flex gap-2">
          <div>
             <i class="ri-dashboard-line"></i>
          </div>
          <div>Breed: ${pet.breed ? pet.breed : "Not Found"}</div>
       </div>
       <div class="flex gap-2">
          <div>
             <i class="ri-calendar-line"></i>
          </div>
          <div>Birth: ${
            pet.date_of_birth ? pet.date_of_birth : "Not Found"
          }</div>
       </div>
       <div class="flex gap-2">
          <div>
             <i class="ri-women-line"></i>
          </div>
          <div>Gender: ${pet.gender ? pet.gender : "Not Found"}</div>
       </div>
       <div class="flex gap-2">
          <div class="ml-1">$</div>
          <div>Price: ${pet.price ? `${pet.price}$` : "Not Found"}</div>
       </div>
        </div>
        <div class="flex justify-between items-center pt-5">   
       <button onclick="displayLikedPet('${
         pet.image
       }')" class="btn border-[#0E7A81] text-[#0E7A81] font-bold">
      <i class="ri-thumb-up-line"></i>
   </button>


            <button onclick="CountDownModal(${pet.petId})" id="adopt-btn-${
        pet.petId
      }" class="btn  border-[#0E7A81] text-[#0E7A81] font-bold">Adopt</button>


            <button id="dtails-btn" onclick="loadPetData('${
              pet.petId
            }')" class="btn  border-[#0E7A81] text-[#0E7A81] font-bold">Details</button>
           
        </div>
          
    </div>
      </div>
    
        `;

      petCardContainer.appendChild(petCard);
    });
  }
}

//display category button
loadCategory();
loadPetCard();
