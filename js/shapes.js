const qaDataBase =[
    {
        questionId: 1,
        question: "Jaka to figura?",
        questionImage: 'kwadrat.jpg',
        answers: ["Kwadrat", "Prostokąt", "Romb", "Koło"],
        chosenAnswer: '',
        correctAnswer: "Kwadrat"
    },
    {
        questionId: 2,
        question: "Jaka to figura?",
        questionImage: 'prostokat.png',
        answers: ["Kwadrat", "Prostokąt", "Trapez", "Koło"],
        chosenAnswer: '',
        correctAnswer: "Prostokąt"
    },
    {
        questionId: 3,
        question: "Jaka to figura?",
        questionImage: 'kolo.png',
        answers: ["Kwadrat", "Trapez", "Trójkąt", "Koło"],
        chosenAnswer: '',
        correctAnswer: "Koło"
    },
    {
        questionId: 4,
        question: "Jaka to figura?",
        questionImage: 'trojkat.jpg',
        answers: ["Trójkąt", "Trapez", "Romb", "Koło"],
        chosenAnswer: '',
        correctAnswer: "Trójkąt"
    },
    {
        questionId: 5,
        question: "Jakie długości boków ma ta figura?",
        questionImage: 'kwadrat.jpg',
        answers: ["Równe", "Róźne", "Parami równe", "Wszystkie są poprawne"],
        chosenAnswer: '',
        correctAnswer: "Równe"  
    },
    {
        questionId: 6,
        question: "Ile ta figura ma boków?",
        questionImage: 'trojkat.jpg',
        answers: ["1", "2", "3", "5"],
        chosenAnswer: '',
        correctAnswer: "3"  
    },
    {
        questionId: 7,
        question: "Ile ta figura ma boków?",
        questionImage: 'kolo.png',
        answers: ["Nie ma", "1", "4", "Inna odpowiedź"],
        chosenAnswer: '',
        correctAnswer: "Nie ma"  
    },
    ];
// const answerBtns = document.querySelectorAll('.answer');
// const img = document.querySelector('.image-box img');
// const questionNode = document.querySelector('.question:first-child');
// const _path = '../img/shapes/';
// let round = 0;
// let score = 0;
// const prepareRound = (round = 0) => {
//     img.setAttribute('src', `${_path}${qaDataBase[round].questionImage}`);
//     questionNode.textContent = qaDataBase[round].question;
//     const fillArr = randomizeAnswers(round);
//     answerBtns.forEach((btn, i) => btn.textContent = fillArr[i]);
// }
// const randomizeAnswers = (round = 0) => {
//     const tempArr =[];
//     while (tempArr.length !=4) {
//         let randomIndex = Math.floor(Math.random() * 4);
//         if(!tempArr.includes(qaDataBase[round].answers[randomIndex])){
//             tempArr.push(qaDataBase[round].answers[randomIndex]);
//         }
//     }
//     return tempArr;
// }
// const checkAnswer = (e) => {
//     if(e.target.textContent === qaDataBase[round].correctAnswer){
//         score++;
//         console.log("git");
//         round++;
//         if (round > 6) {
//             alert("Twój wynik to: " + score + " poprawnych odpowiedzi!")
//             return score;
//         } 
//         setTimeout(prepareRound.bind(null, round), 1000);
//     }
//     else{
//         console.log(qaDataBase[round].answers);

//     }
// }
// answerBtns.forEach(btn => btn.addEventListener('click', checkAnswer));
// prepareRound(round);

const answerBtns = document.querySelectorAll('[data-answer]');
const restartBtn = document.querySelector('.new-game');
const img = document.querySelector('.image-box img');
const imageBox = img.parentNode; 
const questionNode = document.querySelector('.question:first-child');
const questionBox  = document.querySelector('.question-box');
const answerBox = document.querySelector('.answer-box');
const lastScreen = document.querySelector('.last-screen');
const newGameBtn = document.querySelector('.new-game');
const _path = '../img/shapes/';
const resultsTemplate = document.querySelector('.last-screen-template');

const orderedList = document.querySelector('.answer-list')


let round = 0, score = 0
const prepareRound = (round = 0) => {
    if (round > (qaDataBase.length - 1)) {
        questionBox.style.display = 'none';
        answerBox.style.display = 'none';
        imageBox.style.display = 'none';
        lastScreen.style.display = 'flex';
        const scoreText = document.querySelector('.score-text');
        const scoreValue = document.querySelector('.score');
        if (score === 0) {
            scoreText.textContent = "Chyba klikałeś losowe guziki...";
        } else if(score > 0 && score <3){
            scoreText.textContent = "Musisz się nieco bardziej postarać. Spróbuj ponownie klikając 'Rozpocznij od nowa'";
        }
        else if(score >=3 && score < 5){
            scoreText.textContent = "Idzie ci już całkiem nieźle, ale jeszcze nieco Ci brakuje. Spróbuj ponownie klikając 'Rozpocznij od nowa'";     
        }
        else if(score >=5 && score < 7){
            scoreText.textContent = "Świetnie Ci idzie, ale czy zdobędziesz wszystkie punkty? Spróbuj ponownie klikając 'Rozpocznij od nowa'";
        }
        else if(score === 7){
            scoreText.textContent = "Brawo! Jesteś mistrzem figur!";
        }
        scoreValue.textContent = `Twój wynik ${score}/7`;
        displayAnswers();
        return;
    }
    img.setAttribute('src', `${_path}${qaDataBase[round].questionImage}`);
    questionNode.textContent = qaDataBase[round].question;
    const fillArr = randomizeAnswers(round);
    answerBtns.forEach((btn, i) => {
        btn.textContent = fillArr[i];
        btn.disabled = false;
    });
    displayAnswers = () => {
        for (let i = 0; i < qaDataBase.length; i++) {
            const answer = document.createElement('li');
            answer.classList.add('list-item');
            answer.textContent = `${qaDataBase[i].question}`;
            const answersContent = resultsTemplate.content.cloneNode(true);
            answersContent.querySelector('.user-answer').textContent = `Twoja odpowiedź: ${qaDataBase[i].chosenAnswer}`;
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
    if(e.target.textContent === qaDataBase[round].correctAnswer){
        e.target.classList.add('correct');
        e.target.classList.remove('hover');
        score++;
        round++;
        setTimeout(()=> {
            e.target.classList.remove('correct')
            e.target.classList.add('hover');
        }, 1000);
        answerBtns.forEach(btn => btn.disabled = true);
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
});
prepareRound(round);