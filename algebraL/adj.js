'use strict';
var det = require( './det' ),
	minor = require( './minor' ),
	trans = require( './trans' );
/** @function
 * The adjunted matrix.
 * @param  {Object} matrix
 * @return {Object} matrix
 */
function adj( B ) {
	if ( !B ) {
		return;
	}
	var Matrix = require( './Mat' );
	if ( !( B instanceof Matrix ) ) {
		B = new Matrix( B )
	}
	if ( B.row > 1 ) {
		var ii = B.row,
			kk, array = [],
			i, k;
		for ( i = 1; i <= ii; i++ ) {

			array[ i - 1 ] = [];
			kk = B.getColumn( i )

			for ( k = 1; k <= kk; k++ ) {
				array[ i - 1 ][ k - 1 ] = Math.pow( -1, i + k ) * det( minor( i, k, B ) );

			}
		}
		return trans( new Matrix( array ) );
	}
	return new Matrix( [ [ 1 ] ] );
}
module.exports = function ( B, cb ) {
	if ( cb && typeof cb === 'function' ) {
		return new Promise( function ( full, rej ) {
			try {
				full( cb( null, adj( B ) ) )
			} catch ( e ) {
				rej(cb( e,null ) )
			}
		} )
	} else {
		return adj( B );
	}
};
