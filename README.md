# FamilyApp

#Environment Setup : Ionic
<p>
1. Install NodeJS (If already exists update)
2. Check npm -> npm -v
3. Install Java8 (1.8) (only Java8 supported. Java9 has issues)
If android studio already installed the skip 4 and 5
4. Download and extract Android SDK
5. Install Gradle 4.1
6. Install Cordova -> sudo npm install -g cordova (In windows run without sudo)
7. Install Ionic -> sudo npm install -g ionic
8. Create a new project to test ionic -> ionic start todo blank
9. Run the project -> ionic serve
To run on Android Device
10. Add JAVA_HOME environment variable as the Java8 path
11. Add ANDROID_HOME environment variable as Android SDK path
12. Add Gradle path to the environment path
13. Locate adb in Android SDK folder
14. Run adb in command line -> adb start-server
15. Connect the android device
16. Then run -> adb devices
17. if it shows your device then run run.sh file in project folder
</p>
<p>
How to integrate firebase into a page

1. Implement FirebaseListener interface with your page class
2. Then override its methods
3. call FirebaseService.setFirebaseListener(this) in your page constructor

<code>
exprot class MyPage implements FirebaseListener {
    constructor(public firebaseService: FirebaseService) {
        this.firebaseService.setFirebaseListener(this);
    }

    //Override
    OnSignUpComplete(email: string): void {

    }
    //So on...
}
</code>
</p>