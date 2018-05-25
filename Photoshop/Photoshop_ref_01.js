#target photoshop

//Documents
var monDoc = app.documents.add() //nouveau doc
var monDoc = app.activeDocument //recup le doc actif
app.activeDocument = monDoc //active un doc

//Ouvrir un doc
var monFile = File("C:/Users/Adridri/Desktop/test.psd")
var monDoc = app.open(monFile)

//Save un doc
monFile = new File("C:/Users/Adridri/Desktop/test02.jpeg")
jpegSaveOption = new JPEGSaveOptions()
app.activeDocument.saveAs(monFile, jpegSaveOption)

//resize et manip doc
monDoc.resizeImage (width, height, resolution, resampleMethod, amount)
monDoc.resizeCanvas (width, height, anchor)
monDoc.trim (type, top, left, bottom, right) //TrimType.TRANSPARENT et booleans
monDoc.crop (bounds, angle, width, height) // bounds = array(4)
monDoc.flipCanvas (direction) //Direction.HORIZONTAL

//Layers :
var monLayer = monDoc.artLayers.add() //nouveau layer 
monDoc.activeLayer = monDoc.layers[0] //selectionner layer

//Layers Proprity
monLayer.name = "Mon layer"
monLayer.blendMode = BlendMode.MULTIPLY
monLayer.duplicate (relativeObject, insertionLocation)
dataLayer.artLayers[i].bounds //taille array

//Creer du texte :
monLayer.kind = LayerKind.TEXT // changer le type de layer
monLayer.textItem.contents = 'Hello' // changer le contenu 

//Groupes :
var monGroup = monDoc.layerSets.add() //new
monGroup.move (relativeObject, insertionLocation) // mon layer, ElementPlacement

//Selection 
monDoc.selection.selectAll()
app.activeDocument.selection.fill (fillType, mode, opacity, preserveTransparency) //SolidColor
monDoc.selection.copy(true) //true = tout les calques
	//monDoc.paste()

//Couleurs
var maColor = new SolidColor
maColor.rgb.red = 255
maColor.rgb.green = 255
maColor.rgb.blue = 255

//file 
var monFile = new File("/d/exemple/test.png")
monFile.open('r') // r = read w = write
var output = monFile.read() // debut
monFile.close() //fin
file.writeln("First line of text")
file.writeln("Second line of text ")
file.write("str")
//file:///C:/Program%20Files%20(x86)/Adobe/Adobe%20ExtendScript%20Toolkit%20CC/SDK/JavaScript%20Tools%20Guide%20CC.pdf

file.writeln()

//History state
var history = monDoc.activeHistoryState //debut 
monDoc.activeHistoryState = history //fin