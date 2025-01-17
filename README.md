# Documentación del Proyecto Search App

Aplicación de busqueda de usuarios, con features avanzadas para filtrado de resultados, pre fetching de los resultados, caching de los resultados para mejor UI/UX, el proyecto contiene habilitados shortcuts para mejor accesibilidad, la UI es responsive para bridar la misma experiencia en todos los dispositivos, y tiene soporte de tema clar y oscuro. El flujo de la app es sencillo, hablamos de un home con 1 toggle para realizar el cambio de color del tema, y botón para abrir un componente tipo modal o dialog y realizar la búsqueda de los ususrios en él, otra forma de abrir el modal es con el shortcut:

- `cmd + k` en Mac  

- `ctrl + k` en Windows y Linux. 

Dentro del modal conseguimos, un buscador, una sección de filtros colapsables, una sección para mostrar el resultado de la búsqueda, que mide 35vh y debajo de esa sección conseguimos un área reservada para mostrar los detalles de los usuarios selccionados, podmeos navegar usando las teclas de flechas arriba y flechas abajo, hay varias formas de cerrar el modal, una es precionando la tecla `Esc`, otra es haciendo click en el botón con el icono de `X` que esta en la parte externa, superior derecha del modal, o por ultimo, en caso de que el usuario visite el sitio en un dispositivo móvil o que simplemente no quiera hacer uso de las 2 alternativas anteriores en desktop, se puede hacer click en cualquier sitio externo al componente del modal. En caso de que ocurra algún error, el modal tiene como wraper un ErrorBoundary con la finalidad de mitigar posibles errores

Para la realización dl proyecto se implemento el siguiente Stack:
- React 18
  - Vite
  - Bun
  - Eslint
  - Pretier
- TypeScript
- Tailwind
- RadixUI
- React Query
- Axios
- Zustand
- randomuser.me API

## Arquitectura del proyecto

- *SearchModal* es el componente más importante de la aplicación, ya que es acá donde se ejecuta la tarea principal de la app, que es la busqueda de los usuarios, y este componente alberga dentro de él, gran parte de los compoentes de la app, siendo envuelto en un ErrorBoundary para un mejor manejos de posibles errores de render, y dentro del modal se puede destacar el uso de `useSearchModal` que es un custom hook donde se implemente el manejo sencillo de estados usando Zustand. El componente hace uso de `React Query` para la implementación del fetch de la data, así como el hook `useDebounce` para efectuar la busqueda como tal de manejar los resultados de la misma. El componente también maneja de forma exitosa la gestión de los estados de search query, selected user, active index para mejor accesibilidad y navegar los por resultados de la búsqueda con las flechas del teclado, y por último filter settings el formulario implementa features de accesibilidad asegurando el uso de atributos y roles ARIA, que le permiten al usuario navegar por los resultados de la búsqueda, sin el uso del mouse.
  - También tenemos `SearchForm` que en la escala de importancia, es igual de significativo que el SearchModal, porque dentro de ese componente tenemos 3 secciones principales, cada una de ellas en un archivo diferente, tenemos un search input con filtros avanzados, para mostrar resultados por género, edad, correo, en tiempo real, gracias a la implementación de `useMemo` para procesar de manera efectiva la data de la API, . La sección de resultados de la búsqueda, que se trabaja en otro file, y es basucamente una lista de items que devuelve img del usuario, nombre y correo, esta sección maneja varios estados, loading mientras se efectúa la búsqueda, error, y por último, empty results, lo que le genera una mejor sensación de búsqueda al usuario, ya que el usuario esta consciente de cada posible estado de su búsqueda, de una forma amigable y sencilla. por último, tenemos el área de user details, que se muestra solo cuando el usuario hace click en cualqueira de los item de su búsqueda, y de esa forma brinda una sensación de búsqueda mas completa.
- *ErrorBoundary* es nu componente que extiende la clase de React.Component y esta siendo usado para definir estados y props pertenecientes a errores, usando un `interface` para definir la estructura del Props (children) y State (error y hasError), sonde se usan 2 metodos claves para el ciclo de vida del compoente, como lo es `getDerivedStateFromError`, que cashea los errores durante el renderizado y por último, `componentDidCatch` para hacer logging de los errores en la consola. En térmisnos de UI, cuando ocurre un error, este componente muestra un mensaje de error amigable con el usuario, dando la opción de refresar la página al usuario y extenddiendo los estilos previamente definidos en tailwind.

## Decisiones de diseño y escalabilidad

### UX/UI y desiciones de diseño

La inspiracio2n detrás del diseño de la app viene por el uso que se le da a Algolia dentro de la mayoria de los sitios de documentación técnica dentro de la industria, la aplicacioen dentro de ese repositorio es similar, tenemos una busqueda que se dispara por un comando o al hacer click en un botón mínimo en la UI, que le permite a la app funcionar y agregar mas features, sin que estas otras se vean afectadas por lo que el modal de búsqueda ocupa en pantalla, así mismo como Algolia, una función extra que no se le agregó al buscador pero que se consideró agregar, fue el abrir una nueva page al hacer click en el item de la lista de resultados, y esa nueva view, tendría todos los datos del user en cuestión, esa idea fue simplificada a la que se terminó de implementar en la app, en terminos de UX, tenemos la posibilidad de cambiar el tema del sitio al hacer click en un simple toggle, tenemos la posibilidad de usar el teclado para navegar más rapidamente a lo largo de la app, existiendo navegación por las flechas del teclado, cierre del modal con la tecla Esc, la apertura del modal usando cmd + k.

### Escalablidad y mantenimiento

La arquitectura de la aplicación muestra un buen potencial de escalado, con componentes modulares y una clara separación de preocupaciones. El uso de React Query para la gestión de datos proporciona capacidades integradas de almacenamiento en caché y sincronización, mientras que la implementación de ErrorBoundary ofrece una base sólida para la gestión de errores. El patrón de composición de componentes utilizado en la funcionalidad de búsqueda permite una fácil extensión y modificación. La idea de sustituir el mock de data desde un json, vino por 2 motivos, tiempo, y la implementación de un caso de uso real.
- Tiempo, me salía mas productivo conectarme a una API pubica que me diera la información de usuarios random que la creación de una estructura json que me permita hacer lo mismo, y luego inventar toda la data para tener varios usaers y para mejor entendimiento del funcionamiento de la busqueda y su filtrado
- En el caso de implementar algo más alineado a la realidad, pues es más común el conectarse a una API pública que usar un mock desde un json, esto demuestra mi capacidad para poder conectarme a una API con +1000 objects en su respuesta y manejarlo sin problema, y sun afectar la UX de la app







