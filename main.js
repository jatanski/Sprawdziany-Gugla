//Pobranie niezbędnych elementów
const addButton = document.getElementById('addNextAnwser');
const sendButton = document.getElementById('submit');
const startTestButton = document.getElementById('start');
const questionInput = document.querySelector('#question');
const h2 = document.querySelector('h2');
const form = document.querySelector('form');
const description = document.querySelector('.description');
const instruction = document.querySelector('.instruction');
const goodAnswer = document.getElementById('goodAnswer');

//Lista zbierająca pytania
const arrayOfQuestions = [];

//Zmienna zbierająca punkty
let points = 0;

//Funkcja tworzenia nowego okienka z odpowiedziami.
const createNextAnswer = (e) => {
   e.preventDefault();
   const newAnwser = document.createElement('input');
   newAnwser.id = "answer";
   newAnwser.setAttribute("type", "text");
   newAnwser.setAttribute("data-new", "yes");
   newAnwser.className = "answer";
   newAnwser.placeholder = "Wpisz odpowiedź";
   form.insertBefore(newAnwser, addButton);
}

//Funkcja wyświetlająca ile pytań stworzyliśmy.
const howManyQuestion = () => {
   h2.innerHTML = `Liczba utworzonych pytań: <strong>${arrayOfQuestions.length}</strong>.`;
}

//Funkcja dodawania pytania i odpowiedzi do pamięci
const addToObiekt = (e) => {
   e.preventDefault();
   if (!questionInput.value) {
      alert("Musisz podać treść pytania!");
      return
   }
   if (!goodAnswer.value) {
      alert("Musisz wpisać treść odpowiedzi!");
      return
   }
   const inputAnswerItems = document.querySelectorAll('.answer');
   inputAnswerItems.forEach(el => {
      if (!el.value) {
         alert("Musisz wpisać treść dodatkowych wariantów!");
         null.dummy
      }
   })
   const questionDiv = document.getElementById('question-box');
   const questionBox = new QuestionAndAnwser;
   questionBox.goodAnswer = goodAnswer.value;
   questionBox.question = questionDiv.children[1].value;
   inputAnswerItems.forEach(el => questionBox.answers[questionBox.answers.length] = el.value);
   arrayOfQuestions[arrayOfQuestions.length] = questionBox;
   howManyQuestion();
   //Czyszczenie inputów
   document.querySelectorAll(`input[data-new="yes"]`).forEach(el => el.remove())
   document.querySelectorAll(`input[type="text"]`).forEach(el => el.value = "");
}

//Funkcja tworząca opis dla ucznia
const descriptionForStudent = () => {
   description.textContent = `Witaj uczniu! Zapraszamy do rozwiązania testu napisanego przez Twojego nauczyciela. Życzymy powodzenia i samych piątek!`;
   instruction.innerHTML = `<span>Instrukcja:</span> <br> 1. Test jest jednokrotnego wyboru. <br> 2. Za każdą poprawną odpowiedź otrzymasz 1 pkt. <br> 3. Gdy już rozwiążesz wszystkie zadania kliknij przycisk "Zakończ test" <br> 4. Aby zdać potrzebujesz minimum 50% punktów.`
}

//Funkcja tworząca pytanie
const createQuestion = () => {
   let drewQuestion = [];
   const workingQuestionArray = arrayOfQuestions.slice();
   for (let h = 0; h < arrayOfQuestions.length; h++) {
      drewQuestion[h] = workingQuestionArray.splice(Math.floor(Math.random() * workingQuestionArray.length), 1)
   }
   //Tworzenie formularza z pytaniami
   for (let i = 0; i < arrayOfQuestions.length; i++) {
      const questionBox = document.createElement('form');
      questionBox.id = "question";
      questionBox.setAttribute("data-number", i);
      testSection.appendChild(questionBox);
      const question = document.createElement('legend');
      questionBox.appendChild(question);
      question.innerHTML = drewQuestion[i][0].question;
      //Losowanie kolejności odpowiedzi.
      let drewAnswer = [];
      const workingArray = arrayOfQuestions[i].answers.slice();
      for (let k = 0; k < arrayOfQuestions[i].answers.length; k++) {
         drewAnswer[k] = workingArray.splice(Math.floor(Math.random() * workingArray.length), 1)
      }
      //Tworzenie inputów z odpowiedziami
      for (let j = 0; j < arrayOfQuestions[i].answers.length; j++) {
         const divFormCheck = document.createElement('div');
         divFormCheck.className = "form-check";
         questionBox.appendChild(divFormCheck);
         const answerInputRadio = document.createElement('input');
         answerInputRadio.setAttribute("type", "radio");
         answerInputRadio.setAttribute("name", "answer");
         divFormCheck.appendChild(answerInputRadio);
         const answerLabel = document.createElement('label');
         answerLabel.classList = "label"
         answerLabel.textContent = drewAnswer[j][0];
         divFormCheck.appendChild(answerLabel);
      }
   }
}

//Funkcja tworząca przycisk kończący test
let buttonEnd = "";
const createButtonEnd = () => {
   const buttonEndTest = document.createElement('button');
   buttonEndTest.id = 'end-test';
   buttonEndTest.textContent = 'Zakończ test';
   buttonEndTest.classList = "btn btn-primary btn-lg";
   testSection.appendChild(buttonEndTest);
   buttonEnd = buttonEndTest;
}

//Funkcja tworząca test
const createTest = function () {
   const testSection = document.createElement('section');
   testSection.id = "testSection";
   testSection.className = "test-section";
   document.body.appendChild(testSection);
   createQuestion();
   createButtonEnd();
}

//FUnkcja pomagająca zaznaczyć odpowiedź
const helpChecked = () => {
   document.querySelectorAll('.form-check').forEach(el => el.addEventListener('click', function () {
      el.children[0].checked = true;
   }));
   console.log(document.querySelectorAll('.form-check'));
}

//Funkcja pobierająca odpowiedzi
const collectAnswer = () => {
   //Pętla po pytaniach
   for (let i = 0; i < arrayOfQuestions.length; i++) {
      const inputs = [...document.querySelectorAll(`form[data-number = "${i}"] .form-check input[type="radio"]`)];
      //Szukanie zaznaczonej odpowiedzi
      const checkedInput = inputs.filter(el => {
         return el.checked == true;
      })
      const parent = checkedInput[0].parentElement;
      const goodAnswer = arrayOfQuestions[i].goodAnswer;
      //Dodawanie punktów
      if (parent.textContent == goodAnswer)
         points++
   }
}

//Funkcja startująca test
const startTest = function (e) {
   e.preventDefault();
   h2.remove();
   form.remove();
   this.remove();
   createTest();
   descriptionForStudent();
   helpChecked();
   buttonEnd.addEventListener('click', endTest);
}

//Funkcja pokazująca wyniki
const showResult = () => {
   instruction.remove();
   const percentResult = Math.floor((points / arrayOfQuestions.length) * 100);
   percentResult >= 50 ? description.innerHTML = `Twój wynik to ${points}/${arrayOfQuestions.length}. Stanowi to ${percentResult}% całości. Gratuluję, zdałeś! Możesz iść na piwo!` : description.innerHTML = `Twój wynik to ${points} punktów na ${arrayOfQuestions.length} możliwych. Stanowi to ${percentResult}% całości. Przykro mi, nie zdałes. Chyba trzeba iść się uczyć do poprawki ;(`
}

//Funkcja kończąca test
const endTest = function (e) {
   e.preventDefault();
   this.style.display = "none";
   collectAnswer();
   showResult();
   document.getElementById('testSection').remove();
   const nextTestButton = document.createElement('button');
   nextTestButton.classList = "btn btn-primary btn-lg btn-position";
   nextTestButton.textContent = "Następny test";
   document.body.appendChild(nextTestButton);
   nextTestButton.addEventListener('click', function () {
      window.location = location.href;
   })
}

sendButton.addEventListener('click', addToObiekt);
addButton.addEventListener('click', createNextAnswer);
startTestButton.addEventListener('click', startTest);