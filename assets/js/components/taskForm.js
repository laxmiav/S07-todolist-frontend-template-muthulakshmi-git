const taskForm = {


    form: null,
    init: function () {
        console.log('%c' + 'taskForm.js loaded', 'color: #0bf; font-size: 1rem; background-color:#fff');

        // ciblage du formulaire de création d'un nouvel utilisateur
        taskForm.form = document.querySelector('.task--add');
        console.log(taskForm.form);
        // nous surveillons la soumission du formulaire
        taskForm.form.addEventListener('submit', taskForm.handleNewTaskFormSubmit);






    },

    handleNewTaskFormSubmit: function (event) {

        event.preventDefault();
        console.log('i am working');
        // ciblage du l'input contenant le tache du  utilisateur
        const newUserInput = document.querySelector('form  input');
        //console.log(newUserInput);
        const newUserSelect = document.querySelector('form select');
        const taskCategory = newUserSelect.value;
        console.log(taskCategory);
        // récupération du nom du nouvel utilisateur
        const newUserTask = newUserInput.value;

        //console.log(newUserTask);

        //taskForm.addTaskElement(newUserTask, taskCategory);

        // reset de l'input
        newUserInput.value = '';

        // récupération du template de création d'un nouveau task
        const template = document.querySelector('#tasktodo');

        // IMPORTANT création d'une copie (clone) du template
        const newTaskElement = template.content.firstElementChild.cloneNode(true);
        //console.log(newTaskElement);
        const tasklist = document.querySelector('.task');
        // injection du newTaskElement dans la liste
        tasklist.appendChild(newTaskElement);


        // mettre à jour du nom du nouvel utilisateur
        const userNameElement = newTaskElement.querySelector('.task__title');

        //console.log(userNameElement);


        userNameElement.textContent = newUserTask;



        const userCategoryElement = newTaskElement.querySelector('.task__category p');
        //console.log(userCategoryElement);
        userCategoryElement.innerHTML = taskCategory;
        // enregistrement des event listeners du nouvel element
        task.initializeMemberElement(newTaskElement);







    },


    //addTaskElement: function (taskElement, taskcategory) {







    }
