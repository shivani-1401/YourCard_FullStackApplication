import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ContactusService {

  constructor(private httpClient: HttpClient) { }

  postQuery(contact: any) {
    return this.httpClient.post("http://localhost:8765/contactservice/addQuery", contact);
  }
}
