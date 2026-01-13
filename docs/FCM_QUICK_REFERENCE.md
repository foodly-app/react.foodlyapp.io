# FCM Quick Reference - React Web

## 🚀 Quick Start Checklist

### Backend Requirements
- [ ] Endpoint `/api/website/settings/notifications?platform=react-web` returns:
  ```json
  {
    "firebase_config": { ... },
    "vapid_public_key": "...",
    "notification_icon": "..."
  }
  ```
- [ ] Endpoint `/api/website/me/notifications/fcm-token` accepts POST with token
- [ ] Firebase project configured with Cloud Messaging enabled

### Frontend Files Modified
- [x] `src/api/auth.ts` - Added platform parameter
- [x] `src/hooks/useFcm.tsx` - Dynamic config loading
- [x] `public/firebase-messaging-sw.js` - Service Worker created

### Testing Steps
1. **Open app** → Check console for "Initializing FCM..."
2. **Grant permission** → Check for "FCM Token synced successfully"
3. **Check DevTools** → Application → Service Workers → firebase-messaging-sw.js active
4. **Send test notification** → Should see toast + hear sound (foreground)
5. **Close app** → Send notification → Should see browser notification (background)

## 📝 Code Snippets

### Request Permission Manually
```typescript
import { useFcm } from './hooks/useFcm';

const { requestPermission } = useFcm();

// In your component
const handleEnableNotifications = async () => {
  const granted = await requestPermission();
  if (granted) {
    console.log('Notifications enabled!');
  }
};
```

### Check Notification Permission
```typescript
// Check current permission status
const permissionStatus = Notification.permission;
// Values: 'granted', 'denied', 'default'

if (permissionStatus === 'granted') {
  // Notifications are enabled
}
```

### Access Unread Count
```typescript
import { useNotifications } from './context/NotificationContext';

const { unreadCount, refreshUnreadCount } = useNotifications();

// Display count
<span>{unreadCount}</span>

// Refresh from server
await refreshUnreadCount();
```

## 🔍 Debugging Commands

### Check Service Worker in Console
```javascript
// List all service workers
navigator.serviceWorker.getRegistrations().then(regs => {
  console.log('Service Workers:', regs);
});

// Check FCM service worker
navigator.serviceWorker.getRegistrations().then(regs => {
  const fcm = regs.find(r => r.active?.scriptURL.includes('firebase-messaging-sw.js'));
  console.log('FCM SW:', fcm);
});
```

### Check Notification Permission
```javascript
console.log('Permission:', Notification.permission);
```

### Test Local Notification
```javascript
if (Notification.permission === 'granted') {
  new Notification('Test', {
    body: 'This is a test notification',
    icon: '/assets/images/logo.png'
  });
}
```

## 🐛 Common Issues & Solutions

### Issue: Service Worker not registering
**Check:**
- Is app running on HTTPS? (required for SW)
- Is `/firebase-messaging-sw.js` accessible?
- Check browser console for errors

**Solution:**
```bash
# In development, ensure vite serves the file
# Check: http://localhost:5173/firebase-messaging-sw.js
```

### Issue: No FCM token received
**Check:**
- Is notification permission granted?
- Is VAPID key correct?
- Check network tab for API call

**Solution:**
```javascript
// Check in console
console.log('Permission:', Notification.permission);
// Should be 'granted'
```

### Issue: Notifications not appearing
**Check:**
- Browser notification settings
- Do Not Disturb mode
- Token saved in backend?

**Solution:**
```javascript
// Test with local notification first
new Notification('Test', { body: 'Testing...' });
```

### Issue: Sound not playing
**Check:**
- File exists: `/assets/sounds/notification.mp3`
- Browser autoplay policy
- User has interacted with page

**Solution:**
```javascript
// Test sound manually
const audio = new Audio('/assets/sounds/notification.mp3');
audio.play().catch(e => console.log('Blocked:', e));
```

## 📊 Monitoring

### Key Console Logs to Watch
```
✅ "Initializing FCM..."
✅ "Firebase config loaded from API"
✅ "FCM Service Worker registered with scope: ..."
✅ "FCM Token synced successfully: [token]"
✅ "Message received in foreground: ..."
```

### Network Requests to Monitor
```
GET /api/website/settings/notifications?platform=react-web
POST /api/website/me/notifications/fcm-token
GET /api/website/me/notifications?unread_only=1
```

## 🎯 Testing Scenarios

### Scenario 1: First Time User
1. User opens app
2. Permission modal appears
3. User clicks "Enable Notifications"
4. Permission granted
5. FCM token retrieved and saved
6. ✅ Ready to receive notifications

### Scenario 2: Returning User (Permission Granted)
1. User opens app
2. FCM initializes automatically
3. Token refreshed if needed
4. ✅ Ready to receive notifications

### Scenario 3: Foreground Notification
1. App is open and focused
2. Backend sends notification
3. `onMessage` handler triggered
4. Sound plays
5. Toast notification appears
6. Unread count increments
7. ✅ User sees notification

### Scenario 4: Background Notification
1. App is closed or minimized
2. Backend sends notification
3. Service Worker receives push event
4. Browser shows native notification
5. User clicks notification
6. App opens/focuses
7. ✅ User redirected to relevant page

## 🔗 Useful Links

- **Firebase Console**: https://console.firebase.google.com/
- **FCM Documentation**: https://firebase.google.com/docs/cloud-messaging/js/client
- **Service Worker API**: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
- **Notification API**: https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API

## 📞 Support

For detailed documentation, see:
- English: `/docs/FCM_IMPLEMENTATION.md`
- Georgian: `/docs/FCM_IMPLEMENTATION_GE.md`

For testing UI, visit:
- `/fcm-test` (after adding route)
