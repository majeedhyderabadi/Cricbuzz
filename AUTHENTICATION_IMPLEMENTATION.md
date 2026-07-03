# Admin Route Protection Implementation

## Overview
This implementation adds authentication and role-based access control (RBAC) to protect the Admin route. Only authenticated users with the "Admin" role can access the Admin Console.

## Architecture

### Core Components Created

#### 1. **AuthContext** (`src/context/AuthContext.tsx`)
- Manages global authentication state using React Context
- Stores two flags:
  - `isAuthenticated`: Boolean flag for login status
  - `isAdmin`: Boolean flag for admin role
- Provides methods:
  - `login(role)`: Authenticates user with specified role ('admin' | 'user')
  - `logout()`: Clears authentication and role
- Persists state in localStorage for session persistence

#### 2. **ProtectedRoute** (`src/components/ProtectedRoute.tsx`)
- Higher-order component that wraps routes requiring protection
- Checks authentication status
- Checks admin role if route requires admin access
- Redirects:
  - Unauthenticated users ? `/login`
  - Non-admin users ? `/access-denied`
  - Authenticated users ? Protected component

#### 3. **Login Page** (`src/Pages/Login.tsx`)
- Simple authentication interface
- Allows users to select role: 'User' or 'Admin'
- Stores authentication state in AuthContext and localStorage
- Redirects to home after successful login

#### 4. **AccessDenied Page** (`src/Pages/AccessDenied.tsx`)
- Displays when non-admin users attempt to access `/admin`
- Provides user-friendly message
- Button to return to dashboard

### Updated Components

#### 5. **Header Component** (`src/components/Header/Header.tsx`)
- Integrated with AuthContext using `useAuth()` hook
- Admin Console button only visible to admin users
- Shows current user role (?? Admin / ?? User)
- Logout button to clear authentication
- Admin Console button is hidden from non-admin users

#### 6. **App Component** (`src/App.tsx`)
- Wrapped with `AuthProvider` context
- Protected Admin route using `ProtectedRoute` component
- Routes:
  - `/login` - Login page
  - `/` - Dashboard (public)
  - `/nvian` - NVian Dashboard (public)
  - `/admin` - Admin Console (protected, admin-only)
  - `/access-denied` - Access denied page
  - `*` - Catch-all redirect to home

## Flow Diagram

```
User Visits App
    ?
AuthProvider initializes with localStorage state
    ?
    ?? Authenticated & Admin? ? Can access /admin
    ?? Authenticated & User? ? Cannot access /admin ? /access-denied
    ?? Not Authenticated? ? Redirect to /login
```

## Usage

### For Testing:

1. **First Visit:**
   - App redirects to `/login` if not authenticated
   - Select role (User or Admin)
   - Click "Login"

2. **As Admin User:**
   - All routes accessible
   - Admin Console button visible in header
   - Can access `/admin`

3. **As Regular User:**
   - Can access `/`, `/nvian`
   - Admin Console button hidden
   - Accessing `/admin` shows access denied page

4. **Logout:**
   - Click logout button in header
   - Returns to login page

## State Persistence

- Authentication state stored in `localStorage`
- Keys used:
  - `isAuthenticated` (boolean string: 'true' | 'false')
  - `userRole` (string: 'admin' | 'user')
- Persists across browser sessions until logout

## Security Notes

- This is a **client-side implementation** for UI/UX purposes
- **NOT suitable for production** without backend authentication
- Should be paired with:
  - Real authentication service (API, OAuth, JWT, etc.)
  - Backend authorization checks
  - Secure token storage
  - HTTPS and secure headers

## Files Summary

**New Files Created:**
- `src/context/AuthContext.tsx` - Authentication context
- `src/components/ProtectedRoute.tsx` - Route protection component
- `src/Pages/Login.tsx` - Login page
- `src/Pages/AccessDenied.tsx` - Access denied page
- `src/styles/Login.css` - Login styles
- `src/styles/AccessDenied.css` - Access denied styles

**Files Modified:**
- `src/App.tsx` - Added AuthProvider and protected routes
- `src/components/Header/Header.tsx` - Added auth controls
- `src/components/Header/Header.css` - Added auth styling

**Existing Protected File:**
- `src/Pages/Admin.tsx` - Now protected by ProtectedRoute
