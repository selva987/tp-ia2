class NB {

    constructor(rows, classCol, distType) {
        this.dataset = new DataSet(rows, classCol);
        switch (distType) {
            default:
            case 'normal':
                this.dist = new NormalDist();
        }
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

            console.log(c.name + ': ' + score);

            //TODO: ver que hacer cuando hay empates
            if(winnerScore == null || score > winnerScore) {
                winnerIndex = i;
                winnerScore = score;
            }
        }, this);

        return winnerIndex;
    }

}