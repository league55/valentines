import './style.css';

const scenes = [
  {
    image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDd6Y2E4OWF1Y3E2OWgwbzVxbXBxM2t4Ynl1bWx4Y2g5amdyNXV6eCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKMt1VVNkHV2PaE/giphy.gif',
    text: 'Ready for a fun journey?',
    noButtonText: 'Not sure...'
  },
  {
    image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW50M2ptMWN0ZHJqOWJxbzNxdWx0NHZ5Y2ptdWd2NXBxZXgydWx6eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2Sqir5ZxfoS27EvS/giphy.gif',
    text: 'Come on, it will be awesome!',
    noButtonText: 'Still thinking...'
  },
  {
    image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcWRxdWRwY3Zxa2txbWt0MWQ2NnE0Y3h6Y2ptd3k2ZnBxeWQyaXR6eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o7TKoWXm3okO1kgHC/giphy.gif',
    text: 'Just one click away from happiness!',
    noButtonText: 'Maybe later?'
  }
];

const finalScene = {
  image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWN0ZWVkOWR5Y3JyMm9xdWx0NHZ5Y2ptdWd2NXBxZXgydWx6eiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l2Sqir5ZxfoS27EvS/giphy.gif',
  text: '🎉 Yay! Let\'s celebrate! 🎉'
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
          <button class="btn btn-no ${currentSceneIndex === scenes.length - 1 && !hasClickedYes ? 'evasive' : ''}">${sceneData.noButtonText || 'No'}</button>
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

function renderCurrentScene() {
  const app = document.querySelector('#app');
  app.innerHTML = createScene(scenes[currentSceneIndex]);
  setupButtonInteractions();
}

renderCurrentScene();