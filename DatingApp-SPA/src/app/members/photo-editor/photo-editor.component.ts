import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo } from 'src/app/_models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver: boolean = false;
  baseUrl = environment.apiUrl;
  currentMainPhoto: Photo;

  constructor(private authService: AuthService, private userService: UserService, 
              private alertfy: AlertifyService) { }

  ngOnInit() {
    this.inicializeUploader();
  }

  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  inicializeUploader() {    
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true, 
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024      
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false;};

    /*Com os dados da resposta {faça}*/
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      /*se houve resposta ok da API*/
      if (response) { 
        /*converter a string em objeto pelo JSON*/
        const res: Photo = JSON.parse(response); 
        /*Atribuindo os valores a um objeto da classe Photo*/
        const photo = { 
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        if (photo.isMain) { /*Se inserimos a primeira foto e ela é a principal e atualizamos a foto principal na página */
           this.authService.changeMemberPhoto(photo.url);
           this.authService.currentUser.photoUrl = photo.url;
           localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
        }
        this.photos.push(photo); /*Colocando a nova foto no conjunto de fotos da página*/
      }
    }
  }

  setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
         this.currentMainPhoto = this.photos.filter(p => p.isMain === true)[0];
         this.currentMainPhoto.isMain = false;
         photo.isMain = true;
         /*this.getMemberPhotoChange.emit(photo.url);  substituída pela linha abaixo*/
         this.authService.changeMemberPhoto(photo.url);
         this.authService.currentUser.photoUrl = photo.url;
         localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
      console.log('Successfully set to main')
    }, error => {
      this.alertfy.error(error);
    });
  }

  deletePhoto(id: number) {
    this.alertfy.confirm('Are you sure you want to delete this photo?', () => {
      this.userService.deletePhoto(this.authService.decodedToken.nameid, id).subscribe(() => {
        this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
        this.alertfy.success('Photo has been deleted');
      }, error => {
        this.alertfy.error('Failed to delete the photo');
      });
    });
  }

}
