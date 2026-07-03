# Quick Reference: Admin Route Protection

## ?? Quick Start

### To Test the Authentication System:

1. **Clear localStorage (fresh start):**
   - Open DevTools ? Application ? Local Storage ? Clear All

2. **Start the app:**
   - App will redirect to `/login` automatically

3. **Login as User:**
   - Select "User" radio button
   - Click "Login as User"
   - Admin Console button will be **hidden**

4. **Login as Admin:**
   - Select "Admin" radio button
   - Click "Login as Admin"
   - Admin Console button will be **visible**

---

## ?? New Files at a Glance

| File | Purpose | Key Export |
|------|---------|------------|
| `src/context/AuthContext.tsx` | Authentication state management | `AuthProvider`, `useAuth` |
| `src/components/ProtectedRoute.tsx` | Route protection wrapper | `ProtectedRoute` |
| `src/Pages/Login.tsx` | Login page | Default export |
| `src/Pages/AccessDenied.tsx` | Access denied page | Default export |
| `src/styles/Login.css` | Login page styles | - |
| `src/styles/AccessDenied.css` | Access denied page styles | - |

---

## ?? How To Use useAuth Hook

```typescript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
    const { isAuthenticated, isAdmin, login, logout } = useAuth();

    // Check if user is authenticated
    if (!isAuthenticated) {
        return <div>Please login first</div>;
    }

    // Check if user is admin
    if (isAdmin) {
        return <div>Welcome Admin!</div>;
    }

    // Login as user
    const handleLogin = () => {
        login('user');  // or 'admin'
    };

    // Logout
    const handleLogout = () => {
        logout();
    };

    return <div>Your Component</div>;
}
```

---

## ??? How To Protect Routes

```typescript
import ProtectedRoute from './components/ProtectedRoute';
import AdminPage from './Pages/AdminPage';

// In your App.tsx routing:
<Route 
    path="/admin" 
    element={
        <ProtectedRoute 
            element={<AdminPage />} 
            requireAdmin={true}
        />
    } 
/>
```

---

## ?? Key Features

? **Two-Flag System:**
- `isAuthenticated` - Is user logged in?
- `isAdmin` - Does user have admin role?

? **localStorage Persistence:**
- Session survives page refresh
- Data stored under keys: `isAuthenticated` & `userRole`

? **Automatic Redirects:**
- Unauthenticated users ? `/login`
- Non-admin users trying `/admin` ? `/access-denied`

? **Conditional UI:**
- Admin Console button only shows to admins
- User role badge displays current role
- Logout button available when authenticated

---

## ?? Routes Available

```
/login              - Login page (public)
/                   - Dashboard (public)
/nvian              - NVian Dashboard (public)
/admin              - Admin Console (protected, admin only)
/access-denied      - Access denied message (public)
*                   - Catch-all ? redirects to /
```

---

## ?? Test Scenarios

### Scenario 1: Regular User Can't Access Admin
```
1. Login as "User"
2. Notice: "Admin Console" button is hidden
3. Try /admin in URL bar
4. Result: Redirected to /access-denied ?
```

### Scenario 2: Admin Can Access Admin
```
1. Logout
2. Login as "Admin"
3. Notice: "Admin Console" button is visible
4. Click "Admin Console"
5. Result: Successfully navigates to /admin ?
```

### Scenario 3: Session Persists
```
1. Login as Admin
2. Refresh page (F5)
3. Result: Still logged in as Admin ?
```

### Scenario 4: Logout Clears Everything
```
1. Login as Admin
2. Click "Logout"
3. Check localStorage in DevTools
4. Result: Both keys removed ?
5. Try accessing /admin
6. Result: Redirected to /login ?
```

---

## ?? localStorage Format

### When Logged In as Admin:
```javascript
localStorage.getItem('isAuthenticated')  // "true"
localStorage.getItem('userRole')         // "admin"
```

### When Logged In as User:
```javascript
localStorage.getItem('isAuthenticated')  // "true"
localStorage.getItem('userRole')         // "user"
```

### After Logout:
```javascript
localStorage.getItem('isAuthenticated')  // null
localStorage.getItem('userRole')         // null
```

---

## ?? UI Elements Added

### Header Changes:
- ? User role badge: `?? Admin` or `?? User`
- ? Logout button (red, clickable)
- ? Admin Console button (only for admins)

### New Pages:
- ? Login page with role selector
- ? Access denied page with lock emoji

---

## ?? Component Dependencies

```
AuthProvider (wraps entire app)
    ?
useAuth() hook (used in components)
    ?? Header component
    ?? Login page
    ?? ProtectedRoute component
    ?? Any custom component

ProtectedRoute (wraps protected routes)
    ?
    ? Checks useAuth() context
    ? Allows or redirects based on auth state
```

---

## ?? Authentication State Flow

```
1. App Mounts
   ?
2. AuthProvider checks localStorage
   ?
3. Sets isAuthenticated & isAdmin flags
   ?
4. User navigates/accesses protected route
   ?
5. ProtectedRoute checks flags
   ?
6. Allow access OR redirect based on role
```

---

## ?? Code Examples

### Display content conditionally:
```typescript
const { isAdmin } = useAuth();

return (
    <div>
        <h1>Dashboard</h1>
        {isAdmin && <AdminPanel />}
    </div>
);
```

### Protect an action:
```typescript
const { isAuthenticated, isAdmin } = useAuth();

function handleAdminAction() {
    if (!isAuthenticated) {
        navigate('/login');
        return;
    }
    if (!isAdmin) {
        navigate('/access-denied');
        return;
    }
    // Perform admin action
}
```

### Custom logout handler:
```typescript
const { logout } = useAuth();
const navigate = useNavigate();

const handleLogout = () => {
    logout();  // Clears state and localStorage
    navigate('/login');  // Redirect to login
};
```

---

## ? Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Admin button not showing | Login as Admin, check localStorage |
| Can't access /admin | Login as Admin, not User |
| Getting redirected to login | You're not authenticated |
| Getting redirected to access-denied | You're logged in as User, need Admin |
| Session lost on refresh | Check if localStorage is enabled |
| Can't logout | Try clearing localStorage manually |

---

## ?? Next Steps

1. Test all scenarios in the Quick Test section
2. Connect Login component to real backend API
3. Replace flag-based auth with JWT tokens
4. Add backend authorization checks
5. Implement token refresh mechanism
6. Add additional admin features

---

**Status:** ? Ready to use!  
**Last Updated:** Today  
**Type:** Client-side Authentication Demo
