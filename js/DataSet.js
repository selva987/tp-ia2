class DataSet {
    constructor(rows, classCol) {
        this.rows = rows;
        this.classCol = classCol;
        this.cols = [];
        this.classes = [];
        this.min = [];
        this.max = [];
        if(rows.length > 0) {
            this.parseDataSet();
            this.train();
        }
    }


    parseDataSet() {
        //Separo las filas en sus correspondientes clases
        this.rows.forEach(function(e,i) {
            if(e.length < 2) return;
            if(i == 0) {
                //Si la funcion devuelve true es porque el dataset tiene nombres de columnas y las ignoro
                if(this.loadHeaders(e)) return;
            }

            let className = e[this.classCol];
            let classRow = this.getIndexByClass(className);
            //las rows dentro de las clases no contienen la columna de clase
            e.splice(this.classCol, 1)
            e.forEach(function(r,i) {
                r = parseFloat(r);
                if(this.min[i] == null || r < this.min[i]) this.min[i] = r;
                if(this.max[i] == null || r > this.max[i]) this.max[i] = r;
            }, this);
            this.classes[classRow].rows.push(e);
        }, this);
    }

    train() {
        //Calculo probabilidades para cada clase
        this.classes.forEach(function(e) {
            e.train(this.hasHeaders ? this.rows.length -1 : this.rows.length);
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
                if(Number.isNaN(parseFloat(c))) {
                    hasHeaders = true;
                }
            }
        }, this);
        //Ahora cargamos los nombres de las columnas
        //Si tiene headers cargamos eso, sino X1, X2, Clase
        let x = 1;
        row.forEach(function(c, ic) {
            if(ic == this.classCol) {
                this.cols[ic] = (hasHeaders ? c : 'Clase');
            } else {
                this.cols[ic] = (hasHeaders ? c : 'X' + x);
                x++;
            }
        }, this);

        this.hasHeaders = hasHeaders;

        return hasHeaders;
    }
}