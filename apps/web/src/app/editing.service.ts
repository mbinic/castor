import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditingService {
  renderedItems$: Observable<any[]>;
  renderedContainers$: Observable<any[]>;

  private _renderedItems = new BehaviorSubject<any[]>([]);
  private _renderedContainers = new BehaviorSubject<any[]>([]);

  constructor() {
    this.renderedItems$ = this._renderedItems;
    this.renderedContainers$ = this._renderedContainers;
  }

  itemRendered(item: any) {
    const newItems = [...this._renderedItems.value, item];
    this._renderedItems.next(newItems);
  }

  containerRendered(container: any) {
    const newContainers = [...this._renderedContainers.value, container];
    this._renderedContainers.next(newContainers);
  }

  reset() {
    this._renderedItems.next([]);
    this._renderedContainers.next([]);
  }
}
