import React, { useState } from 'react';
import { loginUser } from '../types/User';

const Login: React.FC = () => {
    const [form, setForm] = useState<loginUser>();

    const handleSubmit = (user: loginUser) => {
        console.log(user);
        // Aquí puedes agregar la lógica para manejar el login
        console.log('Email:', form?.email);
        console.log('Password:', form?.password);
    };

    return (
        <div className="form-container">
            <div className="form-content">
                <h1>Login</h1>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    if (form) {
                        handleSubmit(form);
                    }
                }}>

                    <label className='label-form'>Email:
                        <input
                            className='input-form'
                            type="email"
                            id="email"
                            value={form?.email}
                            onChange={(e) => setForm({ ...form!, email: e.target.value })}
                            required
                        />
                    </label>

                    <label className='label-form'>Password:
                        <input
                            className='input-form'
                            type="password"
                            id="password"
                            value={form?.password}
                            onChange={(e) => setForm({ ...form!, password: e.target.value })}
                            required
                        />
                    </label>

                    <button type="submit" className='primary'>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;