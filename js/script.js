"use strict";

document.addEventListener("DOMContentLoaded", init, false);

function displayTable() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8888/webservice/cursus_service.php", true);
    xhr.responseType = "json";

    xhr.onload = function () {
        let container = document.getElementById("table-container");
        if (xhr.status === 200) {

            let cursus = xhr.response;

            let str = `
<table  class="table  table-bordered">
<tr >
<th>#</th>
<th>TITRE</th>
<th>NIVEAU</th>
<th>MODULE</th>
</tr>`;
            for (let curs of cursus) {
                str = str.concat(` 
          <tr>
          <td>${curs.idCursus}</td>
          <td>${curs.titre}</td>
          <td>${curs.niveau}</td><td>
                <table class="table table-striped">
                  <tr>
                    <th>#</th>
                    <th>INTITULE</th>
                    <th>HEURES</th>
                    <th>DESCRIPTION</th>
                    </tr>
                `);

                for (let modules of curs.modules) {
                   str= str.concat(`
            
              
                <tr>
                    <td>${modules.idModule}</td>
                    <td>${modules.intitule}</td>
                    <td>${modules.heures}</td>
                    <td>${modules.description}</td>
                </tr>
           

            `);
                }
                str= str.concat(` </table>

            </td>

            </tr>`);
            }



        str.concat(`</table>`);
            console.log(str);
        container.innerHTML = str;}
    else
    {
        container.innerHTML = "<h2>OUPS y'a rien</h2>";
    }
};

xhr.send(null);
}

function addPersonne(pers, callback) {
    let xhr = new XMLHttpRequest();

    xhr.open("POST", "http://localhost:8888/webservice/cursus_service.php");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.status !== 201) {
            console.log("un ange passe....");
        }
        callback();
    };
}
function init() {


    displayTable();

}
