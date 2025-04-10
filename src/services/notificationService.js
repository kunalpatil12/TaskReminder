import PushNotification from 'react-native-push-notification';
import moment from 'moment';
import PushNotificationIOS from '@react-native-community/push-notification-ios';


export const configureNotifications = () => {
  PushNotification.configure({
    onRegister: function(token) {
      console.log("TOKEN:", token);
    },
    onNotification: function(notification) {
      console.log("NOTIFICATION:", notification);
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });

  PushNotification.createChannel(
    {
      channelId: "user-reminders",
      channelName: "User Reminders",
      channelDescription: "Channel for user reminder notifications",
      soundName: "default",
      importance: 4,
      vibrate: true,
    },
    (created) => console.log(`Notification channel created: ${created}`)
  );
};

export const scheduleNotification = (task) => {
  if (!task.date || !task.time) return;

  const notificationTime = moment(`${task.date} ${task.time}`, 'YYYY-MM-DD HH:mm');
  
  // Schedule 10 minutes before
  const tenMinutesBefore = notificationTime.clone().subtract(10, 'minutes');
  if (tenMinutesBefore.isAfter(moment())) {
    PushNotification.localNotificationSchedule({
      channelId: "user-reminders",
      title: "Reminder: Upcoming Task",
      message: `"${task.title}" is coming up in 10 minutes`,
      date: tenMinutesBefore.toDate(),
      allowWhileIdle: true,
    });
  }

  // Schedule 5 minutes before
  const fiveMinutesBefore = notificationTime.clone().subtract(5, 'minutes');
  if (fiveMinutesBefore.isAfter(moment())) {
    PushNotification.localNotificationSchedule({
      channelId: "user-reminders",
      title: "Reminder: Upcoming Task",
      message: `"${task.title}" is coming up in 5 minutes`,
      date: fiveMinutesBefore.toDate(),
      allowWhileIdle: true,
    });
  }
};

export const cancelAllNotifications = () => {
  PushNotification.cancelAllLocalNotifications();
};