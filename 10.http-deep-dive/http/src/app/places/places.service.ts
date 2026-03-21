import {inject, Injectable, signal} from '@angular/core';

import { Place } from './place.model';
import {catchError, map, tap, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
    return this.fetchPlaces("http://localhost:3000/places", "Something went wrong fetching the available places. Please try again later.");
  }

  loadUserPlaces() {
    return this.fetchPlaces('http://localhost:3000/user-places','Something went wrong fetching your favorite places. Please try again later.')
      .pipe(
        tap({
          next: (userPlaces) => {this.userPlaces.set(userPlaces);}
        })
      )
  }

  addPlaceToUserPlaces(place: Place) {
    const prevPlaces = this.userPlaces()

    // 这里只是前端点击的控制，如果有相同的对象就不会触发前端更新
    if (!prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set([...prevPlaces, place]);
    }

    return this.httpClient.put('http://localhost:3000/user-places', {
      placeId: place.id,
    }).pipe(
      catchError((error) => {
        this.userPlaces.set(prevPlaces);
        return throwError(() => new Error('Failed to store selected place.'));
      })
    );
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();

    // 这里值判断前端的更新情况
    if (prevPlaces.some((p) => p.id === place.id)) {
      this.userPlaces.set(prevPlaces.filter((p) => p.id !== place.id));
    }

    // 根据组件中提交过来的place获取id并发送请求
    return this.httpClient
      .delete('http://localhost:3000/user-places/' + place.id)
      .pipe(
        catchError((error) => {
          this.userPlaces.set(prevPlaces);
          // this.errorService.showError('Failed to remove the selected place.');
          return throwError(
            () => new Error('Failed to remove the selected place.')
          );
        })
      );
  }

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient
      .get<{ places: Place[] }>(url)
      .pipe(
        map((resData) => resData.places),
        catchError((error) => {
          console.log(error);
          return throwError(
            () =>
              new Error(
                errorMessage
              )
          );
        })
      )
  }
}
