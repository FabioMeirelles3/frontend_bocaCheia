import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menu } from '../interface/Menu';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private baseApiUrl = environment.baseApiUrl();
  private apiUrl = `${this.baseApiUrl}menu`;

  constructor(private http: HttpClient) {}

  getMenu(): Observable<Menu[]>{
    return this.http.get<Menu[]>(`${this.apiUrl}/all`);
  }

  getMenuById(id: number): Observable<Menu>{
    const url = `${this.apiUrl}/${id}`
    return this.http.get<Menu>(url);
  }

  getMenuByRestaurantId(id: number): Observable<Menu[]>{
    const url = `${this.apiUrl}/rest/${id}`
    return this.http.get<Menu[]>(url);
  }

  createMenu(menu: Menu): Observable<Menu>{
    delete menu.id;
    const include = this.http.post<Menu>(this.apiUrl+'/salvar', menu);

    return include;
  }

  updateMenu(menu: Menu): Observable<Menu>{
    const url = `${this.apiUrl}/${menu.id}`
    delete menu.id;
    const include = this.http.patch<Menu>(url, menu);

    return include;
  }
}
