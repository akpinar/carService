export default class Product {
    constructor(name, barcodeNumber, uuid, quantity, netPrice, isOpen, totalProduct, taxRate, categories, productImages, shelf, purchasePrice, brand) {
        this.name = name;
        this.barcodeNumber = barcodeNumber;
        this.uuid = uuid
        this.quantity = quantity
        this.isOpen = isOpen
        this.taxRate = taxRate
        this.netPrice = netPrice
        this.totalProduct = totalProduct
        this.categories = categories
        this.productImages = productImages
        this.shelf = shelf
        this.purchasePrice = purchasePrice
        this.brand = brand

    }
}


