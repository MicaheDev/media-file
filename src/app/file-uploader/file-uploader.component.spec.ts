import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploaderComponent } from './file-uploader.component';

describe('FileUploaderComponent', () => {
  let component: FileUploaderComponent;
  let fixture: ComponentFixture<FileUploaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploaderComponent]
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

  it('debería actualizar selectedFile al seleccionar un archivo', () => {
    const file = new File(['test-file'], 'test-file.mp3', { type: 'audio/mp3' });
    const event = { target: { files: [file] } } as any;

    component.readInputFile(event);

    expect(component.selectedFile).toEqual('test-file.mp3');
  });

  // Agrega más pruebas según sea necesario para cubrir otros escenarios.

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
