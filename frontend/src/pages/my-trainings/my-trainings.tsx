import React, {useState, useEffect} from 'react';
import MultiRangeSlider, { ChangeResult } from 'multi-range-slider-react';
import Header from '../../components/header/header';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getCountAllTrainings, getTrainings, getTrainingsDataLoadingStatus } from '../../store/trainings-data/selectors';
import { fetchCoachTrainings } from '../../store/api-actions-trainings';
import TrainingItem from '../../components/training-item/training-item';
import { Query } from '../../types/training';
import { TRAINING_TIME, TrainingTime } from '../../types/questionnaire';
import { useNavigate } from 'react-router-dom';
import { AppRoute, DEFAULT_LIMIT } from '../../constants';
import LoadingScreen from '../loading-screen/loading-screen';


function MyTrainingsPage() {
  const dispatch = useAppDispatch();
  const trainings = useAppSelector(getTrainings);
  const isTrainingsDataLoading = useAppSelector(getTrainingsDataLoadingStatus);
  const total = useAppSelector(getCountAllTrainings);
  const totalPage = Math.ceil(total.totalTrainings / DEFAULT_LIMIT);

  const [query, setQuery] = useState<Query>({limit: DEFAULT_LIMIT, page: 1});
  const [formValue, setValue] = useState({
    minPrice: 0, maxPrice: total.maxPrice,
    minCalories: 1000, maxCalories: 5000,
    minRating: 0, maxRating: 5
  });

  const [sliderValue, setSliderValue] = useState({
    minPrice: 0, maxPrice: total.maxPrice,
    minCalories: 1000, maxCalories: 5000,
    minRating: 0, maxRating: 5
  });

  const handleFilterChange = (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    const {value, name} = evt.target;
    const valueNum = Math.max(0, Number(value));
    setValue({...formValue, [name]: valueNum});

    if (name === 'minPrice' && Number(valueNum) <= formValue.maxPrice) {
      setQuery({...query, price:[Number(valueNum), formValue.maxPrice]});
    }
    if (name === 'maxPrice' && Number(valueNum) >= formValue.minPrice) {
      setQuery({...query, price:[formValue.minPrice, Number(valueNum)]});
    }
    if ((name === 'maxPrice' && Number(valueNum) === 0 && formValue.minPrice === 0)
      || (name === 'minPrice' && Number(valueNum) === 0 && formValue.maxPrice === 0)) {
      setQuery({...query, price: undefined});
    }

    if (name === 'minCalories' && Number(valueNum) <= formValue.maxCalories) {
      setQuery({...query, caloriesReset:[Number(value), formValue.maxCalories]});
    }
    if (name === 'maxCalories' && Number(valueNum) >= formValue.minCalories) {
      setQuery({...query, caloriesReset:[formValue.minCalories, Number(valueNum)]});
    }
    if ((name === 'maxCalories' && Number(valueNum) === 0 && formValue.minCalories === 0)
      || (name === 'minCalories' && Number(valueNum) === 0 && formValue.maxCalories === 0)) {
      setQuery({...query, caloriesReset: undefined});
    }

    if (name === 'duration') {
      const isChecked = !!(query && query?.trainingTime && query?.trainingTime.find((el) => el === value as TrainingTime));
      if (isChecked && query.trainingTime) {
        const currentArr = query.trainingTime.filter((el) => el !== value);
        evt.target.removeAttribute('checked');
        currentArr.length === 0 ? setQuery({...query, trainingTime: undefined}) : setQuery({...query, trainingTime: currentArr});
      }
      else {
        const currentArr = query && query.trainingTime ? query.trainingTime : [];
        setQuery({...query, trainingTime: [...currentArr, value as TrainingTime]});
        evt.target.setAttribute('checked', 'true');
      }
    }
  };

  if (isTrainingsDataLoading) {
    <LoadingScreen/>;
  }

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(()=>{
    dispatch(fetchCoachTrainings(query));
  }, [dispatch, query]);

  const navigate = useNavigate();
  const routeChange = () =>{
    const path = AppRoute.AccountCoach;
    navigate(path);
  };

  if (!trainings) {
    return null;
  }
  return (
    <div className="wrapper">
      <Header />
      <main>
        <section className="inner-page">
          <div className="container">
            <div className="inner-page__wrapper">
              <h1 className="visually-hidden">Мои тренировки</h1>
              <div className="my-training-form">
                <h2 className="visually-hidden">Мои тренировки Фильтр</h2>
                <div className="my-training-form__wrapper">
                  <button
                    className="btn-flat btn-flat--underlined my-training-form__btnback"
                    type="button"
                    onClick={routeChange}
                  >
                    <svg width="14" height="10" aria-hidden="true">
                      <use xlinkHref="#arrow-left"></use>
                    </svg><span>Назад</span>
                  </button>
                  <h3 className="my-training-form__title">фильтры</h3>
                  <form className="my-training-form__form">
                    <div className="my-training-form__block my-training-form__block--price">
                      <h4 className="my-training-form__block-title">Цена, ₽</h4>
                      <div className="filter-price">
                        <div className="filter-price__input-text filter-price__input-text--min">
                          <input
                            type="number"
                            id="minPrice"
                            name="minPrice"
                            value={formValue.minPrice}
                            onChange={handleFilterChange}
                          />
                          <label htmlFor="minPrice">от</label>
                        </div>
                        <div className="filter-price__input-text filter-price__input-text--max">
                          <input
                            type="number"
                            id="maxPrice"
                            name="maxPrice"
                            value={formValue.maxPrice}
                            onChange={handleFilterChange}
                          />
                          <label htmlFor="maxPrice">до</label>
                        </div>
                      </div>
                      <div className="filter-range">
                        <MultiRangeSlider
                          min={0}
                          max={total.maxPrice}
                          step={100}
                          style={{border: 'none', boxShadow: 'none', padding: '15px 10px'}}
                          ruler='false'
                          barLeftColor='black'
                          barInnerColor='black'
                          barRightColor='black'
                          thumbLeftColor='black'
                          thumbRightColor='black'
                          minValue={sliderValue.minPrice}
                          maxValue={sliderValue.maxPrice}
                          onInput={(e: ChangeResult) => {
                            setSliderValue({...sliderValue, minPrice: e.minValue, maxPrice: e.maxValue});
                            setQuery({...query, price:[Number(e.minValue), Number(e.maxValue)]});
                          }}
                        />
                      </div>
                    </div>
                    <div className="my-training-form__block my-training-form__block--calories">
                      <h4 className="my-training-form__block-title">Калории</h4>
                      <div className="filter-calories">
                        <div className="filter-calories__input-text filter-calories__input-text--min">
                          <input
                            type="number"
                            id="minCalories"
                            name="minCalories"
                            value={formValue.minCalories}
                            onChange={handleFilterChange}
                          />
                          <label htmlFor="minCalories">от</label>
                        </div>
                        <div className="filter-calories__input-text filter-calories__input-text--max">
                          <input
                            type="number"
                            id="maxCalories"
                            name="maxCalories"
                            value={formValue.maxCalories}
                            onChange={handleFilterChange}
                          />
                          <label htmlFor="maxCalories">до</label>
                        </div>
                      </div>
                      <div className="filter-range">
                        <MultiRangeSlider
                          min={1000}
                          max={5000}
                          step={100}
                          style={{border: 'none', boxShadow: 'none', padding: '15px 10px'}}
                          ruler='false'
                          barLeftColor='black'
                          barInnerColor='black'
                          barRightColor='black'
                          thumbLeftColor='black'
                          thumbRightColor='black'
                          minValue={formValue.minCalories}
                          maxValue={formValue.maxCalories}
                          onChange={(e: ChangeResult) => {
                            setValue({...formValue, minCalories: e.minValue, maxCalories: e.maxValue});
                            setQuery({...query, caloriesReset:[Number(e.minValue), Number(e.maxValue)]});
                          }}
                        />
                      </div>
                    </div>
                    <div className="my-training-form__block my-training-form__block--raiting">
                      <h4 className="my-training-form__block-title">Рейтинг</h4>
                      <div className="filter-raiting">
                        <MultiRangeSlider
                          min={0}
                          max={5}
                          step={1}
                          style={{border: 'none', boxShadow: 'none', padding: '15px 10px'}}
                          ruler='false'
                          barLeftColor='black'
                          barInnerColor='black'
                          barRightColor='black'
                          thumbLeftColor='black'
                          thumbRightColor='black'
                          minValue={formValue.minRating}
                          maxValue={formValue.maxRating}
                          onChange={(e: ChangeResult) => {
                            setValue({...formValue, minRating: e.minValue, maxRating: e.maxValue});
                            setQuery({...query, rating:[Number(e.minValue), Number(e.maxValue)]});
                          }}
                        />
                      </div>
                    </div>
                    <div className="my-training-form__block my-training-form__block--duration">
                      <h4 className="my-training-form__block-title">Длительность</h4>
                      <ul className="my-training-form__check-list">
                        {TRAINING_TIME.map((el) => (
                          <li className="my-training-form__check-list-item" key={el}>
                            <div className="custom-toggle custom-toggle--checkbox">
                              <label>
                                <input
                                  type="checkbox"
                                  name="duration"
                                  value={el}
                                  id={el}
                                  onChange={handleFilterChange}
                                />
                                <span className="custom-toggle__icon">
                                  <svg width="9" height="6" aria-hidden="true">
                                    <use xlinkHref="#arrow-check"></use>
                                  </svg>
                                </span>
                                <span className="custom-toggle__label">{el}</span>
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </form>
                </div>
              </div>
              <div className="inner-page__content">
                <div className="my-trainings">
                  <ul className="my-trainings__list" data-testid="trainings">
                    {trainings.map((el) =>
                      (
                        <li className="my-trainings__item" key={el.id}>
                          <div className="thumbnail-training" key={el.id}>
                            <TrainingItem training={el}/>
                          </div>
                        </li>)
                    )}
                  </ul>
                  <div className="show-more my-trainings__show-more">
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

export default MyTrainingsPage;
