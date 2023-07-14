import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus, FormRegistration} from '../../constants';
import {UserProcess} from '../../types/state';
import {checkAuthAction, loginAction, logoutAction, checkEmail} from '../api-actions';
import { User, UserRegister, UserRole, UserSex } from '../../types/user';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  authInfo: null,
  hasErrorLogin: false,
  userData: {
    userName: '',
    email: '',
    avatar: '',
    sex: UserSex.None,
    dateBirth: '',
    role: UserRole.Coach,
    description: '',
    location: '',
    password: ''
  },
  formRegistrType: FormRegistration.General,
  existsEmail: false
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    loadAuthInfo: (state, action: PayloadAction<{authInfo: User}>) => {
      state.authInfo = action.payload.authInfo;
    },
    setUserGeneralInfo: (state, action: PayloadAction<{userData: UserRegister}>) => {
      state.userData = action.payload.userData;
    },
    setFormType: (state, action: PayloadAction<{type: FormRegistration}>) => {
      state.formRegistrType = action.payload.type;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.authInfo = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.hasErrorLogin = false;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.hasErrorLogin = true;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.hasErrorLogin = false;
      })
      .addCase(checkEmail.fulfilled, (state, action) => {
        state.existsEmail = false;
      })
      .addCase(checkEmail.rejected, (state) => {
        state.existsEmail = true;
      });
  }
});

export const {loadAuthInfo, setUserGeneralInfo, setFormType} = userProcess.actions;
