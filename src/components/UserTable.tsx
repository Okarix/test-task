import * as React from 'react';
import { useState } from 'react';
import { useGetUsersQuery } from '../service/userApi';
import { CircularProgress, Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { alpha } from '@mui/material/styles';

const columns: GridColDef[] = [
	{ field: 'id', headerName: 'ID', width: 70 },
	{ field: 'firstName', headerName: 'First name', width: 130 },
	{ field: 'lastName', headerName: 'Last name', width: 130 },
	{
		field: 'phone',
		headerName: 'Phone',
		width: 150,
	},
	{
		field: 'birthDate',
		headerName: 'Date of Birth',
		width: 160,
		// valueGetter: (params: any) => new Date(params.row.birthDate).toLocaleDateString(),
	},
];

const UserTable: React.FC = () => {
	const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({ page: 0, pageSize: 5 });
	const { data, error, isLoading } = useGetUsersQuery({ page: paginationModel.page + 1, limit: paginationModel.pageSize });

	if (isLoading) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
				<CircularProgress />
			</div>
		);
	}

	if (error) {
		return <Typography color='error'>Error fetching users</Typography>;
	}

	return (
		<Paper
			sx={{
				height: paginationModel.pageSize === 5 ? 369 : 629,
				width: '48%',
				borderRadius: 4,
				boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
				overflow: 'hidden',
			}}
		>
			<DataGrid
				rows={data?.users || []}
				columns={columns}
				pagination
				pageSizeOptions={[5, 10]}
				rowCount={data?.total || 0}
				paginationMode='server'
				paginationModel={paginationModel}
				onPaginationModelChange={newModel => setPaginationModel(newModel)}
				sx={{
					border: 0,
					'& .MuiDataGrid-columnHeaders': {
						backgroundColor: alpha('#f0f0f0', 0.8),
						color: '#333',
						fontWeight: 'bold',
					},
					'& .MuiDataGrid-cell': {
						backgroundColor: alpha('#ffffff', 0.5),
					},
					'& .MuiDataGrid-row:nth-of-type(odd)': {
						backgroundColor: alpha('#fafafa', 0.7),
					},
					'& .MuiDataGrid-row:nth-of-type(even)': {
						backgroundColor: alpha('#f5f5f5', 0.7),
					},
					'& .MuiDataGrid-footerContainer': {
						backgroundColor: alpha('#f0f0f0', 0.8),
					},
					borderRadius: 4,
				}}
			/>
		</Paper>
	);
};

export default UserTable;
