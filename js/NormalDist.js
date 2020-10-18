class NormalDist {
    constructor() {
    }

    p(x, mu, sigma) {

        return ((1/(sigma * Math.sqrt(2 * Math.PI )))
            * Math.exp(-1*(Math.pow(x - mu, 2) / (2 * Math.pow(sigma,2)))));

        //Prueba para funcion que grafica distribucion
        // return (1/(0.352489687* sqrt(2 * PI ))) * exp(-1*((x - 5.006)^2 / (2 * (0.352489687)^2)));
        // return (1/(0.516171147* sqrt(2 * PI ))) * exp(-1*((x - 5.963)^2 / (2 * (0.516171147)^2)));
        // return (1/(0.635879593* sqrt(2 * PI ))) * exp(-1*((x - 6.588)^2 / (2 * (0.635879593)^2)));
    }
}