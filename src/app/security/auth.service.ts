import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, filter, map, from } from 'rxjs';
import { delayWhen } from 'rxjs/operators';
import { AuthResponse } from './auth-response.model';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { AuthRequest } from './auth-request.model';
import { Storage } from '@ionic/storage-angular';
import { switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { isDefined } from '../utils';

/***********************************************************/
/*********!!! REPLACE BELOW WITH YOUR API URL !!! **********/
/***********************************************************/
const API_URL = 'https://dogwalkapi.onrender.com';
// const API_URL = 'http://localhost:8100';

/**
 * Authentication service for login/logout.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  #auth$: ReplaySubject<AuthResponse | undefined>;

  constructor(private http: HttpClient, private readonly storage: Storage) {
    this.#auth$ = new ReplaySubject(1);
    this.storage.get('auth').then((auth) => {
      // Emit the loaded value into the observable stream.
      this.#auth$.next(auth);
    });
  }

  /**
   * @returns An `Observable` that will emit a `boolean` value
   * indicating whether the current user is authenticated.
   * This `Observable` will never complete and must be unsubscribed for when not needed.
   */
  isAuthenticated$(): Observable<boolean> {
    return this.#auth$.pipe(map((auth) => Boolean(auth)));
  }

  /**
   * @returns An `Observable` that will emit the currently authenticated `User` object only if there
   * currently is an authenticated user.
   */
  // getUser$(): Observable<User | undefined> {
  //   return this.#auth$.pipe(map((auth) => auth?.user));
  // }

  /**
   * @returns An `Observable` that will emit the currently authenticated user's `token`, only if there
   * currently is an authenticated user.
   */
  getToken$(): Observable<string | undefined> {
    return this.#auth$.pipe(map((auth) => auth?.token));
  }

  getId$(): Observable<string> {
    return this.#auth$.pipe(
      map((auth) => auth?.id),
      filter(isDefined) // Add this line
    );
  }

  getMyID(): any {
    return this.#auth$.pipe(map((auth) => auth?.id));
  }

  /*
  Get all users and give the token to the API to do that
  */
  getAllUsers$(): Observable<User[]> {
    const authUrl = `${API_URL}/users`;

    return this.getToken$().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });

        return this.http.get<User[]>(authUrl, { headers });
      })
    );
  }

  getUser$(id: string): Observable<User> {
    const authUrl = `${API_URL}/users/${id}`;

    return this.getToken$().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });

        return this.http.get<User>(authUrl, { headers });
      })
    );
  }

  /*
  Get all walks and give the token to the API to do that
  */
  getAllWalks$(): Observable<User[]> {
    const authUrl = `${API_URL}/walks`;

    return this.getToken$().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });

        return this.http.get<User[]>(authUrl, { headers });
      })
    );
  }

  /*
  Get informations of a specific walk and give the token to the API to do that
  */
  getWalk$(id: string): Observable<User> {
    const authUrl = `${API_URL}/walks/${id}`;

    return this.getToken$().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });

        return this.http.get<User>(authUrl, { headers });
      })
    );
  }

  postWalk$(walk: any): Observable<User> {
    const authUrl = `${API_URL}/walks`;

    return this.getToken$().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });

        return this.http.post<User>(authUrl, walk, { headers });
      })
    );
  }

  /*
  Get all users and give the token to the API to do that
  */
  getAllDogs$(): Observable<User[]> {
    const authUrl = `${API_URL}/dogs`;

    return this.getToken$().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });

        return this.http.get<User[]>(authUrl, { headers });
      })
    );
  }

  getDog$(id: string): Observable<User> {
    const authUrl = `${API_URL}/dogs/${id}`;

    return this.getToken$().pipe(
      switchMap((token) => {
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });

        return this.http.get<User>(authUrl, { headers });
      })
    );
  }

  /**
   * Sends an authentication request to the backend API in order to log in a user with the
   * provided `authRequest` object.
   *
   * @param authRequest An object containing the authentication request params
   * @returns An `Observable` that will emit the logged in `User` object on success.
   */
  logIn$(authRequest: AuthRequest): Observable<User> {
    const authUrl = `${API_URL}/users/login`;
    return this.http.post<AuthResponse>(authUrl, authRequest).pipe(
      // Delay the observable stream while persisting the authentication response.
      delayWhen((auth) => this.#saveAuth$(auth)),
      map((auth) => {
        this.#auth$.next(auth);
        console.log(`ID ICI`);
        console.log(JSON.stringify(auth.id));
        console.log(`Logged In`);
        return auth.user;
      })
    );
  }

  /**
   * Persists the provided `AuthResponse` to the storage.
   *
   * @param auth The AuthResponse to persist
   * @returns An `Observable` that will emit when the authentication is persisted
   */
  #saveAuth$(auth: AuthResponse): Observable<void> {
    return from(this.storage.set('auth', auth));
  }

  getToken(): any | undefined {
    return from(this.storage.get('auth')).pipe(map((auth) => auth?.token));
  }

  /**
   * Logs out the current user.
   */
  logOut() {
    this.#auth$.next(undefined);
    // Remove the stored authentication from storage when logging out.
    this.storage.remove('auth');
    console.log('User logged out');
  }
}
