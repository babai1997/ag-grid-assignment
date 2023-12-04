// Custom Cell Renderer Component
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererComp, ICellRendererParams } from 'ag-grid-community';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-thumbnails-renderer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span *ngIf="value">
      <img
        [alt]="value"
        [src]="value"
        [height]="30"
      />
    </span>
  `
})
export class ThumbnailsRenderer implements ICellRendererAngularComp {
  // Init Cell Value
  public value!: string;
  agInit(params: ICellRendererParams): void {
    this.value = params.value;
  }

  // Return Cell Value
  refresh(params: ICellRendererParams): boolean {
    this.value = params.value;
    return true;
  }
}

// Custom Video Url Component
@Component({
  selector: 'app-video-renderer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span *ngIf="value">
     <a [href]="value" target="_blank">{{value}}</a>
    </span>
  `,
})
export class VideoRenderer implements ICellRendererAngularComp {
  // Init Cell Value
  public value!: string;
  agInit(params: ICellRendererParams): void {
    this.value = params.value;

  }

  // Return Cell Value
  refresh(params: ICellRendererParams): boolean {
    this.value = params.value;
    return true;
  }
}

