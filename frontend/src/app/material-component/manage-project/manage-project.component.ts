import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/services/project.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { ProjectComponent } from '../dialog/project/project.component';

@Component({
  selector: 'app-manage-project',
  templateUrl: './manage-project.component.html',
  styleUrls: ['./manage-project.component.scss']
})
export class ManageProjectComponent implements OnInit {
  displayedColumns: string[] = ['name','edit'];
  dataSource:any;
  responseMessage:any;

  constructor(private projectService: ProjectService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router) { }

  ngOnInit(): void {
    this.tableData();
  }

  tableData(){
    this.projectService.getProjects().subscribe((response:any) => {
      this.dataSource = new MatTableDataSource(response);
    }, (error:any) => {
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
    const dialogRef = this.dialog.open(ProjectComponent, dialolConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddProject.subscribe(
      (response:any)=> {
        this.tableData();
      }
    )
  }

  handleEditAction(values:any){
    const dialolConfig = new MatDialogConfig();
    dialolConfig.data = {
      action: 'Edit',
      data: values
    }
    dialolConfig.width = "850px";
    const dialogRef = this.dialog.open(ProjectComponent, dialolConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onEditProject.subscribe(
      (response:any)=> {
        this.tableData();
      }
    )
  }

  handleDeleteAction(values:any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data ={
      message: 'delete '+values.name+' project'
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response:any) =>{
      this.deleteProject(values.id);
      dialogRef.close();
    })
  }
  deleteProject(id:any){
    this.projectService.delete(id).subscribe((response:any) =>{
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
