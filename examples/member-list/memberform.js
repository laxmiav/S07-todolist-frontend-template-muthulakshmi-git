const memberForm = {
    form: null,
    init: function() {
      console.log('%c' + 'memberForm initialization', 'color: #0bf; font-size: 1rem; background-color:#fff');
  
      // ciblage du formulaire de création d'un nouvel utilisateur
      memberForm.form = document.querySelector('#member-form');
  
      // nous surveillons la soumission du formulaire
      memberForm.form.addEventListener('submit', memberForm.addMember);
    },
  
    addMember: function(event) {
      // nous ne souhaitons que la page se recharge ; nous empechons le comportement par défaut
      event.preventDefault();
  
  
      // ciblage du l'input contenant le nom du nouvel utilisateur
      const newUserInput = document.querySelector('#new-member-name');
  
      // récupération du nom du nouvel utilisateur
      const newUserName = newUserInput.value;
      memberList.addMemberElement(newUserName);
  
      // reset de l'input
      newUserInput.value = '';
    }
  }
  
  document.addEventListener('DOMContentLoaded', memberForm.init);
  