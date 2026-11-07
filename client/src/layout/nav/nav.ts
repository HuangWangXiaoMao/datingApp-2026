import { AccountService } from './../../core/services/account-service';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';


@Component({
  imports: [FormsModule,RouterLink,RouterLinkActive],
  selector: 'app-nav',
  styleUrl: './nav.css',
  templateUrl: './nav.html',
})
export class Nav {
  protected accountService= inject(AccountService);
  protected router=inject(Router);
  private toast=inject(ToastService);
  protected creds: any={};
  //protected loggedIn=signal(false);
  login() {
    this.accountService.login(this.creds).subscribe({
      next: () => {
        this.router.navigateByUrl('/member');
        this.toast.success("Logged in successfully!")
        this.creds={};
      },
      error: error => {
        //alert('Login failed: ' + error.error)
        this.toast.error(error.error)
      }
    });
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}


