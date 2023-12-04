import { Component } from '@angular/core';
import { FetchService } from '../service/fetch.service';
import { ThumbnailsRenderer, VideoRenderer} from '../cell-renderers/my-renderers'

import {
  ColDef,
  GridReadyEvent,
  ValueFormatterParams,
} from 'ag-grid-community';
import { HttpClient } from '@angular/common/http';

interface Snippet {
   videoTitle: string;
   description: string;
   publishedAt:Date;
   thumbnails: string;
}

@Component({
  selector: 'app-ag-grid',
  templateUrl: './ag-grid.component.html'
})

export class AgGridComponent {
  themeClass =
  "ag-theme-quartz-dark";

   // Row Data: The data to be displayed.
  rowData: Snippet[]=[] ;

  dataSource: Snippet[]=[] ;

  // Column Definitions: Defines & controls grid columns.
  colDefs: ColDef[] =
  [
    { headerName: "Video Title", field: "videoTitle", cellRenderer: VideoRenderer, checkboxSelection: true, headerCheckboxSelection: true, },
    { headerName: "Description", field: "description" },
    { headerName: "Published On", field: "publishedAt", valueFormatter: this.dateFormatter },
    { headerName: "", field: "thumbnails", cellRenderer: ThumbnailsRenderer }
  ];

  public rowSelection: 'single' | 'multiple' = 'multiple';


  // Default Column Definitions: Apply configuration across all columns
  defaultColDef: ColDef = {
    filter: true, // Enable filtering on all columns
    editable: true, // Enable editing on all columns
  };

  constructor( private fetchService: FetchService, private http: HttpClient){}

  onGridReady(params: GridReadyEvent) {
    this.fetchService
    .getData()
      .subscribe((data) => {
        data['items'].forEach(element => {
            const elId = element['contentDetails']['upload']?.['videoId']
            let newData:Snippet={
              videoTitle: `https://www.youtube.com/watch?v=${elId}`,
              description: element['snippet']['description'],
              publishedAt: element['snippet']['publishedAt'],
              thumbnails: element['snippet']['thumbnails']['default']['url'],
            }
            this.dataSource.push(newData);
        });
        this.rowData=this.dataSource
       } );
  }

    // Return formatted date value
    dateFormatter(params: ValueFormatterParams) {
      return new Date(params.value).toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    }
}


