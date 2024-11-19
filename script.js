const apiUrl = 'http://localhost:5000/users';
const form = document.getElementById('userForm');
const tableBody = document.querySelector('#userTable tbody');
let editingUser = null;

// Fetch and display all users
const fetchUsers = async () => {
    const res = await fetch(apiUrl);
    const users = await res.json();
    displayUsers(users);
};

// Display users in the table
const displayUsers = (users) => {
    tableBody.innerHTML = '';
    users.forEach((user) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.dob}</td>
            <td>
                <button onclick="editUser(${user.id})">Edit</button>
                <button class="delete" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
};

// Add or update a user
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const dob = document.getElementById('dob').value;

    if (editingUser) {
        await fetch(`${apiUrl}/${editingUser}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, dob }),
        });
        editingUser = null;
    } else {
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, dob }),
        });
    }

    form.reset();
    fetchUsers();
});

// Edit a user
window.editUser = async (id) => {
    const res = await fetch(`${apiUrl}`);
    const users = await res.json();
    const user = users.find((u) => u.id === id);
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('dob').value = user.dob;
    editingUser = id;
};

// Delete a user
window.deleteUser = async (id) => {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    fetchUsers();
};

// Initial fetch
fetchUsers();
