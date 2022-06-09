# Backend: listado de endpoints

### [POST] /users/login ✅

- endpoint abierto
- para iniciar sesión

### [POST] /users/register ✅

- endpoint abierto
- para crear un usuario

### [GET] /users/profile ✅

- endpoint cerrado, solo usuario con sesión iniciada
- para ver el perfil del usuario

### [GET] /establishments/?limit=10&page=0 ✅

- endpoint abierto
- para ver un listado de establecimientos paginados

### [GET] /establishments/:idEstablishment ✅

- endpoint abierto
- para ver un establecimiento

### [POST] /establishments 🍊

- endpoint cerrado, solo usuario con sesión iniciada
- para añadir establecimientos

### [DELETE] /establishments/:idEstablishment ✅

- endpoint cerrado, solo usuario con sesión iniciada
- para borrar un establecimiento

### [PUT] /establishments/:idEstablishment

- endpoint cerrado, solo usuario con sesión iniciada
- para editar un establecimiento
