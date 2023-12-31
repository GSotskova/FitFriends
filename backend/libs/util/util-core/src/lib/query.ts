import { DEFAULT_LIST_COUNT_LIMIT, DefaultQuery, TrainingCatalogQuery,TrainingOrdersQuery, TrainingQuery, UsersQuery } from '@project/shared/shared-query';
import { SomeObject } from '@project/shared/shared-types';

export const getUsersQuery = (query: UsersQuery ) => {
  const {limit, userRole, location, trainingType, levelTraining, sortDate, page}= query;

  const limitCount = limit? limit : DEFAULT_LIST_COUNT_LIMIT
  const pageNum = page? (page-1) : 0;
  const skip = pageNum*limitCount ;
  const limitNumber = limitCount + skip

    const objFiltr: SomeObject = {};
      if (levelTraining) {objFiltr['levelTraining'] = levelTraining;}
      if (userRole) {objFiltr['role'] = userRole;}
      if (trainingType) {objFiltr['trainingType'] = { "$in": trainingType };}
      if (location) {objFiltr['location'] = { "$in": location };}

    const objSort: SomeObject = {};
      if (query.sortDate) {objSort['createdAt'] =  sortDate}
      else {objSort['createdAt'] = -1}

  return {limitNumber, skip, objSort, objFiltr}
};

export const getDefaultQuery = (query: DefaultQuery ) => {
  const {limit, sortDate, page}= query;

  const limitCount = limit? limit : DEFAULT_LIST_COUNT_LIMIT
  const pageNum = page? (page-1) : 0;
  const skip = pageNum*limitCount ;
  const limitNumber = limitCount + skip
  const objSort: SomeObject = {};
    if (sortDate)
      {objSort['createdAt'] =  sortDate}
    else
      {objSort['createdAt'] = -1}

  return {limitNumber, skip, objSort}
};

export const getTrainingCatalogQuery = (query: TrainingCatalogQuery ) => {
  const {limit, price, caloriesReset, rating, trainingType, sortPrice, sortDate, page}= query;

  const limitCount = limit? limit : DEFAULT_LIST_COUNT_LIMIT
  const pageNum = page? (page-1) : 0;
  const skip = pageNum*limitCount ;
  const limitNumber = limitCount + skip

  const objFiltr: SomeObject = {};
      if (price) {
          objFiltr['price'] =  { "$gte": price[0],
                                 "$lte": price[1],
                               };
                            }
      if (caloriesReset) {
          objFiltr['caloriesReset'] =  { "$gte": caloriesReset[0],
                                          "$lte": caloriesReset[1],
                                       };
                          }
      if (rating) {objFiltr['rating'] =  { "$gte": rating[0],
                          "$lte": rating[1],
                        }
                       }
      if (trainingType) {objFiltr['trainingType'] = { "$in": trainingType };}

  const objSort: SomeObject = {};
  const keys = Object.keys(query);

  const isSort = keys.find((el) => el === 'sortPrice' || el === 'sortDate') ? true : false
  if (!isSort) {objSort['createdAt'] = -1}
    keys.forEach(key => {
        key === 'sortPrice'? objSort['price'] = sortPrice : '';
        key === 'sortDate'? objSort['createdAt'] = sortDate : '';
      });

  return {limitNumber, skip, objSort, objFiltr}
};


export const getTrainingOrdersQuery = (query: TrainingOrdersQuery ) => {
  const {limit, sortCount, sortPrice, sortDate, isDone, page}= query;
  const limitCount = limit? limit : DEFAULT_LIST_COUNT_LIMIT
  const pageNum = page? (page-1) : 0;
  const skip = pageNum*limitCount ;
  const limitNumber = limitCount + skip

  const objFiltr: SomeObject = {};
      if (isDone) {objFiltr['isDone'] =  isDone==='true' ? true : false;}

  const objSort: SomeObject = {};
  const keys = Object.keys(query);
  const isSort = keys.find((el) => el === 'sortCount' || el === 'sortPrice' || el === 'sortDate') ? true : false
  if (!isSort) {objSort['createdAt'] = -1}
    keys.forEach(key => {
      key === 'sortCount'? objSort['trainingCount'] = sortCount : '';
      key === 'sortPrice'? objSort['totalPrice'] = sortPrice : '';
      key === 'sortDate'? objSort['createdAt'] = sortDate : '';
    });


  return {limitNumber, skip, objSort, objFiltr}
};

export const getTrainingQuery = (query: TrainingQuery ) => {
  const {limit, price, caloriesReset, rating, sortDate, trainingTime, page}= query;
  const limitCount = limit? limit : DEFAULT_LIST_COUNT_LIMIT
  const pageNum = page? (page-1) : 0;
  const skip = pageNum*limitCount ;
  const limitNumber = limitCount + skip

    const objSort: SomeObject = {};
      if (sortDate)
        {objSort['createdAt'] =  sortDate}
      else
        {objSort['createdAt'] = -1}

    const objFiltr: SomeObject = {};
      if (price) {
          objFiltr['price'] =  { "$gte": price[0],
                                 "$lte": price[1],
                               };
                            }
      if (caloriesReset) {
         objFiltr['caloriesReset'] =  { "$gte": caloriesReset[0],
                                        "$lte": caloriesReset[1],
                                      };
                               }
      if (rating) {objFiltr['rating'] =  { "$gte": rating[0],
                                           "$lte": rating[1],
                                         }
                                        }
      if (trainingTime) {objFiltr['trainingTime'] = { "$in": trainingTime };}


  return {limitNumber, skip, objSort, objFiltr}
};
