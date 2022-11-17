$(document).ready(()=>{
    var Cards = [];
    var nombres = ['Bandera Suiza','Cuadro de colores','Logo de facebook','Un bloque de slime', 'Un bloque de tierra con grama', 'Un cubo de Rubik', 'Una cara de Creeper', 'Una galleta cuadrada'];
    var ordenNombres = [];
    var tiempoPartida;
    var total;
    var mejorTiempo;
    var carta1;
    var carta2;
    var src1;
    var src2;
    var contCards = 0;   

    console.log(mejorTiempo);

    ordenNombres = nombres.concat(nombres);
    ordenNombres.sort(()=>Math.random() - 0.5);

    console.log(nombres);
    console.log(ordenNombres);
    //OBJETIVO 4 DESAFIO 2
    let carta;

    for (i=1;i<17;i++){
        $(`#foto${i}`).attr("title",ordenNombres[i-1]);
    }
    for (i=1;i<17;i++){
        if(!existe($(`#foto${i}`).attr("title"))){
            carta = new Cartas($(`#foto${i}`).attr("title"));
            Cards.push(carta);
        }
    }
    console.log(Cards);

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
            $(this).fadeOut(100, ()=>{   //Objetivo 2 y 3 Desafio 3
                $(this).attr("src",`./imagenes/${cartaFrontal}.jpg`);

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
                        if(contCards == 0){
                            carta1 = Cards[i].titulo;
                            src1 = $(this).attr("id");
                        }
                        else if (contCards == 1){
                            carta2 = Cards[i].titulo;
                            src2 = $(this).attr("id");
                        }              
                        encont = true;
                    } else 
                        i = i + 1;      
                    //console.log(i);
                } while (!encont);

                console.log(`${carta1} y ${carta2}`);
                contCards++;

                if(contCards == 2){
                    if(carta1 != carta2){ 
                        setTimeout(()=>{
                            $("#noPar").attr("style", "display: flex; justify-content: center; align-items: center; position: absolute; background-color: red; height: 600px; width: 500px;").fadeIn(1500);
                        }, 300);
                        setTimeout(function(){
                            contCards = 0;
                            $(`#${src1}`).attr("src","./imagenes/volteado.png");
                            $(`#${src2}`).attr("src","./imagenes/volteado.png");
                            $("#noPar").fadeOut(500,()=>{
                                $("#noPar").attr("style", "display: none;");
                            });
                        },500);
                    }else{
                        setTimeout(()=>{
                            $("#siPar").attr("style", "display: flex; justify-content: center; align-items: center; position: absolute; background-color: green; height: 600px; width: 500px;").fadeIn(1500);
                        },300);
                        setTimeout(function(){
                            contCards = 0;
                            contador++; //Contador de puntos
                            $("#contador").text(`${contador}`);  //Mostrar lo contado en puntos.
                            if(contador == 8){
                                clearInterval(temporizador);
                                tiempoCierre = (new Date()).getTime();
                                console.log(tiempoCierre);
                                total = tiempoCierre - tiempoPartida.getTime();
                                console.log(tiempoPartida);
                                console.log(total);

                                $("#youWin").attr("style","display: block;");
                                setTimeout(()=>{
                                    $("#youWin").attr("style","display: none;");
                                },3000);
                                //alert("ganaste!");
                                console.log("gano");
                                console.log(`variable total: ${total}`);

                                mejorTiempo = localStorage.getItem("time");
                                console.log(mejorTiempo);
                                if(mejorTiempo == null){
                                  mejorTiempo = total;
                                  localStorage.setItem("time", mejorTiempo);
                                  console.log(mejorTiempo);

                                  var hour = total/(60*60*1000);
                                  var min = (hour - Math.floor(hour))*60;
                                  var sec = (min - Math.floor(min))*60;
          
                                  console.log(Math.floor(hour));
                                  console.log(Math.floor(min));
                                  console.log(Math.floor(sec));
                                  $("#ganaste").attr("style", "display: block;");
                                  $("#horaT").text(`${Math.floor(hour)}`);
                                  $("#minutoT").text(`${Math.floor(min)}`);
                                  $("#segundoT").text(`${Math.floor(sec)}`);      
                                }
                                
                                if(total < mejorTiempo){
                                    localStorage.setItem("time", total);  

                                    var hour = total/(60*60*1000);
                                    var min = (hour - Math.floor(hour))*60;
                                    var sec = (min - Math.floor(min))*60;
          
                                    console.log(Math.floor(hour));
                                    console.log(Math.floor(min));
                                    console.log(Math.floor(sec));
                                    $("#ganaste").attr("style", "display: block;");
                                    $("#horaT").text(`${Math.floor(hour)}`);
                                    $("#minutoT").text(`${Math.floor(min)}`);
                                    $("#segundoT").text(`${Math.floor(sec)}`); 
                                    $("#nuevoRecord").text(` ¡Nuevo Record!`);
                                    setTimeout(()=>{
                                        $("#nuevoRecord").text(``);
                                    }, 2000);
                                } else {
                                    $("#nuevoRecord").text(""); 

                                    var hour = mejorTiempo/(60*60*1000);
                                    var min = (hour - Math.floor(hour))*60;
                                    var sec = (min - Math.floor(min))*60;
          
                                    console.log(Math.floor(hour));
                                    console.log(Math.floor(min));
                                    console.log(Math.floor(sec));
                                    $("#ganaste").attr("style", "display: block;");
                                    $("#horaT").text(`${Math.floor(hour)}`);
                                    $("#minutoT").text(`${Math.floor(min)}`);
                                    $("#segundoT").text(`${Math.floor(sec)}`); 
                                    $("#nuevoRecord").text("");
                                }                             
                            }
                            $("#siPar").fadeOut(500,()=>{
                                $("#siPar").attr("style", "display: none;");
                            });
                       },500);
                    }         
                }
                console.log(Cards);
               //console.log(JSON.stringify(Cards));
                //Cookies.set("Arreglo-de-cartas",JSON.stringify(Cards),{expires:3, path:''});
        
                //Fin Objetivo 5.1 DESAFIO 2
       
                $("#cont2 h2").html(`<b>${descripcion}</b>`)
                $("#cont2 #imagen").html(`<img src="${imagenGrande}" style="height: 300px; width: 300px;">`)
                $("#cont3").attr("style","display-block");
                $("#cont3 h1").css({"margin-bottom":"10px"});
                $("#cont3 #lista").attr("style","display-block");
            }).fadeIn(100);
        }//PARTE QUE NECESITA REPARACION 1.
    });

    $("#activar").click(()=>{
        clearInterval(temporizador);
        $("#temporizador").attr("style","display: block");
        $("#horas").text("0");
        $("#minutos").text("00");
        $("#segundos").text("00"); 
        if($("#activar").attr("value") == "Iniciar Partida"){
        let hora=0;
        let minuto=0;
        let segundo=0;
        tiempoPartida = new Date();
        
        temporizador = setInterval(()=>{ 
            
            segundo++;
            console.log(tiempoPartida);

            var contHora = (tiempoPartida.getHours()-tiempoPartida.getHours()) + hora;
            var contMinuto = (tiempoPartida.getMinutes()-tiempoPartida.getMinutes()) + minuto;
            var contSegundo = (tiempoPartida.getSeconds()-tiempoPartida.getSeconds()) + segundo;

            if(segundo > 60){
                segundo = 0;
                minuto++;

                contHora = (tiempoPartida.getHours()-tiempoPartida.getHours()) + hora;
                contMinuto = (tiempoPartida.getMinutes()-tiempoPartida.getMinutes()) + minuto;
                contSegundo = (tiempoPartida.getSeconds()-tiempoPartida.getSeconds()) + segundo; 
            }

            if (minuto > 60){
                minuto = 0;
                hora++;

                contHora = (tiempoPartida.getHours()-tiempoPartida.getHours()) + hora;
                contMinuto = (tiempoPartida.getMinutes()-tiempoPartida.getMinutes()) + minuto;
                contSegundo = (tiempoPartida.getSeconds()-tiempoPartida.getSeconds()) + segundo; 
            }

            if(hora < 10) 
                contHoras = '0' + hora; 

            if(minuto < 10) 
                contMinuto = '0' + minuto; 
            
            if(segundo < 10) 
                contSegundo = '0' + segundo; 

            $("#horas").text(`${contHora}`);
            $("#minutos").text(`${contMinuto}`);
            $("#segundos").text(`${contSegundo}`);      
        },1000);
        }
    });

    $("#activar").click(()=>{
        $("#cont1").slideDown(1000); //Objeto 1 Desafío 2
        $("#contador").text(`${contador}`);
        $("#coverTablero").slideUp(1000,()=>{
            $("#coverTablero").attr("style","display: none");
        });
        if($("#activar").attr("value") == "Volver a empezar"){
            $("#cont3").fadeOut(()=>{
                contCards = 0;
                contador = 0;//Resetea contador
                $("#contador").text(contador);//muestra el nuevo valor de contador en el h1 contador.
                for (i=1;i<9;i++)
                    $(`#contador${i}`).text(""); //Limpia la lista. (Los ciclos for fueron hechos como agregado del desafío 2 aunque no se me pidió explícitamente esto.)
     
                for (i=0; i<8; i++){
                    Cards[i].contador = 0;
                    $(`#contador${i+1}`).text(`${Cards[i].titulo}: ${Cards[i].contador}`); 
                }
    
                $(".cartasVolt").attr("src","./imagenes/volteado.png");
    
                ordenNombres.sort(()=>Math.random() - 0.5);
                for (i=1;i<17;i++){
                    $(`#foto${i}`).attr("title",ordenNombres[i-1]);
                }            
                $("#imagen").empty(); //Borra la imagen.
                $("#descripcion").empty(); //Borra la descripción de la imagen.
                $("#tabla-imagenes img").removeClass("border");
            }).fadeIn(500,()=>{
                $("#coverTablero").attr("style","display: flex");
                $("#coverTablero").slideDown(1000);
                $("#coverTablero").css({"background-color":"aquamarine","border":"1px solid blue","height":"100%","width":"100%"});
                $("#cont1").slideUp(1000);
                $("#activar").attr("value","Iniciar Partida");
            });
        }
        $("#activar").attr("value","Volver a empezar");
    });

    function Cartas(titulo){ //Creando un objeto con función por parámetro (obsoleto)
        this.titulo = titulo;
        this.contador = 0;
    }
});