import './style.css';

const scenes = [
  {
    image: 'https://media.giphy.com/media/e1Tf1eOo6976zuGv3C/giphy.gif?cid=790b7611lumg1gi9vx7myjyp7qu1qcxryucswdqjufsdvqlv&ep=v1_gifs_search&rid=giphy.gif',
    text: 'Will you be my valentine?',
    noButtonText: 'Don\'t do this to me...'
  },
  {
    image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDIwYjZqMTVqdzZ3dDhneHliaGZjOXYxMnZnczN3ZXRsM2preDR2aSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/GwskZm1jXg8cDvuZJ6/giphy.gif',
    text: 'Will you be my valentine?',
    noButtonText:  'You are breaking my heart'
  },
  {
    image: 'https://media.giphy.com/media/l2R0cE5EqO3QHiCoU/giphy.gif?cid=790b76110a6v5b29ss0txc1isg39rqaa43w4apb33xxxi6bc&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    text: 'Will you be my valentine?',
    noButtonText:'Pookie pleaaaaase'
  },
  {
    image: 'https://media.giphy.com/media/YZOsKxJfmvzG0/giphy.gif?cid=790b7611tq4cxvct7nxtnrb9vtbzix9ijdrffax6vnqtgls4&ep=v1_gifs_search&rid=giphy.gif&ct=g',
    text: 'Will you be my valentine?',
    noButtonText:  "Are you sure?"
  }
];

const finalScene = {
  image: 'https://media.giphy.com/media/l4pTdcifPZLpDjL1e/giphy.gif?cid=ecf05e47nygz62ttr6e0mpr6lngzb9837cmli4kdf1v9fg7e&ep=v1_gifs_search&rid=giphy.gif&ct=g',
  text: '🎉 Yay! xoxo 🎉'
};

let currentSceneIndex = 0;
let hasClickedYes = false;

function createScene(sceneData) {
  return `
    <div class="container">
      <div class="image-container">
        <img src="${sceneData.image}" alt="Scene image">
      </div>
      <div class="text-content">${sceneData.text}</div>
      ${sceneData === finalScene ? '' : `
        <div class="button-container">
          <button class="btn btn-no ${currentSceneIndex === scenes.length - 1 && !hasClickedYes ? '' : ''}">${sceneData.noButtonText || 'No'}</button>
          <button class="btn btn-yes">Yes!</button>
        </div>
      `}
    </div>
  `;
}

function showNextScene() {
  currentSceneIndex++;
  if (currentSceneIndex >= scenes.length) {
    currentSceneIndex = 0;
  }
  renderCurrentScene();
}

function showFinalScene() {
  hasClickedYes = true;
  document.querySelector('#app').innerHTML = createScene(finalScene);
}

function setupButtonInteractions() {
  const noButton = document.querySelector('.btn-no');
  const yesButton = document.querySelector('.btn-yes');
  if(noButton) {
    if(currentSceneIndex == scenes.length - 1) {
      makeButtonEvasive();
    }
  }
  if (noButton && yesButton) {
    noButton.addEventListener('click', showNextScene);
    yesButton.addEventListener('click', showFinalScene);

    // Add continuous jumping animation when hovering over no button
    noButton.addEventListener('mouseenter', () => {
      yesButton.classList.add('jumping');
    });

    noButton.addEventListener('mouseleave', () => {
      yesButton.classList.remove('jumping');
    });
  }
}
function getRandomDirection(buttonRect) {
      const directions = [
        { left: buttonRect.left + buttonRect.width + 20, top: buttonRect.top - buttonRect.height - 30 }, // upright
        { left: buttonRect.left - buttonRect.width - 20, top: buttonRect.top - buttonRect.height - 30 }, // upleft
        { left: buttonRect.left + buttonRect.width + 20, top: buttonRect.top + buttonRect.height + 30 }, // downright
        { left: buttonRect.left - buttonRect.width - 20, top: buttonRect.top + buttonRect.height + 30 }  // downleft
      ];
      return directions[Math.floor(Math.random() * directions.length)];
}


function makeButtonEvasive() {
  const noButton = document.querySelector('.btn-no');

  noButton.addEventListener('mouseenter', () => { 
    const button = document.querySelector('.btn-no');
    const buttonRect = button.getBoundingClientRect();
    let randomDirection;
    do {
      randomDirection = getRandomDirection(buttonRect);
    } while(!(
      randomDirection.left >= 0 && 
      randomDirection.top >= 0 && 
      randomDirection.left + buttonRect.width <= window.innerWidth && 
      randomDirection.top + buttonRect.height <= window.innerHeight)
    )
    
    button.style.position = 'absolute';
    button.style.left = `${randomDirection.left}px`;
    button.style.top = `${randomDirection.top}px`;
    button.removeEventListener('click')
  });
}

function renderCurrentScene() {
  const app = document.querySelector('#app');
  app.innerHTML = createScene(scenes[currentSceneIndex]);
  setupButtonInteractions();
}

renderCurrentScene();