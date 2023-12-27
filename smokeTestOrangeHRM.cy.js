describe ("Smoke test OrangeHRM", ()=> {
    
    beforeEach (() => {
        // Se utiliza cy.session para realizar el login solo una vez para todo el conjunto de pruebas y optimizar el tiempo de ejecucion.
        cy.session ("Validar ingreso a URL y Login",() => {
            cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
            cy.get (":nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input").should("be.visible")
            cy.get (":nth-child(2) > .oxd-input-group > .oxd-input-group__label-wrapper > .oxd-label").contains("Username")
            cy.get (":nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input").should("be.visible")
            cy.get (":nth-child(3) > .oxd-input-group > .oxd-input-group__label-wrapper > .oxd-label").contains("Password")
            const username= "Admin"
            const password= "admin123"
            cy.get(":nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input").type(`${username}`)
            cy.get(":nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input").type(`${password}`)
            cy.get(".oxd-button").click()
            cy.url().should("contain","dashboard")
        })
    })

    it ("Visualizar correctamente la pagina principal", ()=> {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
        // Validar header
        cy.get (".oxd-topbar-header").should("be.visible")
        // Validar imagen del logo
        cy.get (".oxd-brand-banner > img").should("be.visible")
        // Validar nombre de usuario
        cy.get (".oxd-userdropdown-name").should("be.visible")
        // Opcion Buscar: Se obtiene el atributo placeholder y se valida que contenga el texto "Search"
        cy.get (".oxd-input").invoke("attr", "placeholder").then(placeholderValue=>{
            cy.log(placeholderValue)})
        cy.get (".oxd-input").should("have.attr","placeholder","Search")
        // Validar menu principal
        cy.get('ul.oxd-main-menu').should('be.visible')
        // Validar scroll 
        cy.scrollTo('bottom', {duration: 2000})
        // Validar elementos del menu
        cy.get(".orangehrm-dashboard-grid").find (".orangehrm-dashboard-widget")
    })

    it ("Visualizar correctamente el menu principal",()=> {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index")
        // Validar que el menu activo sea "Dashboard"
        cy.get('ul.oxd-main-menu').find(".oxd-main-menu-item").filter(".active").should("have.text","Dashboard")
        // Validar que el menu tenga 12 opciones
        cy.get('ul.oxd-main-menu').find(".oxd-main-menu-item").should("have.length", 12)
    })

    it ("Buscar un empleado por nombre", ()=> {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList")
        //Se completa el campo nombre
        cy.get(":nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input").type("Adam")
        // Boton buscar
        cy.get(".oxd-form-actions > .oxd-button--secondary").click()
        // Validar que muestre como resultado los empleados que coincidan con el nombre ingresado
        cy.get(".oxd-table-card > .oxd-table-row").should("contain","Adam")

    })

    it ("Agregar un empleado", function() {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList")
        cy.get(".orangehrm-header-container > .oxd-button").click()
        //Se completan los datos del nuevo empleado
        cy.get(".--name-grouped-field > :nth-child(1) > :nth-child(2) > .oxd-input").type("Rosa")
        cy.get(":nth-child(2) > :nth-child(2) > .oxd-input").type("Carmen")
        cy.get(":nth-child(3) > :nth-child(2) > .oxd-input").type("Graves")
        // Se obtiene el valor de employeeId 
        cy.get('.oxd-grid-item > .oxd-input-group > :nth-child(2) > .oxd-input').invoke("val").as("id")
        // Guardar 
        cy.get(".oxd-button--secondary").click()
    })

    it ("Verificar que se haya creado el nuevo empleado", function() {
        cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList")
        //Se busca el nuevo empleado con el alias guardado en el paso anterior
        cy.get(":nth-child(2) > .oxd-input").type(this.id+"{enter}")
        cy.get(".oxd-table-card > .oxd-table-row > :nth-child(2) > div").should("contain",this.id)
    })


    it("Cerrar sesion", ()=> {
       cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList")
       cy.get(".oxd-userdropdown-tab > .oxd-icon").click()
       cy.get(":nth-child(4) > .oxd-userdropdown-link").click()
       cy.url().should("contain","login")
    }) 
})