interface PaginationParams {
    page: number;
    limit: number;
};

class ApiClient {
    private baseUrl: string;
    private resource: string;

    constructor(baseUrl: string, resource: string) {
        this.baseUrl = baseUrl;
        this.resource = resource;
    }

    async get(params: PaginationParams) {
        const { page = 1, limit = 10 } = params;
        const response = await fetch(`${this.baseUrl}/${this.resource}?page=${page}&limit=${limit}`);
        return response.json();
    }

    async post(data: any) {
        const response = await fetch(`${this.baseUrl}/${this.resource}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }

    async put(id: number, data: any) {
        const response = await fetch(`${this.baseUrl}/${this.resource}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }

    async delete(id: number) {
        const response = await fetch(`${this.baseUrl}/${this.resource}/${id}`, {
            method: 'DELETE',
        });
        return response.json();
    }

    async getById(id: number) {
        const response = await fetch(`${this.baseUrl}/${this.resource}/${id}`);
        return response.json();
    }
}

export default ApiClient;