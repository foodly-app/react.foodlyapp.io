# Push Notification-ის იმპლემენტაცია - React Web

## რა გაკეთდა

### 1. ✅ API კონფიგურაციის წამოღება
განახლდა `src/api/auth.ts` ფაილი:
- დაემატა `platform=react-web` პარამეტრი `/api/website/settings/notifications` ენდპოინტზე
- API ახლა აბრუნებს `firebase_config` და `vapid_public_key`-ს

### 2. ✅ Firebase-ის ინიციალიზაცია
განახლდა `src/hooks/useFcm.tsx`:
- **წაიშალა** ჰარდკოდირებული Firebase კონფიგურაცია
- **დაემატა** დინამიური კონფიგურაციის წამოღება API-დან
- Firebase ინიციალიზდება API-დან მიღებული `firebase_config`-ით
- დამატებული ვალიდაცია: თუ API არ აბრუნებს `firebase_config` ან `vapid_public_key`-ს, პროცესი წყდება

### 3. ✅ Service Worker-ის რეგისტრაცია
განახლდა Service Worker რეგისტრაცია:
```typescript
navigator.serviceWorker.register('/firebase-messaging-sw.js?platform=react-web')
```
- დაემატა `?platform=react-web` პარამეტრი როგორც მოთხოვნილია

### 4. ✅ Service Worker ფაილის შექმნა
შეიქმნა `public/firebase-messaging-sw.js`:
- ამოიღებს `platform` პარამეტრს URL-დან
- ჩატვირთვისას იღებს Firebase კონფიგურაციას API-დან
- ამუშავებს background ნოტიფიკაციებს
- ამუშავებს notification click ივენთებს

### 5. ✅ ტოკენის აღება და გაგზავნა
იმპლემენტირებულია სრული ფლოუ:
```typescript
// 1. ნებართვის მოთხოვნა
const permission = await Notification.requestPermission();

// 2. ტოკენის აღება VAPID key-ით
const token = await getToken(messaging, { 
    vapidKey: vapid_public_key 
});

// 3. ტოკენის გაგზავნა backend-ზე
await authService.saveFcmToken({
    token: token,
    platform: 'web',
    device_name: navigator.userAgent
});
```

## ფაილები რომლებიც შეიცვალა/შეიქმნა

### შეცვლილი ფაილები:
1. **src/hooks/useFcm.tsx**
   - წაშლილია ჰარდკოდირებული Firebase config
   - დამატებულია დინამიური კონფიგურაციის წამოღება
   - განახლებულია Service Worker რეგისტრაცია platform პარამეტრით
   - დამატებულია `requestPermission()` მეთოდი

2. **src/api/auth.ts**
   - `getNotificationSettings()` მეთოდს დაემატა `platform: 'react-web'` პარამეტრი

### ახალი ფაილები:
3. **public/firebase-messaging-sw.js**
   - Service Worker background ნოტიფიკაციებისთვის
   - დინამიურად იღებს Firebase კონფიგურაციას
   - ამუშავებს push ივენთებს

4. **docs/FCM_IMPLEMENTATION.md**
   - სრული დოკუმენტაცია ინგლისურად
   - არქიტექტურის აღწერა
   - Flow დიაგრამები
   - Troubleshooting გაიდი

5. **src/components/profile/fcm-test.tsx**
   - ტესტირების გვერდი FCM ფუნქციონალის შესამოწმებლად
   - UI ნებართვის მოსაწოდებლად
   - Service Worker სტატუსის შესამოწმებლად

## როგორ მუშაობს

### 1. აპლიკაციის ჩატვირთვა
```
User ხსნის აპლიკაციას
    ↓
AuthContext ამოწმებს ავთენტიფიკაციას
    ↓
თუ authenticated → useFcm hook ინიციალიზდება
```

### 2. Firebase კონფიგურაციის წამოღება
```typescript
GET /api/website/settings/notifications?platform=react-web

Response:
{
  "firebase_config": { ... },
  "vapid_public_key": "...",
  "notification_icon": "..."
}
```

### 3. Firebase ინიციალიზაცია
```typescript
const app = initializeApp(firebase_config);
const messaging = getMessaging(app);
```

### 4. Service Worker რეგისტრაცია
```typescript
navigator.serviceWorker.register('/firebase-messaging-sw.js?platform=react-web')
```

### 5. ტოკენის აღება (თუ permission granted)
```typescript
const token = await getToken(messaging, { 
    vapidKey: vapid_public_key 
});
```

### 6. ტოკენის შენახვა Backend-ზე
```typescript
POST /api/website/me/notifications/fcm-token
{
  "token": "...",
  "platform": "web",
  "device_name": "Mozilla/5.0..."
}
```

### 7. Foreground Messages
როცა აპლიკაცია ღიაა:
- ისმის ხმა (`/assets/sounds/notification.mp3`)
- ჩნდება toast ნოტიფიკაცია
- იზრდება unread count

### 8. Background Messages
როცა აპლიკაცია დახურულია:
- Service Worker იღებს notification-ს
- ჩნდება browser-ის native notification
- Click-ზე იხსნება აპლიკაცია

## ტესტირება

### 1. Developer Console-ში შემოწმება
```javascript
// Browser Console-ში უნდა ჩანდეს:
"Initializing FCM..."
"Firebase config loaded from API"
"FCM Service Worker registered with scope: ..."
"FCM Token synced successfully: [token]"
```

### 2. Service Worker შემოწმება
1. გახსენი DevTools (F12)
2. Application → Service Workers
3. უნდა ჩანდეს `firebase-messaging-sw.js` - status: "activated"

### 3. ტესტ გვერდის გამოყენება
შეგიძლია დაამატო route App.tsx-ში:
```typescript
{ path: "/fcm-test", element: <FcmTestPage /> }
```

შემდეგ გადადი `/fcm-test` გვერდზე და:
- დააჭირე "Request Notification Permission"
- შეამოწმე Service Worker სტატუსი
- გაგზავნე test notification

## რა არის საჭირო Backend-ზე

Backend-მა უნდა დააბრუნოს შემდეგი ფორმატი:

```json
GET /api/website/settings/notifications?platform=react-web

{
  "firebase_config": {
    "apiKey": "AIzaSy...",
    "authDomain": "project.firebaseapp.com",
    "projectId": "project-id",
    "storageBucket": "project.appspot.com",
    "messagingSenderId": "123456789",
    "appId": "1:123456789:web:abc123",
    "measurementId": "G-ABC123"
  },
  "vapid_public_key": "BNxxx...xxx",
  "notification_icon": "https://example.com/icon.png"
}
```

## მნიშვნელოვანი შენიშვნები

### ✅ რა გაკეთდა სწორად:
1. აღარ არის ჰარდკოდირებული Firebase config
2. Service Worker იღებს platform პარამეტრს
3. API-დან მოდის ყველა საჭირო კონფიგურაცია
4. სრულად იმპლემენტირებულია foreground და background notifications

### ⚠️ რაზე უნდა ყურადღება:
1. **HTTPS აუცილებელია** - Service Workers მუშაობს მხოლოდ HTTPS-ზე
2. **Browser Permission** - user-მა უნდა დაეთანხმოს notifications-ს
3. **Sound File** - დარწმუნდი რომ არსებობს `/assets/sounds/notification.mp3`
4. **Backend Config** - backend-მა სწორად უნდა დააბრუნოს `firebase_config`

## შემდეგი ნაბიჯები

1. **Backend-ის შემოწმება**: დარწმუნდი რომ `/api/website/settings/notifications?platform=react-web` სწორად მუშაობს
2. **ტესტირება**: გამოიყენე `/fcm-test` გვერდი ან browser console
3. **Production Deploy**: deploy გააკეთე HTTPS-ზე
4. **ნოტიფიკაციების გაგზავნა**: backend-დან გაგზავნე test notification

## დახმარება

თუ რაიმე პრობლემა გაქვს:
1. შეამოწმე Browser Console logs
2. შეამოწმე Network tab - API calls
3. შეამოწმე Application → Service Workers
4. წაიკითხე `docs/FCM_IMPLEMENTATION.md` დეტალური ინფორმაციისთვის
