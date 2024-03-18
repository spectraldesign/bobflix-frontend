import axios, { AxiosResponse } from 'axios';

export type ApiResponse<T> = {
    success: boolean;
    errorMessage: string;
    data: T;
}

export type MovieType = {
    imdbID: string,
    title: string,
    poster_url: string,
    plot: string,
    currentUserRating: number,
    avgRating: number
}

export type MovieResponseType = {
    movies: MovieType[],
    currentPage: number,
    totalPages: number
}

function handleError(error: any): AxiosResponse<ApiResponse<any>> {
    const response: AxiosResponse<ApiResponse<any>, any> = {
        data: {
            success: false,
            errorMessage: error.message,
            data: null
        },
        status: error.response?.status,
        statusText: error.response?.statusText,
        headers: error.response?.headers,
        config: error.config,
    }
    return (response)
}

const customAxios = axios.create({
    baseURL: 'https://localhost:7239',
    timeout: 8000,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Accept: 'application/json',
    },
});

customAxios.interceptors.response.use(async (response) => {
    return response;
}, (error) => {
    //TODO: Potentially refresh JWT token if expired
    return handleError(error);
});

customAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return handleError(error);
});

export class BobflixAPI {
    static async getMovies(page: number = 1): Promise<ApiResponse<MovieResponseType>> {
        const response = await customAxios.get<ApiResponse<MovieResponseType>>(`/movies/${page}`)
        return response.data;
    }

    static async searchMovies(search: string, page: number = 1): Promise<ApiResponse<MovieResponseType>> {
        const response = await customAxios.get(`/movies/search/${search}/${page}`)
        return response.data;
    }

    static async toggleFavourite(ImdbID: string): Promise<ApiResponse<undefined>> {
        const response = await customAxios.put(`/movies/favourite/${ImdbID}`);
        return response.data;
    }

    static async rateMovie(ImdbID: string, rating: number): Promise<ApiResponse<undefined>> {
        const response = await customAxios.put(`/movies/rate/${ImdbID}/${rating}`);
        return response.data;
    }
}