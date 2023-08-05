import {useEffect, useState} from 'react';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Query } from '../../types/training';
import { LEVEL_TRAIN_ARR, LevelTraining, TRAINING_ARR, TrainingType } from '../../types/questionnaire';
import { useNavigate } from 'react-router-dom';
import { SHOW_TRAINING_TYPE, DEFAULT_LIMIT } from '../../constants';
import { getUsers, getCountUsers, getSignUserCatalogLoading } from '../../store/user-process/selectors';
import { STATION_METRO, StationMetro } from '../../types/station-metro';
import { USER_ROLE_ARR_TYPE, UserRole } from '../../types/user';
import UserItem from '../../components/user-item/user-item';
import { fetchUserCatalog } from '../../store/api-actions';
import useScrollToUp from '../../hooks/use-scroll-to-up/use-scroll-to-up';
import LoadingScreen from '../loading-screen/loading-screen';


function CatalogUsersPage() {
  useScrollToUp();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsers);
  const totalUsers = useAppSelector(getCountUsers);
  const totalPage = Math.ceil(totalUsers / DEFAULT_LIMIT);
  const isUserCatalogLoading = useAppSelector(getSignUserCatalogLoading);


  const [trainingShow, setTrainingShow] = useState<TrainingType[]>(TRAINING_ARR.slice(0,SHOW_TRAINING_TYPE));
  const hadleShowMore = () => {
    setTrainingShow(TRAINING_ARR);
  };

  const [query, setQuery] = useState<Query>({limit: DEFAULT_LIMIT, page: 1});
  const handleFilterChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value, name} = evt.target;
    if (name === 'specialisation') {
      const isChecked = !!(query && query?.trainingType && query?.trainingType.find((el) => el === value as TrainingType));
      if (isChecked && query.trainingType) {
        const currentArr = query.trainingType.filter((el) => el !== value);
        evt.target.removeAttribute('checked');
        currentArr.length === 0 ? setQuery({...query, trainingType: undefined}) : setQuery({...query, trainingType: currentArr});
      }
      else {
        const currentArr = query && query.trainingType ? query.trainingType : [];
        setQuery({...query, trainingType: [...currentArr, value as TrainingType]});
        evt.target.setAttribute('checked', 'true');
      }
    }
    if (name === 'location') {
      const isChecked = !!(query && query?.location && query?.location.find((el) => el === value as StationMetro));
      if (isChecked && query.location) {
        const currentArr = query.location.filter((el) => el !== value);
        evt.target.removeAttribute('checked');
        currentArr.length === 0 ? setQuery({...query, location: undefined}) : setQuery({...query, location: currentArr});
      }
      else {
        const currentArr = query && query.location ? query.location : [];
        setQuery({...query, location: [...currentArr, value as StationMetro]});
        evt.target.setAttribute('checked', 'true');
      }
    }
    if (name === 'level') {
      setQuery({...query, levelTraining: value as LevelTraining});
      evt.target.setAttribute('checked', 'true');
    }
    if (name === 'role') {
      setQuery({...query, userRole: value as UserRole});
      evt.target.setAttribute('checked', 'true');
    }

  };

  useEffect(()=>{
    dispatch(fetchUserCatalog(query));
  }, [dispatch, query]);

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  if (isUserCatalogLoading) {
    <LoadingScreen/>;
  }

  if(!users) {
    return null;
  }
  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Каталог пользователей</h1>
              <div className="user-catalog-form">
                <h2 className="visually-hidden">Каталог пользователя</h2>
                <div className="user-catalog-form__wrapper">
                  <button
                    className="btn-flat btn-flat--underlined user-catalog-form__btnback"
                    type="button"
                    onClick={() => {dispatch(fetchUserCatalog()); navigate(-1);}}
                  >
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg><span>Назад</span>
                  </button>
                  <h3 className="user-catalog-form__title">Фильтры</h3>
                  <form className="user-catalog-form__form">
                    <div className="user-catalog-form__block user-catalog-form__block--location">
                      <h4 className="user-catalog-form__block-title">Локация, станция метро</h4>
                      <ul className="user-catalog-form__check-list">
                        {STATION_METRO.map((el)=>
                          (
                            <li className="user-catalog-form__check-list-item" key={el}>
                              <div className="custom-toggle custom-toggle--checkbox">
                                <label>
                                  <input
                                    type="checkbox"
                                    name="location"
                                    value={el}
                                    id={el}
                                    onChange={handleFilterChange}
                                  />
                                  <span className="custom-toggle__icon">
                                    <svg width="9" height="6" aria-hidden="true">
                                      <use xlinkHref="#arrow-check"></use>
                                    </svg>
                                  </span><span className="custom-toggle__label">{el}</span>
                                </label>
                              </div>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div className="user-catalog-form__block user-catalog-form__block--spezialization">
                      <h4 className="user-catalog-form__block-title">Специализация</h4>
                      <ul className="user-catalog-form__check-list">
                        {trainingShow.map((el)=>
                          (
                            <li className="user-catalog-form__check-list-item" key={el}>
                              <div className="custom-toggle custom-toggle--checkbox">
                                <label>
                                  <input
                                    className="visually-hidden"
                                    type="checkbox"
                                    name="specialisation"
                                    value={el}
                                    id={el}
                                    onChange={handleFilterChange}
                                  />
                                  <span className="custom-toggle__icon">
                                    <svg width="9" height="6" aria-hidden="true">
                                      <use xlinkHref="#arrow-check"></use>
                                    </svg>
                                  </span><span className="custom-toggle__label">{el}</span>
                                </label>
                              </div>
                            </li>
                          )
                        )}
                      </ul>
                      {trainingShow.length === SHOW_TRAINING_TYPE &&
                      <button
                        className="btn-show-more user-catalog-form__btn-show"
                        type="button"
                        onClick={hadleShowMore}
                      ><span>Посмотреть все</span>
                        <svg className="btn-show-more__icon" width="10" height="4" aria-hidden="true">
                          <use xlinkHref="#arrow-down"></use>
                        </svg>
                      </button>}
                    </div>
                    <div className="user-catalog-form__block user-catalog-form__block--level">
                      <h4 className="user-catalog-form__block-title">Ваш уровень</h4>
                      <div className="custom-toggle-radio">
                        {LEVEL_TRAIN_ARR.map((el)=>
                          (
                            <div className="custom-toggle-radio__block" key={el}>
                              <label>
                                <input
                                  type="radio"
                                  name="level"
                                  id={el}
                                  value={el}
                                  onChange={handleFilterChange}
                                />
                                <span className="custom-toggle-radio__icon"></span>
                                <span className="custom-toggle-radio__label">{el}</span>
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                    <div className="user-catalog-form__block">
                      <h3 className="user-catalog-form__title user-catalog-form__title--sort">Сортировка</h3>
                      <div className="btn-radio-sort">
                        {USER_ROLE_ARR_TYPE.map((el)=>
                          (
                            <label key={el}>
                              <input
                                type="radio"
                                name="role"
                                id={el}
                                value={el}
                                onChange={handleFilterChange}
                              />
                              <span className="btn-radio-sort__label">{el === UserRole.User ? 'Пользователи' : 'Тренеры'}</span>
                            </label>
                          )
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="inner-page__content">
                <div className="users-catalog">
                  <ul className="users-catalog__list">
                    {users.map((el)=>
                      (
                        <li className="users-catalog__item" key={el.id}>
                          <UserItem user={el} />
                        </li>)
                    )}

                  </ul>
                  <div className="show-more users-catalog__show-more">
                    {totalPage !== query.page &&
                  <button
                    className="btn show-more__button show-more__button--more"
                    type="button"
                    onClick={() => setQuery({...query, page: query.page ? query.page + 1 : 1})}
                  >Показать еще
                  </button> }
                    {totalPage === query.page && totalPage !== 1 &&
                  <button className="btn show-more__button" type="button" onClick={scrollToTop}>Вернуться в начало</button>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default CatalogUsersPage;
