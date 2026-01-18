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

  getHomeStats(){
    let url = this.base_url + 'home/'

    return this.httpClient.get(url)
  }

  postMainBooksList(search:any, page=1){
    let url = this.base_url + 'main/books/?page='+page

    return this.httpClient.post(url, search)
  }

  postClientBooksList(search:any, magazzino_page=1, order_page=1, out_page=1){
    let url = this.base_url + 'client/books/?magazzino_page='+magazzino_page+'&order_page='+order_page+'&out_page='+out_page

    return this.httpClient.post(url, search)
  }

  postNewOrderBook(pk:number, type_move:string){
    let url = this.base_url + `orderBook/${pk}/`

    return this.httpClient.post(url, {type_move:type_move})
  }

  getNotifications(only_count:boolean){
    let url = this.base_url + 'notifications/?only_read='+only_count

    return this.httpClient.get(url)
  }

  postNewBooks(data:any){
    let url = this.base_url + 'books/'

    return this.httpClient.post(url, {books:data})
  }

  postAllMovemnets(search:any, page=1){
    let url = this.base_url + 'movements/?page='+page

    return this.httpClient.post(url, search)
  }

  getCompany(){
    let url = this.base_url + 'companies/'

    return this.httpClient.get(url)
  }

}
