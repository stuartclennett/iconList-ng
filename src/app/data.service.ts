import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Icon } from './models';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  getFileList(): Observable<Icon[]> {
    return this.httpClient.get<Icon[]>('https://iconlist-1232a.firebaseio.com/icons.json')
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any) {
    console.log('DataService Error: ', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
    }
    return Observable.throw(error || 'Unspecified server error');
  }
  

}
