import React from 'react';
import { Gift, Trash2 } from 'lucide-react';
import { Friend } from '../types';

interface BirthdayListProps {
  friends: Friend[];
  onDelete: (id: string) => void;
}

export default function BirthdayList({ friends, onDelete }: BirthdayListProps) {
  const calculateDaysUntilBirthday = (birthday: string) => {
    const today = new Date();
    const birthdayDate = new Date(birthday);
    birthdayDate.setFullYear(today.getFullYear());
    
    if (birthdayDate < today) {
      birthdayDate.setFullYear(today.getFullYear() + 1);
    }
    
    const diffTime = birthdayDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const sortedFriends = [...friends].sort((a, b) => {
    const daysA = calculateDaysUntilBirthday(a.birthday);
    const daysB = calculateDaysUntilBirthday(b.birthday);
    return daysA - daysB;
  });

  return (
    <div className="space-y-4">
      {sortedFriends.map((friend) => {
        const daysUntil = calculateDaysUntilBirthday(friend.birthday);
        const formattedDate = new Date(friend.birthday).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
        });

        return (
          <div
            key={friend.id}
            className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Gift className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{friend.name}</h3>
                <p className="text-sm text-gray-600">{formattedDate}</p>
                {friend.notes && (
                  <p className="text-sm text-gray-500 mt-1">{friend.notes}</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-600">
                {daysUntil === 0
                  ? "Today!"
                  : daysUntil === 1
                  ? "Tomorrow!"
                  : `${daysUntil} days`}
              </span>
              <button
                onClick={() => onDelete(friend.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        );
      })}
      {friends.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No birthdays added yet. Add some friends to get started!
        </div>
      )}
    </div>
  );
}