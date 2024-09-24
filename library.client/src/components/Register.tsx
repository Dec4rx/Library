import React, { useState } from 'react';
import { registerUser } from '../types/User';

const Register: React.FC = () => {
    const [form, setForm] = useState<registerUser>();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (form?.password !== form?.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        // Aquí puedes manejar el envío del formulario
        console.log(form);
    };

    return (
        <div className="form-container">
            <div className="form-content">
                <h1>Register</h1>
                <form onSubmit={handleSubmit} >

                    <label className='label-form' >Name:
                        <input
                            className='input-form'
                            type="text"
                            id="name"
                            name="name"
                            value={form!.name}
                            onChange={(e) => setForm({ ...form!, name: e.target.value })}
                            min={3}
                            required
                        />
                    </label>

                    <label className='label-form'>Lastname:
                        <input
                            className='input-form'
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={form!.lastname}
                            onChange={(e) => setForm({ ...form!, lastname: e.target.value })}
                            min={3}
                            required
                        />
                    </label>

                    <label className='label-form'>Email:
                        <input
                            className='input-form'
                            type="email"
                            id="email"
                            name="email"
                            value={form!.email}
                            onChange={(e) => setForm({ ...form!, email: e.target.value })}
                            min={3}
                            required
                        />
                    </label>

                    <label className='label-form'>Password:
                        <input
                            className='input-form'
                            type="password"
                            id="password"
                            name="password"
                            value={form!.password}
                            onChange={(e) => setForm({ ...form!, password: e.target.value })}
                            min={8}
                            required
                        />
                    </label>

                    <label className='label-form'>Confirm Password:
                        <input
                            className='input-form'
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={form!.confirmPassword}
                            min={8}
                            onChange={(e) => setForm({ ...form!, confirmPassword: e.target.value })}
                            required
                        />
                    </label>

                    <button type="submit" className="primary">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;