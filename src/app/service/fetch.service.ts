import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchService {
  url = 'https://youtube.googleapis.com/youtube/v3/activities?part=snippet%2CcontentDetails&channelId=UC_x5XG1OV2P6uZZ5FSM9Ttw&maxResults=25&key=AIzaSyA5u4mUha_FT2NyiV1Mb7C635rwQVyD-fs';

  constructor(private http: HttpClient) { }

  getData() {
    return this.http
      .get<any>(`${this.url}`)
  }
}
