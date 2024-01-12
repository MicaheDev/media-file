import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';

import { FileUploaderComponent } from './file-uploader.component';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

describe('FileUploaderComponent', () => {
  let component: FileUploaderComponent;
  let fixture: ComponentFixture<FileUploaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploaderComponent],
      imports: [HttpClientModule],
    });
    fixture = TestBed.createComponent(FileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar selectedFile como una cadena vacía', () => {
    expect(component.selectedFile).toEqual('');
  });

  it('debería inicializar fileNameToShow como una cadena vacía', () => {
    expect(component.fileNameToShow).toEqual('');
  });

  it('debería actualizar fileNameToShow al seleccionar un archivo', () => {
    const file = new File(['test-file'], 'test-file.mp3', {
      type: 'audio/mp3',
    });
    const event = { target: { files: [file] } } as any;

    component.readInputFile(event);

    expect(component.fileNameToShow).toEqual('test-file.mp3');
  });

  it('debería inicializar fileToUpload como null', () => {
    expect(component.fileToUpload).toBeNull();
  });

  it('debería actualizar fileToUpload al seleccionar un archivo', () => {
    const file = new File(['test-file'], 'test-file.mp3', {
      type: 'audio/mp3',
    });
    const event = { target: { files: [file] } } as any;

    component.readInputFile(event);

    expect(component.fileToUpload).toEqual(file);
  });

  it('debería ejecutar la funcion para obtener los datos para almacenar el archivo', (done) => {
    const file = new File(['test-file'], 'test-file.mp3', { type: 'audio/mp3' });
    component.fileToUpload = file;
  
    spyOn(component, 'getStorageData');
  
    component.readInputFile({ target: { files: [file] } });
  
    setTimeout(() => {
      expect(component.getStorageData).toHaveBeenCalledTimes(1);
      done();
    }, 0);
  });
  

  // Agrega más pruebas según sea necesario para cubrir otros escenarios.

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
