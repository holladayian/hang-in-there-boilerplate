//Query selectors allow you to access HTML elements in the Javascript using a variable.

var posterImg = document.querySelector('.poster-img');
var posterTitle = document.querySelector('.poster-title');
var posterQuote = document.querySelector('.poster-quote');
var userImageUrl = document.querySelector('#poster-image-url');
var userTitle = document.querySelector('#poster-title');
var userQuote = document.querySelector('#poster-quote');
var mainPosterView = document.querySelector('.main-poster');
var posterFormView = document.querySelector('.poster-form');
var savedPostersView = document.querySelector('.saved-posters');
var posterGrid = document.querySelector('.saved-posters-grid');
var formSelect = document.querySelector('form');
var showSavedBtn = document.querySelector('.show-saved');
var showRandomBtn = document.querySelector('.show-random');
var showFormBtn = document.querySelector('.show-form');
var makePosterBtn = document.querySelector('.make-poster');
var showMainBtn = document.querySelector('.show-main');
var backToMainBtn = document.querySelector('.back-to-main');
var savePosterBtn = document.querySelector('.save-poster');

//These five variables were given to us.
//These allow us to acess the arrays that hold the data for our posters and save that
//data in a separate array to be displayed as the poster.
var images = [
  "./assets/bees.jpg",
  "./assets/bridge.jpg",
  "./assets/butterfly.jpg",
  "./assets/cliff.jpg",
  "./assets/elephant.jpg",
  "./assets/flock.jpg",
  "./assets/fox.jpg",
  "./assets/frog.jpg",
  "./assets/horse.jpg",
  "./assets/lion.jpg",
  "./assets/mountain.jpg",
  "./assets/pier.jpg",
  "./assets/puffins.jpg",
  "./assets/pug.jpg",
  "./assets/runner.jpg",
  "./assets/squirrel.jpg",
  "./assets/tiger.jpg",
  "./assets/turtle.jpg"
];
var titles = [
  "determination",
  "success",
  "inspiration",
  "perspiration",
  "grit",
  "empathy",
  "feelings",
  "hope",
  "believe",
  "try",
  "conviction",
  "accomplishment",
  "achievement",
  "ambition",
  "clarity",
  "challenge",
  "commitment",
  "confidence",
  "action",
  "courage",
  "focus",
  "breathe",
  "gratitude",
  "imagination",
  "kindness",
  "mindfulness",
  "knowledge",
  "opportunity",
  "passion",
  "patience",
  "practice",
  "smile",
  "trust",
  "understanding",
  "wisdom"
];
var quotes = [
  "Don’t downgrade your dream just to fit your reality, upgrade your conviction to match your destiny.",
  "You are braver than you believe, stronger than you seem and smarter than you think.",
  "You are confined only by the walls you build yourself.",
  "The one who has confidence gains the confidence of others.",
  "Act as if what you do makes a difference. It does.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Never bend your head. Always hold it high. Look the world straight in the eye.",
  "What you get by achieving your goals is not as important as what you become by achieving your goals.",
  "Believe you can and you're halfway there.",
  "When you have a dream, you've got to grab it and never let go.",
  "I can't change the direction of the wind, but I can adjust my sails to always reach my destination.",
  "No matter what you're going through, there's a light at the end of the tunnel.",
  "It is our attitude at the beginning of a difficult task which, more than anything else, will affect its successful outcome.",
  "Life is like riding a bicycle. To keep your balance, you must keep moving.",
  "Just don't give up trying to do what you really want to do. Where there is love and inspiration, I don't think you can go wrong.",
  'Limit your "always" and your "nevers."',
  "You are never too old to set another goal or to dream a new dream.",
  "Try to be a rainbow in someone else's cloud.",
  "You do not find the happy life. You make it.",
  "Inspiration comes from within yourself. One has to be positive. When you're positive, good things happen.",
  "Sometimes you will never know the value of a moment, until it becomes a memory.",
  "The most wasted of days is one without laughter.",
  "You must do the things you think you cannot do.",
  "It isn't where you came from. It's where you're going that counts.",
  "It is never too late to be what you might have been.",
  "Happiness often sneaks in through a door you didn't know you left open.",
  "We must be willing to let go of the life we planned so as to have the life that is waiting for us.",
  "Never limit yourself because of others’ limited imagination; never limit others because of your own limited imagination.",
  "Be the change that you wish to see in the world.",
  "Let us make our future now, and let us make our dreams tomorrow's reality.",
  "You don't always need a plan. Sometimes you just need to breathe, trust, let go, and see what happens.",
  "If I cannot do great things, I can do small things in a great way.",
  "Don't wait. The time will never be just right.",
  "With the right kind of coaching and determination you can accomplish anything.",
  "If you have good thoughts they will shine out of your face like sunbeams and you will always look lovely.",
  "No matter what people tell you, words and ideas can change the world.",
  "Each person must live their life as a model for others.",
  "A champion is defined not by their wins but by how they can recover when they fall."
];
var savedPosters = [];
var currentPoster;

//Event listeners call a function based on what event is being
//passed in as the argument. Our code does not listen to line 130, because
//we want it to target the poster grid specifically.
window.addEventListener('load', randPoster); 
window.addEventListener('click', clickHandler);
posterGrid.addEventListener('dblclick', deletePoster);

//Click handlers specify which functions to run based on the target location.
function clickHandler(event) {
  if (event.target === showSavedBtn) {
    showSavePage();
    showPosterGrid();
  }
  if (event.target === showMainBtn || event.target === backToMainBtn) {
    backHome();
  }
  if (event.target === showFormBtn) {
    showFormPage();
  }
  if (event.target === showRandomBtn) {
    randPoster();
  }
  if (event.target === makePosterBtn) {
    validateInput(event);
    //captureUserInput(event);
  }
  if (event.target === savePosterBtn) {
    saveNewPoster();
  }
}

// GIVEN: This function takes the length of the array and multiplies it by a random Number
//between 0 and 1, then uses Math.floor to round the product down. The reason that we round
//this down is because arrays start at index 0.
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

// This function instanciates a new poster in the Poster class. We pass in the arguments
// of the random indices from the images, titles, and quotes arrays. Then, we run the
// displayPoster function and the current poster is displayed.
function randPoster() {
  currentPoster = new Poster(
    images[getRandomIndex(images)],
    titles[getRandomIndex(titles)],
    quotes[getRandomIndex(quotes)]
  );
  displayPoster(currentPoster);
}

// This function is called within other functions. It reassigns each attribute
// on the DOM.
function displayPoster(poster) {
  posterImg.setAttribute('src', poster.imageURL);
  posterTitle.innerText = poster.title;
  posterQuote.innerText = poster.quote;
}

// This function runs when the save button is clicked, as coded in the click
// handler. The savedPostersView is unhidden and the mainPostersView is hidden. This
// means that the user now only sees the savedPostersView.
function showSavePage() {
  savedPostersView.classList.remove('hidden');
  mainPosterView.classList.add('hidden');
}

// This function is called when the showMainBtn or backToMainBtn is clicked, as coded
// in the click handler function. The posterFormView and savedPostersView is hidden,
// so the user only sees the mainPosterView.
function backHome() {
  mainPosterView.classList.remove('hidden');
  savedPostersView.classList.add('hidden');
  posterFormView.classList.add('hidden');
}

//This function is called when the showFormBtn is clicked. Since this can only
//be evoked from the mainPosterView, the posterFormView is already hidden. This function
//hides the mainPosterView and shows the posterFormView.
function showFormPage() {
  posterFormView.classList.remove('hidden');
  mainPosterView.classList.add('hidden');
}

// This function is called when the makePosterBtn is clicked, as coded in the
// click handler. It prevents the default event from occuring. It instanciates a new
// poster in the poster class buy taking the text input and then using it as the new
// values for the image, user, and title. The backHome function is then called, so
// the main page is shown again. Then, the displayPoster function is called with
// currentPoster as the argument. The pushUserInput function is called, and the
// user inputs are pushed into the images, titles, and quotes array.
// Finally, the formSelect variable (for the HTML form class) is reset.
function captureUserInput(event) {
  event.preventDefault();
  currentPoster = new Poster(
    userImageUrl.value,
    userTitle.value,
    userQuote.value
  );
  backHome();
  displayPoster(currentPoster);
  pushUserInput();
  formSelect.reset();
}

// The user inputs are pushed into the images, titles, and quotes arrays. The data input
// by the user can be accessed and used again since the data has been added to the arrays.
function pushUserInput() {
  images.push(userImageUrl.value);
  titles.push(userTitle.value);
  quotes.push(userQuote.value);
}

// If the currentPoster being saved is not included in the savedPosters array, then
// that currentPoster is added to the savedPosters array. This function runs when
// savePosterBtn is clicked.
function saveNewPoster() {
  if (!savedPosters.includes(currentPoster)) {
    savedPosters.push(currentPoster);
  }
}

// First posterGrid is assigned the value of an empty string. A for loop is used to
// loop through the savedPosters array. After looping through the savedPosters array
// we declare a variable and assign it to an interpolated section of HTML. The newSavedPoster
// variable is inserted after the posterGrid is reassigned.
function showPosterGrid() {
  posterGrid.innerText = '';
  for (var i = 0; i < savedPosters.length; i++) {
    var newSavedPoster = `
      <section class='mini-poster' data-id=${savedPosters[i].id}>
        <img src=${savedPosters[i].imageURL}>
        <h2>${savedPosters[i].title}</h2>
        <h4>${savedPosters[i].quote}</h4>
      </section>
    `;
    posterGrid.insertAdjacentHTML('afterbegin', newSavedPoster);
  }
}

// This function takes place once a poster in the savedPostersView is double clicked. The
// poster is removed from the savedPosters array. We used a loop to recognize the event
// of a dblclick and apply it to the .mini-poster that it is closest to. The function loops
// through the savedPosters array, and if a poster has the same id as the .mini-poster
// closest to the event of the dblclick, then that instance is deleted using splice. The
// showPosterGrid function is called and the new array is returned.
function deletePoster(event) {
  if (event.target.closest('.mini-poster')) {
    var savedPostersHTML = event.target.closest('.mini-poster');
    for (var i = 0; i < savedPosters.length; i++) {
      if (savedPosters[i].id === Number(savedPostersHTML.dataset.id)) {
        savedPosters.splice(i,1);
      }
    }
    showPosterGrid();
  }
}


// This function implements data validation by checking the length of the input data and
// showing an alert if any of the input fields are left empty by the user.
function validateInput(event) {
  event.preventDefault();
  if (userQuote.value.length && userTitle.value.length && userImageUrl.value.length) {
    captureUserInput(event)
  } else {
    if (userQuote.value.length == 0) {
      alert('Looks like you forgot your quote!');
    }
    if (userTitle.value.length == 0) {
      alert('Looks like you forgot your title!');
    }
    if (userImageUrl.value.length == 0) {
      alert('Looks like you forgot your picture!');
    }
  }
}
