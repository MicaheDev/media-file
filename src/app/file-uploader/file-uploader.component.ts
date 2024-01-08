import { Component } from '@angular/core';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent {
  selectedFile: string = "";

  readInputFile($event: any) {
    console.log($event.target.files[0]);
    this.selectedFile = $event.target.files[0].name;
  }
}
