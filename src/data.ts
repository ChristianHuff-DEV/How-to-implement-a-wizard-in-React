let employees = [
	{
		id: 1,
		name: "Lindsay Walton",
		title: "Front-end Developer",
		email: "lindsay.walton@example.com",
		role: "Full-time",
	},
	{
		id: 2,
		name: "Peter McLachlon",
		title: "Back-end Developer",
		email: "p.mclachlon@example.com",
		role: "Part-time",
	},
];

export function getEmployees() {
	return employees;
}

export function addEmployee(name: string, title: string, email: string, role: string) {
	const id = Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 0 + 1)) + 0;
	employees.push({ id, name, title, email, role })
}