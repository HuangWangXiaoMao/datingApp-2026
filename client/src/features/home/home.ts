import { Component, Input, signal } from '@angular/core';
import { AccountService } from '../../core/services/account-service';
import { required } from '@angular/forms/signals';
import { User } from '../../types/User';
import { Register } from '../account/register/register';
@Component({
  imports: [Register],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  
  protected registerMode = signal(false);
  accountService = new AccountService();
  showRegister(value:boolean) {
    this.registerMode.set(value);
  }
}
