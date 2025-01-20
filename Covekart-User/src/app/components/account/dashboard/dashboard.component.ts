import { Component, ViewChild } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User, UserAddress } from '../../../shared/interface/user.interface';
import { AccountState } from '../../../shared/state/account.state';
import { EditProfileModalComponent } from '../../../shared/components/widgets/modal/edit-profile-modal/edit-profile-modal.component';
import { ChangePasswordModalComponent } from '../../../shared/components/widgets/modal/change-password-modal/change-password-modal.component';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  @Select(AccountState.user) user$: Observable<User>;

  @ViewChild("profileModal") ProfileModal: EditProfileModalComponent;
  @ViewChild("passwordModal") PasswordModal: ChangePasswordModalComponent;

  public address: UserAddress | null;

  constructor(private router:Router , private notificationService:NotificationService) {
    this.user$.subscribe(user => {
      
      if(!user){
       router.navigateByUrl("/auth/login")
       this.notificationService.showError("Please login");
      }
      this.address = user?.address?.length ? user?.address?.[0] : null;
  
    });
  }

}
