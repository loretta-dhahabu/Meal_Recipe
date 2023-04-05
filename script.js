const baseUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s";

const mealImage = document.querySelector("#meal-image");
const mealIngredient = document.querySelector("#ingredients");
const mealRecipe = document.querySelector("#recipe");
const mealName = document.querySelector("#meal-name");
const mealList = document.querySelector("#meal-list");
const searchMealButton = document.querySelector("#search-meal");
const input = document.querySelector("#input");
const searchMealForm = document.querySelector("#search-meal-form");
const searchCriteria = document.querySelectorAll(".criterion");

//function to be called back to fetch our meals data from the API
const fetchAllMeals = async (url) => {
    try {
      let response = await fetch(url);
      let data = await response.json();
      return data;
    } catch (error) {
      console.error(error.message);
    }
  };

  //function to fetch Meals by name
const fetchMealByName = async (name) => {
    let meals = await fetchAllMeals(baseUrl).then((response) => response);
    let result = meals.meals.filter(
      (meal) => meal.strMeal.toLowerCase() === name.toLowerCase()
    );
    displayMeal(result);
  };
  

//callback function to display meals following search by any criterion
const displayMeal = (meals) => {
    mealList.innerHTML = "";
    if (meals.length > 0) {
      console.log(meals[0]);
  
      meals.forEach((meal, i) => {
        mealName.textContent = meal.strMeal;
        mealImage.src = meal.strMealThumb;
        mealRecipe.textContent = meal.strInstructions;
      });
  
      meals.forEach((meal) => {
        let li = document.createElement("li");
        li.textContent = meal.strMeal;
        mealList.appendChild(li);
      });
    }
  };

  //function to allow meals to display basing on the criterion that the user has chosen to use in finding their recipe.
const getUserInput = (form) => {
    form.preventDefault();
    userInput = input.value;
    let criterion = Array(...searchCriteria).filter(
      (criteria) => criteria.selected
    );
    if (criterion[0].value === "name") {
      if (userInput.trim()) {
        fetchMealByName(userInput);
      }
    } else if (criterion[0].value === "place") {
      fetchMealByPlace(userInput);
    } else if (criterion[0].value === "ingredients") {
      fetchMealByMainIngredient(userInput);
    }
    searchMealForm.reset();
  };
  
  searchMealForm.addEventListener("submit", getUserInput);