import { AccountService } from './../../core/services/account-service';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  imports: [FormsModule],
  selector: 'app-nav',
  styleUrl: './nav.css',
  templateUrl: './nav.html',
})
export class Nav {
  protected accountService= inject(AccountService);
  protected creds: any={};
  //protected loggedIn=signal(false);
  login() {
    this.accountService.login(this.creds).subscribe({
      next: result => {
        console.log(result);
        // this.loggedIn.set(true);
        this.creds={};
      },
      error: error => alert('Login failed: ' + error.message)
    });
  }
  logout() {
    this.accountService.logout();
  }
}


