import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetUsersResponse, PaginatedUsersResponse } from '../types/userTypes';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com' }),
	endpoints: builder => ({
		getUsers: builder.query<PaginatedUsersResponse, { page: number; limit: number }>({
			query: ({ page = 1, limit = 10 }) => {
				const skip = (page - 1) * limit;
				return `/users?limit=${limit}&skip=${skip}&select=firstName,lastName,phone,birthDate`;
			},
			transformResponse: (response: GetUsersResponse) => ({
				users: response.users,
				total: response.total,
				totalPages: Math.ceil(response.total / 10),
			}),
		}),
	}),
});

export const { useGetUsersQuery } = userApi;
