import { Tag } from "./Tag";

class Item {
  name: string;
  tag: Tag;

  constructor(name: string, tag: Tag) {
    this.name = name;
    this.tag = tag;
  }

  displayItem(): void {
    console.log(`Name: ${this.name}, Tag: ${this.tag}`);
  }
}

export default Item;