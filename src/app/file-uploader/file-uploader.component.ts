import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

type Alert = {
  isShow: boolean;
  type: string | null;
  message: string;
};

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent implements OnInit {
  selectedFile: string = '';
  fileNameToShow: string = '';
  fileToUpload: File | null = null;
  token: string | null = null;
  uploadUrl: string | null = null;
  isLoading: boolean = false;
  notification = <Alert>{
    isShow: false,
    type: null,
    message: '',
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  readInputFile($event: any) {
    const files = $event.target.files;
    if (files && files.length > 0) {
      this.fileToUpload = files[0];
      this.fileNameToShow = files[0].name;
      // Genera un ID único y añádelo al nombre del archivo
      const fileId = uuidv4();
      const fileName = `${files[0].name}_${fileId}`;

      this.selectedFile = fileName;

      this.http
        .post(
          'https://ubiqq-upload-to-blob-url.azurewebsites.net/api/blobupload',
          {
            container: 'ubiqq',
            blobName: this.selectedFile,
          }
        )
        .subscribe(
          (response: any) => {
            this.uploadUrl = response.uri;
            this.token = response.token;
            this.showNotification('success', 'Archivo con formato correcto');

            console.log(this.uploadUrl, this.token);
          },
          (error: any) => {
            this.showNotification(
              'warning',
              'Ha ocurrido un error, intentelo de nuevo'
            );
            console.log('Error en la petición:', error);
            // Si hay información detallada en el error, puedes acceder a ella aquí
          }
        );
    }
  }

  uploadFile($event: any) {
    this.isLoading = true;

    $event.preventDefault();
    if (this.fileToUpload && this.token && this.uploadUrl) {
      const formData: FormData = new FormData();
      formData.append('file', this.fileToUpload, this.fileToUpload.name);

      const headers = new HttpHeaders({
        token: this.token, // Reemplaza 'tu_token' con el token real
        'x-ms-blob-type': 'BlockBlob',
      });

      this.http.put(this.uploadUrl, formData, { headers }).subscribe(
        (response) => {
          console.log('Éxito:', response);
          this.showNotification('success', 'Archivo enviado correctamente');
          this.selectedFile = '';
          this.fileNameToShow = '';
          this.isLoading = false;
          this.token = null;
          this.uploadUrl = null;
        },
        (error) => {
          console.error('Error al subir el archivo:', error);
          this.showNotification(
            'warning',
            'Ha ocurrido un error al enviar el archivo, intentelo de nuevo'
          );

          this.isLoading = false;
        }
      );
    } else {
      console.warn('No se ha seleccionado ningún archivo.');
    }
  }

  closeAlert() {
    this.notification = {
      isShow: false,
      type: null,
      message: '',
    };
  }

  resetAlert() {
    setInterval(() => {
      this.notification = {
        isShow: false,
        type: null,
        message: '',
      };
    }, 10000);
  }

  showNotification(type: string, message: string) {
    this.notification = {
      isShow: true,
      type: type,
      message: message,
    };
    this.resetAlert();
  }
}
