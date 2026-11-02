import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';


@Component({
  imports: [],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit{
  //protected readonly title = signal('client');
  private http=inject(HttpClient);
  protected readonly title = 'Dating App';
  //protected members:any;
  protected members=signal<any>([]);
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
  };
  getmembers(){
    try{
      return lastValueFrom(this.http.get('https://localhost:5001/api/members'));
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }
}


