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

  postNotificationResponse(pk:number, response:boolean){
    let url = this.base_url + `notification/response/${pk}/`

    return this.httpClient.post(url, {response:response})
  }

  getAdminUsers(search:any, page=1){
    let url = this.base_url + 'admin_users/?page='+page

    return this.httpClient.post(url, search)
  }

  postDeactivateUser(pk:number, action:boolean){
    let url = this.base_url + `deactive_user/${pk}/`

    return this.httpClient.post(url, {action:action})
  }

  getNewPassword(id:number){
    let url = this.base_url + `reset_pw/${id}/`

    return this.httpClient.get(url)
  }

  postChangePassword(new_pwd:string){
    let url = this.base_url + 'change_password/'

    return this.httpClient.post(url, {new_pwd:new_pwd})
  }

  getRolesUser(){
    let url = this.base_url + 'users_roles/'

    return this.httpClient.get(url)
  }

  postEditMode(pk:number, new_email:string, new_role:string){
    let url = this.base_url + `edit_info/${pk}`

    return this.httpClient.post(url, {new_email:new_email, new_role:new_role})
  }

  postNewUser(data:any){
    let url = this.base_url + 'new_user/'

    return this.httpClient.post(url, data)
  }

}
