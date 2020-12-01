import { Body, Controller, Get, Post } from "@nestjs/common";

import { ProductService } from "./products.service";

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    addProduct(@Body('title') title: string, @Body('desc') desc: string, @Body('price') price: number) {
        const genId = this.productService.insertProduct(title, desc, price);
        return {id: genId}
    }

    @Get()
    getAllProducts() {
        return this.productService.getProducts()
    }
}