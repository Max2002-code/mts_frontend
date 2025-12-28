import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  public base_url = environment.api_url + "/api/"

  constructor(private httpClient: HttpClientService) { }

  login(username:string, password:string){
    let url = this.base_url + 'login/'

    return this.httpClient.post(url, {username:username, password:password})
  }

  getUserByToken(){
    let url = this.base_url + 'utente/'

    return this.httpClient.get(url)
  }
}
