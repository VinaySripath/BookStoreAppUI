export class AddBook {
  title: string;
  description: string;
  price: number;
  pages: number;
  category: string;
  availableQuantity: number = 0;
  constructor(
    title: string,
    description: string,
    price: number,
    pages: number,
    category: string
  ) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.pages = pages;
    this.category = category;
  }
}
