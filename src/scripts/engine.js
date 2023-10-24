
const state = {
   view: {
      squares: document.querySelectorAll('.square'),
      enemy: document.querySelector('.enemy'),
      time: document.getElementById('time'),
      score: document.getElementById('score'),
      start: document.getElementById('start'),
      life: document.getElementById('life'),
      lastScore: document.getElementById('last-score')
   },
   values: {
      hitPosition: 0,
      score: 0,
      currentTime: 10,
      lives: 3
   },
   intervals: {
      randomSquareEnemyInterval: null,
      countDownInterval: null
   }
}
function playSound(){
   const audio = new Audio('/src/sound/hit.m4a')
   audio.volume = 0.1
   audio.play()
}
function hitBox(){
   state.view.squares.forEach((s)=>{
      s.addEventListener('mousedown', ()=>{
         if(s.id === state.values.hitPosition){
            state.values.score++
            state.view.score.textContent = state.values.score
            state.values.hitPosition = null
            playSound()
         }
      })
   })
}
function randomSquareEnemy(){
   state.view.squares.forEach((s)=>{
      s.classList.remove('enemy')
   })
   const randomNumber = Math.round(Math.random() * 9)
   const randomSquare = state.view.squares[randomNumber]
   randomSquare.classList.add('enemy')
   state.values.hitPosition = randomSquare.id
}
function reset(){
   clearInterval(state.intervals.countDownInterval)
   clearInterval(state.intervals.randomSquareEnemyInterval)
   state.view.time.textContent = 'Time gone'
   state.view.lastScore.textContent = `Last Score - ${state.values.score}pts`
   state.values.currentTime = 11
   state.values.score = 0
   state.view.score.textContent = state.values.score
   state.view.start.classList.toggle('displayNone')
   state.view.score.classList.toggle('displayNone')
}
function countDown(){
   state.values.currentTime--
   state.view.time.textContent = state.values.currentTime
   if( state.values.currentTime <=0){
      reset()
   }
}
// function wrongHit(){
//    state.view.squares.forEach((s)=>{
//       s.addEventListener('mousedown', ()=>{
//          if(s.id !== state.values.hitPosition){
//             if(state.values.lives === 0){
//             reset()
//             state.values.lives = 3
//             state.view.life.textContent = state.values.lives
//             state.view.time.textContent = 'Game Over'
//             } else{
//                state.values.lives--
//                state.view.life.textContent = state.values.lives
//             }
//          }
//       })
//    })
// }

function init(){
   state.view.lastScore.textContent = `Your score`
   hitBox()
   // wrongHit()
   state.intervals.randomSquareEnemyInterval = setInterval(randomSquareEnemy, 1000)
   state.intervals.countDownInterval = setInterval(countDown, 1000)
   state.view.start.classList.toggle('displayNone')
   state.view.score.classList.toggle('displayNone')
}
state.view.start.addEventListener('click', ()=>{
   init()
})











