import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';

import { Response } from '../interface/response.interface';
import { User } from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly USER_URL: string = `${env.USER_API}api`;

  constructor(private http: HttpClient) {}

  /* 
    
    NOTE: On this part, I wil try to document by following how 
    the data structures and algorithms works by formulating 
    and writing the steps as a result, it will be readable and much efficient.

    */

  // fetch data and its already inside in our application stored in environment.ts

  getUsers(size: number = 5): Observable<any> {
    return this.http
      .get<any>(`${this.USER_URL}?results=${size}`)
      .pipe(map((response) => this._processedResponse(response)));
  }

  getUser(userId: string): Observable<any> {
    return this.http.get<any>(`${this.USER_URL}?uuid=${userId}`);
  }

  private _processedResponse(resp: Response): Response {
    return {
      info: { ...resp.info },
      results: resp.results.map(
        (user: any) =>
          <User>{
            uuid: user.login.uuid,
            firstName: user.name.first,
            lastName: user.name.last,
            email: user.email,
            username: user.login.username,
            gender: user.gender,
            address: `${user.location.street.number} ${user.location.street.name} ${user.location.city} ${user.location.country}`,
            dateOfBirth: user.date,
            imgUrl: user.picture.thumbnail,
            phone: user.cell,
            coordinate: {
              latitude: user.location.coordinates.latitude,
              longitude: user.location.coordinates.longitude,
            },
          }
      ),
    };
  }
}
