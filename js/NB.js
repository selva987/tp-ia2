class NB {

    constructor(rows, classCol, distType) {
        this.dataset = new DataSet(rows, classCol);
        switch (distType) {
            default:
            case 'normal':
                this.dist = new NormalDist();
        }
    }

    validate(rows) {
        let classCol = this.dataset.classCol;
        let retorno = {
            pass: [],
            fail: [],
            total: 0
        }
        rows.forEach(function(e, i) {
            //Filtro linea vacia
            if(e.length < 2) return;
            //Filtro encabezado
            if(isNaN(parseFloat(e[classCol == 0 ? 1 : 0]))) return;
            let className = e.splice(classCol, 1);

            let clase = this.classify(e);
            if(clase.name == className[0]) {
                retorno.pass.push(rows[i]);
            } else {
                retorno.fail.push(rows[i]);
            }
            retorno.total++;
        }, this);

        return retorno;
    }

    classify(row) {
        let winnerIndex = null;
        let winnerScore = null;
        let classes = this.dataset.classes;

        classes.forEach(function(c, i) {
            let score = c.priori;

            for(let index = 0 ; index < c.mu.length ; index++) {
                score *= this.dist.p(row[index], c.mu[index], c.sigma[index]);
            }

            //TODO: ver que hacer cuando hay empates
            if(winnerScore == null || score > winnerScore) {
                winnerIndex = i;
                winnerScore = score;
            }
        }, this);

        return classes[winnerIndex];
    }

}