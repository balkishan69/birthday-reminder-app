import { useEffect, useState } from 'react';
import { Friend } from '../types';
import { requestNotificationPermission, scheduleNotification } from '../utils/notifications';

export function useNotifications(friends: Friend[]) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    return Notification.permission === 'granted';
  });

  useEffect(() => {
    if (!notificationsEnabled) return;

    friends.forEach(friend => {
      const today = new Date();
      const birthday = new Date(friend.birthday);
      
      // Set notification for this year
      const thisYearBirthday = new Date(
        today.getFullYear(),
        birthday.getMonth(),
        birthday.getDate(),
        9, // 9 AM
        0
      );

      // If birthday has passed this year, schedule for next year
      if (thisYearBirthday < today) {
        thisYearBirthday.setFullYear(today.getFullYear() + 1);
      }

      scheduleNotification(friend.name, thisYearBirthday);
    });
  }, [friends, notificationsEnabled]);

  const toggleNotifications = async () => {
    const granted = await requestNotificationPermission();
    setNotificationsEnabled(granted);
    return granted;
  };

  return { enabled: notificationsEnabled, toggle: toggleNotifications };
}