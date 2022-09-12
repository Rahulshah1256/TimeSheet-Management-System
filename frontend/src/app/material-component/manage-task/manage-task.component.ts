import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TaskService } from 'src/app/services/task.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { TaskComponent } from '../dialog/task/task.component';

@Component({
  selector: 'app-manage-task',
  templateUrl: './manage-task.component.html',
  styleUrls: ['./manage-task.component.scss']
})
export class ManageTaskComponent implements OnInit {
  displayedColumns: string[] = ['name', 'projectName', 'startTime', 'endTime','edit'];
  dataSource:any;
  responseMessage: any;

  constructor(private taskService: TaskService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router) { }

  ngOnInit(): void {
    this.tableData();
  }
  tableData(){
    this.taskService.getTasks().subscribe((response:any) => {
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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add'
    }
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(TaskComponent, dialogConfig);
    this.router.events.subscribe(() =>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onAddTask.subscribe(
      (response:any) =>{
        this.tableData();
      }
    )
  }

  handleEditAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data:values
    }
    dialogConfig.width = "850px";
    const dialogRef = this.dialog.open(TaskComponent, dialogConfig);
    this.router.events.subscribe(() =>{
      dialogRef.close();
    })
    const sub = dialogRef.componentInstance.onEditTask.subscribe(
      (response:any) =>{
        this.tableData();
      }
    )

  }
 
  handleDeleteAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data ={
      message: 'delete '+values.name+' task'
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response:any) =>{
      this.deleteTask(values.id);
      dialogRef.close();
    })
  }
  deleteTask(id:any){
    this.taskService.delete(id).subscribe((response:any) =>{
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
