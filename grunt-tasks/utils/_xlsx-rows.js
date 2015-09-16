/**
 * Created by mgobbi on 03/09/2015.
 */
"use strict";
var xlsx = require('xlsx');

//
// Regular expression to get the cell header
//
var letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    cellHeader = /^([A-Z]+)\d{1,}/,
    isCell = /^[A-Z]+\d{1,}/;

function getSheet(sheet) {
    var rows = [],
        row = [],
        format = "w",
        start = /^A\d{1,}/;
    if (!sheet) {
        throw new Error('No sheet with name: ' + sheetname);
    }

    //
    // Pushes the next row onto the `rows`
    //
    function pushRow() {
        //
        // Fill the row since we prefer the empty string
        // to a value of undefined.
        //
        row = row.map(function (val) {
            return val == undefined ? '' : val;
        });

        rows.push(row.slice());
        row = [];
    }

    Object.keys(sheet).forEach(function (cell) {
        if (!isCell.test(cell)) {
            return;
        }

        //
        // If we are the first cell (i.e. it is A12 or A0)
        // then add the current "row" to the "rows" ONLY
        // if it is not empty.
        //
        if (start.test(cell) && row && row.length) {
            pushRow();
        }

        var index = rowIndex(cell);
        row[index] = sheet[cell][format];
    });

    pushRow();
    return rows;
}

module.exports = filename=> {
    var workbook = xlsx.readFile(filename);



    return workbook.SheetNames.reduce((prev, sheetname)=> {
        prev[sheetname] = getSheet(workbook.Sheets[sheetname]).reduce((_prev, curr)=> {
            _prev[curr[0]] = curr[1];
            return _prev;
        }, {});
        return prev;
    }, {});

};

//
// ### function rowIndex (cell)
// Returns the row index for the cell
//
function rowIndex(cell) {
    var header = cellHeader.exec(cell),
        length;

    if (!header) {
        throw new Error('Bad cell header for: ' + cell);
    }

    //
    // TODO: Actually do something with the length
    // to support multi-character headers.
    //
    header = header[1];
    length = header.length;
    return letters.indexOf(header);
}