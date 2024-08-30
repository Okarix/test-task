export interface User {
	id: number;
	firstName: string;
	lastName: string;
	phone: string;
	birthDate: string;
}

export interface GetUsersResponse {
	users: User[];
	total: number;
}

export interface PaginatedUsersResponse {
	users: User[];
	total: number;
	totalPages: number;
}
