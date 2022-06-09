const quizDane = [
    {
        question: "I _ 5 years old.",
        a: "are",
        b: "is",
        c: "You",
        d: "am",
        correct: "d",
    },
    {
        question: "My name _ Ania.",
        a: "am",
        b: "is",
        c: "are",
        d: "I",
        correct: "b",
    },
    {
        question: "One, two, _, four, five.",
        a: "three",
        b: "six",
        c: "zero",
        d: "ten",
        correct: "a",
    },
    {
        question: "The sun is _.",
        a: "green",
        b: "yellow",
        c: "black",
        d: "blue",
        correct: "b",
    },
    {
        question: "I am _ Poland.",
        a: "love",
        b: "from",
        c: "name",
        d: "pink",
        correct: "b",
    },
    {
        question: "Yellow, pink, _, blue.",
        a: "duck",
        b: "like",
        c: "Poland",
        d: "red",
        correct: "d",
    },
    {
        question: "Please, close your _.",
        a: "eyes",
        b: "are",
        c: "is",
        d: "blue",
        correct: "a",
    },
    {
        question: "She _ angry.",
        a: "is",
        b: "pen",
        c: "am",
        d: "blue",
        correct: "a",
    },
    {
        question: "I _ cats.",
        a: "sun",
        b: "like",
        c: "eating",
        d: "from",
        correct: "b",
    },
    {
        question: "What _ your name?",
        a: "is",
        b: "year",
        c: "zero",
        d: "are",
        correct: "a",
    },
];

const quiz = document.querySelector('.box');
const odpB = document.querySelectorAll(".odp");
const questionEl = document.getElementById("question");
const questions = document.querySelector('.questions');
const scoreScreen = document.querySelector('.score-screen');
const scoreText = document.querySelector('.score');
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const nextActionBtn = document.querySelector('.next-action');
let quizA = 0;
let score = 0;

quizLoad();

function quizLoad() {
    disableCheckingState();

    const quizADane = quizDane[quizA];

    questionEl.innerText = quizADane.question;
    a_text.innerText = quizADane.a;
    b_text.innerText = quizADane.b;
    c_text.innerText = quizADane.c;
    d_text.innerText = quizADane.d;
}

function setAnswers() {
    let odp = undefined;

    odpB.forEach((odpC) => {
        if (odpC.checked) {
            odp = odpC.id;
        }
    });

    return odp;
}

function disableCheckingState() {
    odpB.forEach((odpC) => {
        odpC.checked = false;
    });
}

nextActionBtn.addEventListener("click", check);

function check() {
    const odp = setAnswers();

    if (odp) {
        if (odp === quizDane[quizA].correct) {
            score++;
        }

        quizA++;
        if (quizA < quizDane.length) {
            quizLoad();
        } else {
            scoreText.textContent = `Twój wynik: ${score}/${quizDane.length}`;
            nextActionBtn.textContent = 'Od nowa';
            nextActionBtn.removeEventListener('click', check);
            nextActionBtn.addEventListener('click', () => location.reload());
            scoreScreen.classList.remove('hidden');
            questions.classList.add('hidden');
        }
    }
}
