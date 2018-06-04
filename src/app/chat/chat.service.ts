
import { Injectable, EventEmitter } from '@angular/core';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ChatService {
    getMsgEvent = new EventEmitter();
    getMsgPrivateEvent = new EventEmitter();
    getAllUserEmitter = new EventEmitter();
    listMsg = [];
    listMsgPrivate = [];
    status;
    statusPrivate;
    uid;
    uidPrivate;
    currentUserID;
    allUser = [];
    userChatPrivate;

    constructor(
        private authService: AuthService,
    ) {
    }

    //
    chatPrivateMethod(user) {
        this.userChatPrivate = user;
        this.getMsgPrivate();
    }
    // get all user follow users/
    getAllUser() {
        firebase.database().ref('users/').on('value', (user) => {
            if (user.val() != null) {
                this.allUser = Object.values(user.val());
                this.getAllUserEmitter.emit();
            } else {
                this.allUser = [];
                this.getAllUserEmitter.emit();
            }
        });
    }
    // Send msg on firebase and save follow url /message
    onSend(msg: object) {
        firebase.database().ref('message/').push(msg);
    }

    // Send msg on firebase and save follow url /message
    onSendPrivate(msg: object) {
        firebase.database()
            .ref('users/' + this.authService.currentUserID + '/message/' + this.userChatPrivate.info.uid + '/message/')
            .push(msg);
        firebase.database()
            .ref('users/' + this.userChatPrivate.info.uid + '/message/' + this.authService.currentUserID + '/message/')
            .push(msg);
    }

    // Get msg from firebase
    getMsg() {
        firebase.database().ref('message/').on('value', (msg) => {
            if (msg.val() != null) {
                // msg is Object, converse to Array
                this.listMsg = Object.values(msg.val());
            }
            this.getMsgEvent.emit();
        });
    }

    // Get msg from firebase
    getMsgPrivate() {
        firebase.database()
            .ref('users/' + this.authService.currentUserID + '/message/' + this.userChatPrivate.info.uid + '/message/')
            .on('value', (msg) => {
                if (msg.val() != null) {
                    // msg is Object, converse to Array
                    this.listMsgPrivate = Object.values(msg.val());
                }
                this.getMsgPrivateEvent.emit();
            });
    }

    // Send status and uid of User on firebase and save follow url /isTyping
    isTyping(status, uid) {
        firebase.database().ref('isTyping/').set({
            status: status,
            uid: uid
        });
    }

    // Send status and uid of User on firebase and save follow url /isTyping
    isTypingPrivate(status) {
        firebase.database()
            .ref('users/' + this.authService.currentUserID + '/message/' + this.userChatPrivate.info.uid + '/isTyping/').set({
                status: status,
                uid: this.authService.currentUserID
            });
        firebase.database()
            .ref('users/' + this.userChatPrivate.info.uid + '/message/' + this.authService.currentUserID + '/isTyping/').set({
                status: status,
                uid: this.authService.currentUserID
            });
    }

    // Get status typing to check
    getTyping() {
        firebase.database().ref('isTyping/').on('value', (status) => {
            this.status = status.val().status;
            this.uid = status.val().uid;
            this.getMsgEvent.emit();
        });
    }

    // Get status typing to check
    getTypingPrivate() {
        firebase.database().ref('users/' + this.authService.currentUserID + '/message/' + this.userChatPrivate.info.uid + '/isTyping/')
            .on('value', (status) => {
                this.statusPrivate = status.val().status;
                this.uidPrivate = status.val().uid;
                this.getMsgPrivateEvent.emit();
            });
    }
}
