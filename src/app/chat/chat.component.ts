import { Component, OnInit, ElementRef, ViewChild, AfterViewChecked, OnDestroy, EventEmitter, Output } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ChatService } from './chat.service';
import * as firebase from 'firebase/app';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ViewChild('scroller1') private feedContainer1: ElementRef;
  @ViewChild('scroller2') private feedContainer2: ElementRef;
  time;
  chatForm: FormGroup;
  listMsg = this.chatService.listMsg;
  status;
  uid;
  allUser = this.chatService.allUser;
  currentUserID = this.authService.currentUserID;

  // textarea FormControl
  get textarea() { return this.chatForm.get('textarea'); }
  constructor(
    private fb: FormBuilder,
    private chatService: ChatService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // Creat Reactive Form
    this.chatForm = this.fb.group({
      textarea: new FormControl(null),
    });

    // Get Message when initialization component
    this.chatService.getMsg();
    this.chatService.getMsgEvent.subscribe(() => {
      this.listMsg = this.chatService.listMsg;
    });

    // If textarea value is change, enforcement method isTying() in ChatService
    let timeout;
    this.textarea.valueChanges.subscribe(() => {
      this.chatService.isTyping('true', this.authService.account.uid);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.chatService.isTyping('false', this.authService.account.uid);
      }, 1000);
    });

    // Enforcement method getTyping() on ChatService to Check Typing to show isTyping if !== account
    this.chatService.getTyping();

    // Update status and uid when have event
    this.chatService.getMsgEvent.subscribe(() => {
      this.status = this.chatService.status;
      this.uid = this.chatService.uid;
    });

    // get all user
    this.chatService.getAllUser();
    this.chatService.getAllUserEmitter.subscribe(() => {
      this.allUser = this.chatService.allUser;
    });

  }
  // End ngOnInit

  // Chat private user
  chatPrivateMethod(user) {
    this.chatService.chatPrivateMethod(user);
  }

  // Send content chat and enforcement method onSend() in ChatService
  onSend(msg) { // msg is content of textarea
    this.time = new Date();
    this.chatService.onSend({
      msg: msg,
      email: firebase.auth().currentUser.email,
      time: this.time.toLocaleString()
    });
    this.chatForm.reset();
  }
  scrollToBottom(): void {
    this.feedContainer1.nativeElement.scrollTop
      = this.feedContainer1.nativeElement.scrollHeight;
  }
  canDeactivate() {
    if (this.textarea.value !== null && this.textarea.value !== '') {
      return window.confirm('Are you sure?');
    }
    return true;
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }
  ngOnDestroy() {
  }

}
