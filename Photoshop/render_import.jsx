#target photoshop
#include json2.js
#include custom_script.js

document = app.activeDocument;
var pathGlobal = "/d/BD/";

function importRendus() {
    //Quel projet ?
    var projectName = prompt("Quel projet ?", "envol", "Export du rough...");

    if (projectName === null){
        return;
    };

    //Quel Page ?
    var pageNumber = prompt ('Page numero : ', '000', 'Environement...');

    if (pageNumber === null){
        return;
    };

    //Ouvrir ou Creer le doc

    //trouver le dossier des rendus
    var rendusCasesPath = pathGlobal + projectName + "/P" + pageNumber + "/rendus"
    var rendusCasesPathFolder = new Folder (rendusCasesPath)

    if (!rendusCasesPathFolder.exists){
        alert("Il n'y a pas encore de rendu !");
        return;
    };
        

    //Ouverture Json data
    var dataInPath =  pathGlobal + projectName + "/P" + pageNumber + "/P" + pageNumber + "_data.json";
    var dataInFile = new File(dataInPath);
    dataInFile.open('r'); 
    var jsonInput = dataInFile.read();
    dataInFile.close();

    var jsonObject = JSON.parse(jsonInput);

    //creer un dossier
    var renderImportGroup = document.layerSets.add();
    renderImportGroup.name = "rendus_in";  

    //Boucle pour ouvrir et afficher les images

    for (var i=0; i<jsonObject.cases.length ; i++) {
        var numOutput = jsonObject.cases[i].num
        var numCase = String(numOutput).padStart(3, "0");
        //ouvrir le rendu.jpg
        caseNewFile = new File(rendusCasesPath + "/C" + numCase + "/C" + numCase + ".jpg");
        var caseNewFileDocument = open(caseNewFile);
        app.activeDocument = caseNewFileDocument;
        var documentProv = app.activeDocument;
        documentProv.selection.selectAll();
        documentProv.selection.copy();
        documentProv.close (SaveOptions.DONOTSAVECHANGES);
        //fermer 
        
        
        //var newLayer = renderImportGroup.artLayers.add();
        //newLayer.name = "Rendu_" + numCase; 
        document.activeLayer = renderImportGroup
        
        var x1 = jsonObject.cases[i].size[0];
        var y1 = jsonObject.cases[i].size[1];
        var x2 = jsonObject.cases[i].size[2];
        var y2 = jsonObject.cases[i].size[3];
        var newRect = [ [x1,y1], [x1,y2], [x2,y2], [x2 ,y1] ];
            
        document.selection.select (newRect, SelectionType.REPLACE, 0, 0);
        document.paste(true);
        document.activeLayer.name = "Rendu_" + numCase;        
    };
};

importRendus();



