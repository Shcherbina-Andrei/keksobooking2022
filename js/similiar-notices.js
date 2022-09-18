const mapElement = document.querySelector('.map__canvas');
const noticeTemplateElement = document.querySelector('#card').content.querySelector('.popup');

const noticesFragment = document.createDocumentFragment();

const displayNotices = function (notices) {
  notices.forEach((notice) => {
    const noticeElement = noticeTemplateElement.cloneNode(true);
    noticeElement.querySelector('.popup__title').textContent = notice.offer.title;
    noticeElement.querySelector('.popup__text').textContent = notice.offer.address;
    noticeElement.querySelector('.popup__text--price').textContent = `${notice.offer.price} ₽/ночь`;
    let typeHome;
    switch (notice.offer.type) {
      case 'palace' :
        typeHome = 'Дворец';
        break;
      case 'house' :
        typeHome = 'Дом';
        break;
      case 'bungalow' :
        typeHome = 'Бунгало';
        break;
      case 'hotel' :
        typeHome = 'Отель';
        break;
      case 'flat' :
        typeHome = 'Квартира';
        break;
    }
    noticeElement.querySelector('.popup__type').textContent = typeHome;
    noticeElement.querySelector('.popup__text--capacity').textContent = `${notice.offer.rooms} комнаты для ${notice.offer.guests} гостей`;
    noticeElement.querySelector('.popup__text--time').textContent = `Заезд после ${notice.offer.checkin}, выезд до ${notice.offer.checkout}`;
    const featuresList = noticeElement.querySelectorAll('.popup__feature');
    featuresList.forEach((element) => {
      const isNecessary = notice.offer.features.some((feature) => element.classList.contains(`popup__feature--${feature}`));
      if (!isNecessary) {
        element.remove();
      }
    });
    noticeElement.querySelector('.popup__description').textContent = notice.offer.description;
    const photoContainer = noticeElement.querySelector('.popup__photos');
    noticeElement.querySelector('.popup__photo').remove();
    notice.offer.photos.forEach((photo) => {
      const photoCard = noticeTemplateElement.querySelector('.popup__photo').cloneNode(true);

      photoCard.src = photo;
      photoContainer.appendChild(photoCard);
    });
    noticeElement.querySelector('.popup__avatar').src = notice.author.avatar;
    noticesFragment.appendChild(noticeElement);
  });
  mapElement.appendChild(noticesFragment);
};

export {displayNotices};
