import { Component, HostListener, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { EditableMember, Member } from '../../../types/member';
import { DatePipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from '../../../core/services/toast-service';
import { AccountService } from '../../../core/services/account-service';

@Component({
  imports: [DatePipe,FormsModule],
  selector: 'app-member-profile',
  styleUrl: './member-profile.css',
  templateUrl: './member-profile.html',
})
export class MemberProfile implements OnInit ,OnDestroy{
  @ViewChild('editForm') editForm?: NgForm;
  @HostListener('window:beforeunload', ['$event']) notify($event: BeforeUnloadEvent) {
    if (this.editForm?.dirty) {
      $event.preventDefault();
    }
  }
  private accountService = inject(AccountService);
  protected memberService = inject(MemberService);
  private toast = inject(ToastService);
  //private route = inject(ActivatedRoute);
  //private router = inject(Router);
  //protected member = signal<Member | undefined>(undefined);
  //protected title = signal<string | undefined>('Profile');
  protected editableMember: EditableMember = {
    displayName: '',
    description: '',
    city: '',
    country: ''
  }
  ngOnInit(): void {
    // this.route.parent?.data.subscribe(data =>{
    //   this.member.set(data['member']);
    // })
    this.editableMember = {
      displayName:this.memberService.member()?.displayName || '',
      description:this.memberService.member()?.description || '',
      city:this.memberService.member()?.city || '',
      country:this.memberService.member()?.country || '',
    }
  }

  // constructor(){
  //   this.editableMember = {
  //     displayName:this.member()?.displayName || '',
  //     description:this.member()?.description || '',
  //     city:this.member()?.city || '',
  //     country:this.member()?.country || '',
  //   }
  // }

  updateProfile() {
    if (!this.memberService.member()) return;
    const updatedMember = { ...this.memberService.member(), ...this.editableMember };
    this.memberService.updateMember(this.editableMember).subscribe({
      next: () => {
        const currentUser = this.accountService.currentUser();
        if (currentUser && updatedMember.displayName !== currentUser?.displayName) {
          currentUser.displayName = updatedMember.displayName;
          this.accountService.setCurrentUser(currentUser);
        }
        this.toast.success('Profile updated successfully');
        this.memberService.editMode.set(false);
        this.memberService.member.set(updatedMember as Member);
        this.editForm?.reset(updatedMember);
      }
    })
    // this.toast.success('Profile updated successfully');
    // this.memberService.editMode.set(false);
  }

  ngOnDestroy(): void {
    if (this.memberService.editMode()) {
      this.memberService.editMode.set(false);
    }
  }
}


// import { Component, HostListener, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
// import { EditableMember, Member } from '../../../types/member';
// import { DatePipe } from '@angular/common';
// import { MemberService } from '../../../core/services/member-service';
// import { FormsModule, NgForm } from '@angular/forms';
// import { ToastService } from '../../../core/services/toast-service';
// import { AccountService } from '../../../core/services/account-service';
// import { TimeAgoPipe } from '../../../core/pipes/time-ago-pipe';

// @Component({
//   selector: 'app-member-profile',
//   imports: [DatePipe, FormsModule, TimeAgoPipe],
//   templateUrl: './member-profile.html',
//   styleUrl: './member-profile.css'
// })
// export class MemberProfile implements OnInit, OnDestroy {
//   @ViewChild('editForm') editForm?: NgForm;
//   @HostListener('window:beforeunload', ['$event']) notify($event: BeforeUnloadEvent) {
//     if (this.editForm?.dirty) {
//       $event.preventDefault();
//     }
//   }
//   private accountService = inject(AccountService);
//   protected memberService = inject(MemberService);
//   private toast = inject(ToastService);
//   protected editableMember: EditableMember = {
//     displayName: '',
//     description: '',
//     city: '',
//     country: ''
//   }

//   ngOnInit(): void {
//     this.editableMember = {
//       displayName: this.memberService.member()?.displayName || '',
//       description: this.memberService.member()?.description || '',
//       city: this.memberService.member()?.city || '',
//       country: this.memberService.member()?.country || '',
//     }
//   }

//   updateProfile() {
//     if (!this.memberService.member()) return;
//     const updatedMember = { ...this.memberService.member(), ...this.editableMember }
//     this.memberService.updateMember(this.editableMember).subscribe({
//       next: () => {
//         const currentUser = this.accountService.currentUser();
//         if (currentUser && updatedMember.displayName !== currentUser?.displayName) {
//           currentUser.displayName = updatedMember.displayName;
//           this.accountService.setCurrentUser(currentUser);
//         }
//         this.toast.success('Profile updated successfully');
//         this.memberService.editMode.set(false);
//         this.memberService.member.set(updatedMember as Member);
//         this.editForm?.reset(updatedMember);
//       }
//     })

//   }

//   ngOnDestroy(): void {
//     if (this.memberService.editMode()) {
//       this.memberService.editMode.set(false);
//     }
//   }
// }
