module.exports = class UserDto {
  id;
  isEmailConfirmed;
  data;
  toolbar;
  view;
  sortMode;
  createdAt;
  updatedAt;

  constructor(user) {
      // excluding password from user's data
      let userData = { ...user.data._doc };
      delete userData.password;
      
      this.id = user._id;
      this.isEmailConfirmed = user.isEmailConfirmed;
      this.data = userData;
      this.toolbar = { ...user.toolbar._doc };
      this.view = { ...user.view._doc };
      this.sortMode = { ...user.sortMode._doc };
      this.createdAt = user.createdAt;
      this.updatedAt = user.updatedAt;
  }
};