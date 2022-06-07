let textA = document.getElementById("a_id")
let textB = document.getElementById("b_id")
let textOperator = document.getElementById("operator_id")
let textResult = document.getElementById("result_id")
let textEq = document.getElementById("eq_id")
let button1 = document.getElementById("ans1_button")
let button2 = document.getElementById("ans2_button")
let button3 = document.getElementById("ans3_button")
const resultsTemplate = document.querySelector('.last-screen-template');
const lastScreen = document.querySelector('.last-screen');
const orderedList = document.querySelector('.answer-list')

const equationPar = document.querySelector('.equation');
const btnBox = document.querySelector('.buttonBox');
const scoreText = document.querySelector('.score-text');
const scoreValue = document.querySelector('.score');
const newGameBtn = document.querySelector('#newGame_id');


let correctAnswer
let exampleAnswer

let a
let b

let score = 0
let count = 0

const allButtons = document.querySelectorAll('.buttonBox [type=button]');


allButtons.forEach(btn => btn.addEventListener('click',check));

newGameBtn.addEventListener('click', ()=>{
    allButtons.forEach(btn => btn.disabled);
    count = 0
    score = 0
    lastScreen.style.display = 'none';
    equationPar.style.display = 'block';
    btnBox.style.display = 'block';
    orderedList.innerHTML = "";
    dataBase.splice(0);
    game();
});

function getRandomNumber(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)

    return Math.floor(Math.random() * (max - min)) + min
}


let ans1
let ans2
let ans3


let equationA = []
let equationB = []

class answers {
    constructor(a,op,b,eq, chosenAnswer, correctAnswer){
        this.chosenAnswer = chosenAnswer;
        this.a = a;
        this.op = op;
        this.b = b;
        this.eq = eq;
        this.correctAnswer = correctAnswer;
    }
}

let dataBase = []


function game() {
    
    allButtons.forEach(btn=>{
        btn.disabled = false
    })

    

    for (let i = 0; i < 1; i++) {
        
        textResult.textContent = ""

        a = getRandomNumber(0, 10)
        b = getRandomNumber(0, 10)

        equationA[i] = a
        equationB[i] = b

        
        if(count<5){
            correctAnswer = a + b
            ans1 = getRandomNumber(0, 12)
            ans2 = correctAnswer
            ans3 = getRandomNumber(0, 12)

            while (a === equationA[i - 1] && b === equationB[i - 1]) {
                a = getRandomNumber(0, 10)
                b = getRandomNumber(0, 10)
            }

            while(ans1 === ans2 || ans3 === ans2){
                ans1 = getRandomNumber(0, 12)
                ans3 = getRandomNumber(0, 12)
            }

            while (ans1 === ans3) {
                ans3 = getRandomNumber(0, 12)
            }

            button1.textContent = ans1
            button2.textContent = ans2
            button3.textContent = ans3

            textA.textContent = a
            textOperator.textContent = " + "
            textB.textContent = b
            textEq.textContent = " = "
            
            dataBase.push(new answers(a, "+", b, "=", null, correctAnswer));
    
        }else{
            while(b>=a){
                a = getRandomNumber(0, 10)
                b = getRandomNumber(0, 10)
                while (a === equationA[i - 1] && b === equationB[i - 1]) {
                    a = getRandomNumber(0, 10)
                    b = getRandomNumber(0, 10)
                }
            }
            correctAnswer = a - b
            ans1 = getRandomNumber(0, 12)
            ans2 = correctAnswer
            ans3 = getRandomNumber(0, 12)
            while(ans1 === ans2 || ans3 === ans2 || ans1===ans3){
                ans1 = getRandomNumber(0, 12)
                ans3 = getRandomNumber(0, 12)
                while (a === equationA[i - 1] && b === equationB[i - 1]) {
                    a = getRandomNumber(0, 10)
                    b = getRandomNumber(0, 10)
                }
            }
            
            button1.textContent = ans1
            button2.textContent = ans2
            button3.textContent = ans3

            textA.textContent = a
            textOperator.textContent = " - "
            textB.textContent = b
            textEq.textContent = " = "
            dataBase.push(new answers(a, "-", b, "=", null, correctAnswer));
        }

     
    }
}

game()

function check(e){
    let result = parseInt(e.target.textContent)
    e.target.classList.remove('hover')

    
    chosenAnswer = e.target.textContent


    if(result===correctAnswer){
        allButtons.forEach(btn=>{
            btn.disabled = true
        });
        dataBase[count].chosenAnswer = e.target.textContent;
        textResult.textContent = correctAnswer
        e.target.classList.add('correct')
        setTimeout(function(){
            e.target.classList.add('hover')
            e.target.classList.remove('correct')
            game()
        },1000);
        score++
        count++

    }
    if(e.target.textContent == "NOWA GRA"){
        
    }
    else if(result!=correctAnswer){
        allButtons.forEach(btn=>{
            if(btn.textContent!="NOWA GRA")
            btn.disabled = true
        })
        dataBase[count].chosenAnswer = e.target.textContent;
        e.target.classList.add('wrong')
        setTimeout(function(){
            e.target.classList.remove('wrong')
            e.target.classList.add('hover')
            game()
        },1000);

        count++
    }

    if(count == 10){
        displayAnswers()
    }
}

displayAnswers = () => {

    lastScreen.style.display = 'flex';
    equationPar.style.display = 'none';
    btnBox.style.display = 'none';
    scoreText.textContent = "KONIEC GRY!"
    scoreValue.textContent = `Twój wynik ${score} / 10`;

    for (let i = 0; i < dataBase.length; i++) {
        const answer = document.createElement('li');
        answer.classList.add('list-item');
        let temp = dataBase[i].a.toString();
        let temp2 = dataBase[i].b.toString();

        let concatedString = temp.concat(dataBase[i].op,temp2,dataBase[i].eq);
        answer.textContent = `${concatedString}`;
        const answersContent = resultsTemplate.content.cloneNode(true);
        answersContent.querySelector('.user-answer').textContent = `Twoja odpowiedź: ${dataBase[i].chosenAnswer}`;
        if(dataBase[i].chosenAnswer == dataBase[i].correctAnswer){
            answersContent.querySelector('.result-info').style.color = '#3cc260';
            answersContent.querySelector('.result-info').textContent = ` DOBRZE`;
        }
        else{
            answersContent.querySelector('.result-info').style.color = '#c94242';
            answersContent.querySelector('.result-info').textContent = ` ŹLE`;
        }

        answer.append(answersContent)
        orderedList.appendChild(answer);
    }
}
