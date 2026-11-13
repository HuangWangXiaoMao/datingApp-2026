import { BusyService } from './../../core/services/busy-service';
import { themes } from './../theme';
import { AccountService } from './../../core/services/account-service';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';


@Component({
  imports: [FormsModule,RouterLink,RouterLinkActive],
  selector: 'app-nav',
  styleUrl: './nav.css',
  templateUrl: './nav.html',
})
export class Nav implements OnInit{
  protected accountService= inject(AccountService);
  protected busyService = inject(BusyService)
  protected router=inject(Router);
  private toast=inject(ToastService);
  protected creds: any={};
  protected selectedTheme = signal<string>(localStorage.getItem('theme') || 'light');
  protected themes = themes;
  //protected loggedIn=signal(false);
  ngOnInit(): void {
    document.documentElement.setAttribute('data-theme',this.selectedTheme());
  }

  handleSelectedTheme(theme:string){
    this.selectedTheme.set(theme);
    localStorage.setItem('theme',theme);
    document.documentElement.setAttribute('data-theme',theme);
    const elem = document.activeElement as HTMLDivElement;
    if(elem) elem.blur();
  }

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


