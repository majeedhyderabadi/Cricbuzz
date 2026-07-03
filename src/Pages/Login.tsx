import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';

function Login() {
    const [role, setRole] = useState<'admin' | 'user'>('user');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        login(role);
        navigate('/');
    };

    return (
        <main className="login-container">
            <section className="login-card card">
                <div className="login-card__header">
                    <h1 className="login-card__title">Login</h1>
                    <p className="login-card__subtitle">Select your role to continue</p>
                </div>

                <div className="login-card__content">
                    <div className="login-card__role-selector">
                        {/*<label className="login-card__role-option">*/}
                        {/*    <input*/}
                        {/*        type="radio"*/}
                        {/*        name="role"*/}
                        {/*        value="user"*/}
                        {/*        checked={role === 'user'}*/}
                        {/*        onChange={(e) => setRole(e.target.value as 'user' | 'admin')}*/}
                        {/*        className="login-card__radio"*/}
                        {/*    />*/}
                        {/*    <span className="login-card__role-label">User</span>*/}
                        {/*    <span className="login-card__role-description">Regular user access</span>*/}
                        {/*</label>*/}

                        <label className="login-card__role-option">
                            <input
                                type="radio"
                                name="role"
                                value="admin"
                                checked={role === 'admin'}
                                onChange={(e) => setRole(e.target.value as 'user' | 'admin')}
                                className="login-card__radio"
                            />
                            <span className="login-card__role-label">Admin</span>
                            <span className="login-card__role-description">Administrator access</span>
                        </label>
                    </div>

                    <button
                        className="login-card__button"
                        onClick={handleLogin}
                    >
                        Login as {role === 'admin' ? 'Admin' : 'User'}
                    </button>
                </div>
            </section>
        </main>
    );
}

export default Login;
