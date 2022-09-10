import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from 'src/app/material-component/dialog/change-password/change-password.component';
import { ConfirmationComponent } from 'src/app/material-component/dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  role: any;
  constructor(private router: Router,
    private dialog: MatDialog) {

  }

  
  logout(){
    const dialolConfig = new MatDialogConfig();
    dialolConfig.data = {
      message: 'Logout'
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialolConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((user) => {
      dialogRef.close();
      localStorage.clear();
      this.router.navigate(['/']);
    })
  }

  changePassword(){
    const dialolConfig = new MatDialogConfig();
    dialolConfig.width = "550px";
    this.dialog.open(ChangePasswordComponent, dialolConfig);
  }


}
