class NormalDist {
    constructor() {
    }

    p(x, mu, sigma) {

        return ((1/(sigma * Math.sqrt(2 * Math.PI )))
            * Math.exp(-1*(Math.pow(x - mu, 2) / (2 * Math.pow(sigma,2)))));
    }
}