'use strict';
/** @function
 * multiply the matrix object.
 * @param {Object} matrix {Object} matrix.
 * @return {Object} matrix
 */
function product( A, B ) {
	let test = false
	if ( !A || !B ) {
		return;
	}
	let Matrix = require( './Mat' );
	if ( !( A instanceof Matrix ) ) {
		A = new Matrix( A )
	}
	if ( !( B instanceof Matrix ) ) {
		B = new Matrix( B )
	}
	let ii = A.row,
		kk, array = [],
		i, k;
	for ( i = 1; i <= ii; i++ ) {
		array[ i - 1 ] = [];
		kk = A.getColumn( i )
		for ( k = 1; k <= kk; k++ ) {
			test = test || ( typeof A._( i, k ) === 'object' )
			if ( test ) {
				array[ i - 1 ][ k - 1 ] = !Array.isArray( B._( i, k ) ) ?
					Matrix.apply( A._( i, k ), B._( i, k ) )  :
					product( A._( i, k ), B._( i, k ) )
			} else {
				array[ i - 1 ][ k - 1 ] = A._( i, k ) * B._( i, k );
			}
			test = false

		}
	}
	return new Matrix( array );

}
module.exports = function ( A, B, cb ) {
	if ( cb && typeof cb === 'function' ) {
		return new Promise( function ( full, rej ) {
			try {
				full( cb.call( {
					A: A,
					B: B
				}, null, product( A, B ) ) )
			} catch ( e ) {
				rej( cb.call( {
					A: A,
					B: B
				}, e, null ) )
			}
		} )
	} else {
		return product( A, B );
	}
};
