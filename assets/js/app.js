const app = {
    init: function() {
      console.log('%c' + 'app.js loaded', 'color: #0bf; font-size: 1rem; background-color:#fff');
  
      // intialisation des composants nécessaires au fonctionnement de l'application
      taskForm.init();
      tasksList.init();
      task.init();
    }
  }
  
  
  // lancement de l'application lorsque la page a terminé d'être chargée
  document.addEventListener('DOMContentLoaded', app.init);