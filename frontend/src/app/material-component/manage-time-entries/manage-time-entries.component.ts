import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TimeEntriesService } from 'src/app/services/time-entries.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { ProjectComponent } from '../dialog/project/project.component';
import { TimeEntriesComponent } from '../dialog/time-entries/time-entries.component';

@Component({
  selector: 'app-manage-time-entries',
  templateUrl: './manage-time-entries.component.html',
  styleUrls: ['./manage-time-entries.component.scss']
})
export class ManageTimeEntriesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'projectName', 'taskName', 'date','StartTime','EndTime','edit'];
  dataSource:any;
  responseMessage: any;

  constructor(private timeEntriesService: TimeEntriesService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData(){
    this.timeEntriesService.getTimeEntries().subscribe((response:any) => {
      this.dataSource = new MatTableDataSource(response);
    }, (error:any) =>{
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction(){
    const dialolConfig = new MatDialogConfig();
    dialolConfig.data = {
      action: 'Add'
    }
    dialolConfig.width = "850px";
    const dialogRef = this.dialog.open(TimeEntriesComponent, dialolConfig);
    this.router.events.subscribe(() =>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onAddTimeEntries.subscribe(
      (response:any) =>{
        this.tableData();
      }
    )
  }

  handleEditAction(values:any){
    const dialolConfig = new MatDialogConfig();
    dialolConfig.data = {
      action: 'Edit',
      data:values
    }
    dialolConfig.width = "850px";
    const dialogRef = this.dialog.open(TimeEntriesComponent, dialolConfig);
    this.router.events.subscribe(() =>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onEditTimeEntries.subscribe(
      (response:any) =>{
        this.tableData();
      }
    )

  }

  
  handleDeleteAction(values:any){
    const dialolConfig = new MatDialogConfig();
    dialolConfig.data ={
      message: 'delete '+values.name+' Time Entry'
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialolConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response:any) =>{
      this.deleteProduct(values.id);
      dialogRef.close();
    })
  }
  deleteProduct(id:any){
    this.timeEntriesService.delete(id).subscribe((response:any) =>{
      this.tableData();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error:any) => {
      console.log(error);
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

}
