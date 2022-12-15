import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Restaurant } from '../interface/Restaurant';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private baseApiUrl = environment.baseApiUrl();
  private apiUrl = `${this.baseApiUrl}restaurant`;

  constructor(private http: HttpClient) {}

  getRestaurant(): Observable<Restaurant[]>{
    return this.http.get<Restaurant[]>(`${this.apiUrl}/all`);
  }

  getRestaurantById(id: number): Observable<Restaurant>{
    const url = `${this.apiUrl}/${id}`
    return this.http.get<Restaurant>(url);
  }

  createRestaurant(restaurant: Restaurant): Observable<Restaurant>{
    delete restaurant.id;
    const include = this.http.post<Restaurant>(this.apiUrl+'/salvar', restaurant);

    return include;
  }

  editRestaurant(restaurant: Restaurant): Observable<Restaurant>{
    const url = `${this.apiUrl}/${restaurant.id}`
    delete restaurant.id;
    const include = this.http.patch<Restaurant>(url, restaurant);

    return include;
  }

}
