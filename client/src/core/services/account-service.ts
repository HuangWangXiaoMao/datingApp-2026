import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginCreds, User } from '../../types/User';
import { tap } from 'rxjs/internal/operators/tap';
import { environment } from '../../environments/environment.development';
import { LikesService } from './likes-service';


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http=inject(HttpClient);
  private likesService = inject(LikesService);
  currentUser = signal<User | null>(null);
  private baseUrl=environment.apiUrl;
  register(creds:LoginCreds){
    return this.http.post<User>(this.baseUrl+'account/register',creds).pipe(
      tap(user=>{
        this.setCurrentUser(user);
      })
    );
  }
  login(creds:LoginCreds){
    return this.http.post<User>(this.baseUrl+'account/login',creds).pipe(
      tap(user=>{
        if(user)
        this.setCurrentUser(user);
      })
    );
  }
  setCurrentUser(user:User){
    localStorage.setItem('user',JSON.stringify(user));
    this.currentUser.set(user);
    this.likesService.getLikeIds();
  }
  logout(){
    this.currentUser.set(null);
    localStorage.removeItem('filters');
    localStorage.removeItem('user');
    this.likesService.clearLikeIds();
  }
}
