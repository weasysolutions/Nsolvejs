'use strict' ;
    /** @function
     * sum  the matrix object.
     * @param {Object} matrix {Object} matrix.
     *@return {Object} matrix
     */

var sum =  function (A,B){
     if (!A || !B) { return ;}
     var Y = require('./Mat');
       if( A.column === B.column && A.raw === B.raw ){
         var ii=A.raw,kk=B.column,array = [],i,k ;
         for (i=1 ;i<=ii;i++){
           array[i-1]=[];
           for (k=1 ;k<=kk;k++){
               array[i-1][k-1]=A._(i,k)+B._(i,k);
           }
         }
       return new Y(array)  ;
       }
} ;
      function addd(array){
         var l = array.length , A=array[0],B,p;
           for ( p = 1; p < l; p++){
             B = array[p];
             A=sum(A,B) ;
           }
        return A ;
       }


       module.exports = function () {
         var cb = arguments[arguments.length-1];
         if ( typeof cb === 'function') {
           arguments.pop();
           setTimeout(function () {
             cb(addd(arguments));
           });
         } else {
           return addd(arguments) ;
         }
       };
