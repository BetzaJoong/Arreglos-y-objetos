//_____Arreglo de propiedades_____
const propiedades = [
    {
        nombre: "Casa de campo",
        descripcion: "Un lugar ideal para descansar",
        src: "https://i.pinimg.com/originals/76/ac/20/76ac20901832bee4ce5770399a9fe07b.jpg",
        cuartos: 2,
        metros: 170
    },
    {
        nombre: "Casa de playa",
        descripcion: "Despierta y vive tus vacaciones cerca del océano",
        src: "https://www.arqhys.com/wp-content/fotos/2012/11/Exteriores-de-casas-de-playa.jpg",
        cuartos: 2,
        metros: 130
    },
    {
        nombre: "Casa en el centro",
        descripcion: "Ten cerca de ti la ciudad y todo lo que necesitas",
        src: "https://www.barcelonaenhorasdeoficina.com/wp-content/uploads/2016/10/DSC00685_edited.jpg",
        cuartos: 1,
        metros: 80
    },
    {
        nombre: "Casa rodante",
        descripcion: "Disfruta de un viaje en carretera llevando tu hogar sobre ruedas",
        src: "https://image.jimcdn.com/app/cms/image/transf/none/path/sec66f8b952d41c14/image/ie9d4170750d52809/version/1598902819/image.jpg",
        cuartos: 1,
        metros: 6
    },
    {
        nombre: "Departamento",
        descripcion: "Desde las alturas todo se ve mejor",
        src: "https://cdn.newsapi.com.au/image/v1/0fd3b227fb0185e77cd10dd4adaa1c09?width=650",
        cuartos: 3,
        metros: 200
    },
    {
        nombre: "Mansión",
        descripcion: "Vive una vida lujosa en la mansión de tus sueños",
        src: "https://resizer.glanacion.com/resizer/fhK-tSVag_8UGJjPMgWrspslPoU=/768x0/filters:quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/CUXVMXQE4JD5XIXX4X3PDZAVMY.jpg",
        cuartos: 5,
        metros: 500
    }
];

function crearTemplatePropiedad(propiedad) {   //Toma un objeto de propiedad como argumento y retorna una cadena de texto que representa el HTML necesario para mostrar esa propiedad en la página.
    return `
    <div class="propiedad">
        <h3>${propiedad.nombre}</h3>
        <img src="${propiedad.src}" alt="${propiedad.nombre}">
        <p>${propiedad.descripcion}</p>
        <p>Cuartos: ${propiedad.cuartos}</p>
        <p>Metros cuadrados: ${propiedad.metros}</p>
    </div>
    `;
}


//_____Funcionalidad____
//*-Evento de búsqueda de propiedades-*

document.getElementById('miBoton').addEventListener('click', buscarPropiedades);

let ultimaCantidadCuartos = null;

function buscarPropiedades() {   //Se recorre el arreglo de propiedades y se evalúan los criterios de búsqueda proporcionados por el usuario.
    const cantidadCuartosInput = document.getElementById('cantidadCuartosInput');
    const metrosDesdeInput = document.getElementById('metrosDesdeInput');
    const metrosHastaInput = document.getElementById('metrosHastaInput');

    if (cantidadCuartosInput.value === '' || metrosDesdeInput.value === '' || metrosHastaInput.value === '') {
        alert('No dejes ningún campo vacío');
        return; // Salir de la función si los campos están vacíos
    }

    const cantidadCuartos = parseInt(cantidadCuartosInput.value);
    const metrosDesde = parseInt(metrosDesdeInput.value);
    const metrosHasta = parseInt(metrosHastaInput.value);

    if (cantidadCuartos < 0 || metrosDesde < 0 || metrosHasta < 0) {
        alert('No se aceptan números negativos');
        return;
    }

    if (cantidadCuartos < 1 || cantidadCuartos > 5) {
        alert('Seleccione una cantidad de cuartos del 1 al 5 y vuelve a intentarlo');
        return;
    }

    const propiedadesDiv = document.querySelectorAll('.propiedades .propiedad');
    let propiedadesVisibles = 0;
    let seEncontroPropiedad = false;

    propiedadesDiv.forEach((propiedadDiv) => {  //Se utiliza un ciclo forEach para recorrer los elementos en el arreglo propiedades y asi poder evaluar los criterios de búsqueda.
        const cuartos = parseInt(propiedadDiv.querySelector('.d-flex.justify-content-between p:first-child').textContent.split(':')[1]);
        const metros = parseInt(propiedadDiv.querySelector('.d-flex.justify-content-between p:last-child').textContent.split(':')[1]);

        const cercaCuartos = Math.abs(cuartos - cantidadCuartos) <= 1;
        const cercaMetros = metros >= metrosDesde && metros <= metrosHasta;

        const cambioCantidadCuartos = cantidadCuartos !== ultimaCantidadCuartos;
        const cumpleCuartos = cercaCuartos || (!cambioCantidadCuartos && cuartos === cantidadCuartos);

        if (cumpleCuartos && cercaMetros && !(metros > metrosHasta && cuartos !== cantidadCuartos)) {
            propiedadDiv.style.display = 'block'; //Hace que la busqueda sea visible en la página.
            propiedadesVisibles++;
            seEncontroPropiedad = true;
        } else {
            propiedadDiv.style.display = 'none'; //Hace que la busqueda se oculte en la página.
        }
    });

    ultimaCantidadCuartos = cantidadCuartos;

    const totalPropiedadesElement = document.getElementById('totalPropiedades'); //Total de propiedades visibles
    totalPropiedadesElement.textContent = propiedadesVisibles;

    if (!seEncontroPropiedad) {
        alert('No se encuentra ninguna propiedad que cumpla con los criterios de búsqueda.');
    }
}

//____Reinicio____
var resetButton = document.getElementById('resetButton');

resetButton.addEventListener('click', function () {
    const cantidadCuartosInput = document.getElementById('cantidadCuartosInput');
    const metrosDesdeInput = document.getElementById('metrosDesdeInput');
    const metrosHastaInput = document.getElementById('metrosHastaInput');

    cantidadCuartosInput.value = '';
    metrosDesdeInput.value = '';
    metrosHastaInput.value = '';

    location.reload(); // Recarga la página
});

