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

    // reset de l'input gérant le nom de la nouvelle tâche
    newTaskInput.value = '';

    // TODO il faudrait gérer le fait que le nom de la tâche ne doit pas être vide et qu'une catégorie doit être sélectionnée
    // ciblage de la select box pour les catégories
    const selectBox = document.querySelector(taskForm.selectSelector);
    const categoryId = selectBox.value;


    // récupération de l'option sélectionnée ; correspond à l'option avant l'attribut value égal à categoryId
    const selectedOption = selectBox.querySelector('option[value="' + categoryId+ '"]');

    // récupération du nom de la catégory
    const categoryName =selectedOption.textContent;

    const newTaskElement = task.createNewTask(newTaskTitle, categoryName);
    tasksList.addTask(newTaskElement);

  }
}
