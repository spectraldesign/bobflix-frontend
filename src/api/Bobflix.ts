import axios, { AxiosResponse } from 'axios';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
export type ApiResponse<T> = {
    success: boolean;
    errorMessage: string;
    data: T;
}

export type MovieType = {
    imdbId: string,
    title: string,
    director: string,
    released: string,
    posterUrl: string,
    plot: string,
    currentUserRating: number,
    avgRating: number
}

export type MovieResponseType = {
    movies: MovieType[],
    currentPage: number,
    totalPages: number
}

export enum ApiUserRole {
    User,
    Admin
}

export type UserAuthType = {
    email: string,
    username: string,
    token: string,
}

export type UserType = {
    email: string,
    userName: string,
    avgRating: number,
    favouriteMovies: MovieType[]
}

export type FavouriteToggleType = {
    favourite: boolean
}

/* eslint-disable  @typescript-eslint/no-explicit-any */
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
    baseURL: 'https://localhost:7239/api',
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

    static async getMovieById(id: string): Promise<ApiResponse<MovieType>> {
        const response = await customAxios.get<ApiResponse<MovieType>>(`/movies/getBy/${id}`)
        return response.data;
    }

    static async searchMovies(search: string, page: number = 1): Promise<ApiResponse<MovieResponseType>> {
        const response = await customAxios.get<ApiResponse<MovieResponseType>>(`/movies/${search}/${page}`)
        return response.data;
    }

    static async toggleFavourite(ImdbID: string): Promise<ApiResponse<FavouriteToggleType>> {
        const response = await customAxios.put<ApiResponse<FavouriteToggleType>>(`/favourite/${ImdbID}`);
        return response.data;
    }

    static async rateMovie(ImdbID: string, rating: number): Promise<ApiResponse<undefined>> {
        const response = await customAxios.put<ApiResponse<undefined>>(`/rate/${ImdbID}/${rating}`);
        return response.data;
    }

    static async registerUser(email: string, username: string, password: string, role: ApiUserRole = ApiUserRole.User): Promise<ApiResponse<UserAuthType>> {
        const response = await customAxios.post<ApiResponse<UserAuthType>>('/users/register', { email, username, password, role });
        return response.data;
    }

    static async loginUser(email: string, password: string): Promise<ApiResponse<UserAuthType>> {
        const response = await customAxios.post<ApiResponse<UserAuthType>>('/users/login', { email, password });
        return response.data;
    }

    static async updateUser(currentPassword: string, newPassword: string): Promise<ApiResponse<UserAuthType>> {
        const response = await customAxios.put<ApiResponse<UserAuthType>>('/users/update', { currentPassword, newPassword });
        return response.data;
    }

    static async getLoggedInUser(): Promise<ApiResponse<UserType>> {
        const response = await customAxios.get<ApiResponse<UserType>>('/users/get');
        return response.data;
    }

    static async setAvatar(avatar: string): Promise<ApiResponse<undefined>> {
        const response = await customAxios.put<ApiResponse<undefined>>('/users/avatar', { avatar });
        return response.data;
    }

    static hasValidJwt(): boolean {
        const jwt = localStorage.getItem('token');
        if (!jwt) {
            return false;
        }
        let decoded: JwtPayload;
        try {
            decoded = jwtDecode(jwt);
        } catch (error) {
            toast.error('Failed to decode token');
            return false
        }
        const hasExpired = decoded.exp && decoded.exp * 1000 < Date.now();
        if (hasExpired) {
            toast.error('Token has expired');
            return false
        }
        return true
    }
}