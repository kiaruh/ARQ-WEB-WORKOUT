## Trabajo Práctico Arquitectura Web 2021

---

<br>

#### ESTUDIANTE
- Qiyin Li


<br>

#### Descripción del negocio
Sistema de gestión de ventas para negocios que trabajan con comisiones en el cuál se podrán cargar vendedores, productos y ventas y luego se calcularán automáticamente las comisiones.

Principales funciones:
- Crear, eliminar y modificar vendedores usuarios
- Crear, eliminar y modificar productos entrenamientos
- Obtener comisiones de un vendedor 
- Reportes mensuales de comisiones

<br>

#### Endpoints
|Método|Endpoint|Body|Status|
|---|---|---|---|
|GET|/users|N/A|Done
|GET|/users/:id|N/A|Done
|POST|/users|{ email, firstName, lastName, document, role }|Done
|PUT|/users/:id|{ email, firstName, lastName, document, role }|Done
|PATCH|/users/:id|{ email, firstName, lastName, document, role }|Done
|DELETE|/users/:id|N/A|Done
|GET|/sales|N/A|Done
|GET|/sales/:id|N/A|Done
|GET|/sales/user/:id?from_date="2021-06-06"&to_date="2021-06-06"|N/A|Done
|GET|/sales/product/:id?from_date="2021-06-06"&to_date="2021-06-06"|N/A|Done
|GET|/sales?from_date="2021-06-06"&to_date="2021-06-06"|N/A|Done
|GET|/sales/user/:id/comissions?from_date="2021-06-06"&to_date="2021-06-06"|N/A|Done
|POST|/sales|{ products: [{ id, price }], userId, date, totalPrice }|Done
|PUT|/sales/:id|{ products: [{ id, price }], userId, date, totalPrice }|Done
|PATCH|/sales/:id|{ products: [{ id, price }], userId, date, totalPrice }|Done
|DELETE|/sales/:id|N/A|Done
|GET|/products|N/A|Done
|GET|/products/:id|N/A|Done
|POST|/products|{ name, description, price }|Done
|PUT|/products/:id|{ name, description, price }|Done
|PATCH|/products/:id|{ name, description, price }|Done
|DELETE|/products/:id|N/A|Done