export interface Friend {
  id: string;
  name: string;
  birthday: string;
  email: string;
  notes?: string;
}

export interface BirthdayNotification {
  id: string;
  name: string;
  daysUntil: number;
}