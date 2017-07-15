function searchTable() {
  var term = document.getElementById("searchTerm").value;
  table = document.getElementById("tableId");
  rows = table.getElementsByTagName("tr");

  for (i = 1; i < (rows.length); i++) {
    x = rows[i].getElementsByTagName("td")[2];
    y = rows[i].getElementsByTagName("td")[3];
    if (x.innerHTML.toLowerCase().includes(term.toLowerCase()) || y.innerHTML.toLowerCase().includes(term.toLowerCase())) {
      rows[i].style.display='';
    } else {
      rows[i].style.display='none';
    }
  }
}

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("tableId");
  switching = true;
  dir = "asc";

  while (switching) {
    switching = false;
    rows = table.getElementsByTagName("TR");

    for (i = 1; i < (rows.length - 1); i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("td")[n];
      y = rows[i + 1].getElementsByTagName("td")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount ++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function showPage(start) {
  var items = parseInt(document.getElementById("perpage").value);
  table = document.getElementById("tableId");
  var rowCount = table.rows.length;
  if (items==0) { items=rowCount; }
  rows = table.getElementsByTagName("tr");
  var pages = Math.ceil(rowCount/items);
  var current = Math.ceil((start+1)/items);
  var links = document.getElementById("pageLinks");
  links.innerHTML = "";
  for (p=1; p<=pages; p++) {
    if(p==current) {
      links.innerHTML += "<button onClick='showPage(" + (p-1)*items + ")'>" + p + "</button>"
    } else if(p==2 && pages>9) {
      links.innerHTML += "<button onClick='showPage(" + (p-1)*items + ")'>" + p + "</button>"
    } else if(p==pages-1 && pages>9) {
      links.innerHTML += "<button onClick='showPage(" + (p-1)*items + ")'>" + p + "</button>"
    } else if(p==current-1) {
      links.innerHTML += "<button onClick='showPage(" + (p-1)*items + ")'>&lt;</button> ";
    } else if(p==current+1) {
      links.innerHTML += " <button onClick='showPage(" + (p-1)*items + ")'>&gt;</button>";
    } else if(p==pages) {
      links.innerHTML += " <button onClick='showPage(" + (p-1)*items + ")'>&gt;&gt;</button>";
    } else if(p==1) {
      links.innerHTML += "<button onClick='showPage(0)'>&lt;&lt;</button> ";
    }else {
      links.innerHTML += "";
    }
  }

  for (i = 1; i < rowCount; i++) {
    if (i>start && i<=start+items) {
      rows[i].style.display='';
    } else {
      rows[i].style.display='none';
    }
  }
}
