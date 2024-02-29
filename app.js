//Définir une variable de type élément HTML qui sélectionne le body de mon document HTML
const mainContainer = document.querySelector('body.main-container');

//Définir une variable de type élément HTML qui sélectionne le paragraphe qui comporte la class status--msg
const statusMsg = document.querySelector('p.status--msg');

//Définir une variable de type élément HTML qui sélectionne le span dans la balise p qui contient la class scorePanel
const scoreHtml = document.querySelector('.scorePanel > span');

//Définir une variable de type élément HTML qui sélectionne le bouton qui contient la class btn--play
const btnPlay = document.querySelector('.btn--play');

//Définir une variable de type élément HTML qui sélectionne le bouton qui contient la class btn--reset
const btnReset = document.querySelector('.btn--reset');

//Définir une variable de type tableau qui contient 6 couleurs en hex
const availableColors = ['#FF4A7A', '#FF9666', '#FCC47E', '#008DA8', '#5CD5E8', '#FF76A1'];

//Définir une variable de type nombre qui va correspondre à l'index du tableau de couleurs qu'on appliquera pour la couleur de fond du body. Pour l'instant, la définir à 0.
let currentBgColorIndex = 0;

//Définir une variable de type nombre qui va correspondre à l'index du tableau de couleurs qu'on appliquera pour la couleur de fond du bouton Play. Pour l'instant, la définir à 0.
let currentBtnColorIndex = 0;

//Définir une variable de type boolean qui définit si le jeu est actif ou en pause.
let isActive = true;

//Définir une variable de type nombre qui va correspondre au score du jouer. Pour l'instant, le définir à 0.
let score = 0;

//Définir une variable de type nombre qui va influencer la vitesse de changement des couleurs.
let diffStep = 100;

//Définir l'interval pour le changement des couleurs de fond grace à la fonction setInterval qui prend en paramètre la fonction changeBgColor et un nombre en ms
let colorChangeInterval = setInterval(changeBgColor, 1000);


//Définir une fonction qui va changer la couleur de fond du body : 
function changeBgColor(){
    currentBgColorIndex++;
    if(currentBgColorIndex >= availableColors.length){
        currentBgColorIndex = 0;
    }
    mainContainer.style.backgroundColor = availableColors[currentBgColorIndex];
};

function changeBtnColor(){
    currentBtnColorIndex = Math.round(Math.random() * (availableColors.length - 1));
    btnPlay.style.backgroundColor = availableColors[currentBtnColorIndex];
};

function reset(){
    score = 0;
    scoreHtml.textContent = score;
};

function start(){
    changeBtnColor();
    colorChangeInterval = setInterval(changeBgColor, 1000 - (score * diffStep));
    btnPlay.textContent = 'Stop';
    isActive = true;
    statusMsg.classList.add ('status--msg--hidden');
    btnReset.classList.add ('btn--reset--hidden');
    btnPlay.classList.remove ('btn--no--play');
};

function stop(){
    clearInterval (colorChangeInterval);
    btnPlay.textContent = 'Start';
    statusMsg.classList.remove('status--msg--hidden');
    btnReset.classList.remove('btn--reset--hidden');
    btnPlay.classList.add('btn--no--play');

    if(currentBgColorIndex === currentBtnColorIndex){
        score++;
        scoreHtml.textContent = score;
        statusMsg.textContent = 'Victory !'
    }
    else {
        reset();
        statusMsg.textContent = 'Defeat...'
    }

    isActive = false;
};


statusMsg.classList.add ("status--msg--hidden");
btnReset.classList.add ('btn--reset--hidden');

btnPlay.addEventListener('click', () => {
    if (isActive === true){
        stop();
    }
    else {
        start();
    }
});

btnReset.addEventListener('click', () => {
    reset();
});

changeBtnColor();

