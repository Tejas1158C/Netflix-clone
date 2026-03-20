import { useState } from 'react';

function UserForm() {
    const [user, setUser] = useState({
        name: '',
        email: ''
    });

    const handleNameChange = (e) => {
        setUser({
            ...user,  // Keep other properties 
            name: e.target.value  // Update only name 
        });
    };

    const handleEmailChange = (e) => {
        setUser({
            ...user,
            email: e.target.value
        });
    };

    return (
        <div style={{ padding: '20px' }}>
            <input
                type="text"
                placeholder="Name"
                value={user.name}
                onChange={handleNameChange}
            />
            <input
                type="email"
                placeholder="Email"
                value={user.email}
                onChange={handleEmailChange}
            />
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    );
}

export default UserForm;
