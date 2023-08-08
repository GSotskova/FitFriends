import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus, FormRegistration} from '../../constants';
import {UserProcess} from '../../types/state';
import {checkAuthAction, loginUser, checkEmail, fetchUser, fetchUserCatalog, fetchUserOther, fetchCountUsers} from '../api-actions-user';
import {updateCertificate, postCertificate, deleteCertificate} from '../api-actions-coach';
import { User, UserFullInfo, UserGeneral, UserRole, UserSex } from '../../types/user';
import { StationMetro } from '../../types/station-metro';
import { LevelTraining, TrainingTime } from '../../types/questionnaire';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  authInfo: null,
  hasErrorLogin: false,
  userData: null,
  userFullInfo: {
    id: '',
    userName: '',
    email: '',
    sex: UserSex.None,
    dateBirth: '',
    role: UserRole.Coach,
    description: '',
    location: StationMetro.Pionerskaya,
    levelTraining: LevelTraining.Beginner,
    trainingType: [],
    successCoach: '',
    isPersonal: false,
    trainingTime: TrainingTime.Time30,
    caloriesReset: 0,
    caloriesSpend: 0,
    isReady: false,
    certificate: [],
    certificatesPath: []
  },
  isUserLoading: false,
  isUserCatalogLoading: false,
  isAuthInfoLoading: false,
  formRegistrType: FormRegistration.General,
  existsEmail: false,
  hasErrorPostCertificate: false,
  users: [],
  userOther: null,
  isUserOtherLoading: false,
  countUsers: 0
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {
    setAuthInfo: (state, action: PayloadAction<{authInfo: User}>) => {
      state.authInfo = action.payload.authInfo;
    },
    setUserGeneralInfo: (state, action: PayloadAction<{userData: UserGeneral}>) => {
      state.userData = action.payload.userData;
    },
    setUserFullInfo: (state, action: PayloadAction<{userFullInfo: UserFullInfo}>) => {
      state.userFullInfo = action.payload.userFullInfo;
    },
    setFormType: (state, action: PayloadAction<{type: FormRegistration}>) => {
      state.formRegistrType = action.payload.type;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAction.pending, (state) => {
        state.isAuthInfoLoading = true;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.authInfo = action.payload;
        state.isAuthInfoLoading = false;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isAuthInfoLoading = false;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.hasErrorLogin = false;
      })
      .addCase(loginUser.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.hasErrorLogin = true;
      })
      .addCase(checkEmail.fulfilled, (state) => {
        state.existsEmail = false;
      })
      .addCase(checkEmail.rejected, (state) => {
        state.existsEmail = true;
      })
      .addCase(fetchUser.pending, (state) => {
        state.isUserLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.userFullInfo = action.payload;
        state.isUserLoading = false;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.isUserLoading = false;
      })
      .addCase(fetchUserCatalog.pending, (state) => {
        state.isUserCatalogLoading = true;
      })
      .addCase(fetchUserCatalog.fulfilled, (state, action) => {
        state.users = action.payload;
        state.isUserCatalogLoading = false;
      })
      .addCase(fetchUserCatalog.rejected, (state) => {
        state.isUserCatalogLoading = false;
      })
      .addCase(fetchCountUsers.fulfilled, (state, action) => {
        state.countUsers = action.payload;
      })
      .addCase(updateCertificate.fulfilled, (state) => {
        state.hasErrorPostCertificate = false;
      })
      .addCase(updateCertificate.rejected, (state) => {
        state.hasErrorPostCertificate = true;
      })
      .addCase(postCertificate.fulfilled, (state) => {
        state.hasErrorPostCertificate = false;
      })
      .addCase(postCertificate.rejected, (state) => {
        state.hasErrorPostCertificate = true;
      })
      .addCase(deleteCertificate.fulfilled, (state) => {
        state.hasErrorPostCertificate = false;
      })
      .addCase(deleteCertificate.rejected, (state) => {
        state.hasErrorPostCertificate = true;
      })
      .addCase(fetchUserOther.pending, (state) => {
        state.isUserOtherLoading = true;
      })
      .addCase(fetchUserOther.fulfilled, (state, action) => {
        state.userOther = action.payload;
        state.isUserOtherLoading = false;
      })
      .addCase(fetchUserOther.rejected, (state) => {
        state.isUserOtherLoading = false;
      });
  }
});

export const {setAuthInfo, setUserGeneralInfo, setUserFullInfo, setFormType} = userProcess.actions;
