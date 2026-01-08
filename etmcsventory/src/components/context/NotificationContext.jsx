// context/NotificationContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const NotificationContext = createContext();

export const useNotification = () => {
  return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Fetch unread count on initial load
  useEffect(() => {
    fetchUnreadCount();
  }, []);

  // Fetch notifications for the admin
  const fetchNotifications = async () => {
    try {
      const response = await axios.get('/api/notifications');
      setNotifications(response.data);
    } catch (err) {
      console.error('Error fetching notifications', err);
    }
  };

  // Fetch unread notifications count
  const fetchUnreadCount = async () => {
    try {
      const response = await axios.get('/api/notifications/unread');
      setUnreadCount(response.data.count);
    } catch (err) {
      console.error('Error fetching unread notifications count', err);
    }
  };

  // Mark a notification as read
  const markAsRead = async (id) => {
    try {
      await axios.put(`/api/notifications/${id}/read`);
      setUnreadCount(unreadCount - 1); // Decrease the unread count
      setNotifications((prev) => prev.map((notification) =>
        notification._id === id ? { ...notification, isRead: true } : notification
      ));
    } catch (err) {
      console.error('Error marking notification as read', err);
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, fetchNotifications, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};
