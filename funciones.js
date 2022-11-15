$(document).ready(()=>{
    var Cards = [];
    var nombres = ['Bandera Suiza','Cuadro de colores','Logo de facebook','Un bloque de slime', 'Un bloque de tierra con grama', 'Un cubo de Rubik', 'Una cara de Creeper', 'Una galleta cuadrada'];
    var ordenNombres = [];

    ordenNombres = nombres.concat(nombres);
    ordenNombres.sort(()=>Math.random() - 0.5);

    console.log(nombres);
    console.log(ordenNombres);
    //OBJETIVO 4 DESAFIO 2
    let carta;
    // COOKIES
    var cookiesCarta = Cookies.get("Arreglo-de-cartas");
    console.log(cookiesCarta);
    
    let repetido = 0;
    if (cookiesCarta != undefined){
        try {
            Cards = JSON.parse(cookiesCarta)
        } catch (x) {
            console.log("ocurrió un error.");
            console.log(e);
        }
    } else {
        for (i=1;i<17;i++){
            $(`#foto${i}`).attr("title",ordenNombres[i-1]);
        }
        for (i=1;i<17;i++){
            if(!existe($(`#foto${i}`).attr("title"))){
                carta = new Cartas($(`#foto${i}`).attr("title"));
                Cards.push(carta);
            }
        }
    }

    // FIN COOKIES

    $(".cartasVolt").attr("src","./imagenes/volteado.png");

    for (i=0; i < Cards.length; i++)
        $(`#contador${i+1}`).text(`${Cards[i].titulo}: ${Cards[i].contador}`); 

    console.log(Cards);
    
    function existe(titulo){
        for (let i=0;i<Cards.length;i++)
            if (Cards[i].titulo == titulo)
                return true;
                
        return false;
    }

    //FIN OBJETIVO 4 DESAFIO 2

    var contador = 0;

    $("#cont1 #tabla-imagenes tr td img").click(function(){
        let cartaFrontal = $(this).attr("title"); //Objetivo 2 Desafío 3
        let volteada = $(this).attr("src"); //Objetivo 2 Desafío 3
        console.log("imagen presionada") 

        if(volteada == "./imagenes/volteado.png"){
            $(this).fadeOut(200, ()=>{   //Objetivo 2 y 3 Desafio 3
                $(this).attr("src",`./imagenes/${cartaFrontal}.jpg`);

                contador++; //Contador de puntos
                $("#contador").text(`${contador}`);  //Mostrar lo contado en puntos.
                $("#tabla-imagenes img").removeClass("border"); //remueve el class border a todas las imagenes.
                $(this).addClass("border"); //Le agrega el border a la imagen elegida.

                let descripcion = $(this).attr("title");
                let imagenGrande = $(this).attr("src");

                let i = 0;
                let encont = false;
                do {         
                    if(Cards[i].titulo == descripcion){
                      //console.log(`${Cards[i].titulo}==${descripcion}?`);
                        Cards[i].contador = Cards[i].contador + 1;
                        $(`#contador${i+1}`).text(`${Cards[i].titulo}: ${Cards[i].contador}`); 
                        encont = true;
                    } else 
                        i = i + 1;      
                    //console.log(i);
                } while (!encont);

                console.log(Cards);
               //console.log(JSON.stringify(Cards));
                Cookies.set("Arreglo-de-cartas",JSON.stringify(Cards),{expires:3, path:''});
        
                //Fin Objetivo 5.1 DESAFIO 2
       
                $("#cont2 h2").html(`<b>${descripcion}</b>`)
                $("#cont2 #imagen").html(`<img src="${imagenGrande}" style="height: 300px; width: 300px;">`)
                $("#cont3").attr("style","display-block");
                $("#cont3 h1").css({"margin-bottom":"10px"});
                $("#cont3 #lista").attr("style","display-block");

                $(this).fadeIn(200);
            })
        } else { 
            $(this).fadeOut(200, ()=>{ 
                $(this).attr("src",`./imagenes/volteado.png`);   
                $(this).addClass("border"); 
                $(this).removeClass("border");  
                $(this).fadeIn(200);  
            })
        } //PARTE QUE NECESITA REPARACION 1.
    });

    $("#activar").click(()=>{
        inicioDePartida = new Date();
        console.log(inicioDePartida);

        $("#cont1").slideDown(1000); //Objeto 1 Desafío 2
        $("#contador").text(`${contador}`);
        $("#coverTablero").slideUp(1000,()=>{
            $("#coverTablero").attr("style","display: none");
        });
        if($("#activar").attr("value") == "Volver a empezar"){
            $("#cont1").slideUp(300); //Ojetivo 5 Desafío 3.
            $("#cont1").slideDown(300);
            $("#cont3").fadeOut(()=>{
                contador = 0;//Resetea contador
                $("#contador").text(contador);//muestra el nuevo valor de contador en el h1 contador.
                for (i=1;i<9;i++)
                    $(`#contador${i}`).text(""); //Limpia la lista. (Los ciclos for fueron hechos como agregado del desafío 2 aunque no se me pidió explícitamente esto.)
     
                for (i=0; i<8; i++){
                    Cards[i].contador = 0;
                    $(`#contador${i+1}`).text(`${Cards[i].titulo}: ${Cards[i].contador}`); 
                }
    
                $(".cartasVolt").attr("src","./imagenes/volteado.png");
    
                console.log(JSON.stringify(Cards));
                Cookies.set("Arreglo-de-cartas",JSON.stringify(Cards),{expires:3, path:''});
    
                ordenNombres.sort(()=>Math.random() - 0.5);
                for (i=1;i<17;i++){
                    $(`#foto${i}`).attr("title",ordenNombres[i-1]);
                }            
                $("#imagen").empty(); //Borra la imagen.
                $("#descripcion").empty(); //Borra la descripción de la imagen.
                $("#tabla-imagenes img").removeClass("border");
            }).fadeIn(500);
        }

        $("#activar").attr("value","Volver a empezar");
    });

    function Cartas(titulo){ //Creando un objeto con función por parámetro (obsoleto)
        this.titulo = titulo;
        this.contador = 0;
    }
});