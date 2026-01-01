
   

    $( document ).ready( function() {

     /*상단 스크롤 GNB 고정 */    
    var jbOffset = $( '#header' ).offset();
    $( window ).scroll( function() {
        if ( $( document ).scrollTop() > jbOffset.top ) {
        $( '#header' ).addClass( 'fixed' );
        }
        else {
        $( '#header' ).removeClass( 'fixed' );
        }
    });


    
    } );
