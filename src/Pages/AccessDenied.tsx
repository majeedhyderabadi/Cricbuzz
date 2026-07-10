import { useNavigate } from 'react-router-dom';
import '../styles/AccessDenied.css';

function AccessDenied() {
    const navigate = useNavigate();

    return (
        <main className="container">
            <section className="access-denied">
                <div className="access-denied__content">
                    <div className="access-denied__icon">??</div>
                    <h1 className="access-denied__title">Access Denied</h1>
                    <p className="access-denied__message">
                        You do not have permission to access this page.
                    </p>
                    <p className="access-denied__subtitle">
                        Only administrators can access the Admin Console.
                    </p>
                    <button
                        className="access-denied__button"
                        onClick={() => navigate('/')}
                    >
                        Back to Dashboard
                    </button>
                </div>
            </section>
        </main>
    );
}

export default AccessDenied;
