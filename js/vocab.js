const qaDataBase =[
    {
        questionId: 1,
        question: "Look at the picture. What do you see?",
        questionImage: 'oranges.jpg',
        answers: ["Apples", "Lemons", "Oranges", "Watermelons"],
        correctAnswer: "Oranges"
    },
    {
        questionId: 2,
        question: "Look at the picture. What do you see?",
        questionImage: 'ship.jpg',
        answers: ["Car", "Ship", "Plane", "Train"],
        correctAnswer: "Ship"
    },
    {
        questionId: 3,
        question: "This girl is wearing a dress. What colour of that dress is?",
        questionImage: 'red.jpg',
        answers: ["Red", "Green", "Blue", "Yellow"],
        correctAnswer: "Red"
    },
    {
        questionId: 4,
        question: "What are the toys?",
        questionImage: 'dolls.jpg',
        answers: ["Bricks", "Teddy Bear", "Doll", "Play-doh"],
        correctAnswer: "Doll"
    },
    {
        questionId: 5,
        question: "What plant is in the picture?",
        questionImage: 'tree.jpg',
        answers: ["Tree", "Flower", "Bush", "Grass"],
        correctAnswer: "Tree"  
    },
    {
        questionId: 6,
        question: "What school tool is in the red circle?",
        questionImage: 'school.jpg',
        answers: ["Pen", "Book", "Pencil", "Ruler"],
        correctAnswer: "Ruler"
    },
    {   
        questionId: 7,
        question: "He is a son. She is a",
        questionImage: 'mum.jpg',
        answers: ["Mum", "Dad", "Grandma", "Grandpa"],
        correctAnswer: "Mum"
    },
    {
        questionId: 8,
        question: "Look at the picture. What animal is there?",
        questionImage: 'horse.jpg',
        answers: ["Pig", "Cow", "Horse", "Hen"],
        correctAnswer: "Horse"
    },
    {
        questionId: 9,
        question: "This girl is throwing a stick for the animal. What animal is it?",
        questionImage: 'dog.jpg',
        answers: ["Dog", "Cat", "Hamster", "Fishes"],
        correctAnswer: "Dog"
    },
    {
        questionId: 10,
        question: "It is so cold! When is so cold?",
        questionImage: 'winter.png',
        answers: ["Spring", "Summer", "Autumn", "Winter"],
        correctAnswer: "Winter"
    }];
const answerBtns = document.querySelectorAll('[data-answer]');
const restartBtn = document.querySelector()
const img = document.querySelector('.image-box img');
const questionNode = document.querySelector('.question:first-child');
const _path = '../img/vocab/';
let round = 0, score = 0;
const prepareRound = (round = 0) => {
    if (round > 9) {
        console.log('koniec');
        return;
    }
    img.setAttribute('src', `${_path}${qaDataBase[round].questionImage}`);
    questionNode.textContent = qaDataBase[round].question;
    const fillArr = randomizeAnswers(round);
    answerBtns.forEach((btn, i) => btn.textContent = fillArr[i]);
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
    if(e.target.textContent === qaDataBase[round].correctAnswer){
        e.target.classList.add('correct');
        e.target.classList.remove('hover');

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
prepareRound(round);