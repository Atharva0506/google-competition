import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataUpdatedSource = new Subject<void>();
  dataUpdated$ = this.dataUpdatedSource.asObservable();

  private apiCallCompletedSource = new Subject<void>();
  apiCallCompleted$ = this.apiCallCompletedSource.asObservable();

  private dataFetched: boolean = false; // Flag to indicate data has been fetched

  emitDataUpdated() {
    this.dataUpdatedSource.next();
  }

  emitApiCallCompleted() {
    this.dataFetched = true;
    this.apiCallCompletedSource.next();
  }

  isDataFetched(): boolean {
    return this.dataFetched;
  }
}
