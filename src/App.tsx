import React, { useState, useEffect } from 'react';
import { PlusCircle, Calendar, Bell, BellOff } from 'lucide-react';
import AddFriendForm from './components/AddFriendForm';
import BirthdayList from './components/BirthdayList';
import { Friend } from './types';
import { useNotifications } from './hooks/useNotifications';

function App() {
  const [friends, setFriends] = useState<Friend[]>(() => {
    const saved = localStorage.getItem('friends');
    return saved ? JSON.parse(saved) : [];
  });
  const [isAddingFriend, setIsAddingFriend] = useState(false);
  const notifications = useNotifications(friends);

  useEffect(() => {
    localStorage.setItem('friends', JSON.stringify(friends));
  }, [friends]);

  const handleAddFriend = (newFriend: Omit<Friend, 'id'>) => {
    setFriends([
      ...friends,
      {
        ...newFriend,
        id: crypto.randomUUID(),
      },
    ]);
  };

  const handleDeleteFriend = (id: string) => {
    setFriends(friends.filter((friend) => friend.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              Birthday Reminder
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={notifications.toggle}
              className={`p-2 rounded-full transition-colors ${
                notifications.enabled
                  ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={notifications.enabled ? 'Notifications enabled' : 'Enable notifications'}
            >
              {notifications.enabled ? (
                <Bell className="w-6 h-6" />
              ) : (
                <BellOff className="w-6 h-6" />
              )}
            </button>
            <button
              onClick={() => setIsAddingFriend(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <PlusCircle className="w-5 h-5" />
              Add Birthday
            </button>
          </div>
        </div>

        <BirthdayList friends={friends} onDelete={handleDeleteFriend} />

        {isAddingFriend && (
          <AddFriendForm
            onAdd={handleAddFriend}
            onClose={() => setIsAddingFriend(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;