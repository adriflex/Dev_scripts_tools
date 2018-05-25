#target photoshop
document = app.activeDocument;

//repeat function
if (!String.prototype.repeat) {
  String.prototype.repeat = function (count) {
    "use strict";
    if (this == null)
      throw new TypeError("ne peut convertir " + this + " en objet");
    var str = "" + this;
    count = +count;
    if (count != count)
      count = 0;
    if (count < 0)
      throw new RangeError("le nombre de répétitions doit être positif");
    if (count == Infinity)
      throw new RangeError("le nombre de répétitions doit être inférieur à l'infini");
    count = Math.floor(count);
    if (str.length == 0 || count == 0)
      return "";
    // En vérifiant que la longueur résultant est un entier sur 31-bit
    // cela permet d'optimiser l'opération.
    // La plupart des navigateurs (août 2014) ne peuvent gérer des
    // chaînes de 1 << 28 caractères ou plus. Ainsi :
    if (str.length * count >= 1 << 28)
      throw new RangeError("le nombre de répétitions ne doit pas dépasser la taille de chaîne maximale");
    var rpt = "";
    for (var i = 0; i < count; i++) {
      rpt += str;
    }
    return rpt;
  }
}


//padstart function
if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength,padString) {
        targetLength = targetLength>>0; //truncate if number or convert non-number to 0;
        padString = String((typeof padString !== 'undefined' ? padString : ' '));
        if (this.length > targetLength) {
            return String(this);
        }
        else {
            targetLength = targetLength-this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength/padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0,targetLength) + String(this);
        }
    };
}



//Changement unite
app.preferences.rulerUnits = Units.PIXELS;

//Groupe a exporter
dataLayer = document.layerSets.getByName ("data_out");

//Folder export
var pathGlobal = "/d/BD/";
pathGlobal += prompt ("Quel projet ?", "envol", "Export du rough...") 
var pageIn = prompt ('Page numero : ', '000', 'Environement...')

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

//fichier txt DATA
var pathData = new File(pathPage + "P" + pageIn + "_data.txt");
pathData.open("w");

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
     
    x1 = String(boundsOutput[0]).replace (" px", "");
    y1 = String(boundsOutput[1]).replace (" px", "");
    x2 = String(boundsOutput[2]).replace (" px", "");
    y2 = String(boundsOutput[3]).replace (" px", "");
    
    pathData.writeln('case_' + numOutput + ' ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2); 
    
    
    
    document.activeHistoryState = history; //Historique on   
    numOutput++;
};

pathData.close(); //txt close

//save doc PSD version et JPG
var pathPsd = new File(pathRough + "P" + pageIn + ".psd");

document.saveAs (pathPsd, PhotoshopSaveOptions, false);

//JPG tumb
var history = document.activeHistoryState; //Historique off
var pathTumb= new File(pathRough + "P" + pageIn + ".jpg");
// ajouter un resize 
document.saveAs (pathTumb, JPEGSaveOptions, true);
document.activeHistoryState = history; //Historique on   

