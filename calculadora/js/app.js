var Calculadora = {};
Calculadora = ( function () {
    var teclaActiva, pantalla, valor, decimal, numero1, numero2, operacion;

    iniciarCalculadora();
    
    function presionarTecla() {
        teclaActiva = this;
        this.style.borderWidth = '2px';
        switch ( this.id ) {
        case "on":
            valor = 0;
            numero2 = null;
            decimal = null;
            operacion = null;
            break;
        case "sign":
            valor *= -1;
            break;
        case "punto":
            decimal = ( decimal == 0 ) ? -1 : decimal;
            break;
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            valor = Math.abs( valor );
            if ( decimal == 0 )
                valor = valor * 10 + parseInt( this.id );
            else
                valor += parseInt( this.id ) * Math.pow( 10, decimal-- );
            numero2 = null;
            break;
        case "mas":
        case "menos":
        case "por":
        case "dividido":
            if ( valor == 0 ) return;
            numero1 = valor;
            numero2 = null;
            valor  = 0;
            decimal  = 0;
            operacion = this.id;
            break;
        case "igual":
            if ( operacion == null || numero1 == null ) return;
            if ( numero2 == null )
                numero2 = valor;
            else
                numero1 = valor;
            switch ( operacion ) {
            case "mas":
                valor = numero1 + numero2;
                break;
            case "menos":
                valor = numero1 - numero2;
                break;
            case "por":
                valor = numero1 * numero2;
                break;
            case "dividido":
                valor = numero1 / numero2;
                break;
            }
            break;

        }
        actualizarPantalla();
    }


    function soltarTecla() {
        teclaActiva.style.borderWidth = '0';
    }


    function actualizarPantalla() {
        var literal = valor.toString(), pos = literal.indexOf( '.' );
        if ( literal.length > 10 ) {
            decimal = pos ? -Math.min( 7, literal.length - pos - 1 ) : 0;
            valor = valor.toFixed( -decimal );
        }
        literal = valor.toString() + ( decimal < 0 && literal.indexOf( "." ) < 0 ? "." : "" );
        literal = ( literal == "0" && operacion != null ) ? "" : literal.substring( 0, 8 );
        pantalla.innerHTML = literal.substring( 0, 8 );
        valor = Number( literal );
    }


    function iniciarCalculadora() {
        valor = 0;
        decimal = 0;
        operacion = null;
        numero2 = null;
        pantalla = document.getElementById( 'display' );
        var teclas = document.querySelectorAll( '.tecla' );
        for ( var i = 0; i < teclas.length; i++ ) {
            teclas[i].style.width = "78px";
            teclas[i].style.border = '0px solid #999';
            teclas[i].onmousedown = presionarTecla;
            teclas[i].onmouseup = soltarTecla;
        }
        actualizarPantalla();
    }
}());