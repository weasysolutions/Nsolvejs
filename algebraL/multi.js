'use strict' ;
var product = require('./product');

/** @function
 * multiply the matrix object.
 * @param {Object} matrix {Object} matrix.
 * @return {Object} matrix
 */
module.exports= function (x){
  var l = arguments.length , A =x,B;
    for (var p = 1; p < l; p++){
      B = arguments[p];
      if(  A.column === B.raw){
      A=product(A,B)  ;
      }else{
      return ;
      }
    }
    return A ;
} ;