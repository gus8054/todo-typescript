import "./css/style.css";
import ListItem from "./model/ListItem";
import FullList from "./model/FullList";
import ListTemplate from "./templates/ListTemplate";

const fullList = FullList.instance;
const listTemplate = ListTemplate.instance;

fullList.load();
listTemplate.render(fullList);

const formElement: HTMLFormElement = document.querySelector(".input-box")!;
formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = String(Date.now());

  const inputTask: HTMLInputElement = document.querySelector(".input-task")!;
  const item = inputTask.value.trim();
  if (!item) return;

  const newItem: ListItem = new ListItem(id, item);
  fullList.addItem(newItem);
  listTemplate.render(fullList);
  inputTask.value = "";
  inputTask.focus();
});
