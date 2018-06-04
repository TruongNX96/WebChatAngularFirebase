import { Injectable, EventEmitter } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

    account = null;
    currentUserID;
    router: any;
    infoUser = [];
    sendInfoUser = new EventEmitter();
    constructor(private route: Router,
    ) {
    }

    // Helper to perform the update in Firebase
    updateStatus(status: string) {
        if (!this.currentUserID) {
            return firebase.database().ref('users/' + this.currentUserID).set({ status: status });
        }
    }
    // Updates status when connection to Firebase starts
    updateOnConnect() {
        return firebase.database().ref('.info/connected')
            .on('value', (snap) => {
                const status = snap.val() ? 'online' : 'offline';
                this.updateStatus(status);
            });
    }

    // Updates status when connection to Firebase ends
    updateOnDisconnect() {
        firebase.database().ref().child('users/' + this.currentUserID)
            .onDisconnect()
            .update({ status: 'offline' });
    }

    // Sign Up with email and password
    signup(fullName, email, password) {
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(value => {
                this.account = firebase.auth().currentUser;
                this.getInfoUser();
                firebase.database().ref('users/' + value.uid).set({
                    info: {
                        fullName: fullName,
                        email: email,
                        password: password,
                        uid: value.uid,
                        avatar: 'https://getfbid.com/assets/images/avatars/default.png'
                    }
                });
            })
            .catch(err => {
                // tslint:disable-next-line:no-unused-expression
                alert(err);
            });
    }

    // Sign In by email and password
    signin(email, password) {
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(value => {
                if (firebase.auth().currentUser) {
                    this.account = firebase.auth().currentUser;
                    this.currentUserID = firebase.auth().currentUser.uid;
                }
                this.getInfoUser();
            })
            .catch(err => {
                alert(err);
            });
    }

    logout() {
        firebase.auth().signOut().then(value => {
            this.account = null;
        }).catch((errors) => {
        });
    }

    // Get info user
    getInfoUser() {
        firebase.database().ref('users/' + this.account.uid + '/info/').on('value', (info) => {
            if (info.val() != null) {
                this.infoUser = Object.values(info.val());
                this.sendInfoUser.emit();
            } else {
                this.infoUser = null;
                this.sendInfoUser.emit();
            }
        });
    }

}
