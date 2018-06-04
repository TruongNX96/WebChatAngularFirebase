# Features
- Angular 4
- Google Firebase
- Angular Material
- Bootstrap4

# Usage
## 1. Setup environment
### NodeJS:
- Install ang Setup NodeJS: https://nodejs.org/en/download/
- Check version: *node -v*
### Npm: 
- Check version: npm -v
### Angular CLI
- Install: *npm install -g @angular/cli*
- Check version: *ng --version*

## 2. Run
- git clone https://github.com/TruongNX96/WebChatAngularFirebase.git
- npm install

## 3. Create a project at https://firebase.google.com/ and grab your web config:
<img src="https://camo.githubusercontent.com/91c929842d78297fcdc65eca49806cedbf367959/68747470733a2f2f616e67756c617266697265626173652e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30342f66697265626173652d6465762d70726f642d63726564656e7469616c732e706e67">

## 4. Add the config to your Angular environment
**src/app/app.component.ts**

```
export class AppComponent implements OnInit {
  ngOnInit() {
    // Initialize Firebase
    firebase.initializeApp({
      apiKey: 'AIzaSyDyYTBMQHx0FAksc6zjQz-VrvBEH1rH7xg',
      authDomain: 'ngproject-truongnx.firebaseapp.com',
      databaseURL: 'https://ngproject-truongnx.firebaseio.com',
      projectId: 'ngproject-truongnx',
      storageBucket: 'gs://ngproject-truongnx.appspot.com',
      messagingSenderId: '992300181490'
    });
  }
}
```

## 5. And final *ng serve -o*
