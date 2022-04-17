const field = document.querySelector('.field');
const info = document.querySelector('.info');
let cardValue1 = false;
let cardValue2 = false;
let counterEndLvl = 0;
let lvl = 1;
let score = 5;
let error = 0;

info.innerHTML = 'Уровень ' + lvl;
document.querySelector('.text-score').innerHTML = 'Ваши очки ' + score;

createMap(lvl);
field.addEventListener('click' , turnCard);

function turnCard(e) {
  if (e.target.classList.contains('front') ) {
    let target = e.target;
      if (cardValue1 === false) {
        cardValue1 = target;
      } else {
        cardValue2 = target;
      }

    target.parentNode.firstChild.classList.add('frontY');
    target.parentNode.lastChild.classList.add('backY');
    field.removeEventListener('click',turnCard);

    
      setTimeout(() => {

        if (cardValue2) {
        
          if (cardValue1.parentNode.lastChild.innerHTML !== cardValue2.parentNode.lastChild.innerHTML) {
          cardValue1.parentNode.firstChild.classList.remove('frontY');
          cardValue1.parentNode.lastChild.classList.remove('backY');
          target.parentNode.firstChild.classList.remove('frontY');
          target.parentNode.lastChild.classList.remove('backY');
          changeScore(1,'-');
        } else {
          counterEndLvl++;
          changeScore(3,'+');
        }

         cardValue1 = false;
         cardValue2 = false;
        
          if (counterEndLvl * 2 === lvl*6) {
            field.innerHTML = '';
            lvl++;
            changeScore(lvl * 5,'+');
            createMap(lvl);
            counterEndLvl = 0;
            info.innerHTML = 'Уровень ' + lvl;
          }
        }
        document.querySelector('.text-score').innerHTML = 'Ваши очки ' + score;
        gameOver(score);
        field.addEventListener('click' , turnCard);
      },1000);
    
  }
}

function createMap(lvl) {
  
  let arr = createArr(lvl);

  for (let i = 0; i < lvl * 6; i++) {
    const card = document.createElement('div');
    card.classList.add('card');
    field.append(card);

    const front = document.createElement('div');
    front.classList.add('front');
    card.append(front);

    const back = document.createElement('div');
    back.classList.add('back');
    back.innerHTML = arr[i];
    card.append(back);
  }
  
}

function createArr(lvl) {
  let arr = [];
  for (let i = 0; i < lvl * 3;i++) {
    arr.push(i+1);
    arr.push(i+1);

  }
  for (let i = 0;i < 10 * lvl;i++) {
    arr.sort(() => {
      return Math.random() - 0.5;
    });
  }
  return arr;
}

function changeScore(changeScore, sign) {
  const change = document.querySelector('.change-score');
  if (sign === '+') {
    score += changeScore;
    change.classList.add('green');
    error = 0;
  } else if (sign === '-') {
    if(error > 2) {
      changeScore *= 2;
      if(error > 5) {
        changeScore *= 2;
        if(error > 10) {
          changeScore *= 2;
          if(error > 20) {
            changeScore *= 2;
          } 
        } 
      } 
    } 
    score -= changeScore;
    change.classList.add('red');
    error++;
   
  }
 change.innerHTML = sign + changeScore;

 setTimeout(() => {
  change.innerHTML = '';
  change.classList.remove('green','red');
 }, 1000);
}

function gameOver(score) {
  if (score < 0) {
    field.innerHTML = '';
    info.innerHTML = 'Вы проиграли';
    document.querySelector('.change-score').innerHTML = '';
    document.querySelector('.text-score').innerHTML = '';
    newGame();
  }
}

function newGame() {
  const newGame = document.createElement('button');
    newGame.classList.add('new-game');
    newGame.innerHTML = 'Новая игра';
    field.append(newGame);
    lvl = 1;
    error = 0;
    newGame.addEventListener('click',()=> {
      createMap(lvl);
      score = 5;
      info.innerHTML = 'Уровень ' + lvl;
      document.querySelector('.text-score').innerHTML = 'Ваши очки ' + score;
      newGame.remove();
    });
}