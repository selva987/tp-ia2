class ExpDist {
    constructor(lambda) {
        this.lambda = lambda;
    }

    setData(rows) {

    }

    p(x) {
        x = parseFloat(x);

        if(x < 0.0) return 0;
        return this.lambda * Math.exp(-1 * this.lambda * x);

    }
}