interface Item {
  id: string;
  item: string;
  checked: boolean;
}

export default class ListItem implements Item {
  constructor(
    private _id: string = "",
    private _item: string,
    private _checked = false
  ) {}
  get id() {
    return this._id;
  }
  set id(_id: string) {
    this._id = _id;
  }
  get item() {
    return this._item;
  }
  set item(_item: string) {
    this._item = _item;
  }
  get checked() {
    return this._checked;
  }
  set checked(_checked: boolean) {
    this._checked = _checked;
  }
}
