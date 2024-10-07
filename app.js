// fetch load category button

//step 1
// create load categories

const loadCategories = async () => {
  // fetch the data
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await res.json();
  displayCategories(data.categories);
};

const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("category-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

// step 5
const loadCategory = async (id) => {
  // const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
  // const data = await res.json();
  // displayAllPets(data.data);

  fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();

      const activeBtn = document.getElementById(`button-${id}`);
      activeBtn.classList.add("active");

      displayAllPets(data.data);
    })
    .catch((error) => console.log(error));
};

// step 2

// create display categories

const displayCategories = (categories) => {
  const categoryButtons = document.getElementById("categoryButtons");

  categories.forEach((item) => {
    // create a button

    const button = document.createElement("div");

    button.innerHTML = `
        
        <button id="button-${item.category}" onclick="loadCategory('${item.category}')" class="btn flex items-center justify-center gap-4 lg:px-28 h-16 lg:h-24 text-2xl font-bold rounded-2xl category-btn">
            <img class="w-10 h-10" src="${item.category_icon}">
            <p>${item.category}</p>

        </button>
        
        `;

    // add button to category
    categoryButtons.append(button);
  });
};

// step 3
const loadAllPets = async () => {
  // fetch the data
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const data = await res.json();
  displayAllPets(data.pets);
};

// step 6

const loadPetDetails = async (petId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  );
  const data = await res.json();
  displayDetails(data);
};

// step 7

const displayDetails = (pets) => {
  console.log(pets.petData);
  const detailsContainer = document.getElementById("grid-Card-2");

  const div = document.createElement("div");

  div.innerHTML = `
        
            <img class="rounded-xl border p-4" src="${pets.petData.image}">

        `;
  detailsContainer.append(div);
};

// step 8

const loadmodal = async (petId) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  );
  const data = await res.json();
  displayDetails(data);
};

// step 4

const displayAllPets = (allPets) => {
  const petContainer = document.getElementById("grid-Card-1");
  petContainer.innerText = "";

  if (allPets.length == 0) {
    petContainer.classList.remove("grid");
    petContainer.innerHTML = `

            <div class="border flex flex-col justify-center items-center rounded-xl shadow-xl py-12">
            <figure class="px-10 pt-10">
                <img src="images/error.webp" alt="" class="rounded-xl" />
            </figure>
            <div class="card-body items-center text-center">
                <h1 class="card-title font-extrabold text-5xl mb-6">No Information Available</h1>
                <p>If you have come to the end of this blog post without being scared off of animals and you feel prepared to commit to an animal in a way it deserves, get one! But if, deep down, you realise you’re like every other person who wants a pet for self-centred reasons and knows their lifestyle isn’t pet friendly… stick to walking your neighbour’s dog, cuddle your friend’s cat when you visit them, and offer to look after your mate’s bird when they’re away next.</p>
            </div>
            </div>        
        `;
    return;
  } else {
    petContainer.classList.add("grid");
  }

  allPets.forEach((pet) => {
    const card = document.createElement("div");
    card.classList = "card border shadow-xl";
    card.innerHTML = `

            <figure class="h-[220px] px-8 pt-8">
                <img src="${
                  pet.image
                }" alt="pets" class="rounded-xl h-full w-full object-cover"/>
            </figure>

            <div class="px-8 py-4">
                <h2 class="card-title text-xl font-extrabold mb-6">${
                  pet.pet_name
                }</h2>

                <div class="mb-6">

                    <span class="flex items-center gap-3"><img class="h-5 w-5" src="https://img.icons8.com/?size=50&id=2905&format=png"><p>Breed : ${
                      pet.breed ? pet.breed : "Not Available"
                    }</p></span>

                    <span class="flex items-center gap-3 mt-2"><img class="h-5 w-5" src="https://img.icons8.com/?size=50&id=60611&format=png"><p>Birth : ${
                      pet.date_of_birth ? pet.date_of_birth : "Not Available"
                    }</p></span>
                   
                    <span class="flex items-center gap-3 mt-2"><img class="h-5 w-5" src="https://img.icons8.com/?size=24&id=6vWA99ikHpCe&format=png"><p>Gender : ${
                      pet.gender ? pet.gender : "Not Available"
                    }</p></span>

                    <span class="flex items-center gap-3 mt-2"><img class="h-5 w-5" src="https://img.icons8.com/?size=24&id=85782&format=png"><p>Price : ${
                      pet.price ? pet.price + "$" : "Not Available"
                    }</p></span> 


                </div>              
                
                <div class="flex justify-between items-center gap-3 border-t">
                    <div class="card-actions ">
                        <button onclick="loadPetDetails('${
                          pet.petId
                        }')" class=" mt-3 px-4 py-2 rounded-xl border"><img class="w-6 h-6" src="https://img.icons8.com/?size=80&id=114072&format=png"></button>
                    </div>

                    <div class="card-actions ">
                        <button onclick="loadmodal('${
                          pet.petId
                        }')" class="px-6 py-3 mt-3 rounded-xl border font-bold"">Adopt</button>
                    </div>

                    <div class="card-actions ">
                        <button class="px-6 py-3 mt-3 rounded-xl border font-bold"">Details</button>
                    </div>

                </div>
            </div>

        `;

    petContainer.append(card);
  });
};

loadCategories();

loadAllPets();
