import {  Component, Inject, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { TaskService } from 'src/app/services/task.service';
import { TimeEntriesService } from 'src/app/services/time-entries.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-time-entries',
  templateUrl: './time-entries.component.html',
  styleUrls: ['./time-entries.component.scss']
})
export class TimeEntriesComponent implements OnInit {
  onAddTimeEntries = new EventEmitter();
  onEditTimeEntries = new EventEmitter();
  timeEntriesForm:any = FormGroup;
  dialogAction:any = "Add";
  action:any = "Add";
  responseMessage: any;
  projects:any = [];
  tasks:any = [];

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder: FormBuilder,
  private timeEntriesService: TimeEntriesService,
  public dialogRef: MatDialogRef<TimeEntriesComponent>,
  private projectService: ProjectService,
  private taskService: TaskService,
  private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.timeEntriesForm = this.formBuilder.group({
      name:[null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      projectId:[null,Validators.required],
      taskId:[null,Validators.required],
      date:[null, Validators.required],
      StartTime:[null, Validators.required],
      EndTime:[null, Validators.required]
    })

    if(this.dialogData.action === 'Edit'){
      this.dialogAction = "Edit";
      this.action = "Update";
      this.timeEntriesForm.patchValue(this.dialogData.data);
    } 

    this.getProjects();
    this.getTasks();
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

  getTasks(){
    this.taskService.getTasks().subscribe((response:any) =>{
      this.tasks = response;
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
    var formData = this.timeEntriesForm.value;
    var data = {
      name: formData.name,
      projectId: formData.projectId,
      taskId: formData.taskId,
      date:formData.date,
      StartTime:formData.StartTime,
      EndTime:formData.EndTime
    }
    this.timeEntriesService.add(data).subscribe((response:any) =>{
      this.dialogRef.close();
      this.onAddTimeEntries.emit();
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
    var formData = this.timeEntriesForm.value;
    var data = {
      id: this.dialogData.data.id,
      name: formData.name,
      projectId: formData.projectId,
      taskId: formData.taskId,
      date:formData.date,
      StartTime:formData.StartTime,
      EndTime:formData.EndTime
    }
    this.timeEntriesService.update(data).subscribe((response:any) =>{
      this.dialogRef.close();
      this.onEditTimeEntries.emit();
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
