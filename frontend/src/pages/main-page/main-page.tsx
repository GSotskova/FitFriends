import _ from 'lodash';
import Header from '../../components/header/header';
import { useAppSelector } from '../../hooks';
import { getTrainings, getTrainingsDataLoadingStatus, getUserTrainings } from '../../store/trainings-data/selectors';
import { getUsers, getSignUserCatalogLoading } from '../../store/user-process/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import TrainingForUser from '../../components/training-for-user/training-for-user';
import SpecialOffers from '../../components/special-offers/special-offers';
import PopularTrainings from '../../components/popular-trainings/popular-trainings';
import LookForCompany from '../../components/look-for-company/look-for-company';


function MainPage() {
  const users = useAppSelector(getUsers);
  const isUserCatalogLoading = useAppSelector(getSignUserCatalogLoading);
  const userTrainings = useAppSelector(getUserTrainings);
  const isTrainingsDataLoading = useAppSelector(getTrainingsDataLoadingStatus);
  const trainingsNotSort = useAppSelector(getTrainings);
  const trainings = _.sortBy(trainingsNotSort, 'rating').reverse();
  const specialTrainings = trainings.filter((el)=>el.isSpecialOffer === true);

  if (isTrainingsDataLoading || isUserCatalogLoading) {
    return (<LoadingScreen />);
  }

  if(!users) {
    return null;
  }

  return (
    <div className="wrapper">
      <Header />
      <main>
        <h1 className="visually-hidden">FitFriends — Время находить тренировки, спортзалы и друзей спортсменов</h1>
        <TrainingForUser userTrainings={userTrainings}/>
        <SpecialOffers specialTrainings={specialTrainings}/>
        <PopularTrainings trainings={trainings}/>
        <LookForCompany users={users}/>
      </main>
    </div>

  );
}

export default MainPage;
