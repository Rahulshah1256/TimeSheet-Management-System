import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url +
      "/project/add/",data,{
        headers: new HttpHeaders().set('Content-Type', "application/json")
      })
  }

  update(data:any){
    return this.httpClient.patch(this.url +
      "/project/update/",data,{
        headers: new HttpHeaders().set('Content-Type', "application/json")
      })
  }

  delete(id:any){
    return this.httpClient.delete(this.url+
      "/project/delete/"+id,{
        headers: new HttpHeaders().set('Content-Type', "application/json")
      })
  }

  getProjects(){
    return this.httpClient.get(this.url + "/project/get/");
  }
}
