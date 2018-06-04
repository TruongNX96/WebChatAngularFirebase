import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked, OnDestroy, EventEmitter, Output } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ChatService } from '../chat.service';
import * as firebase from 'firebase/app';
import { AuthService } from '../../auth/auth.service';

@Component({
    selector: 'app-chat-private',
    templateUrl: './chat-private.component.html',
    styleUrls: ['./chat-private.component.css']
})
export class ChatPrivateComponent implements OnInit, AfterViewChecked, OnDestroy {
    userChatPrivate = this.chatService.userChatPrivate;
    chatPrivateForm: FormGroup;
    time;
    uidPrivate;
    statusPrivate = this.chatService.statusPrivate;
    listMsgPrivate = this.chatService.listMsgPrivate;

    get textarea() { return this.chatPrivateForm.get('textarea'); }

    constructor(
        private fb: FormBuilder,
        private chatService: ChatService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        // Creat Reactive Form
        this.chatPrivateForm = this.fb.group({
            textarea: new FormControl(null),
        });

        // Get Message when initialization component
        this.chatService.getMsgPrivate();
        this.chatService.getMsgPrivateEvent.subscribe(() => {
            this.listMsgPrivate = this.chatService.listMsgPrivate;
        });

        // If textarea value is change, enforcement method isTying() in ChatService
        let timeout;
        this.textarea.valueChanges.subscribe(() => {
            this.chatService.isTypingPrivate('true');
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                this.chatService.isTypingPrivate('false');
            }, 1000);
        });

        // Enforcement method getTyping() on ChatService to Check Typing to show isTyping if !== account
        this.chatService.getTypingPrivate();
        // Update status and uid when have event
        this.chatService.getMsgPrivateEvent.subscribe(() => {
            this.statusPrivate = this.chatService.statusPrivate;
            this.uidPrivate = this.chatService.uidPrivate;
        });
    }

    // Send content chat and enforcement method onSend() in ChatService
    onSendPrivate(msg) { // msg is content of textarea
        this.time = new Date();
        this.chatService.onSendPrivate({
            msg: msg,
            email: firebase.auth().currentUser.email,
            time: this.time.toLocaleString()
        });
        this.chatPrivateForm.reset();
    }
    canDeactivate() {
        if (this.textarea.value !== null && this.textarea.value !== '') {
            return window.confirm('Are you sure?');
        }
        return true;
    }

    ngAfterViewChecked() {
    }
    ngOnDestroy() {
    }

}
