'use strict';
var Matrix = require( './Mat' );
/** @function
 * Function iterating over elements of  matrix object with params the item and indexs.
 * @param {Function} map whose params are the item and matrix's indexs.
 */
function foreach( map, B ) {
	if ( !B || !map ) {
		return;
	}
	if ( !( B instanceof Matrix ) ) {
		B = new Matrix( B )
	}
	if ( typeof map === 'function' ) {
		var ii = B.row,
			kk, array = [],
			i, k;
		for ( i = 1; i <= ii; i++ ) {
			array[ i - 1 ] = [];
			kk = B.getColumn( i )
			for ( k = 1; k <= kk; k++ ) {
				map.call( B, B._( i, k ), i, k );
			}
		}
	}
	return this
}
module.exports = function ( map, B, cb ) {
	if ( cb && typeof cb === 'function' ) {
		return new Promise( function ( full, rej ) {
			try {
				full( cb.call( B, null, foreach( map, B ) ) )
			} catch ( e ) {
				rej( cb.call( B, e, null ) )
			}
		} )
	} else {
		return foreach.call( this, map, B );
	}
};
