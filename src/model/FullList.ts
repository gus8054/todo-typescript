import ListItem from "./ListItem";

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clear(): void;
  addItem(listItem: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();
  private constructor(private _list: ListItem[] = []) {}
  get list() {
    return this._list;
  }
  load(): void {
    const loadList: string | null = localStorage.getItem("myList");
    if (loadList === null) return;
    const parsedList: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(loadList);

    parsedList.forEach((listItem) => {
      const newItem = new ListItem(
        listItem._id,
        listItem._item,
        listItem._checked
      );
      this._list.push(newItem);
    });
  }
  save(): void {
    localStorage.setItem("myList", JSON.stringify(this._list));
  }
  clear(): void {
    this._list = [];
    this.save();
  }
  addItem(listItem: ListItem): void {
    this._list.push(listItem);
    this.save();
  }
  removeItem(id: string): void {
    this._list = this._list.filter((listItem: ListItem) => listItem.id !== id);
    this.save();
  }
}
