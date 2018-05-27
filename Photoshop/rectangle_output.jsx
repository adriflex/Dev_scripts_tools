#target photoshop
#include json2.js
#include custom_script.js

document = app.activeDocument;

//Changement unite
app.preferences.rulerUnits = Units.PIXELS;

//Groupe a exporter
dataLayer = document.layerSets.getByName ("data_out");

function exportRect() {
    //Folder export
    var pathGlobal = "/d/BD/";
    projectName = prompt ("Quel projet ?", "envol", "Export du rough...") 

    if (projectName === null){
        return; 
    } else {
        pathGlobal += projectName;
    };

    //Path de la page
    var pathProjectFolder = new Folder (pathGlobal);
    while(!pathProjectFolder.exists) {
        alert("Le projet n'existe pas !", "Attention !" );
        pathGlobal = "/d/BD/";
        pathGlobal += prompt ("Quel projet ?", "envol", "Export du rough...")
        pathProjectFolder = new Folder (pathGlobal);
    };

    //Quel page ?
    var pageIn = prompt ('Page numero : ', '000', 'Environement...')

    if(pageIn === null || pageIn === '000' ) {
        return; 
    };

    //Path de la page
    var pathPage = pathGlobal + "/P" + pageIn + "/";
    var pathPageFolder = new Folder (pathPage);
    if(!pathPageFolder.exists) {
        pathPageFolder.create();
    };

    //Path du rough
    pathRough = pathPage + "/rough_psd/";
    var pathRoughFolder = new Folder (pathRough );
    if(!pathRoughFolder.exists) {
        pathRoughFolder.create();
    };

    //Path du fichier case
    //var jpgFolder = pathOutput + plancheIn + "_cases/"
    var pathCases = pathPage + "/cases/"; 
    var pathCasesFolder = new Folder (pathCases);
    if(!pathCasesFolder.exists) {
        pathCasesFolder.create();
    }
    
    // Objet data pour JSON
    var pageData = {
        pageSize : [document.height.value, document.width.value],
        cases : []
    };

    //Export des cases JPG et DATA
    var i = dataLayer.artLayers.length-1;
    var numOutput = 1 ;     //dataLayer.artLayers[i].name.split(' ').pop(); //numero de case

    for(i ; i >= 0 ; i--) {
        
        var history = document.activeHistoryState; //Historique off
            
        var boundsOutput = dataLayer.artLayers[i].bounds; //bound de la case
                
        document.crop (boundsOutput);
        
        var numCase = String(numOutput).padStart(3, "0");
        var pathCase = pathCases + "C" + numCase + "/";
        var pathCaseFolder = new Folder (pathCase);
        if(!pathCaseFolder.exists) {
            pathCaseFolder.create();
        }
        
        var jpgOutput = new File(pathCase + "C" +numCase + ".jpg");
        document.saveAs (jpgOutput, JPEGSaveOptions, true);
         
        x1 = boundsOutput[0].value;
        y1 = boundsOutput[1].value;
        x2 = boundsOutput[2].value;
        y2 = boundsOutput[3].value;
        
        //data object fill
        pageData.cases.push({"num" : numOutput, size : [x1, y1, x2, y2]});
        
        document.activeHistoryState = history; //Historique on   
        numOutput++;
    };

    //JSON stringify
    var jsonObject = JSON.stringify(pageData, null, 2);
    
    //Fichier JSON Data
    var pathData = new File(pathPage + "P" + pageIn + "_data.json");
    pathData.open("w");
    pathData.write(jsonObject)
    pathData.close(); //file close

    //save doc PSD version et JPG
    var pathPsd = new File(pathRough + "P" + pageIn + ".psd");

    document.saveAs (pathPsd, PhotoshopSaveOptions, false);

    //JPG tumb
    var history = document.activeHistoryState; //Historique off
    var pathTumb= new File(pathRough + "P" + pageIn + ".jpg");
    // ajouter un resize 
    document.saveAs (pathTumb, JPEGSaveOptions, true);
    document.activeHistoryState = history; //Historique on   
};
exportRect();