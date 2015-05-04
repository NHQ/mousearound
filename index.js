var close = require('closeness')

module.exports = function(node, points, fn){
  
  if(!(Array.isArray(points))){
    fn = points
    points = null
  }

  if(points){
    points = points.map(function(e){
      e.closeX = close(e.x, e.radius || 10)
      e.closeY = close(e.y, e.radius || 10)
      return e
    })
  }

  node.addEventListener('mouseover', onHover, true)

  node.addEventListener('mouseout', onExit, true)

  var node = node;

  var position = [0, 0];

  function mouseMove(evt){

    if(points){
      points.forEach(function(pt) {
        var x, y
        if(pt.closeX(x = evt.offsetX) && pt.closeY(y = evt.offsetY)){
          fn(evt, pt, [x, y], false, true)
        }
      })    
      return
    }

    position = findPos(evt.target);

    fn(evt, node, position, false, false)

  };

  function onExit(evt){

    window.removeEventListener('mousemove', mouseMove, true)
    
    if(points){
      points.forEach(function(pt) {
        var x, y
        if(pt.closeX(x = evt.offsetX) && pt.closeY(y = evt.offsetY)){
          fn(evt, pt, [x, y], false, true)
        }
      })    
      return
    }


    position = findPos(evt.target);

    fn(evt, node, position, false, true)
  };


  function onHover(evt){

    window.addEventListener('mousemove', mouseMove, true);

    if(points){
      points.forEach(function(pt) {
        var x, y
        if(pt.closeX(x = evt.offsetX) && pt.closeY(y = evt.offsetY)){
          fn(evt, pt, [x, y], true, false)
        }
      })    
      return
    }
    

    position = findPos(evt.target);

    fn(evt, node, position, true, false)

  };

}

function findPos(obj) {
  var curleft = 0
  ,   curtop = 0;

  if (obj.offsetParent) {

    do {

      curleft += obj.offsetLeft;

      curtop += obj.offsetTop;

    } 

    while (obj = obj.offsetParent);

    return [curleft,curtop];

  };
};
