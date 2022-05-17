//Umieść logikę gry
const canvas = document.querySelector('#canva');
const ctx = canvas.getContext('2d');
const gameBox = document.querySelector('.game');
const toolBox = document.querySelector('.tools-drawer');
const tools = toolBox.querySelector('.tools');
const toolsExpand = toolBox.querySelector('.expand');
const fa= toolsExpand.querySelector('.fa-solid');
const colorPicker = tools.querySelector('#color');
const downloadBtn = tools.querySelector('.download');
const clearBtn = tools.querySelector('.fa-trash-can');
const sizeBtn = tools.querySelector('.size');
const sizeDot = sizeBtn.querySelector('.line-size');
let sizeIndex = 0;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    canvas.remove();
    toolBox.remove();
    const error = document.createElement('p');
    error.classList.add('error-message');
    error.textContent = "Gra kolorowanka obecnie nie jest wspierana na urządzeniach mobilnych. Przepraszamy za utrudnienia";
    gameBox.append(error);
   }
   else
   {
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = "#000000";
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth= 10;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
const draw = (e) => {
  if(!isDrawing){
    return;
  }
    ctx.strokeStyle = colorPicker.value;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
}
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) =>{
  isDrawing = true;
  lastX = e.offsetX;
  lastY = e.offsetY;
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);



toolsExpand.addEventListener('click', ()=>{
    tools.classList.toggle('hidden');
    fa.classList.toggle('active');
    toolsExpand.classList.toggle('active-expand');
});
window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
})
sizeBtn.addEventListener('click', () => {
    if(sizeIndex > 2)
    {
        sizeIndex = 0;
    }
    switch (sizeIndex){
        case 0:
            sizeDot.style.width = '10px';
            sizeDot.style.height = '10px';
            ctx.lineWidth = 10;
            break;
        case 1:
            sizeDot.style.width = '15px';
            sizeDot.style.height = '15px';
            ctx.lineWidth = 15;
            break;
        case 2:
            sizeDot.style.width = '20px';
            sizeDot.style.height = '20px';
            ctx.lineWidth = 20;
            break;            
    }
    sizeIndex++;
    })
downloadBtn.addEventListener('click', ()=>{
    console.log('xd');
    const imgSnapshot = canvas.toDataURL();
    downloadBtn.setAttribute('href', imgSnapshot);

});
clearBtn.addEventListener('click', ()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
window.scrollBy(0 ,window.innerHeight);
}

