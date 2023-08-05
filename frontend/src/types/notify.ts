export enum NotifyMessage {
  Friend = 'Вас добавил в друзья пользователь ',
  Training = 'Вас приглашает на совместную тренировку пользователь ',
  Personal= 'Запрос на персональную тренировку от пользователя '
}


export type Notify = {
  id: string;
  userId: string;
  initiatorId: string;
  initiatorName: string;
  text: NotifyMessage;
  dateNotify: Date;
}
