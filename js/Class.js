class Class {
    constructor(rows, name) {
        this.rows = rows;
        this.name = name;
        this.priori = 0;
        this.mu = [];
        this.sigma = [];
        this.max = [];
        this.min = [];
    }

    train(n) {
        this.priori = this.rows.length / n;

        //calculo la media
        let sumatoria = 0;
        for(let i = 0 ; i < this.rows[0].length ; i++) {
            sumatoria = 0;
            this.rows.forEach(function (r) {
                r[i] = parseFloat(r[i]);
                sumatoria+= r[i];
            });
            this.mu[i] = sumatoria / this.rows.length;
        }

        //calculo la desviacion estandar
        for(let i = 0 ; i < this.rows[0].length ; i++) {
            sumatoria = 0;
            this.rows.forEach(function (r) {
                sumatoria+= Math.pow(parseFloat(r[i]) - this.mu[i],2);
            }, this);
            this.sigma[i] = Math.sqrt(sumatoria / (this.rows.length - 1));
        }
    }

}