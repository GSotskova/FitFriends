import {userProcess} from './user-process';
import {UserProcess} from '../../types/state';
import {AuthorizationStatus, FormRegistration} from '../../constants';
import {checkAuthAction, loginUser, fetchUser, fetchUserCatalog} from '../api-actions-user';
import {makeFakeUser, makeFakeUserFullInfo} from '../../utils/mocks';
import { UserRole, UserSex } from '../../types/user';
import { StationMetro } from '../../types/station-metro';
import { LevelTraining, TrainingTime } from '../../types/questionnaire';

const userFullNull = { id: '', userName: '', email: '', sex: UserSex.None, dateBirth: '', role: UserRole.Coach,
  description: '', location: StationMetro.Pionerskaya, levelTraining: LevelTraining.Beginner,
  trainingType: [], successCoach: '', isPersonal: false, trainingTime: TrainingTime.Time30,
  caloriesReset: 0, caloriesSpend: 0, isReady: false, certificate: [], certificatesPath: []};


describe('Reducer: user', () => {
  let state: UserProcess;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      authInfo: null,
      hasErrorLogin: false,
      userData: null,
      userFullInfo: userFullNull,
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
  });

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        authInfo: null,
        hasErrorLogin: false,
        userData: null,
        userFullInfo: userFullNull,
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
      });
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" if checkAuthAction fulfilled', () => {
      const fakeUser = makeFakeUser();
      expect(userProcess.reducer(state, { type: checkAuthAction.fulfilled.type, payload: fakeUser}))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth, authInfo: fakeUser, hasErrorLogin: false,
          userData: null, userFullInfo: userFullNull, isUserLoading: false, isUserCatalogLoading: false,
          isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
          hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0});
    });
    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(userProcess.reducer(state, { type: checkAuthAction.rejected.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, authInfo: null, hasErrorLogin: false,
          userData: null, userFullInfo: userFullNull, isUserLoading: false, isUserCatalogLoading: false,
          isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
          hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0});
    });
  });

  describe('loginAction test', () => {
    it('should update authorizationStatus to "AUTH" if loginAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: loginUser.fulfilled.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.Auth, authInfo: null, hasErrorLogin: false,
          userData: null, userFullInfo: userFullNull, isUserLoading: false, isUserCatalogLoading: false,
          isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
          hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0});
    });
    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(userProcess.reducer(state, { type: loginUser.rejected.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.NoAuth, authInfo: null, hasErrorLogin: true,
          userData: null, userFullInfo: userFullNull, isUserLoading: false, isUserCatalogLoading: false,
          isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
          hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0});
    });
  });


  describe('fetchUser test', () => {
    it('should get userFullInfo if fetchUser fulfilled', () => {
      const fakeUser = makeFakeUserFullInfo();
      expect(userProcess.reducer(state, { type: fetchUser.fulfilled.type, payload: fakeUser }))
        .toEqual({authorizationStatus: AuthorizationStatus.Unknown, authInfo: null, hasErrorLogin: false,
          userData: null, userFullInfo: fakeUser, isUserLoading: false, isUserCatalogLoading: false,
          isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
          hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0});
    });
    it('should userFullInfo is null if fetchUser rejected', () => {
      expect(userProcess.reducer(state, { type: fetchUser.rejected.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.Unknown, authInfo: null, hasErrorLogin: false,
          userData: null, userFullInfo: userFullNull, isUserLoading: false, isUserCatalogLoading: false,
          isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
          hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0});
    });
  });


  describe('fetchUserCatalog test', () => {
    it('fetchUserCatalog fulfilled test', () => {
      const fakeUsers = Array.from({length: 5}, () => makeFakeUserFullInfo());
      expect(userProcess.reducer(state, { type: fetchUserCatalog.fulfilled, payload: fakeUsers}))
        .toEqual({authorizationStatus: AuthorizationStatus.Unknown, authInfo: null, hasErrorLogin: false,
          userData: null, userFullInfo: userFullNull, isUserLoading: false, isUserCatalogLoading: false,
          isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
          hasErrorPostCertificate: false, users: fakeUsers, userOther: null, isUserOtherLoading: false, countUsers: 0});
    });
    it('fetchOffersAction rejected test', () => {
      expect(userProcess.reducer(state, { type: fetchUserCatalog.rejected.type }))
        .toEqual({authorizationStatus: AuthorizationStatus.Unknown, authInfo: null, hasErrorLogin: false,
          userData: null, userFullInfo: userFullNull, isUserLoading: false, isUserCatalogLoading: false,
          isAuthInfoLoading: false, formRegistrType: FormRegistration.General, existsEmail: false,
          hasErrorPostCertificate: false, users: [], userOther: null, isUserOtherLoading: false, countUsers: 0});
    });
  });

});
