﻿#target photoshop
#include json2.js

document = app.activeDocument;
var pathGlobal = "/d/BD/";

//Quel projet ?
var projectName = prompt("Quel projet ?", "envol", "Export du rough...");

if (projectName === null){
    //return; 
    Terminer
};

//Quel Page ?
var pageNumber = prompt ('Page numero : ', '000', 'Environement...');

if (pageNumber === null){
    //return; 
    Terminer
};

//Ouvrir ou Creer le doc

//trouver le dossier des rendus
var rendusCasesPath = pathGlobal + projectName + "/P" + pageNumber + "/rendus"
var rendusCasesPathFolder = new Folder (rendusCasesPath)

if (!rendusCasesPathFolder.exists){
    alert("Il n'y a pas encore de rendu !");
    Terminer;
};


//Boucle pour ouvrir et afficher les images
var dataInPath =  pathGlobal + projectName + "/P" + pageNumber + "P/P" + pageNumber + "_data.json";
var dataInPathFile = new File(dataInPath);
dataInPathFile.open('r'); // r = read w = write 
var jsonInput = dataInPathFile.read();


var jsonObject = JSON.parse(jsonInput);
alert(String(jsonObject.cases[2].size[2]));
dataInPathFile.close();

var caseNewFile = new File(rendusCasesPath + "C" + numCase + "/C" + numCase + ".jpg")
var caseNewFileDocument = open(caseNewFile)
app.activeDocument = caseNewFileDocument

//creer un dossier
var renderImportGroup = document.layerSets.add();
renderImportGroup.name = "rendus_in";  