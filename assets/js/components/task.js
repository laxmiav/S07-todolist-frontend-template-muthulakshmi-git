const task = {

    newTaskTemplateSelector: '#tasktodo',
    newTaskTitleSelector: '.task__title-label',
    newTaskTitleInputSelector: '.task__title-field',
    apiURL: 'https://benoclock.github.io/S07-todolist/tasks.json',

    init: function () {
        console.log('%c' + 'task.js loaded', 'color: #0bf; font-size: 1rem; background-color:#fff');

        task.loadTasksFromAPI();
    },

    // cette méthode initialise les eventListeners pour une tâche
    initializeEventListeners: function (taskElement) {

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

        //pour cibler le button complete
        const buttoncomplete = taskElement.querySelector('.task__button--validate');
        buttoncomplete.addEventListener('click', task.handleCompleteTask);






    },



    setStatusEdition: function (event) {
        // récupération de l'élément sur lequel s'est produit le click
        const titleElement = event.currentTarget;

        // récupération de l'élément parent le plus proche titleElement ayant la classe "task"

        const taskElement = titleElement.closest('.task');

        // vérification est ce que la tache est en status todo. Si la tache n'est pas en status todo, nous ne faisons rien
        if (!taskElement.classList.contains('task--todo')) {
            return false;
        } else {
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


    handleTitleKeyUp: function (event) {
        // vérification si c'est la touche "entrée" qui a été saisie
        if (event.key == 'Enter') {
            // nous mettons à jour le titre
            task.updateTitle(event);

            // nous passons la tache en status todo
            task.setStatusTodo(event);
        }
    },


    setStatusTodo: function (event) {
        // récupération de l'input sur lequel s'est produit l'event "blur""
        const inputElement = event.currentTarget;

        // récupération de l'élément parent le plus proche inputElement ayant la classe "task"

        const taskElement = inputElement.closest('.task');

        // vérification est ce que la tache est en status edit. Si la tache n'est pas en status edit, nous ne faisons rien
        if (!taskElement.classList.contains('task--edit')) {
            return false;
        } else {
            // nous retirons la classe CSS 'task--edit' de l'élément
            taskElement.classList.remove('task--edit');
            // nous ajoutons la classe CSS 'task--todo' sur l'élément
            taskElement.classList.add('task--todo');
        }
    },

    updateTitle: function (event) {
        const inputElement = event.currentTarget;
        const taskElement = inputElement.closest('.task');

        // récupération de la valeur contenue dans l'input
        const taskName = inputElement.value;

        // récupération de l'élément stockant le titre de la tache
        const titleElement = taskElement.querySelector('.task__title-label');
        // mise à jour du titre
        titleElement.textContent = taskName;
    },

    handleCompleteTask: function (event) {

        // récupération de l'input sur lequel s'est produit l'event "blur""
        const inputElement = event.currentTarget;

        // récupération de l'élément parent le plus proche inputElement ayant la classe "task"

        const taskElement = inputElement.closest('.task');

        // vérification est ce que la tache est en status edit. Si la tache n'est pas en status edit, nous ne faisons rien
        if (!taskElement.classList.contains('task--todo')) {
            return false;
        } else {
            // nous retirons la classe CSS 'task--edit' de l'élément
            taskElement.classList.remove('task--todo');
            // nous ajoutons la classe CSS 'task--todo' sur l'élément
            taskElement.classList.add('task--complete');
        }
         const  progressBar = taskElement.querySelector('.progress-bar__level');
         progressBar.style.width= '100%';

    },

    // STEP EPISODE 3 création d'une nouvelle tache
    createNewTask: function (theNewTaskTitle, theNewTaskCategory, theNewTaskCompletion) {
        // ciblage du template de création de tâche
        const template = document.querySelector(task.newTaskTemplateSelector);
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

        const  progressBar = newTaskElement.querySelector('.progress-bar__level');
        progressBar.style.width =  theNewTaskCompletion +'%';



        task.initializeEventListeners(newTaskElement);

        // nous retournons la nouvelle tache créée
        return newTaskElement;
    },



    loadTasksFromAPI: function () {

        console.log('tasks from api function is working');
        // requête HTTP vers l'api benoclock
        // IMPORTANT fetch : ennvoyer une requête en javascript vers une url
        fetch(task.apiURL)
            // IMPORTANT .then(uneFonctionAExecuter)
            // ensuite une fois que nous avons récupérer le texte en format json
            .then(task.transformJSONToJavascript)
            .then(task.displayTasks);
    },

    transformJSONToJavascript: function (eventApiResponse) {
        return eventApiResponse.json();
    },

    displayTasks: function (tasksFromTheApi) {

        for (let taskstoshow of tasksFromTheApi) {
            console.log(taskstoshow);
            const newTaskElement = task.createNewTask(taskstoshow.title, taskstoshow.category.name, taskstoshow.completion);
            tasksList.addTask(newTaskElement);

        }



    },





















}