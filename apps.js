function RandomApi() {
    fetch(`https://themealdb.com/api/json/v1/1/categories.php`)
        .then(Response => Response.json())
        .then(data => RandomMeals(data))
}
RandomApi()
function RandomMeals(data) {
    var categories = data.categories;
    categories.forEach(category => {
        var CategoryName = category.strCategory;
        var CategoryImage = category.strCategoryThumb;
        var FoodReciPeShow = document.getElementById("FoodReciPeShow");
        var RndomCategory = document.createElement("div");
        RndomCategory.classList = "AllRandomImg col";
        RndomCategory.setAttribute("data-bs-toggle", "modal");
        RndomCategory.setAttribute("data-bs-target", `#${CategoryName}modal`);
        RndomCategory.innerHTML = `
        <img style="width:80%" src="${CategoryImage}" alt="">
        <h4>${CategoryName}</h4>

        <div class="modal fade" id="${CategoryName}modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Recipe</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div id="${CategoryName}modalMother" class="modal-body">
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
        `
        FoodReciPeShow.appendChild(RndomCategory);
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${CategoryName}`)
            .then(response2 => response2.json())
            .then(data2 => {
                let items = data2.meals;
                if (items != null) {
                    items.forEach(item => {
                        let itemName = item.strMeal;
                        let itemPic = item.strMealThumb;
                        let itemInstruction = item.strInstructions;

                        const modalItems = document.createElement('div');
                        modalItems.innerHTML = `
                        <img src="${itemPic}">
                        <h4>${itemName}</h4>
                        <p>${itemInstruction}</p>
                    `;
                        document.getElementById(`${CategoryName}modalMother`).appendChild(modalItems);
                        console.log(item);
                    })
                }
                else {
                    document.getElementById(`${CategoryName}modalMother`).innerText = "No Results Found";
                }

            })
    })

}
function SearchFood() {
    var UserSearch = document.getElementById("UserSearch").value;
    fetch(`https://themealdb.com/api/json/v1/1/search.php?s=${UserSearch}`)
        .then(response => response.json())
        .then(data => Recipi(data))
}
function Recipi(data) {
    ShowFood.innerHTML = " ";
    var FoodMeals = data.meals;
    // console.log(FoodMeals)
    let i=1;
    FoodMeals.forEach(meals => {
        var ShowFood = document.getElementById("ShowFood");
        var ImageShow = document.createElement("div");
        ImageShow.classList="col";
        var FoodPicture = meals.strMealThumb;
        var FoodName = meals.strMeal;
        var FoodDetails = meals.strInstructions;
        ImageShow.setAttribute("data-bs-toggle", "modal");
        ImageShow.setAttribute("data-bs-target", `#modal${i}`);
        ImageShow.innerHTML = `
        <img style="width:80%" src="${FoodPicture}" alt="">
        <h4>${FoodName}</h4>
        

        <div class="modal fade" id="modal${i}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Recipe</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div id="modalMother${i}" class="modal-body">
        <img style="width:80%" src="${FoodPicture}" alt="">
        <h4>${FoodName}</h4>
        <p>${FoodDetails}</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
        `
        ShowFood.appendChild(ImageShow);
        i++;
    })
}