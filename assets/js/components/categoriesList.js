const categoriesList = {
      apiRootURL: 'https://benoclock.github.io/S07-todolist',
      init: function() {
        console.log('%c' + 'categoriesList init', 'color: #0bf; font-size: 1rem; background-color:#fff');
    
        // chargement des categories depuis l'api
        categoriesList.loadCategoriesFromAPI();
      },
    
      loadCategoriesFromAPI: function() {
        // STEP EPISODE 4 ajax récupération des catégories
        // création de l'url de récupération des categories
        const apiCategoriesURL = categoriesList.apiRootURL + '/categories.json';
    console.log(apiCategoriesURL);
        // appel ajax pour récupérer les categories
        fetch(apiCategoriesURL)
          .then(categoriesList.transformJSONToJavascript)
          .then(categoriesList.displayCategories)
        ;
      },
    
      transformJSONToJavascript: function(eventApiResponse) {
        // WARNING débugger ici eventApiResponse est "difficile" ) lire/comprendre (se documenter sur les "promise" javascript)
        // DOC promise https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Using_promises
        // console.log(eventApiResponse);
    
        return eventApiResponse.json();
      },
    
      displayCategories: function(categories) {
        // categories est un tableau de la forme suivante :
        /*
          [
            {
              "id": 1,
              "name": "Chemin vers O'clock",
              "status": 1
            },
            ...
          ]
        */
    
        // création d'un élément select
        let selectElement = document.createElement('select');
        // pour chaque catégorie création d'un élément option
        for(let category of categories) {
          let optionElement = document.createElement('option');
          optionElement.textContent = category.name;
    
          // définition de l'attribut value, on lui donne l'id de la category en tant que valeur
          optionElement.setAttribute('value', category.id);
    
          // injection de l'option dans le "select"
          selectElement.appendChild(optionElement);
        }
    
        // injection du select dans le page web
        // ciblage du container
        const container = document.querySelector('.task--add .select.is-small');
        container.appendChild(selectElement);
    
    
        // création d'un clone ("copie") de selectElement
        const filterSelectElement = selectElement.cloneNode(true);
        filterSelectElement.classList.add('filters__choice');
    
        const filterContainer = document.querySelector('.filters__task--category');
        filterContainer.appendChild(filterSelectElement);
    
    
    
        // WARNING faire un return dans une fonction déclenchée par un "then" est recommandé
        return categories;
      },
    }
    
    