import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataInterface } from '../models/data.model';
import { Observable, catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private link = 'http://localhost:3000/';

  constructor(private httpClient: HttpClient) {}

  public getData(): Observable<DataInterface[]> {
    const data$ = this.httpClient.get<DataInterface[]>(this.link).pipe(
      catchError(() => {
        return of<DataInterface[]>([]);
      })
    );
    return data$;
  }
}
