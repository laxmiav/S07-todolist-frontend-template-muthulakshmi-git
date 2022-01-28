const task = {

    newTaskTemplateSelector: '#new-task-template',
  
    init: function() {
      console.log('%c' + 'task.js loaded', 'color: #0bf; font-size: 1rem; background-color:#fff');
    },
  
    // cette méthode initialise les eventListeners pour une tâche
    initializeEventListeners: function(taskElement) {
  
      // ciblage de l'élément contenant le titre de la tâche
      const taskTitle = taskElement.querySelector('.task__title-label');
      // déclaration d'un event listener pour détecter les click sur le titre
      taskTitle.addEventListener('click', task.setStatusEdition);
  
      // ===========================
      // ciblage de l'élément "input" permettant de modifier le titre d'une tache
      const taskTitleInput = taskElement.querySelector('.task__title-field');
      // détection de l'event lorsque l'on "quitte" le champ input
      taskTitleInput.addEventListener('blur', task.setStatusTodo);
      taskTitleInput.addEventListener('blur', task.updateTitle);
  
      // lorsque l'on appuie une touche, il faudra que l'on modifie le status de la tache ainsi que son titre si c'est la touche "entrée" qui a été saisie
      taskTitleInput.addEventListener('keyup', task.handleTitleKeyUp);
  
      // ciblage du bouton permettant de passer une tache en status terminé
      const completeTaskButton = taskElement.querySelector('.task__button--validate');
      // nous écoutons le click sur le bouton
      completeTaskButton.addEventListener('click', task.setStatusComplete)
    },
  
    // STEP EPISODE 3 mettre une tache en status terminée
    setStatusComplete: function(event) {
      const buttonElement = event.currentTarget;
      const taskElement = buttonElement.closest('.task');
      taskElement.classList.remove('task--todo');
      taskElement.classList.add('task--complete');
      task.setCompletion(taskElement, 100);
    },
  
  
    setStatusEdition: function(event) {
      // récupération de l'élément sur lequel s'est produit le click
      const titleElement = event.currentTarget;
  
      // récupération de l'élément parent le plus proche titleElement ayant la classe "task"
  
      const taskElement = titleElement.closest('.task');
  
      // vérification est ce que la tache est en status todo. Si la tache n'est pas en status todo, nous ne faisons rien
      if(!taskElement.classList.contains('task--todo')) {
        return false;
      }
      else {
        // nous retirons la classe CSS 'task--todo' de l'élément
        taskElement.classList.remove('task--todo');
        // nous ajoutons la classe CSS 'task--edit' sur l'élément
        taskElement.classList.add('task--edit');
  
        // nous donnons le focus à l'input permettant de modifier le titre
        const titleInput = taskElement.querySelector('.task__title-field');
        titleInput.focus();
  
        // BONUS nous plaçons le curseur  à la "fin" de la chaine contenue dans l'input
        const title = titleInput.value;
        titleInput.value = ''; //clear the value of the element
        titleInput.value = title;
      }
    },
  
  
    handleTitleKeyUp: function(event) {
      // vérification si c'est la touche "entrée" qui a été saisie
      if(event.key == 'Enter') {
        // nous mettons à jour le titre
        task.updateTitle(event);
  
        // nous passons la tache en status todo
        task.setStatusTodo(event);
      }
    },
  
  
    setStatusTodo: function(event) {
      // récupération de l'input sur lequel s'est produit l'event "blur""
      const inputElement = event.currentTarget;
  
      // récupération de l'élément parent le plus proche inputElement ayant la classe "task"
  
      const taskElement = inputElement.closest('.task');
  
      // vérification est ce que la tache est en status edit. Si la tache n'est pas en status edit, nous ne faisons rien
      if(!taskElement.classList.contains('task--edit')) {
        return false;
      }
      else {
        // nous retirons la classe CSS 'task--edit' de l'élément
        taskElement.classList.remove('task--edit');
        // nous ajoutons la classe CSS 'task--todo' sur l'élément
        taskElement.classList.add('task--todo');
      }
    },
  
    updateTitle: function(event) {
      const inputElement = event.currentTarget;
      const taskElement = inputElement.closest('.task');
  
      // récupération de la valeur contenue dans l'input
      const taskName = inputElement.value;
  
      // récupération de l'élément stockant le titre de la tache
      const titleElement = taskElement.querySelector('.task__title-label');
      // mise à jour du titre
      titleElement.textContent = taskName;
    },
  
    // STEP EPISODE 3 création d'une nouvelle tache
    createNewTask: function(theNewTaskTitle, theNewTaskCategory) {
        console.log('i am working');
      // ciblage du template de création de tâche
      const template = document.querySelector('#new-task-template');
      const newTaskElement = template.content.firstElementChild.cloneNode(true);
  
      // remplacement dans la copie du template du nom de la tache
      // le titre de la tache
      newTaskElement.querySelector('.task__title-label').textContent = theNewTaskTitle;
  
      // le titre de la tâche dans l'input
      newTaskElement.querySelector('.task__title-field').setAttribute(
        'value',
        theNewTaskTitle
      );
  
      // remplacement de la catégorie de la tache dans le "data-category"
      newTaskElement.dataset.category = theNewTaskCategory;
  
      // Aux temps jadis nous faisions ainsi
      // newTaskElement.setAttribute('data-category', theNewTaskCategory);
  
      // remplacement du nom de la catégorie affichée
      // ciblage de l'élément
      const categoryNameElement = newTaskElement.querySelector('.task__category p');
      categoryNameElement.textContent = theNewTaskCategory;
  
  
      task.initializeEventListeners(newTaskElement);
  
      // nous retournons la nouvelle tache créée
      return newTaskElement;
    },
  
    setStatus: function(taskElement, status) {
      // BONUS remplacer une css par une autre classe en js
      taskElement.classList.replace('task--todo', status);
    },
  
    setCompletion: function(taskElement, completion) {
      // ciblage de la barre de progression
      const progressBar = taskElement.querySelector('.progress-bar__level');
      progressBar.style.width = completion + '%';
    },
  
  
  }
  