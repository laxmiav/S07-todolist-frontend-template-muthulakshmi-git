const categoriesList = {


      apiURL: 'https://benoclock.github.io/S07-todolist/categories.json',

      init: function () {
            console.log('%c' + 'categoriesList.js loaded', 'color: #0bf; font-size: 1rem; background-color:#fff');

            categoriesList.loadCategoriesFromAPI();

      },
      loadCategoriesFromAPI: function () {

            console.log('categories api function is working');
            // requête HTTP vers l'api benoclock
            // IMPORTANT fetch : ennvoyer une requête en javascript vers une url
            fetch(categoriesList.apiURL)
                  // IMPORTANT .then(uneFonctionAExecuter)
                  // ensuite une fois que nous avons récupérer le texte en format json
                  .then(categoriesList.transformJSONToJavascript)
                  .then(categoriesList.displayCaterories);
      },

      transformJSONToJavascript: function (eventApiResponse) {
            return eventApiResponse.json();
      },

      displayCaterories: function (categoriesFromTheApi) {
            for (let category of categoriesFromTheApi) {
                  console.log(category);

                  categoriesList.addcategories(category.name);

            }



      },
      addcategories: function (categoryname) {

            const categorieschoice = document.querySelector('#category-choice');
            options = document.createElement("OPTION");

            categorieschoice.appendChild(options);
            //console.log(categorieschoice);

            options.textContent = categoryname;

            const categorieschoiceform = document.querySelector('#category-form');
            //console.log(categorieschoiceform);
            optionform = document.createElement("OPTION");
            categorieschoiceform.appendChild(optionform);
            optionform.textContent = categoryname;

      }









}