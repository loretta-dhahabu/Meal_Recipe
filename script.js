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