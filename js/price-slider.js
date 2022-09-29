const sliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement, {
  range: {
    min : 0,
    max: 100000,
  },
  start: 0,
  step: 500,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from : function (value) {
      return Number(value);
    }
  }
});

const watchChangePriceSlider = function (element) {
  sliderElement.noUiSlider.on('update', () => {
    element.value = sliderElement.noUiSlider.get();
  });
};


const changeMinPriceSlider = function (price) {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: price,
      max: 100000
    },
    start: price
  });
};

export {watchChangePriceSlider, changeMinPriceSlider};
