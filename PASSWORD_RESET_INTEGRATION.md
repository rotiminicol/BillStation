# Password Reset Flow Integration

This document outlines the complete password reset flow integration for the Bill Station Frontend application.

## Overview

The password reset flow consists of three main components:
1. **Forgot Password Page** - User enters email to request reset
2. **Reset Password Page** - User sets new password with token from email
3. **API Integration** - Backend endpoints for password reset functionality

## API Endpoints

### 1. Forgot Password Request
- **Endpoint**: `POST /auth/forgot-password`
- **Purpose**: Send password reset email to user
- **Request Body**:
  ```json
  {
    "email": "user@example.com"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Password reset email sent successfully",
    "success": true
  }
  ```

### 2. Reset Password
- **Endpoint**: `POST /auth/reset-password`
- **Purpose**: Update user password with reset token
- **Request Body**:
  ```json
  {
    "token": "reset_token_from_email",
    "newPassword": "new_secure_password"
  }
  ```
- **Response**:
  ```json
  {
    "message": "Password reset successfully",
    "success": true
  }
  ```

### 3. Verify Reset Token
- **Endpoint**: `POST /auth/verify-reset-token`
- **Purpose**: Validate reset token before allowing password reset
- **Request Body**:
  ```json
  {
    "token": "reset_token_from_email"
  }
  ```
- **Response**:
  ```json
  {
    "valid": true,
    "message": "Token is valid"
  }
  ```

## Frontend Components

### 1. ForgotPassword Component (`src/pages/ForgotPassword.tsx`)

**Features:**
- Email input validation
- Loading states with spinner
- Error handling and display
- Success message after email sent
- Resend functionality
- Responsive design (desktop/mobile)

**Key Functions:**
- `handleSubmit()` - Calls `authAPI.forgotPassword(email)`
- Error state management
- Toast notifications for user feedback

### 2. Mobile ForgotPassword Component (`src/pages/mobile/ForgotPassword.tsx`)

**Features:**
- Mobile-optimized layout
- Same functionality as desktop version
- Touch-friendly interface
- Compact design for smaller screens

### 3. ResetPassword Component (`src/pages/ResetPassword.tsx`)

**Features:**
- Token extraction from URL parameters
- Password strength validation
- Password confirmation matching
- Show/hide password toggles
- Real-time password requirements display
- Success state after password reset

**Password Requirements:**
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

**Key Functions:**
- `validatePassword()` - Checks password strength
- `handleSubmit()` - Calls `authAPI.resetPassword(token, newPassword)`
- Token validation on component mount

### 4. Mobile ResetPassword Component (`src/pages/mobile/ResetPassword.tsx`)

**Features:**
- Mobile-optimized layout
- Same functionality as desktop version
- Touch-friendly password inputs
- Compact password requirements display

## API Service Integration

### Updated API Service (`src/services/api.ts`)

Added three new methods to the `authAPI` object:

```typescript
// Password Reset Flow
forgotPassword: async (email: string) => {
  const response = await fetch(`${AUTH_BASE_URL}/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to send reset email' }));
    throw new Error(error.message || 'Failed to send reset email');
  }
  
  return response.json();
},

resetPassword: async (token: string, newPassword: string) => {
  const response = await fetch(`${AUTH_BASE_URL}/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword }),
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to reset password' }));
    throw new Error(error.message || 'Failed to reset password');
  }
  
  return response.json();
},

verifyResetToken: async (token: string) => {
  const response = await fetch(`${AUTH_BASE_URL}/auth/verify-reset-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
  });
  
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Invalid or expired token' }));
    throw new Error(error.message || 'Invalid or expired token');
  }
  
  return response.json();
},
```

## TypeScript Types

### Added Types (`src/types/index.ts`)

```typescript
// Password Reset Types
export interface ForgotPasswordRequest {
  email: string;
}

export interface ForgotPasswordResponse {
  message: string;
  success: boolean;
}

export interface ResetPasswordRequest {
  token: string;
  newPassword: string;
}

export interface ResetPasswordResponse {
  message: string;
  success: boolean;
}

export interface VerifyResetTokenRequest {
  token: string;
}

export interface VerifyResetTokenResponse {
  valid: boolean;
  message?: string;
}
```

## Routing Configuration

### Updated App.tsx

Added routes for both desktop and mobile:

**Desktop Routes:**
```typescript
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/reset-password" element={<ResetPassword />} />
```

**Mobile Routes:**
```typescript
<Route path="/forgot-password" element={<MobileForgotPassword />} />
<Route path="/reset-password" element={<MobileResetPassword />} />
```

## User Flow

1. **User clicks "Forgot Password" on login page**
   - Redirects to `/forgot-password`

2. **User enters email address**
   - Form validates email format
   - Shows loading state during API call
   - Displays success message or error

3. **User receives email with reset link**
   - Email contains link: `/reset-password?token=abc123`

4. **User clicks reset link**
   - Redirects to reset password page
   - Token is extracted from URL parameters
   - If token is invalid, shows error message

5. **User enters new password**
   - Real-time password strength validation
   - Password confirmation matching
   - Shows password requirements checklist

6. **User submits new password**
   - API call to reset password
   - Success state with redirect to login
   - Error handling for invalid/expired tokens

## Error Handling

### Common Error Scenarios

1. **Invalid Email**
   - Frontend validation for email format
   - Backend validation for existing user

2. **Invalid/Expired Token**
   - Token validation on reset page load
   - Clear error messages for users

3. **Weak Password**
   - Real-time password strength validation
   - Visual feedback for requirements

4. **Network Errors**
   - Graceful error handling
   - Retry functionality for failed requests

## Security Considerations

1. **Token Security**
   - Tokens should be single-use
   - Tokens should expire (typically 1 hour)
   - Secure token generation

2. **Password Security**
   - Strong password requirements
   - Password hashing on backend
   - Rate limiting for reset attempts

3. **Email Security**
   - Secure email delivery
   - Clear email content
   - Expiration warnings

## Testing Scenarios

1. **Happy Path**
   - User successfully requests reset
   - Receives email with valid link
   - Successfully resets password

2. **Error Scenarios**
   - Invalid email address
   - Non-existent user
   - Expired token
   - Weak password
   - Network failures

3. **Edge Cases**
   - Multiple reset requests
   - Token reuse attempts
   - Special characters in password
   - Very long passwords

## Future Enhancements

1. **Additional Security**
   - CAPTCHA for multiple attempts
   - SMS verification option
   - Security questions

2. **User Experience**
   - Password strength meter
   - Remember password suggestions
   - Auto-login after reset

3. **Analytics**
   - Track reset success rates
   - Monitor common failure points
   - User behavior analysis 