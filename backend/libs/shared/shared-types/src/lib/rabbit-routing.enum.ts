export enum RabbitRouting {
  AddSubscriber = 'notify.addSubscriber',
  GetOrders = 'training.getOrdersUser',
  GeNewtTraining = 'training.getNewTraining',
  AddNotifyTraining = 'notify.addNotifyTraining',
  TrainingRequestNotify = 'users.trainingRequestNotify',
  TrainingNotify = 'users.trainingNotify',
  AddUserNotify = 'notify.addUserNotify',
  UserAvatars = 'users.userAvatars',
  CoachCertificate = 'users.CoachCertificate',
  UserBackgroundImg = 'users.userBackgroundImg',
  TrainingImg = 'training.trainingImg',
  TrainingVideo = 'training.trainingVideo'
}

export enum RabbitExchange {
  Uploader = 'fitfriends.uploader',
  Notify = 'fitfriends.notify',
  Training = 'fitfriends.training',
}

export enum RabbitQueue {
  Avatar = 'fitfriends.uploader.avatar',
  Background = 'fitfriends.uploader.background',
  Subscriber = 'fitfriends.notify.subscriber',
  Training = 'fitfriends.notify.training',
  NotifyUser = 'fitfriends.notify.user',
  Newtraining = 'fitfriends.training.newtraining',
  Request = 'fitfriends.training.request',
  Image = 'fitfriends.uploader.img',
  Video = 'fitfriends.uploader.video',
  Certificate = 'fitfriends.uploader.certificate',
}
