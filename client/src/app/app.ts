import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from '../layout/nav/nav';
import { AccountService } from '../core/services/account-service';
import { User } from '../types/User';
import { Home } from '../features/home/home';


@Component({
  imports: [Nav, Home],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit{
  //protected readonly title = signal('client');
  private accountService = inject(AccountService);
  private http=inject(HttpClient);
  protected readonly title = 'Dating App';
  //protected members:any;
  protected members=signal<User[]>([]);
  // ngOnInit(): void {
  //   this.http.get('https://localhost:5001/api/members').subscribe({
  //     //next:response=>this.members=response,
  //     next:response=>this.members.set(response),
  //     error:error=>console.log(error),
  //     complete:()=>console.log("Complete the http request")
  //   })
  // };
  async ngOnInit() {
    this.members.set(await this.getmembers());
    this.setCurrentUser();
  };

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      this.accountService.currentUser.set(user);
    }
  }

  getmembers(){
    try{
      return lastValueFrom(this.http.get<User[]>('https://localhost:5001/api/members'));
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }
}


