import { Product } from '@/models/product';
import ApiClient from '@/utils/api/api-client'; // Updated import path

class ProductService {
    private apiClient: ApiClient;

    constructor(apiClient: ApiClient) {
        this.apiClient = apiClient;
    }

    async getProducts(page: number = 1, limit: number = 10): Promise<Product[]> {
        try {
            const response = await this.apiClient.get({ page, limit });
            return response;
        } catch (error) {
            throw new Error('Error fetching products');
        }
    }

    async getProductById(productId: number): Promise<Product> {
        try {
            const response = await this.apiClient.getById(productId);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching product with id ${productId}`);
        }
    }

    async createProduct(productData: Product): Promise<Product> {
        try {
            const response = await this.apiClient.post(productData);
            return response.data;
        } catch (error) {
            throw new Error('Error creating product');
        }
    }

    async updateProduct(productId: number, productData: Product): Promise<Product> {
        try {
            const response = await this.apiClient.put(productId, productData);
            return response.data;
        } catch (error) {
            throw new Error(`Error updating product with id ${productId}`);
        }
    }

    async deleteProduct(productId: number): Promise<any> {
        try {
            const response = await this.apiClient.delete(productId);
            return response.data;
        } catch (error) {
            throw new Error(`Error deleting product with id ${productId}`);
        }
    }
}

export default ProductService;;
