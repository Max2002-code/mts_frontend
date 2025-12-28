import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthModel } from '../models/auth.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private authLocalToken = `token-${environment.USER_KEY}`

  constructor(private http:HttpClient) { }

  public getAuthLocalStorage(): AuthModel | undefined{
    try{
      const auth = localStorage.getItem(this.authLocalToken)
      if (auth){
        return JSON.parse(auth)
      }
    } catch (error) {
      console.error(error)
      return undefined
    }
    return undefined
  }

  public createAuthHeader(){
    const auth = this.getAuthLocalStorage()

    let headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' })
    if (!auth) {return headers}
    headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': "Token "+auth.key})
    return headers
  }

  get(url:string){
    let headers = new HttpHeaders({'Content-Type': 'application/json'})
    headers = this.createAuthHeader()
    return this.http.get<any>(url, {headers:headers})
  }

  post(url:string, data:any){
    let headers = new HttpHeaders({'Content-Type': 'application/json'})
    headers = this.createAuthHeader()
    return this.http.post<any>(url, data, {headers:headers})
  }
}
