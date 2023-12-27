# OrangeHRM

### 💻Proyecto: 
https://opensource-demo.orangehrmlive.com/web/index.php/auth/login

OrangeHRM es una herramienta diseñada para el área de Recursos Humanos, con el objetivo de facilitar las tareas relacionadas con el control, gestión y administración de los colaboradores de las empresas.

### 🔍Tipo de testing:
* Smoke test

### ⚙ Herramientas utilizadas:
* Cypress
  
### 📁 Contenido:
<a href="https://github.com/marilinasc/OrangeHRM/blob/main/smokeTestOrangeHRM.cy.js"> Archivo E2E Testing </a>

* Precondicion (beforeEach): el usuario debe estar logueado.

<table>
  <tr>
    <th>Escenario de prueba</th>
    <th>Resultado esperado</th>
  </tr>
  <tr>
    <td>Ingresar a la pagina principal</td>
    <td>Debería visualizarse correctamente los elementos como: header, logo, user, search, main menu, permitir hacer scroll y validar que la pagina cargue correctamente su contenido</td>
  </tr>
  <tr>
    <td>Visualizar el menu principal</td>
    <td> Deberia tener 12 opciones y estar activo el menu "dashboard"</td>
  </tr>
  <tr>
    <td>Ingresar al menu "PIM" y buscar un empleado filtrando por el campo nombre </td>
    <td>Deberia arrojar como resultado los empleados que coincidan con el nombre ingresado</td>
  </tr>
  <tr>
    <td>Ingresar al menu "PIM" y agregar un nuevo empleado</td>
    <td>Deberia dar de alta el empleado correctamente y visualizarse en la lista de empleados activos</td>
  </tr>
  <tr>
    <td>Cerrar Sesion (Logout)</td>
    <td>Debería cerrar sesion correctamente y redireccionar a la pagina de Login</td>
  </tr>
  
</table>

### 📊 Reporte: 
<a href="https://github.com/marilinasc/OrangeHRM/tree/main/reports/html"> Smoke test OrangeHRM Report </a>

<img src="/OrangeHRM-Report.PNG"/> 
