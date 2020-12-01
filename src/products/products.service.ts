import { Injectable } from "@nestjs/common";
import { Product } from "./product.model";

@Injectable()
export class ProductService {
    private products: Product[] = [];

    insertProduct(title: string, desc: string, price: number) {
        const id = new Date().toString();
        const newProduct = new Product(id, title, desc, price);
        this.products.push(newProduct);
        return id;
    }

    getProducts() {
        return [...this.products]
    }
}