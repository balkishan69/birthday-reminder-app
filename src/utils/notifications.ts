export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    return false;
  }
}

export function scheduleNotification(title: string, date: Date) {
  if (Notification.permission !== 'granted') return;

  const now = new Date();
  const timeUntilBirthday = date.getTime() - now.getTime();

  if (timeUntilBirthday <= 0) return;

  setTimeout(() => {
    try {
      new Notification('Birthday Reminder! 🎉', {
        body: `It's ${title}'s birthday today!`,
        icon: '/cake-icon.png',
        badge: '/cake-icon.png',
        requireInteraction: true
      });
    } catch (error) {
      console.error('Error showing notification:', error);
    }
  }, timeUntilBirthday);
}