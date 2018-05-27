#target photoshop

document = app.activeDocument;
var pathGlobal = "/d/BD/";

function saveFinalPSD() {
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

    //Trouver / creer un folder
    var finalPsdPath = pathGlobal + projectName + "/P" + pageNumber + "/final_psd/"
    var finalPsdFolder = new Folder (finalPsdPath)

    if (!finalPsdFolder.exists){
        finalPsdFolder.create();
    };
            
    //Save le PSD
    var pathPsd = new File(finalPsdPath + "P" + pageNumber + "_final.psd");
    document.saveAs (pathPsd, PhotoshopSaveOptions, false);

    //Save le JPG tumb
    var history = document.activeHistoryState; //Historique off
    var pathTumb= new File(finalPsdPath + "P" + pageNumber + ".jpg");
    // ajouter un resize 
    document.saveAs (pathTumb, JPEGSaveOptions, true);
    document.activeHistoryState = history; //Historique on
};

saveFinalPSD();