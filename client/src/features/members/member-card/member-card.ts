import { required } from '@angular/forms/signals';
import { Component, computed, inject, input } from '@angular/core';
import { Member } from '../../../types/member';
import { RouterLink } from '@angular/router';
import { AgePipe } from '../../../core/pipes/age-pipe';
import { LikesService } from '../../../core/services/likes-service';

@Component({
  imports: [RouterLink,AgePipe],
  selector: 'app-member-card',
  styleUrl: './member-card.css',
  templateUrl: './member-card.html',
})
export class MemberCard {
  member = input.required<Member>();
  private likesService = inject(LikesService);
  protected hasLiked = computed(() => this.likesService.likeIds().includes(this.member().id));
  toggleLike(event: Event) {
    event.stopPropagation();
    this.likesService.toggleLike(this.member().id).subscribe({
      next:()=>{
        if(this.hasLiked()){
          this.likesService.likeIds.update(ids=>ids.filter(x=>x!==this.member().id))
        }else{
          this.likesService.likeIds.update(ids=>[...ids,this.member().id])
        }
      }
    })
  }
}
