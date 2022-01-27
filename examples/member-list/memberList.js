const memberList = {

  apiURL: 'http://hp-api.herokuapp.com/api/characters/students',

  // listElement est la propriété qui va nous permettre de cibler dans le DOM la liste des members
  listElement: null,
  init: function() {
    console.log('%c' + 'memberList initialization', 'color: #0bf; font-size: 1rem; background-color:#fff');

    // ciblage de la liste des "members"
    memberList.listElement = document.querySelector('.member-list');

    // sélection de tous les éléments "li" contenus dans la liste des membres (memberList.listElement)

    const memberElements = memberList.listElement.querySelectorAll('li');
    console.log(memberElements);

    // pour chaque élément li récupéré, nous devons initialiser le traitement qui se déclenchera lorsque l'on cliquera sur le bouton "delete"

    for(const memberElement of memberElements) {
      memberList.initializeMemberElement(memberElement);
    }

    memberList.loadMembersFromAPI();
  },

  initializeMemberElement: function(memberElement) {
    // ciablage du bouton delete à l'intérieur de l'élement (li : un membre)
    const deleteButton = memberElement.querySelector('button');
    deleteButton.addEventListener('click', memberList.deleteMember);
  },

  deleteMember: function(event) {
    // récupération du bouton sur lequel a eu lieu le click
    const clickedButton = event.currentTarget;

    // BONUS changer en javascript la couleur de fond d'un élément
    // clickedButton.style.backgroundColor = '#f0f';

    // récupération de la balise li DANS laquelle se trouve le bouton sur lequel vient de produire le click
    // IMPORTANT récupérer le parent d'un certain le plus proche d'un élément
    let liElement = clickedButton.closest('li');

    // suppresion de la balise li
    liElement.remove();
  },

  // ajout d'un nouvel utilisateur dans la liste
  addMemberElement: function(memberName, image) {
    /* création manuelle d'un nouvel "element" member
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = memberName;
    const button = document.createElement('button');
    button.textContent = 'Delete';
    li.appendChild(span);
    li.appendChild(button);
    memberList.listElement.appendChild(li);
    */

    // récupération tu template de création d'un nouveau membre
    const template = document.querySelector('#member-template');

    // IMPORTANT création d'une copie (clone) du template
    const newMemberElement = template.content.firstElementChild.cloneNode(true);
    console.log(newMemberElement);

    // injection du newMemberElement dans la liste
    memberList.listElement.appendChild(newMemberElement);

    // mettre à jour du nom du nouvel utilisateur
    const userNameElement = newMemberElement.querySelector('span');
    userNameElement.textContent = memberName;

    // update de l'image du membre
    newMemberElement.querySelector('.avatar').setAttribute('src', image);

    // enregistrement des event listeners du nouvel element
    memberList.initializeMemberElement(newMemberElement);
  },

  // STEP EPISODE 3 ajax
  // récupération des personnage de l'api harry potter
  loadMembersFromAPI: function() {
    // requête HTTP vers l'api harrypotter
    // IMPORTANT fetch : ennvoyer une requête en javascript vers une url
    fetch(memberList.apiURL)
      // IMPORTANT .then(uneFonctionAExecuter)
      // ensuite une fois que nous avons récupérer le texte en format json
      .then(memberList.transformJSONToJavascript)
      .then(memberList.displayMembers)
    ;
  },

  transformJSONToJavascript: function(eventApiResponse) {
    return eventApiResponse.json();
  },

  displayMembers: function(membersFromTheApi) {
    for(let member of membersFromTheApi) {
      memberList.addMemberElement(member.name, member.image);
    }
  }
}

document.addEventListener('DOMContentLoaded', memberList.init);


