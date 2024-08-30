import UserTable from './components/UserTable';

function App() {
	return (
		<div
			className='App'
			style={{ padding: 30 }}
		>
			<h1 style={{ textAlign: 'center' }}>Users Table</h1>
			<main style={{ marginTop: '25px', display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
				<UserTable />
			</main>
		</div>
	);
}

export default App;
