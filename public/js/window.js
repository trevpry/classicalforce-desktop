var gui = require('nw.gui');

//var newDialog = $('#fileDialog').dialog({
//    autoOpen: false,
//    height: 300,
//    width: 350,
//    modal: true
//});

var menuBar = new gui.Menu({
    label: 'ClassicalForce Desktop',
    type: 'menubar'
});

menuBar.createMacBuiltin("ClassicalForce Desktop", {
    hideEdit: true,
    hideWindow: true
});
gui.Window.get().menu = menuBar;

var fileMenu = new gui.Menu();

menuBar.append(new gui.MenuItem({
    label: 'File',
    submenu: fileMenu
}));

fileMenu.append(new gui.MenuItem({
    label: 'Scan Tracks',
    click: function(){
        alert($('$fileDialog'));
    }
}));

function showDialog(){
    //newDialog.dialog("open");
    $('#fileDialog').show();
}