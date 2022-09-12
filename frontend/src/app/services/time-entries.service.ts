import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TimeEntriesService {
  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  add(data:any){
    return this.httpClient.post(this.url+
      "/timeEntries/add/",data,{
        headers: new HttpHeaders().set('Content-Type', "application/json")
      })
  }

  update(data:any){
    return this.httpClient.patch(this.url+
      "/timeEntries/update/",data,{
        headers: new HttpHeaders().set('Content-Type', "application/json")
      })
  }

  
  getTimeEntries(){
    return this.httpClient.get(this.url+"/timeEntries/get/");
  }


  delete(id:any){
    return this.httpClient.delete(this.url+
      "/timeEntries/delete/"+id,{
        headers: new HttpHeaders().set('Content-Type', "application/json")
      })
  }

  getTimeEntriesByProject(id:any){
    return this.httpClient.get(this.url+"timeEntries/getByProject"+id);
  }

  getById(id:any){
    return this.httpClient.get(this.url+"/timeEntries/getById"+id);
  }
}
