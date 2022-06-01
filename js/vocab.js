const qaDataBase =[
    {
        questionId: 1,
        question: "Look at the picture. What do you see?",
        questionPolish: "Spójrz na obrazek, Co na nim widzisz?",
        questionImage: 'oranges.jpg',
        answers: ["Apples", "Lemons", "Oranges", "Watermelons"],
        chosenAnswer: '',
        correctAnswer: "Oranges"
    },
    {
        questionId: 2,
        question: "Look at the picture. What do you see?",
        questionPolish: "Spójrz na obrazek, Co na nim widzisz?",
        questionImage: 'ship.jpg',
        answers: ["Car", "Ship", "Plane", "Train"],
        chosenAnswer: '',
        correctAnswer: "Ship"
    },
    {
        questionId: 3,
        question: "This girl is wearing a dress. What colour of that dress is?",
        questionPolish: "Ta dziewczynka nosi sunkienkę. Jakiego koloru jest ta sukienka?",
        questionImage: 'red.jpg',
        answers: ["Red", "Green", "Blue", "Yellow"],
        chosenAnswer: '',
        correctAnswer: "Red"
    },
    {
        questionId: 4,
        question: "What are the toys?",
        questionPolish: "Co to za zabawki?",
        questionImage: 'dolls.jpg',
        answers: ["Bricks", "Teddy Bear", "Doll", "Play-doh"],
        chosenAnswer: '',
        correctAnswer: "Doll"
    },
    {
        questionId: 5,
        question: "What plant is in the picture?",
        questionPolish: "Co to za roślina na obrazku?",
        questionImage: 'tree.jpg',
        answers: ["Tree", "Flower", "Bush", "Grass"],
        chosenAnswer: '',
        correctAnswer: "Tree"  
    },
    {
        questionId: 6,
        question: "What school tool is in the red circle?",
        questionPolish: "Jaki przybór szkolny jest zaznaczony czerwonym kółkiem?",
        questionImage: 'school.jpg',
        answers: ["Pen", "Book", "Pencil", "Ruler"],
        chosenAnswer: '',
        correctAnswer: "Ruler"
    },
    {   
        questionId: 7,
        question: "He is a son. She is a",
        questionPolish: "On jest synem, a ona jest dla niego",
        questionImage: 'mum.jpg',
        answers: ["Mum", "Dad", "Grandma", "Grandpa"],
        chosenAnswer: '',
        correctAnswer: "Mum"
    },
    {
        questionId: 8,
        question: "Look at the picture. What animal is there?",
        questionPolish: "Spójrz na obrazek. Jakie zwierzę tam jest?",
        questionImage: 'horse.jpg',
        answers: ["Pig", "Cow", "Horse", "Hen"],
        chosenAnswer: '',
        correctAnswer: "Horse"
    },
    {
        questionId: 9,
        question: "This girl is throwing a stick for the animal. What animal is it?",
        questionPolish: "Dziewczynka rzuca kijem dla zwierzaka. Co to za zwierzak?",
        questionImage: 'dog.jpg',
        answers: ["Dog", "Cat", "Hamster", "Fishes"],
        chosenAnswer: '',
        correctAnswer: "Dog"
    },
    {
        questionId: 10,
        question: "It is so cold! When is so cold?",
        questionPolish: "Jest strasznie zimno! Kiedy jest tak zimno?",
        questionImage: 'winter.png',
        answers: ["Spring", "Summer", "Autumn", "Winter"],
        chosenAnswer: '',
        correctAnswer: "Winter"
    }];
const answerBtns = document.querySelectorAll('[data-answer]');
const restartBtn = document.querySelector('.new-game');
const img = document.querySelector('.image-box img');
const imageBox = img.parentNode; 
const questionNode = document.querySelector('.question:first-child');
const questionBox  = document.querySelector('.question-box');
const answerBox = document.querySelector('.answer-box');
const lastScreen = document.querySelector('.last-screen');
const newGameBtn = document.querySelector('.new-game');
const translateBtn = document.querySelector('.trl-btn');
const _path = '../img/vocab/';
const resultsTemplate = document.querySelector('.last-screen-template');

const orderedList = document.querySelector('.answer-list')


let round = 0, score = 0, pulseInterval, pulseTimeout;
const prepareRound = (round = 0) => {
    if (round > 9) {
        questionBox.style.display = 'none';
        answerBox.style.display = 'none';
        imageBox.style.display = 'none';
        lastScreen.style.display = 'flex';
        const scoreText = document.querySelector('.score-text');
        const scoreValue = document.querySelector('.score');
        if (score === 0) {
            scoreText.textContent = "Chyba klikałeś losowe guziki...";
        } else if(score > 0 && score <4){
            scoreText.textContent = "Musisz się nieco bardziej postarać. Spróbuj ponownie klikając 'Rozpocznij od nowa'";
        }
        else if(score >=4 && score < 7){
            scoreText.textContent = "Idzie ci już całkiem nieźle, ale jeszcze nieco Ci brakuje. Spróbuj ponownie klikając 'Rozpocznij od nowa'";     
        }
        else if(score >=7 && score < 10){
            scoreText.textContent = "Świetnie Ci idzie, ale czy zdobędziesz wszystkie punkty? Spróbuj ponownie klikając 'Rozpocznij od nowa'";
        }
        else if(score === 10){
            scoreText.textContent = "Brawo! Jesteś mistrzem słówek!";
        }
        scoreValue.textContent = `Twój wynik ${score}/10`;
        displayAnswers();
        return;
    }
    img.setAttribute('src', `${_path}${qaDataBase[round].questionImage}`);
    questionNode.textContent = qaDataBase[round].question;
    const fillArr = randomizeAnswers(round);
    answerBtns.forEach((btn, i) => btn.textContent = fillArr[i]);
    pulseInterval = setInterval(() => {
        translateBtn.classList.add('animate__animated')
        translateBtn.classList.add('animate__heartBeat');
    pulseTimeout = setTimeout(()=>{
            translateBtn.classList.remove('animate__animated');
            translateBtn.classList.remove('animate__heartBeat');
        }, 3000)
    }, 15000)
    displayAnswers = () => {
        for (let i = 0; i < qaDataBase.length; i++) {
            const answer = document.createElement('li');
            answer.classList.add('list-item');
            answer.textContent = `${qaDataBase[i].question}`;
            const answersContent = resultsTemplate.content.cloneNode(true);
            answersContent.querySelector('.user-answer').textContent = `Twoja odpowiedź: ${qaDataBase[i].chosenAnswer}`;
            answersContent.querySelector('.result-info').style.fontWeight = '700';
            if(qaDataBase[i].chosenAnswer == qaDataBase[i].correctAnswer){
                answersContent.querySelector('.result-info').style.color = '#3cc260';
                answersContent.querySelector('.result-info').textContent = `DOBRZE`;
            }
            else{
                answersContent.querySelector('.result-info').style.color = '#c94242';
                answersContent.querySelector('.result-info').textContent = `ŹLE`;
            }
            
            answer.append(answersContent)
            orderedList.appendChild(answer);
            
        }
    }
}
const randomizeAnswers = (round = 0) => {
    const tempArr =[];
    while (tempArr.length !=4) {
        let randomIndex = Math.floor(Math.random() * 4);
        if(!tempArr.includes(qaDataBase[round].answers[randomIndex])){
            tempArr.push(qaDataBase[round].answers[randomIndex]);
        }
    }
    return tempArr;
}
const checkAnswer = (e) => {
    qaDataBase[round].chosenAnswer = e.target.textContent;
    clearInterval(pulseInterval);
    clearTimeout(pulseTimeout);
    if(e.target.textContent === qaDataBase[round].correctAnswer){
        e.target.classList.add('correct');
        e.target.classList.remove('hover');
        score++;
        round++;
        setTimeout(()=> {
            e.target.classList.remove('correct')
            e.target.classList.add('hover');
        }, 1000);
        setTimeout(prepareRound.bind(null, round), 1000);
    }
    else{
        round++;
        e.target.classList.add('wrong');
        e.target.classList.remove('hover');
        setTimeout(()=> {
            e.target.classList.remove('wrong')
            e.target.classList.add('hover');
        }, 1000);
        setTimeout(prepareRound.bind(null, round), 1000);
    }
}

answerBtns.forEach(btn => btn.addEventListener('click', checkAnswer));
newGameBtn.addEventListener('click', () => {
    round = 0;
    score = 0;
    questionBox.style.display = 'flex';
    answerBox.style.display = 'flex';
    imageBox.style.display = 'block';
    lastScreen.style.display = 'none';
    orderedList.textContent = ''
    prepareRound(round);
})
prepareRound(round);