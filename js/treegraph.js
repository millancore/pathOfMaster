

module.exports = function TreeGraph (canvas) {

    this.tree = [];

    this.add = function(node){S
        this.tree.push(node);
    }

    this.render = function(){

        let lengthTree = this.tree.length; 

        var circleY = 50;
        var textY = 58;
        
        var line = canvas.line(123, 50, 123, (90 * lengthTree))
                         .stroke({ width: 7, color: '#f4f5f6' });           
        line.fill( '#f09' );

        this.tree.forEach(element => {
            var circle = canvas.circle(45).fill('#4e6fc9');
             
            circle.move(100, circleY).stroke({
                   width: 4,
                   color: '#f4f5f6'
            });

            circle.click(element.click);

            var text = canvas.text(element.name);
            
            text.move(160,textY)
            text.font({
               family: 'Helvetica',
               size: 24,
               fill: '#f4f5f6'
           });
          
            circleY += 90;
            textY += 90;
        });
    }
}
