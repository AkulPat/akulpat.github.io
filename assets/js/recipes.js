// Recipes management with localStorage
const recipesKey = 'myRecipes';

function loadRecipes() {
    const recipes = JSON.parse(localStorage.getItem(recipesKey) || '[]');
    const container = document.getElementById('recipes-container');
    container.innerHTML = '';
    recipes.forEach((recipe, index) => {
        const recipeDiv = document.createElement('div');
        recipeDiv.innerHTML = `
            <h3>${recipe.name}</h3>
            <h4>Ingredients:</h4>
            <p>${recipe.ingredients}</p>
            <h4>Instructions:</h4>
            <p>${recipe.instructions}</p>
            <button onclick="deleteRecipe(${index})">Delete</button>
        `;
        container.appendChild(recipeDiv);
    });
}

function saveRecipes(recipes) {
    localStorage.setItem(recipesKey, JSON.stringify(recipes));
}

function addRecipe(name, ingredients, instructions) {
    const recipes = JSON.parse(localStorage.getItem(recipesKey) || '[]');
    recipes.push({ name, ingredients, instructions });
    saveRecipes(recipes);
    loadRecipes();
}

function deleteRecipe(index) {
    const recipes = JSON.parse(localStorage.getItem(recipesKey) || '[]');
    recipes.splice(index, 1);
    saveRecipes(recipes);
    loadRecipes();
}

document.getElementById('recipe-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('ingredients').value;
    const instructions = document.getElementById('instructions').value;
    addRecipe(name, ingredients, instructions);
    this.reset();
});

// Load recipes on page load
loadRecipes();