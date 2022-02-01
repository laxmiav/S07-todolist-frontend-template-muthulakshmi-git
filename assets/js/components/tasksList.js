const tasksList = {
  apiRootURL: 'http://localhost:8080',

  tasks: [],

  init: function() {
    console.log('%c' + 'tasksList.js loaded', 'color: #0bf; font-size: 1rem; background-color:#fff');

    tasksList.loadTasksFromDOM();
    tasksList.loadTasksFromAPI();
  },

  loadTasksFromDOM: function() {
    console.log('%c' + 'Chargement des tâches présentes dans la page', 'color: #abf; font-size: 1rem; background-color:#fff');

    // sélection de tous les éléments ayant la classe "task" à l'intérieur de l'élément ayant la classe "tasks"
    const tasks = document.querySelectorAll('.tasks .task');

    // pour chacune des taches récupérées, il faut que nous "initialisons" ses eventListeners
    for(let taskElement of tasks) {
      task.initializeEventListeners(taskElement);
      tasksList.tasks.push(task);
    }
  },

  addTask: function(newTask) {
    // ajout de la nouvelle tache à la liste
    tasksList.tasks.push(newTask);

    // selection de l'élément stockant la liste des taches
    const taskListContainer = document.querySelector('.tasks');
    // ajout de la nouvelle tache AU DEBUT de la liste
    taskListContainer.prepend(newTask);
    
  },

  // STEP épisode 4 ; chargement des tâches depuis l'api

  loadTasksFromAPI: function() {
    const tasksApiURL = tasksList.apiRootURL + '/tasks'
    fetch(tasksApiURL)
      .then(tasksList.transformJSONToJavascript)
      .then(tasksList.displayTasks)
    ;
  },
  transformJSONToJavascript: function(eventApiResponse) {
    return eventApiResponse.json();
  },

  displayTasks: function(tasks) {
    // tasks est un tableau d'objets ayant la structure suivante
    /*
    {
        "id": 1,
        "title": "Passer les tests du chemin vers O'clock",
        "completion": 100,
        "category": {
            "id": 1,
            "name": "Chemin vers O'clock",
            "status": 1
        },
        "status": 2
    },
    */

    for(const taskObject of tasks) {
      const newTaskElement = task.createNewTask(taskObject.title, taskObject.category.name,taskObject.category_id);
      tasksList.addTask(newTaskElement);

      // nous mettons le bon status à la tache
      if(taskObject.status === 2) {
        task.setStatus(newTaskElement, 'task--archive');
      }
      else if(taskObject.completion === 100) {
        task.setStatus(newTaskElement, 'task--complete');
      }

      //gestion de la progress bar
      task.setCompletion(newTaskElement, taskObject.completion);
      task.setId(newTaskElement, taskObject.id);
      
    }
   
  },

  //STEP episode 6, ajoutez un tache coté api
  saveNewTask: function (theNewTaskTitle, theNewTaskCategoryId) {




    //option[value="3"]
    // création des entetes pour la requête HTTP
    const httpHeaders = new Headers();
    httpHeaders.append('Content-Type', "application/json")

    const ajaxOptions = {
      method: 'POST', // nous allons faire un appel "patch" pour seulement mettre à jour le nom de la tâche
      headers: httpHeaders,

      // les data à envoyer à l'api
      body: JSON.stringify({
        title: theNewTaskTitle,
        categoryId: theNewTaskCategoryId,
        completion:0,
        status:1
      })
    };

    // construction de l'url
    const url = task.apiRootURL + '/tasks';
    // STEP episode 6
    // IMPORTANT envoie de données vers une api
    fetch(url, ajaxOptions)
      .then(task.transformJSONToJavascript)
      .then(function (taskInformations) {
        console.log(taskInformations);
      });

  },




}
