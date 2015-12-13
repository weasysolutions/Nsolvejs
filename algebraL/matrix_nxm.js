'use strict';
/** @function
 * Builder of a matrix nxm with mapping function of i,j.
 * @param {Number} n {Number} m {Function} mapping .
 * @return {Object} vector
 */
 function nxm(n,m,map) {
  var Matrix= require('../algebraL/Mat');
  if (!n || !m || !map) { return ;}
  var array = [],i,j;
  for ( i = 1; i <=n ; i++) {
      array[i-1]=[];
      for ( j = 1; j <=m ; j++) {
          array[i-1][j-1]=map(i,j);
      }
  }
 return new Matrix(array);
}
module.exports = function (n,m,map,cb) {
  if (cb && typeof cb === 'function') {
    return new Promise(function(full,rej){
      try {
        full(cb(null,nxm(n,m,map)))
      } catch (e) {
        rej(cb( e,null ) )
      }
    }
 )
  } else {
    return nxm(n,m,map) ;
  }
}
