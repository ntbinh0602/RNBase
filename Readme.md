# Step-by-Step Guide to Renaming Your React Native Project

### 1. Modify the package.json File

Open your **_package.json_** file.
Change the name attribute to the new project name you desire.

### 2. Update the AppRegistry

Locate the AppRegistry line in your **_index.js_** or **_index.android.js/index.ios.js_** file.
Change the component registration line from:

**_AppRegistry.registerComponent('MyAppIOS', () => MyAppIOS);_**

To:

**_AppRegistry.registerComponent('MyApp', () => MyApp);_**

### 3. Run React Native Upgrade

Execute the command **_react-native upgrade_** in your project directory.
Allow React Native to overwrite the **_android/_** and **_ios/_** directories, which will update the necessary configurations.

### 4. Clean and Rebuild the Project

For Android, navigate to the **_android/app/src/main/res/values/strings.xml_** file and update the **_app_name_** field.
For iOS, you might need to update the **_Info.plist_** file to reflect the new display name.
Run the command cd android && **_./gradlew_** clean to clean your project.

### 5. Additional Tools

If you’re looking for a more streamlined approach, consider using the **_react-native-rename_** npm package. It automates the renaming process and can be executed with a single command:

**_react-native-rename "Your New App Name"_**
# RNBase
