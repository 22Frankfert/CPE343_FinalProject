class Item {
  name: string;
  tag: string;

  constructor(name: string, tag: string) {
    this.name = name;
    this.tag = tag;
  }

  displayItem(): void {
    console.log(`Name: ${this.name}, Tag: ${this.tag}`);
  }
}

export default Item;
