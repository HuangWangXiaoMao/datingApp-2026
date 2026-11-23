import { of } from 'rxjs';
import { AccountService } from './account-service';
import { inject, Injectable, input } from '@angular/core';
import { LikesService } from './likes-service';
import { Member } from '../../types/member';

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private accountService=inject(AccountService);
  private likesService = inject(LikesService);
  init(){
    const userString = localStorage.getItem('user');
    if (!userString) return of(null);
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
    this.likesService.getLikeIds();
    return of(null)
  }
}
