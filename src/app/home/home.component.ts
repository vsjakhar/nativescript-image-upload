import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application";

import * as camera from "nativescript-camera";

var enumsModule = require("ui/enums");
var fs = require('file-system');
var imageSourceModule = require("image-source");

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    openCamera(){
        camera.requestPermissions().then(
            function success() {
                camera.takePicture()
                    .then(imageAsset => {
                        // alert("After Image Selection...!");
                        let documents = fs.knownFolders.documents();
                        var filename = 'st_' + new Date().getTime() + '.'+enumsModule.ImageFormat.jpeg;
                        let filepath = fs.path.join(documents.path, filename);
                        imageSourceModule.fromAsset(imageAsset)
                            .then(imageSource => {
                                imageSource.saveToFile(filepath, enumsModule.ImageFormat.jpeg);
                                console.log(filepath);
                                alert("File Successfully Saved to Device...!");
                                console.log("Start file Upoading...!");
                            });
                    }).catch(function (err) {
                        alert("Please select a Image...!");
                    });
            });
    }
}
