# Testing Guide: Admin Route Protection

## Quick Start Testing

### Test 1: Access as Regular User
1. Start the application
2. If redirected to login, select **"User"** role
3. Click **"Login as User"**
4. **Expected Results:**
   - ? Dashboard loads successfully
   - ? "Admin Console" button is NOT visible in header
   - ? Can see user role as "?? User" in header
   - Try manually navigating to `/admin`
   - ? Redirected to `/access-denied` page
   - ? See "Access Denied" message with lock emoji

### Test 2: Access as Admin User
1. Logout (click "Logout" button in header)
2. Select **"Admin"** role
3. Click **"Login as Admin"**
4. **Expected Results:**
   - ? Dashboard loads successfully
   - ? "Admin Console" button IS visible in header
   - ? Can see user role as "?? Admin" in header
   - ? Click "Admin Console" button
   - ? Successfully navigates to `/admin`
   - ? Admin panel displays with 4 management cards

### Test 3: Session Persistence
1. Login as Admin
2. Refresh the page (F5 or Cmd+R)
3. **Expected Results:**
   - ? Still logged in as Admin
   - ? Admin Console button still visible
   - ? User role still shows "?? Admin"

### Test 4: Logout Flow
1. Login as Admin
2. Click **"Logout"** button in header
3. **Expected Results:**
   - ? Redirected to `/login` page
   - ? localStorage cleared
   - ? Must select role again to login

### Test 5: Unauthenticated Access
1. Clear browser localStorage or open in private/incognito window
2. Try accessing `/admin` directly in URL
3. **Expected Results:**
   - ? Redirected to `/login` page
   - ? Must authenticate to proceed

### Test 6: Navigation
**As Regular User:**
- ? Can access `/` (Live Dashboard)
- ? Can access `/nvian` (NVian Dashboard)
- ? Cannot access `/admin` (redirected to access-denied)
- ? Can access `/access-denied`

**As Admin User:**
- ? Can access `/` (Live Dashboard)
- ? Can access `/nvian` (NVian Dashboard)
- ? Can access `/admin` (Admin Console)
- ? Can access `/access-denied`

## Component Behavior

### Header Component
- **User Role Badge**: Shows current authentication status
  - "?? Admin" - for admin users
  - "?? User" - for regular users
- **Admin Console Button**: 
  - Visible only to authenticated admin users
  - Hidden from regular users
- **Logout Button**: 
  - Visible when authenticated
  - Clears all auth state and redirects to login

### Login Page
- Radio buttons to select role (User/Admin)
- Login button with dynamic text based on selected role
- Simple, clean interface matching app design

### Access Denied Page
- Displays when non-admin user tries to access admin route
- Shows lock emoji (??)
- Friendly message explaining restriction
- "Back to Dashboard" button

## LocalStorage Keys

When logged in, check browser's developer tools ? Application ? Local Storage:

**For Regular User:**
```
isAuthenticated: "true"
userRole: "user"
```

**For Admin User:**
```
isAuthenticated: "true"
userRole: "admin"
```

**After Logout:**
```
(both keys removed)
```

## Development Notes

### Adding Backend Authentication
To replace this simple flag-based system with real authentication:

1. **Replace login flow** in `src/Pages/Login.tsx`
   - Call real authentication API
   - Receive JWT token or session token

2. **Update AuthContext** (`src/context/AuthContext.tsx`)
   - Store actual auth token instead of flag
   - Validate token expiration
   - Handle token refresh

3. **Add request interceptor** in `src/services/`
   - Attach token to all API requests
   - Handle 401 responses

4. **Validate on backend**
   - Verify admin role for protected endpoints
   - Return proper 403 Forbidden for unauthorized access

## Browser Compatibility
- ? Chrome/Chromium
- ? Firefox
- ? Safari
- ? Edge
- localStorage must be enabled
