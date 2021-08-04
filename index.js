const tasksListElement = document.querySelector(`.tasks__list`);
const taskElements = tasksListElement.querySelectorAll(`.tasks__item`);

// Перебираем все элементы списка и присваиваем нужное значение
// Свойство draggable можно поставить вручную в .html файле
for (const task of taskElements) {
  task.draggable = true;
}

// Событие начала перетаскивания, к элементу, который мы перетаскиваем добавляем класс selected
tasksListElement.addEventListener(`dragstart`, (evt) => {
  evt.target.classList.add(`selected`);
});

// Событие конца перетаскивания, у элемента, которого мы закончили перетаскивать удаляем класс selected
tasksListElement.addEventListener(`dragend`, (evt) => {
  evt.target.classList.remove(`selected`);
});

// функция, которая будет возвращать тот элемент, перед которым нужно сделать вставку
const getNextElement = (cursorPosition, currentElement) => {
  // Получаем объект с размерами и координатами
  const currentElementCoord = currentElement.getBoundingClientRect();
  // Находим вертикальную координату центра текущего элемента
  const currentElementCenter =
    currentElementCoord.y + currentElementCoord.height / 2;

  // Если курсор ниже центра элемента, возвращаем текущий элемент
  // В ином случае — следующий DOM-элемент
  const nextElement =
    cursorPosition < currentElementCenter
      ? currentElement
      : currentElement.nextElementSibling;

  return nextElement;
};

tasksListElement.addEventListener(`dragover`, (evt) => {
  evt.preventDefault();

  const activeElement = tasksListElement.querySelector(`.selected`);
  const currentElement = evt.target;
  const isMoveable =
    activeElement !== currentElement &&
    currentElement.classList.contains(`tasks__item`);

  if (!isMoveable) {
    return;
  }

  // evt.clientY — вертикальная координата курсора в момент, когда сработало событие
  const nextElement = getNextElement(evt.clientY, currentElement);

  // Проверяем, нужно ли менять элементы местами
  if (
    (nextElement && activeElement === nextElement.previousElementSibling) ||
    activeElement === nextElement
  ) {
    // Если нет, выходим из функции, чтобы избежать лишних изменений в DOM
    return;
  }

  tasksListElement.insertBefore(activeElement, nextElement);
});
