import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url+
      "/task/add/",data,{
        headers: new HttpHeaders().set('Content-Type', "application/json")
      })
  }

  update(data:any){
    return this.httpClient.patch(this.url+
      "/task/update/",data,{
        headers: new HttpHeaders().set('Content-Type', "application/json")
      })
  }

  getTasks(){
    return this.httpClient.get(this.url+"/task/get/");
  }

  delete(id:any){
    return this.httpClient.delete(this.url+
      "/task/delete/"+id,{
        headers: new HttpHeaders().set('Content-Type', "application/json")
      })
  }

  getTasksByCategory(id:any){
    return this.httpClient.get(this.url+"task/getByProject"+id);
  }

  getById(id:any){
    return this.httpClient.get(this.url+"/task/getById"+id);
  }
}
