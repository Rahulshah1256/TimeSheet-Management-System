import { Component, EventEmitter, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from 'src/app/services/project.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  onAddProject = new EventEmitter();
  onEditProject = new EventEmitter();
  projectForm: any = FormGroup;
  dialogAction: any = "Add";
  action:any = "Add";
  responseMessage:any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder: FormBuilder,
  private projectService: ProjectService,
  public dialogRef: MatDialogRef<ProjectComponent>,
  private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.projectForm = this.formBuilder.group({
      name: [null,[Validators.required]]
    });
    if(this.dialogData.action === 'Edit'){
      this.dialogAction = "Edit";
      this.action = "Update";
      this.projectForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit(){
    if(this.dialogAction === "Edit"){
      this.edit();
    }
    else{
      this.add();
    }
  }

  add(){
    var  formData = this.projectForm.value;
    var data = {
      name: formData.name
    }
    this.projectService.add(data).subscribe((response:any) => {
      this.dialogRef.close();
      this.onAddProject.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error:any) => {
      this.dialogRef.close();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }
      else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  edit(){
    var  formData = this.projectForm.value;
    var data = {
      id:this.dialogData.data.id,
      name: formData.name
    }
    this.projectService.update(data).subscribe((response:any) => {
      this.dialogRef.close();
      this.onEditProject.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error:any) => {
      this.dialogRef.close();
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
