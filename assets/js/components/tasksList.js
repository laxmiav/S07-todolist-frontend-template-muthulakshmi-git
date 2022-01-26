const tasksList = {

    tasks: [],
  
    init: function() {
      console.log('%c' + 'tasksList.js loaded', 'color: #0bf; font-size: 1rem; background-color:#fff');
  
      tasksList.loadTasksFromDOM();
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
    }
  }
  