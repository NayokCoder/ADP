// LOAD ALL DATA

const loadAlldata = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pets`
  );
  const data = await response.json();
  // console.log(data.pets);

  displayAllData(data.pets);
  sortByprice(data.pets);
};

const displayAllData = (pets) => {
  document.getElementById("spinner").classList.add("hidden");
  const petsContainer = document.getElementById("pets-container");
  petsContainer.innerHTML = "";
  pets.forEach((pet) => {
    const creatDiv = document.createElement("div");
    creatDiv.innerHTML = `
        <div class="card bg-base-100  h-[470px] shadow-xl p-5">
                  <figure  class="w- mb-6">
                      <img   class="object-cover"
                          src=${pet.image} alt="Shoes" />
                  </figure>

                  <h2 class="text-2xl font-bold">${pet.pet_name}</h2>
                  <div class="flex  items-center space-x-4 mt-2">
                      <img class="w-5 h-5" src="images/icons8-menu-24.png" alt="">
                      <h3 class="text-base font-normal">Breed: ${pet.breed}</h3>
                  </div>
                  <div class="flex  items-center space-x-4 mt-2">
                      <img class="w-5 h-5" src="images/icons8-date-80.png" alt="">
                      <h3 class="text-base font-normal">${
                        pet.date_of_birth
                      }</h3>
                  </div>
                  <div class="flex  items-center space-x-4 mt-2">
                      <img class="w-5 h-5" src="images/icons8-gender-50.png" alt="">
                      <h3 class="text-base font-normal">${pet.gender}</h3>
                  </div>
                  <div class="flex  items-center space-x-4 mt-2 mb-2">
                      <img class="w-5 h-5" src="images/icons8-price-80.png" alt="">
                      <h3 class="text-base font-normal">${pet.price + "$"}</h3>
                  </div>
                  <hr>
                  <div class=" flex mt-4 justify-between">
                      <button onclick="getImg('${
                        pet.image
                      }')" class="btn text-base font-bold txt-btn">Like</button>
                     
                      <button class="btn text-base font-bold txt-btn" onclick="openModalWithCountdown()">Adopt</button>
                      <button onclick="showDetails('${
                        pet.petId
                      }')" class="btn text-base font-bold txt-btn">Details</button>
                  </div>
              </div>
      `;
    petsContainer.appendChild(creatDiv);
  });
};

// LOAD categories

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
      "w-[300px] h-[104px] p-6 border border-gray-400 rounded-2xl mb-4";
    categoryButton.onclick = () => ByCategory(item.category);
    categoryButton.innerHTML = `
        <div class="flex justify-center items-center space-x-4">
          <img class="w-14 h-14" src="${item.category_icon}" alt="${item.name}">
          <h3 class="text-2xl font-bold">${item.category}</h3>
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
  setTimeout(function () {
    displayAllData(data.data);
  }, 2500);
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${category}`
  );
  const data = await response.json();
};

loadDataByCategory();

loadAlldata();
document.getElementById("sidePic").addEventListener("click", function (even) {
  even.preventDefault();
  console.log("helo");
});
// ??????
const getImg = (image) => {
  const sidePic = document.getElementById("sidePic");
  const creatAsideDiv = document.createElement("div");

  creatAsideDiv.innerHTML = `
    <div class="">
      <img class="w-full h-auto object-cover" src="${image}" alt="Pet Image">
    </div>`;

  // Append the dynamically created div to the sidePic container
  sidePic.appendChild(creatAsideDiv);
};

const showDetails = async (petId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  );
  const data = await response.json();
  const pet = data.petData; // Store the data

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

  // Select the dynamically created modal and open it
  const modal = document.getElementById("my_modal_1");
  modal.showModal();
};

// Function to open the modal and start the countdown

const openModalWithCountdown = () => {
  const countdownModal = document.getElementById("countdown-modal");

  // Update modalContainer with modal content dynamically
  countdownModal.innerHTML = `
    <dialog id="my_modal_2" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Hello!</h3>
        <p class="py-4">
          This modal will close in <span id="countdown">5</span> seconds.
        </p>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>Close</button>
      </form>
    </dialog>
  `;

  // Now reference the modal and countdown element after it is added to the DOM
  const modal = document.getElementById("my_modal_2");
  const countdownElement = document.getElementById("countdown");
  let countdown = 5;

  // Show the modal
  modal.showModal();

  // Start the countdown
  const interval = setInterval(() => {
    countdown--;
    countdownElement.textContent = countdown;

    // Close modal when countdown reaches 0
    if (countdown === 0) {
      clearInterval(interval);
      modal.close();
    }
  }, 1000);
};

// SHORT BY PRICE

const sortByprice = () => {
  console.log("hello");
};
