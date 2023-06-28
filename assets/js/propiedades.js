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

function crearTemplatePropiedad(propiedad) {
    return `
    <div class="propiedad">
        <div class="img" style="background-image: url('${propiedad.src}')"></div>
        <section>
            <h5>${propiedad.nombre}</h5>
            <div class="d-flex justify-content-between">
                <p>Cuartos: ${propiedad.cuartos}</p>
                <p>Metros: ${propiedad.metros}</p>
            </div>
            <p class="my-3">${propiedad.descripcion}</p>
            <button class="btn btn-info">Ver más</button>
        </section>
    </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    const propiedadesDiv = document.querySelector('.propiedades');
    const totalPropiedadesElement = document.getElementById('totalPropiedades');

    propiedades.forEach((propiedad) => {
        const propiedadHTML = crearTemplatePropiedad(propiedad);
        propiedadesDiv.insertAdjacentHTML('beforeend', propiedadHTML);
    });

    totalPropiedadesElement.textContent = propiedades.length;
});

document.getElementById('miBoton').addEventListener('click', buscarPropiedades);

let ultimaCantidadCuartos = null;

function buscarPropiedades() {
    const cantidadCuartosInput = document.getElementById('cantidadCuartosInput');
    const metrosDesdeInput = document.getElementById('metrosDesdeInput');
    const metrosHastaInput = document.getElementById('metrosHastaInput');

    if (cantidadCuartosInput.value === '' || metrosDesdeInput.value === '' || metrosHastaInput.value === '') {
        alert('No dejes ningún campo vacío');
        return;
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
    let totalPropiedades = propiedades.length; // Número total de propiedades inicialmente

    propiedadesDiv.forEach((propiedadDiv) => {
        const cuartos = parseInt(propiedadDiv.querySelector('.d-flex.justify-content-between p:first-child').textContent.split(':')[1]);
        const metros = parseInt(propiedadDiv.querySelector('.d-flex.justify-content-between p:last-child').textContent.split(':')[1]);

        const cercaCuartos = Math.abs(cuartos - cantidadCuartos) <= 1;
        const cercaMetros = metros >= metrosDesde && metros <= metrosHasta;

        const cambioCantidadCuartos = cantidadCuartos !== ultimaCantidadCuartos;

        if (cercaCuartos && cercaMetros) { //muestra y oculta propiedades
            propiedadDiv.style.display = 'block';
            seEncontroPropiedad = true;
            propiedadesVisibles++;
        } else {
            propiedadDiv.style.display = 'none';
        }

        if (cambioCantidadCuartos) {
            ultimaCantidadCuartos = cantidadCuartos;
        }
    });

    totalPropiedades = propiedadesVisibles; // Actualizar el número total de propiedades encontradas

    if (!seEncontroPropiedad) {
        alert('No se encontraron propiedades con los criterios seleccionados');
    }

    const totalPropiedadesElement = document.getElementById('totalPropiedades');
    totalPropiedadesElement.textContent = totalPropiedades; // Actualizar el contenido de "Total" con el valor actualizado
}

document.getElementById('resetButton').addEventListener('click', reiniciarFiltros);

function reiniciarFiltros() {
    const cantidadCuartosInput = document.getElementById('cantidadCuartosInput');
    const metrosDesdeInput = document.getElementById('metrosDesdeInput');
    const metrosHastaInput = document.getElementById('metrosHastaInput');

    cantidadCuartosInput.value = '';
    metrosDesdeInput.value = '';
    metrosHastaInput.value = '';

    const propiedadesDiv = document.querySelectorAll('.propiedades .propiedad');

    propiedadesDiv.forEach((propiedadDiv) => {
        propiedadDiv.style.display = 'block';
    });

    const totalPropiedadesElement = document.getElementById('totalPropiedades');
    totalPropiedadesElement.textContent = propiedades.length;
    ultimaCantidadCuartos = null;
}
