#target photoshop
document = app.activeDocument;

//Changement unite
app.preferences.rulerUnits = Units.PIXELS;

//Groupe a exporter
dataLayer = document.layerSets.getByName ("data_out");

//Fichier export
var pathOutput = "/d/test_js_photoshop/";
var plancheIn = prompt ('Page numero : ', '000', 'Environement...')

//Path de la page
pathOutput += plancheIn + "/";
var newPageFolder = new Folder (pathOutput);
if(!newPageFolder.exists) {
    newPageFolder.create();
}

//Path du fichier case
var jpgFolder = pathOutput + plancheIn + "_cases/"
var newJpgFolder = new Folder (jpgFolder);
if(!newJpgFolder.exists) {
    newJpgFolder.create();
}

//fichier txt DATA
var dataOutFile = new File(pathOutput + "data_page_" + plancheIn + ".txt");
dataOutFile.open("w");

//Export des cases JPG et DATA
var i = dataLayer.artLayers.length-1;
var numOutput = 1 ;//dataLayer.artLayers[i].name.split(' ').pop(); //numero de case

for(i ; i >= 0 ; i--) {
    
    var history = document.activeHistoryState; //Historique off
        
    var boundsOutput = dataLayer.artLayers[i].bounds; //bound de la case
            
    document.crop (boundsOutput);
        
    var jpgOutput = new File(jpgFolder + "case_" + numOutput + ".jpg");
    document.saveAs (jpgOutput, JPEGSaveOptions, true);
     
    x1 = String(boundsOutput[0]).replace (" px", "");
    y1 = String(boundsOutput[1]).replace (" px", "");
    x2 = String(boundsOutput[2]).replace (" px", "");
    y2 = String(boundsOutput[3]).replace (" px", "");
    
    dataOutFile.writeln('case_' + numOutput + ' ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2); 
    
    
    
    document.activeHistoryState = history; //Historique on   
    numOutput++;
};

dataOutFile.close(); //txt close

//save doc PSD version et JPG
var psdOutput = new File(pathOutput + "page_" + plancheIn + ".psd");

document.saveAs (psdOutput, PhotoshopSaveOptions, false);

//JPG tumb
var history = document.activeHistoryState;//Historique off
var tumbOutput = new File(pathOutput + "page_" + plancheIn + ".jpg");
// ajouter un resize 
document.saveAs (tumbOutput, JPEGSaveOptions, true);
document.activeHistoryState = history;//Historique on   

