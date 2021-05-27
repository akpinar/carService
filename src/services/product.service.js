import axios from 'axios';
import authHeader from './auth-header';

const API_URL = process.env.VUE_APP_API_URL;

class ProductService {

    getProducts() {

        return axios.get(API_URL + '/car-service/product-api/', {headers: authHeader()})


    }

    /*



    "barcodeNumber": "dddd",
    "name": "fdgdgdfgfdgdfg",
    "quantity": 3,
    "netPrice": 15.23,
    "isOpen": true,
    "taxRate": 18,
    "totalProduct": 18.34,
    "categories": [
       1,2,3
    ]
     */

    addProduct(product) {
        return axios.post(process.env.VUE_APP_API_URL + '/car-service/product-api/',
            {
                barcodeNumber: product.barcodeNumber,
                name: product.name,
                quantity: product.quantity,
                netPrice: product.netPrice,
                isOpen: product.isOpen,
                taxRate: product.taxRate,
                categories: product.categories,
                productImage: product.productImages,
                shelf: product.shelf,
                purchasePrice: product.purchasePrice,
                brand: product.brand

            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }

    updateProduct(product) {
        return axios.put(process.env.VUE_APP_API_URL + '/car-service/product-api/',
            {
                barcodeNumber: product.barcodeNumber,
                name: product.name,
                quantity: product.quantity,
                netPrice: product.netPrice,
                isOpen: product.isOpen,
                taxRate: product.taxRate,
                categories: product.categories,
                productImage: product.productImages,
                shelf: product.shelf,
                purchasePrice: product.purchasePrice,
                brand: product.brand,
                uuid: product.uuid

            }, {headers: authHeader()}).then(response => {


            return response;
        }).catch(error => {
            return error
        });


    }


    getSearchProduct(barcode) {
        const params = {
            barcode: barcode

        };

        return axios.get(process.env.VUE_APP_API_URL + `/car-service/get-product-search-api/`, {
            headers: authHeader(),
            params
        })


    }


    getProduct(uuid) {
        const params = {
            id: uuid

        };

        return axios.get(process.env.VUE_APP_API_URL + `/car-service/product-single-api/`, {
            headers: authHeader(),
            params
        })


    }


    deleteProduct(id) {
        const params = {
            id: id

        };
        return axios.delete(process.env.VUE_APP_API_URL + `/car-service/product-api/`, {
            headers: authHeader(),
            params
        }).then(response => {
            return response;
        })


    }

}

export default ProductService