import {  Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TaskService } from 'src/app/services/task.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  onAddTask = new EventEmitter();
  onEditTask = new EventEmitter();
  taskForm:any = FormGroup;
  dialogAction:any = "Add";
  action:any = "Add";
  responseMessage: any;
  projects:any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder: FormBuilder,
  private taskService: TaskService,
  public dialogRef: MatDialogRef<TaskComponent>,
  private projectService: ProjectService,
  private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      name:[null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      projectId:[null,Validators.required],
      startTime:[null,Validators.required],
      endTime:[null, Validators.required]
    })

    if(this.dialogData.action === 'Edit'){
      this.dialogAction = "Edit";
      this.action = "Update";
      this.taskForm.patchValue(this.dialogData.data);
    } 

    this.getProjects();
  }
  
  getProjects(){
    this.projectService.getProjects().subscribe((response:any) =>{
      this.projects = response;
    },(error:any) =>{
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  handleSubmit(){
    if(this.dialogAction === 'Edit'){
      this.edit();
    }
    else{
      this.add();
    }
  }

  add(){
    var formData = this.taskForm.value;
    var data = {
      name: formData.name,
      projectId: formData.projectId,
      startTime: formData.startTime,
      endTime:formData.endTime
    }
    this.taskService.add(data).subscribe((response:any) =>{
      this.dialogRef.close();
      this.onAddTask.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    }, (error:any) =>{
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

  edit(){
    var formData = this.taskForm.value;
    var data = {
      id: this.dialogData.data.id,
      name: formData.name,
      projectId: formData.projectId,
      startTime: formData.startTime,
      endTime:formData.endTime
    }
    this.taskService.update(data).subscribe((response:any) =>{
      this.dialogRef.close();
      this.onEditTask.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage,"success");
    }, (error:any) =>{
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
    })
  }

}
