import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus, FormRegistration} from '../../constants';
import {UserProcess} from '../../types/state';
import {checkAuthAction, loginUser, logoutAction, checkEmail} from '../api-actions';
import { User, UserFullInfo, UserGeneral } from '../../types/user';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  authInfo: null,
  hasErrorLogin: false,
  userData: null,
  userFullInfo: null,
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
    setUserGeneralInfo: (state, action: PayloadAction<{userData: UserGeneral}>) => {
      state.userData = action.payload.userData;
    },
    setUserFullInfo: (state, action: PayloadAction<{userFullinfo: UserFullInfo}>) => {
      state.userFullInfo = action.payload.userFullinfo;
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
      .addCase(loginUser.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.hasErrorLogin = false;
      })
      .addCase(loginUser.rejected, (state) => {
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

export const {loadAuthInfo, setUserGeneralInfo, setUserFullInfo, setFormType} = userProcess.actions;
