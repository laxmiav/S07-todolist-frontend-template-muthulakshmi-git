// ===========================
const taskForm = {
    form: null,
    formSelector: '.task--add form',
    inputSelector: '.task__title-field',
    selectSelector: '.task__category select',
  
    init: function () {
      console.log('%c' + 'taskForm.js loaded', 'color: #0bf; font-size: 1rem; background-color:#fff');
  
      // ciblage du formulaire
      taskForm.form = document.querySelector(taskForm.formSelector);
  
      // nous écoutons l'événement submit sur le formulaire
      taskForm.form.addEventListener('submit', taskForm.handleNewTaskFormSubmit);
    },
  
    handleNewTaskFormSubmit: function (event) {
  
      // annulation du comportement par défaut (ne recharge pas la page)
      event.preventDefault();
  
      // ciblage de l'input contenant le titre de la nouvelle tache
      const newTaskInput = document.querySelector(taskForm.inputSelector);
      const newTaskTitle = newTaskInput.value;
  
      // ciblage de la select box pour les catégories
      const selectBox = document.querySelector(taskForm.selectSelector);
      const category = selectBox.value;
  
      
      const newTaskElement = task.createNewTask(newTaskTitle, category);
      tasksList.addTask(newTaskElement);
    }
  }
  