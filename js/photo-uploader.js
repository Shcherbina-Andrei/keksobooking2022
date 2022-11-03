const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser = document.querySelector('#avatar');
const photoRoomChooser = document.querySelector('#images');
const avatarPreview = document.querySelector('.ad-form-header__preview').querySelector('img');
const photoRoomPreview = document.querySelector('.ad-form__photo');

photoRoomChooser.addEventListener('change', () => {
  const file = photoRoomChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const image = document.createElement('img');
    image.src = URL.createObjectURL(file);
    image.width = '70';
    image.height = '70';
    photoRoomPreview.append(image);
  }
});

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  }
});

const resetPhotoRoom = function() {
  photoRoomPreview.querySelector('img').remove();
};

const resetAvatar = function() {
  avatarChooser.value = '';
  avatarPreview.src = 'img/muffin-grey.svg';
};

export {resetPhotoRoom, resetAvatar};
