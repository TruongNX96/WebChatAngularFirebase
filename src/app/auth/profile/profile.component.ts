import { Component, OnInit, ViewChild } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';


@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
    infoUser = this.authService.infoUser;
    storageRef = firebase.storage().ref();
    avatarUser = this.infoUser[0];

    constructor(private authService: AuthService) { }

    ngOnInit() {
    }

    // Event change avatar
    onChangeAvatar(event) {
        event.stopPropagation();
        event.preventDefault();
        const file = event.target.files[0];
        const metadata = {
            'contentType': file.type
        };
        const task = this.storageRef.child('avatar/' + this.authService.currentUserID + '/' + file.name).put(file, metadata);
        const progress = task.on(firebase.storage.TaskEvent.STATE_CHANGED,
            null,
            null,
            () => {
                this.avatarUser = task.snapshot.downloadURL;
                firebase.database().ref('users/' + this.authService.currentUserID + '/info').update({
                    avatar: task.snapshot.downloadURL
                });
            });
    }
}
