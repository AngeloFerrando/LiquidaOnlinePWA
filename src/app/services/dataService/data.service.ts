import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import {EntityManager, EntityQuery, Entity, Predicate, FilterQueryOp, config} from 'breeze-client';
import { BizStream } from './bizStream';
import { BizFilter } from './bizFilter';
import { BizSorter } from './bizSorter';
import { SortDirection } from './bizSorter';
import { Dictionary } from '../../infrastructure/region/dictionary';



@Injectable()
export class DataService {
  constructor() {
    //   alert('DataService constructor');
    const ajaxAdapter = <any>config.getAdapterInstance('ajax');
    const headers = ajaxAdapter.defaultSettings['headers'] || {};
    headers['Token'] = 'token';
    ajaxAdapter.defaultSettings['headers'] = headers;
  }

  getEntities(entityName: string, context: EntityManager, callback: (data: Entity[]) => void) {
    const query = EntityQuery.from(entityName);

    context.executeQuery(query).then(success).catch(failed);

    function success(data) {
      //   alert('success');
      //   let aziende = data.results;
      const msg = ('Queried ' + data.results.length + ' aziende');
      //   alert(msg);
      callback(data.results);
      //   return aziende;
    }

    function failed(error) {
      const msg = 'Query failed: ' + error.message;
      console.error(msg);
      alert(msg);
      return Promise.reject(msg); //   use ES6 promise within A2 app
    }
  }

  getEntitiesParam(entityName: string, param: Object, context: EntityManager, callback: (data: Entity[]) => void) {
    const query = EntityQuery.from(entityName).withParameters(param);

    context.executeQuery(query).then(success).catch(failed);

    function success(data) {
      //   alert('success');
      //   let aziende = data.results;
      const msg = ('Queried ' + data.results.length + ' results');
      //   alert(msg);
      callback(data.results);
      //   return aziende;
    }

    function failed(error) {
      const msg = 'Query failed: ' + error.message;
      console.error(msg);
      alert(msg);
      return Promise.reject(msg); //   use ES6 promise within A2 app
    }
  }

  //   postData(context: EntityManager) {
  //      context.dataService.
  //   }

  async getEntitiesParamSync(entityName: string, param: Object, context: EntityManager) {
    const query = EntityQuery.from(entityName).withParameters(param);

    const res = await context.executeQuery(query);
    return res.results;
  }

  getEntitiesParamBinary(entityName: string, param: Object, context: EntityManager, callback: (data: any) => void) {
    const query = EntityQuery.from(entityName).withParameters(param);

    context.executeQuery(query).then(success).catch(failed);


    function success(data) {
      //   alert('success');
      //   let aziende = data.results;
      const msg = ('Queried ' + data.results.length + ' aziende');
      //   alert(msg);
      callback(data.results);
      //   return aziende;
    }

    function failed(error) {
      const msg = 'Query failed: ' + error.message;
      console.error(msg);
      alert(msg);
      return Promise.reject(msg); //   use ES6 promise within A2 app
    }
  }

  getEntityByID(entityName: string, id: number, context: EntityManager, callback: (data: Entity) => void) {

    const query = EntityQuery.from(entityName).where('ID', '==', id);

    context.executeQuery(query).then(success).catch(failed);

    function success(data) {
      //  alert('success');
      //  let aziende = data.results;
      //  const msg = ('Queried ' + data.results.length + ' aziende');
      //  alert(msg);
      callback(data.results[0]);
      //  return aziende;
    }

    function failed(error) {
      const msg = 'Query failed: ' + error.message;
      console.error(msg);
      alert(msg);
      return Promise.reject(msg); //   use ES6 promise within A2 app
    }
  }

  getEntitiesByIDParent(entityName: string, parentProperty: string, idParent: any,
                        context: EntityManager, callback: (data: Entity[]) => void) {
    const query = EntityQuery.from(entityName).where(parentProperty, '==', idParent);

    context.executeQuery(query).then(success).catch(failed);

    function success(data) {
      //  alert('success');
      //  let divisioni = data.results;
      const msg = ('Queried ' + data.results.length + ' divisioni');
      //  alert(msg);
      callback(data.results);
      //  return divisioni;
    }

    function failed(error) {
      const msg = 'Query failed: ' + error.message;
      console.error(msg);
      alert(msg);
      return Promise.reject(msg); //   use ES6 promise within A2 app
    }
  }

  async getEntitiesByIDParentSync(entityName: string, parentProperty: string, idParent: any, context: EntityManager): Promise<Entity[]> {
    const query = EntityQuery.from(entityName).where(parentProperty, '==', idParent);

    const res = await context.executeQuery(query);
    return res.results;

  }

  getEntitiesByIDParentEx(entityName: string, parentProperty: string, idParent: any,
                          sorters: BizSorter[], context: EntityManager, callback: (data: Entity[]) => void) {
    let orderBy = '';
    let query = EntityQuery.from(entityName).where(parentProperty, '==', idParent);

    if (sorters != null && sorters.length > 0) {
      for (const sorter of sorters) {
        if (orderBy.length > 0) {
          orderBy += ',';
        }
        if (sorter.direction === SortDirection.Ascending) {
          orderBy += sorter.propertyName + ' asc';
        } else {
          orderBy += sorter.propertyName + ' desc';
        }
      }
    }
    if (orderBy !== '') {
      query = query.orderBy(orderBy);
    }

    context.executeQuery(query).then(success).catch(failed);

    function success(data) {
      //  alert('success');
      //  let divisioni = data.results;
      const msg = ('Queried ' + data.results.length + ' divisioni');
      //  alert(msg);
      callback(data.results);
      //  return divisioni;
    }

    function failed(error) {
      const msg = 'Query failed: ' + error.message;
      console.error(msg);
      alert(msg);
      return Promise.reject(msg); //   use ES6 promise within A2 app
    }
  }

  //  getEntitiesByIDParentEx(entityName: string, parentProperty: string, idParent: number, context: EntityManager): Promise<Entity[]> {
  //      let query = EntityQuery.from(entityName).where(parentProperty, '==', idParent);

  //      return <Promise<Entity[]>><any>context.executeQuery(query)
  //          .then(res => res.results)
  //          .catch((error) => {
  //              console.log(error);
  //              return Promise.reject(error);
  //          });
  //  }

  //  getEntitiesByStream(entityName: string, stream: BizStream, context: EntityManager, callback: (data: Entity[]) => void) {
  //      let query: EntityQuery;
  //      var baseQuery: EntityQuery = EntityQuery.from(entityName);
  //      var wherePredicate: breeze.Predicate;
  //      var orderBy: string = '';

  //      var levels: string[];
  //      var predicates_OR: breeze.Predicate[] = [];
  //      var dictPredicates_AND: Dictionary<breeze.Predicate[]> = new Dictionary<breeze.Predicate[]>();


  //      //   Build where
  //      for (var filter of stream.filters) {
  //          if (filter.propertyValue != '') {
  //              levels = filter.levels.split(',');
  //              for (var level of levels) {
  //                  if (!dictPredicates_AND.containsKey(level))
  //                      dictPredicates_AND.add(level, []);
  //                  dictPredicates_AND.item(level).push(new breeze.Predicate(filter.propertyName, filter.operator, filter.propertyValue));
  //              }
  //          }
  //      }

  //      for (var key of dictPredicates_AND.keys())
  //          predicates_OR.push(breeze.Predicate.and(dictPredicates_AND.item(key)));

  //      wherePredicate = breeze.Predicate.or(predicates_OR);


  //      //   Build order by
  //      for (var sorter of stream.sorters) {
  //          if (orderBy.length > 0)
  //              orderBy += ',';
  //          if (sorter.direction == SortDirection.Ascending)
  //              orderBy += sorter.propertyName + ' asc';
  //          else
  //              orderBy += sorter.propertyName + ' desc';
  //      }

  //      if (orderBy != '')
  //          query = baseQuery.where(wherePredicate).orderBy(orderBy);
  //      else
  //          query = baseQuery.where(wherePredicate);

  //      context.executeQuery(query).then(success).catch(failed);

  //      function success(data) {
  //          //  alert('success');
  //          //  let aziende = data.results;
  //          //  const msg = ('Queried ' + data.results.length + ' aziende');
  //          //  alert(msg);
  //          callback(data.results);
  //          //  return aziende;
  //      }

  //      function failed(error) {
  //          const msg = 'Query failed: ' + error.message;
  //          //  console.error(msg);
  //          alert(msg);
  //          return Promise.reject(msg); //   use ES6 promise within A2 app
  //      }
  //  }

  //  getEntitiesByStream(entityName: string, stream: BizStream, context: EntityManager,
  //      callback: (data: Entity[]) => void, pageNumber?: number, pageSize?: number, ) {

  //      if (typeof pageSize === 'undefined') {
  //          pageSize = 99999;
  //      }
  //      if (typeof pageNumber === 'undefined') {
  //          pageNumber = 0;
  //      }
  //      this.getEntitiesByStreamEx(entityName, stream, context, pageNumber, pageSize, callback);
  //  }

  getEntitiesByStream(entityName: string, stream: BizStream, context: EntityManager,
                      callback: (data: Entity[]) => void, pageIndex?: number, pageSize?: number, ) {

    const query: EntityQuery = this.buildQuery(entityName, stream, pageIndex, pageSize);

    try {
      context.executeQuery(query).then(success).catch(failed);
    } catch (ex) {
      alert(ex.message);
    }


    function success(data) {
      callback(data.results);
    }

    function failed(error) {
      const msg = 'Query failed: ' + error.message;
      console.error(msg);
      alert(msg);
      return Promise.reject(msg); //   use ES6 promise within A2 app
    }
  }

  countEntitiesByStream(entityName: string, stream: BizStream, context: EntityManager,
                        callback: (count: number) => void, pageIndex?: number, pageSize?: number, ) {

    const query: EntityQuery = this.buildQuery(entityName, stream, pageIndex, pageSize);

    context.executeQuery(query.take(0).inlineCount()).then(success).catch(failed);

    function success(data) {
      callback(data.inlineCount);
    }

    function failed(error) {
      const msg = 'Query failed: ' + error.message;
      console.error(msg);
      alert(msg);
      return Promise.reject(msg); //   use ES6 promise within A2 app
    }
  }

  showCache(context: EntityManager) {
    alert('showCache');
    if (context != null) {
      try {
        alert(context.getEntities().length);
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert('showCache - Manager is empty');
    }
  }

  addEntity(entityName: string, initialValues: {}, context: EntityManager) {
    let entity: Entity;

    try {
      entity = context.createEntity(entityName, initialValues);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }

    return entity;
  }

  removeEntity(entity: Entity) {
    try {
      entity.entityAspect.setDeleted();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }

    return entity;
  }

  saveChanges(context: EntityManager, callback: (saveResult, succeded: boolean, reason: string) => void) {
    // let myAziende: Entity[];

    //  alert('SaveChanges: Cache Entities');
    //  alert(manager.getEntities().length);

    //  myAziende = manager.getEntities('Azienda', EntityState.Modified);
    //  alert('SaveChanges: Modified Entities');
    //  alert(myAziende.length);
    context.saveChanges()
      .then(saveSucceeded)
      .catch(saveFailed);
    //  alert('after Save');

    function saveSucceeded(saveResult) {
      //  alert('# of Aziende saved = ' + saveResult.entities.length);
      //  alert(saveResult);
      callback(saveResult, true, null);
    }

    function saveFailed(error) {
      let reason = error.message;
      const detail = error.detail;

      if (error.entityErrors) {
        reason = handleSaveValidationError(error);
      } else if (detail && detail.ExceptionType &&
        detail.ExceptionType.indexOf('OptimisticConcurrencyException') !== -1) {
        //   Concurrency error
        reason =
          'Another user, perhaps the server, ' +
          'may have deleted one or all of the todos.' +
          ' You may have to restart the app.';
      } else {
        reason = 'Failed to save changes: ' + reason +
          ' You may have to restart the app.';
      }
      console.error(error);
      //  alert(reason);
      callback(null, false, reason);
    }

    function handleSaveValidationError(error) {
      let message = 'Not saved due to validation error';
      try { //   fish out the first error
        const firstErr = error.entityErrors[0];
        message += ': ' + firstErr.errorMessage;
      } catch (e) { /* eat it for now */ }
      return message;
    }
  }

  undoChanges(context: EntityManager) {
    context.rejectChanges();
  }


  //   Private
  private buildQuery(entityName: string, stream: BizStream, pageIndex?: number, pageSize?: number): EntityQuery {
    let query: EntityQuery;
    const baseQuery: EntityQuery = EntityQuery.from(entityName);
    let wherePredicate: Predicate;
    let orderBy = '';
    let levels: string[];
    const predicates_OR: Predicate[] = [];
    const dictPredicates_AND: Dictionary<Predicate[]> = new Dictionary<Predicate[]>();

    if (typeof pageSize === 'undefined') {
      pageSize = 99999;
    }
    //  if (typeof pageIndex === 'undefined') {
    //      pageIndex = 0;
    //  }

    //   Build where
    for (const filter of stream.filters) {
      if (filter.propertyValue !== '') {
        levels = filter.levels.split(',');
        for (const level of levels) {
          if (!dictPredicates_AND.containsKey(level)) {
            dictPredicates_AND.add(level, []);
            dictPredicates_AND.item(level).push(new Predicate(filter.propertyName, filter.operator, filter.propertyValue));
          }
        }
      }
    }

    for (const key of dictPredicates_AND.keys()) {
      predicates_OR.push(Predicate.and(dictPredicates_AND.item(key)));
      wherePredicate = Predicate.or(predicates_OR);
    }

    //   Build order by
    for (const sorter of stream.sorters) {
      if (orderBy.length > 0) {
        orderBy += ',';
      }
      if (sorter.direction === SortDirection.Ascending) {
        orderBy += sorter.propertyName + ' asc';
      } else {
        orderBy += sorter.propertyName + ' desc';
      }
    }

    //   Build page request
    if (pageIndex == null) {
      if (orderBy !== '') {
        query = baseQuery.where(wherePredicate).orderBy(orderBy);
      } else {
        query = baseQuery.where(wherePredicate);
      }
    } else {
      if (orderBy !== '') {
        query = baseQuery.where(wherePredicate).orderBy(orderBy).skip((pageIndex) * pageSize).take(pageSize);
      } else {
        query = baseQuery.where(wherePredicate).orderBy('ID').skip((pageIndex) * pageSize).take(pageSize);
      }
    }
    return query;
  }

  private getProperty(entity: Entity, propertyName: string) {
    const breezeEntity: any = entity;

    return breezeEntity.getProperty(propertyName);
  }
}
