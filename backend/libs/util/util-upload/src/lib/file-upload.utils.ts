export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const avatarFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  if (file.size > 1024) {
    return callback(new Error('Maximum image size is 1 megabyte!'), false);
  }
  callback(null, true);
};

export const pdfFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(pdf)$/)) {
    return callback(new Error('Only pdf files are allowed!'), false);
  }
  callback(null, true);
};

export const videoFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(mov|avi|mp4)$/)) {
    return callback(new Error('Only video files are allowed!'), false);
  }
  callback(null, true);
};
