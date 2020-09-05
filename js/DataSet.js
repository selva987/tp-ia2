class DataSet {
    constructor(rows, classCol) {
        this.rows = rows;
        this.classCol = classCol;
        this.cols = [];
        this.classes = [];
        this.parseDataSet();
        this.train();
    }


    parseDataSet() {
        //Separo las filas en sus correspondientes clases
        this.rows.forEach(function(e,i) {
            if(i == 0) {
                this.loadHeaders(e);
            }

            let className = e[this.classCol];
            let classRow = this.getIndexByClass(className);
            //las rows dentro de las clases no contienen la columna de clase
            e.splice(this.classCol, 1)
            this.classes[classRow].rows.push(e);
        }, this);
    }

    train() {
        //Calculo probabilidades para cada clase
        this.classes.forEach(function(e) {
            e.train(this.rows.length);
        }, this);
    }

    getIndexByClass(name) {
        let index = null;
        this.classes.forEach(function(e,i) {
            if(name == e.name) index = i;
        }, this);

        if(index == null) {
            this.classes.push(new Class([], name));
            index = this.classes.length - 1;
        }

        return index;
    }

    loadHeaders(row) {
        let hasHeaders = false;
        //En la primera linea checkeamos si tiene valores no numericos, en ese caso se trata de
        //los nombres de las columnas y los guardamos para mejor GUI
        row.forEach(function(c, ic) {
            if(ic != this.classCol) { //no hacemos el checkeo sobre la columna de clase porque es muy probable que no sea numerica de todas formas
                if(Number.isNaN(c)) {
                    hasHeaders = true;
                }
            }
        }, this);
        //Ahora cargamos los nombres de las columnas
        //Si tiene headers cargamos eso, sino X1, X2, Clase
        let x = 1;
        row.forEach(function(c, ic) {
            if(ic == this.classCol) {
                this.cols[ic] = (hasHeaders ? 'Clase' : c);
            } else {
                this.cols[ic] = (hasHeaders ? 'X' + x : c);
                x++;
            }
        }, this);
    }
}