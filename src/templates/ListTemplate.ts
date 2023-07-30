import FullList from "../model/FullList";

interface DOMList {
  ul: HTMLUListElement;
  weekdayElement: HTMLHeadingElement;
  dateElement: HTMLSpanElement;
  tasksCountElement: HTMLElement;
  render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
  ul: HTMLUListElement;
  weekdayElement: HTMLHeadingElement;
  dateElement: HTMLSpanElement;
  tasksCountElement: HTMLElement;
  static instance: ListTemplate = new ListTemplate();

  private constructor() {
    this.ul = document.querySelector(".list")!;
    this.weekdayElement = document.querySelector(".today-weekday")!;
    this.dateElement = document.querySelector(".today-date")!;
    this.tasksCountElement = document.querySelector(".tasks-count>em")!;
  }
  render(fullList: FullList) {
    // 오늘 날짜
    const [weekday, monthDay] = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    })
      .format(Date.now())
      .split(",")
      .map((item) => item.trim());
    this.weekdayElement.textContent = weekday;
    this.dateElement.textContent = monthDay;
    // 할 일 개수
    this.tasksCountElement.textContent = `${fullList.list.length}`;
    // 할 일 리스트
    this.ul.innerHTML = "";
    fullList.list.forEach((listItem) => {
      const liElement: HTMLLIElement = document.createElement("li");
      liElement.classList.add("list-item");

      const inputElement: HTMLInputElement = document.createElement("input");
      inputElement.classList.add("form__checkbox");
      inputElement.type = "checkbox";
      inputElement.id = listItem.id;
      inputElement.checked = listItem.checked;
      inputElement.addEventListener("click", () => {
        listItem.checked = !listItem.checked;
        fullList.save();
      });
      liElement.appendChild(inputElement);

      const labelElement: HTMLLabelElement = document.createElement("label");
      labelElement.classList.add("form__checkbox-label");
      labelElement.htmlFor = inputElement.id;
      labelElement.textContent = listItem.item;
      liElement.appendChild(labelElement);

      const buttonElement: HTMLButtonElement = document.createElement("button");
      buttonElement.classList.add("remove-task-btn");
      buttonElement.addEventListener("click", () => {
        fullList.removeItem(listItem.id);
        this.render(fullList);
      });
      buttonElement.textContent = "❌";
      liElement.appendChild(buttonElement);

      this.ul.appendChild(liElement);
    });
  }
}
