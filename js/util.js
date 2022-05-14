const helpBtn = document.querySelector('.setting-help');
const settingBtn = document.querySelector('.setting-cog');
const settingsBox = document.querySelector('.settings')
helpBtn.addEventListener('click', () => {
    console.log("%cTrzeba będzie przygotować pomoc", "color:red");
})
settingBtn.addEventListener('click', ()=>{
    settingsBox.classList.toggle('active');
})