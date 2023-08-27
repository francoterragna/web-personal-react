import { ENV } from '../utils';

export class Newsletter {
    baseApi = ENV.BASE_API;
    
    async getEmails (accessToken, page = 1, limit = 10) {
        try {
            const pageFilter = `page=${page}`;
            const limitFilter = `limit=${limit}`
            const url = `${this.baseApi}/${ENV.API_ROUTES.NEWSLETTER}?${pageFilter}&${limitFilter}`;
            const params = { // Se mandan headers porque es una petición autenticada
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }

            const response = await fetch(url, params);
            const result = await response.json();

            if(response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteEmail (accessToken, idMail) {
        try {
            const url = `${this.baseApi}/${ENV.API_ROUTES.NEWSLETTER}/${idMail}`;
            const params = {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }

            const response = await fetch(url, params);
            const result = response.json();

            if(response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }
}