const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;

const mainPreview = document.querySelector('.img-upload__preview > img');
const scaleFieldset = document.querySelector('.img-upload__scale');
const scaleValue = scaleFieldset.querySelector('.scale__control--value');
const scaleDownControl = scaleFieldset.querySelector('.scale__control--smaller');
const scaleUpControl = scaleFieldset.querySelector('.scale__control--bigger');

const setScale = (value) => {
  if (value < SCALE_MIN) {
    value = SCALE_MIN;
  } else if (value > SCALE_MAX) {
    value = SCALE_MAX;
  }

  scaleValue.value = `${value}%`;
  mainPreview.style.transform = `scale(${value / 100})`;
};

const setScaleHandlers = () => {
  scaleDownControl.addEventListener('click', () => {
    const scaleAfterClick = parseInt(scaleValue.value, 10) - SCALE_STEP;

    setScale(scaleAfterClick);
  });

  scaleUpControl.addEventListener('click', () => {
    const scaleAfterClick = parseInt(scaleValue.value, 10) + SCALE_STEP;

    setScale(scaleAfterClick);
  });
};

export { setScaleHandlers };
