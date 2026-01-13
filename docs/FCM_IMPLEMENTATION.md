# Firebase Cloud Messaging (FCM) Push Notifications - React Web Implementation

## Overview
This document describes the implementation of Firebase Cloud Messaging (FCM) for push notifications in the React web application, following the backend API specifications.

## Architecture

### 1. Configuration Fetching
The application dynamically fetches Firebase configuration from the backend API:

**Endpoint:** `GET /api/website/settings/notifications?platform=react-web`

**Response:**
```json
{
  "firebase_config": {
    "apiKey": "...",
    "authDomain": "...",
    "projectId": "...",
    "storageBucket": "...",
    "messagingSenderId": "...",
    "appId": "...",
    "measurementId": "..."
  },
  "vapid_public_key": "...",
  "notification_icon": "..."
}
```

### 2. Implementation Files

#### **src/hooks/useFcm.tsx**
Main FCM initialization hook that:
- Fetches Firebase configuration from the backend with `platform=react-web` parameter
- Initializes Firebase app with the dynamic configuration
- Registers the Service Worker with platform parameter
- Requests notification permission and retrieves FCM token
- Sends the token to backend via `/api/website/me/notifications/fcm-token`
- Handles foreground messages with sound and toast notifications

#### **src/api/auth.ts**
API service methods:
- `getNotificationSettings()` - Fetches Firebase config with platform parameter
- `saveFcmToken()` - Saves FCM token to backend

#### **public/firebase-messaging-sw.js**
Service Worker that:
- Extracts platform from query parameter (`?platform=react-web`)
- Fetches Firebase configuration from backend during installation
- Handles background push notifications
- Manages notification clicks and redirects

#### **src/context/NotificationContext.tsx**
Manages notification state:
- Tracks unread notification count
- Provides methods to increment/decrement/reset count
- Refreshes count from backend API

#### **src/modals/PermissionModal.tsx**
User-facing permission request modal:
- Prompts users to enable notifications
- Handles notification permission request
- Triggers FCM initialization on permission grant

## Flow Diagram

```
1. User loads app
   ↓
2. AuthContext checks authentication
   ↓
3. If authenticated → useFcm hook initializes
   ↓
4. Fetch config: GET /api/website/settings/notifications?platform=react-web
   ↓
5. Initialize Firebase with firebase_config
   ↓
6. Register Service Worker: /firebase-messaging-sw.js?platform=react-web
   ↓
7. Check notification permission
   ↓
8. If granted → Get FCM token with vapid_public_key
   ↓
9. Send token: POST /api/website/me/notifications/fcm-token
   {
     "token": "...",
     "platform": "web",
     "device_name": "Mozilla/5.0..."
   }
   ↓
10. Listen for foreground messages
    ↓
11. On message → Play sound + Show toast + Increment unread count
```

## Service Worker Flow

```
1. Service Worker registered with ?platform=react-web
   ↓
2. On install event:
   - Fetch: /api/website/settings/notifications?platform=react-web
   - Initialize Firebase with firebase_config
   ↓
3. On push event (background):
   - Parse notification payload
   - Show browser notification
   ↓
4. On notification click:
   - Close notification
   - Focus existing window or open new one
```

## Key Features

### ✅ Dynamic Configuration
- No hardcoded Firebase credentials
- Configuration fetched from backend per platform
- Supports multiple platforms (react-web, mobile, etc.)

### ✅ Foreground Notifications
- Real-time message handling when app is open
- Sound notification (`/assets/sounds/notification.mp3`)
- Toast notification with title and body
- Automatic unread count increment

### ✅ Background Notifications
- Service Worker handles notifications when app is closed
- Browser native notifications
- Click action to open/focus app

### ✅ Token Management
- Automatic token retrieval on permission grant
- Token synced with backend
- Device name tracking (user agent)

### ✅ Permission Handling
- User-friendly permission modal
- Graceful handling of denied permissions
- Persistent storage of permission prompt state

## API Endpoints Used

### 1. Get Notification Settings
```typescript
GET /api/website/settings/notifications?platform=react-web

Response:
{
  "firebase_config": { ... },
  "vapid_public_key": "...",
  "notification_icon": "..."
}
```

### 2. Save FCM Token
```typescript
POST /api/website/me/notifications/fcm-token

Body:
{
  "token": "fcm_token_string",
  "platform": "web",
  "device_name": "Mozilla/5.0..."
}
```

### 3. Get Notifications
```typescript
GET /api/website/me/notifications?unread_only=1

Response:
{
  "data": [...],
  "meta": {
    "total": 5
  }
}
```

## Testing

### 1. Check Service Worker Registration
Open browser DevTools → Application → Service Workers
- Should see `firebase-messaging-sw.js` registered
- Status should be "activated"

### 2. Check FCM Token
Open browser console and look for:
```
FCM Token synced successfully: [token]
```

### 3. Test Foreground Notification
- Keep app open and focused
- Send test notification from backend
- Should hear sound and see toast

### 4. Test Background Notification
- Close or minimize browser
- Send test notification from backend
- Should see browser native notification

## Troubleshooting

### Issue: Service Worker not registering
**Solution:** 
- Check browser console for errors
- Ensure `/firebase-messaging-sw.js` is accessible
- Verify HTTPS (required for service workers)

### Issue: No FCM token received
**Solution:**
- Verify notification permission is granted
- Check VAPID key is correct
- Ensure Firebase config is valid

### Issue: Notifications not appearing
**Solution:**
- Check browser notification settings
- Verify token is saved in backend
- Test with backend notification sender

### Issue: Sound not playing
**Solution:**
- Check `/assets/sounds/notification.mp3` exists
- Browser may block autoplay - user interaction required
- Check browser audio permissions

## Security Considerations

1. **HTTPS Required**: Service Workers only work on HTTPS
2. **Token Security**: FCM tokens are sent over authenticated API
3. **Permission-based**: Users must explicitly grant notification permission
4. **Platform Isolation**: Each platform has separate configuration

## Browser Compatibility

- ✅ Chrome 50+
- ✅ Firefox 44+
- ✅ Edge 17+
- ✅ Safari 16+ (with limitations)
- ❌ Internet Explorer (not supported)

## Future Enhancements

1. **Notification Actions**: Add action buttons to notifications
2. **Rich Media**: Support images in notifications
3. **Notification History**: Store notification history locally
4. **Custom Sounds**: Per-notification type sounds
5. **Do Not Disturb**: Quiet hours configuration

## Dependencies

```json
{
  "firebase": "^12.7.0",
  "react-hot-toast": "^2.6.0",
  "axios": "^1.13.2"
}
```

## File Structure

```
travgo-react/
├── public/
│   └── firebase-messaging-sw.js          # Service Worker
├── src/
│   ├── api/
│   │   └── auth.ts                       # API methods
│   ├── context/
│   │   ├── AuthContext.tsx               # Authentication state
│   │   └── NotificationContext.tsx       # Notification state
│   ├── hooks/
│   │   └── useFcm.tsx                    # FCM initialization
│   └── modals/
│       └── PermissionModal.tsx           # Permission UI
└── App.tsx                                # App entry point
```

## Support

For issues or questions, refer to:
- Firebase Documentation: https://firebase.google.com/docs/cloud-messaging/js/client
- Backend API Documentation: [Your API docs]
