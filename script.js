// LOAD ALL DATA
const loadAlldata = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pets`
  );
  const data = await response.json();
  const petsContainer = document.getElementById("pets-container");
  petsContainer.innerHTML = "";
  document.getElementById("spinner").classList.remove("hidden");
  setTimeout(() => {
    displayAllData(data.pets);
  }, 2000);
};
// DISPALY DATA
const displayAllData = (pets) => {
  document.getElementById("spinner").classList.add("hidden");
  const petsContainer = document.getElementById("pets-container");
  petsContainer.innerHTML = "";

  pets.forEach((pet) => {
    const creatDiv = document.createElement("div");
    creatDiv.innerHTML = `
      <div class="card bg-base-100 h-[470px] shadow-xl p-5 flex flex-col">
        <figure class="mb-6">
          <img class="object-cover w-full h-40 md:h-48" src="${
            pet.image || "default-image.jpg"
          }" alt="${getValueOrDefault(pet.pet_name)}" />
        </figure>

        <h2 class="text-xl md:text-2xl font-bold">${getValueOrDefault(
          pet.pet_name
        )}</h2>
        <div class="flex items-center space-x-2 mt-2">
          <img class="w-5 h-5" src="images/icons8-menu-24.png" alt="">
          <h3 class="text-sm md:text-base font-normal">Breed: ${getValueOrDefault(
            pet.breed
          )}</h3>
        </div>
        <div class="flex items-center space-x-2 mt-2">
          <img class="w-5 h-5" src="images/icons8-date-80.png" alt="">
          <h3 class="text-sm md:text-base font-normal">${getValueOrDefault(
            pet.date_of_birth
          )}</h3>
        </div>
        <div class="flex items-center space-x-2 mt-2">
          <img class="w-5 h-5" src="images/icons8-gender-50.png" alt="">
          <h3 class="text-sm md:text-base font-normal">${getValueOrDefault(
            pet.gender
          )}</h3>
        </div>
        <div class="flex items-center space-x-2 mt-2 mb-2">
          <img class="w-5 h-5" src="images/icons8-price-80.png" alt="">
          <h3 class="text-sm md:text-base font-normal">${
            getValueOrDefault(pet.price) + "$"
          }</h3>
        </div>
        <hr>
        <div class="grid grid-cols-2 md:grid-cols-3 mt-4 justify-between">
          <button onclick="getImg('${
            pet.image
          }')" class="btn text-base font-bold txt-btn flex-1 mr-1"><i class="fa-solid fa-thumbs-up fa-xl"></i></button>
          <button id="disableb-btn" class="btn text-base font-bold txt-btn flex-1 mx-1" onclick="openModalWithCountdown(this)">Adopt</button>

          <button onclick="showDetails('${
            pet.petId
          }')" class="btn text-base font-bold txt-btn col-span-2 md:col-auto mt-2 md:mt-0">Details</button>
        </div>
      </div>
    `;
    petsContainer.appendChild(creatDiv);
  });
};

// LOAD CATEGORY
const loadDataByCategory = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/categories`
  );
  const data = await response.json();
  displayDataByCategory(data.categories);
};

const displayDataByCategory = (categories) => {
  const petsCategory = document.getElementById("pets-category");

  categories.forEach((item) => {
    const categoryButton = document.createElement("button");
    categoryButton.className =
      "w-5/12 max-w-[300px] h-auto p-4 md:p-6 border border-gray-400 rounded-2xl mb-4 hover:rounded-full  ";

    categoryButton.onclick = () => ByCategory(item.category);
    categoryButton.innerHTML = `
        <div class="flex  md:flex-row justify-center items-center ">
    <img class="w-12 h-12 md:w-14 md:h-14" src="${item.category_icon}" alt="${item.name}">
    <h3 class="text-xl md:text-2xl font-bold text-center md:text-left">${item.category}</h3>
  </div>
      `;

    petsCategory.appendChild(categoryButton);
  });
};

// DISPALY BY CATEGORY

const ByCategory = async (category) => {
  const petsContainer = document.getElementById("pets-container");
  petsContainer.innerHTML = "";
  document.getElementById("spinner").classList.remove("hidden");

  // Fetch category-wise data
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${category}`
  );
  const data = await response.json();

  document.getElementById("spinner").classList.add("hidden");

  if (data.data.length === 0) {
    // Display "No Data Found" message if no pets are found
    petsContainer.innerHTML = `
      <div class=" container mx-auto text-lg font-bold text-gray-500 h-80 border w-full rounded-2xl  
        ">
            <img class="mx-auto mt-5  " src="images/error.webp" alt="">
            <p class="text-center"> No Data Available</p>
        </div>  
    `;
  } else {
    displayAllData(data.data);
  }
};

// IMG SIDE PART
const getImg = (image) => {
  const sidePic = document.getElementById("sidePic");
  const creatAsideDiv = document.createElement("div");

  creatAsideDiv.innerHTML = `
    <div class="">
      <img class="w-full h-auto object-cover rounded-2xl" src="${image}" alt="Pet Image">
    </div>`;

  sidePic.appendChild(creatAsideDiv);
};

const showDetails = async (petId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  );
  const data = await response.json();
  const pet = data.petData;

  const modalContainer = document.getElementById("modal-container");

  // Update modalContainer with modal content dynamically
  modalContainer.innerHTML = `
    <dialog id="my_modal_1" class="modal">
      <div class="modal-box">
        <img  class="w-full object-cover" src="${pet.image}" alt="">
        <h2 class="text-2xl font-bold mt-6">${pet.pet_name}</h2>

        <div class="flex justify-between">
          <div>
            <div class="flex items-center space-x-4 mt-2">
              <img class="w-5 h-5" src="images/icons8-menu-24.png" alt="">
              <h3 class="text-base font-normal">Breed: ${pet.breed}</h3>
            </div>

            <div class="flex items-center space-x-4 mt-2">
              <img class="w-5 h-5" src="images/icons8-gender-50.png" alt="">
              <h3 class="text-base font-normal">${pet.gender}</h3>
            </div>

            <div class="flex items-center space-x-4 mt-2">
              <img class="w-5 h-5" src="images/icons8-gender-50.png" alt="">
              <h3 class="text-base font-normal">${pet.vaccinated_status}</h3>
            </div>
          </div>

          <div>
            <div class="flex items-center space-x-4 mt-2">
              <img class="w-5 h-5" src="images/icons8-date-80.png" alt="">
              <h3 class="text-base font-normal">${pet.date_of_birth}</h3>
            </div>

            <div class="flex items-center space-x-4 mt-2 mb-2">
              <img class="w-5 h-5" src="images/icons8-price-80.png" alt="">
              <h3 class="text-base font-normal">${pet.price}$</h3>
            </div>
          </div>
        </div>

        <hr class="mt-3">
        <h3 class="text-lg font-bold mt-3">Ditails Information</h3>
        <p class="py-4">${pet.pet_details}</p>

        <div class="modal-action">
          <form method="dialog" class="w-full">
            <button class="btn w-full">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  `;

  const modal = document.getElementById("my_modal_1");
  modal.showModal();
};

//  BIO MODAL PART
const openModalWithCountdown = (button) => {
  document.getElementById("countdown-modal");
  const modal = document.getElementById("my_modal_2");
  const countdownElement = document.getElementById("countdown");
  let countdown = 3;
  button.disabled = true;

  modal.showModal();
  const interval = setInterval(() => {
    countdown--;
    countdownElement.textContent = countdown;
    if (countdown === 0) {
      clearInterval(interval);
      modal.close();
    }
  }, 1000);
};

// SHORT BY PRICE AND SPINER

// SHORT BY PRICE AND SPINNER

const sortByPrice = () => {
  const petsContainer = document.getElementById("pets-container");
  petsContainer.innerHTML = "";
  document.getElementById("spinner").classList.remove("hidden");

  setTimeout(() => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
      .then((response) => response.json())
      .then((data) => {
        const pets = data.pets;

        // Sort pets by price, handling null values
        const sortedPets = pets.sort((x, y) => {
          if (x.price === null) return 1;
          if (y.price === null) return -1;
          return y.price - x.price;
        });

        document.getElementById("spinner").classList.add("hidden");

        // Display sorted data
        displayAllData(sortedPets);
      })
      .catch((error) => {
        console.error("Error fetching pets data:", error);
        document.getElementById("spinner").classList.add("hidden");
      });
  }, 2000); // Delay of 4 seconds
};

// NULL UNDEFINE VELUE REPLACE
const getValueOrDefault = (value) => {
  return value !== null && value !== undefined ? value : "No Available Data";
};

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// VIEW BUTTON

const viewMoreBtn = document.getElementById("view-more-btn");
const adoptSection = document.getElementById("adopt-section");

viewMoreBtn.addEventListener("click", () => {
  adoptSection.scrollIntoView({ behavior: "smooth" });
});
loadDataByCategory();

loadAlldata();
