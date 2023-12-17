describe('Verificar mi aplicación', () => {

  const numero = Math.floor(Math.random() * 1000000) + 1;

  it('Verificar inicio de sesión con credenciales incorrectas', () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.contains('Sistema de asistencia');
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('correo-inexistente@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.contains('Sistema de asistencia');
      });
    });
  })
  

  it('Verificar inicio de sesión con credenciales correctas', () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.contains('Sistema de asistencia');
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('atorres@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('#saludo').contains('¡Bienvenido(a) Ana Torres!');
        cy.contains('Cerrar sesión').click();
      });
    });
  })

  it('Verificar publicación en foro', () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.contains('Sistema de asistencia');
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('atorres@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('#saludo').contains('¡Bienvenido(a) Ana Torres!');
        cy.get('[ng-reflect-value="foro"]').click();
        cy.get('#titulo').type(`Título de prueba ${numero}`);
        cy.get('#contenido').type(`Contenido de prueba ${numero}`);
        cy.contains('Guardar').click();
        cy.wait(3000);
        cy.contains('Aceptar').click();
        cy.wait(3000);
        cy.contains(`Título de prueba ${numero}`).should('exist');
        cy.contains('Cerrar sesión').click();
      });
    });
  })

    it(`Verificar eliminación en foro de la última publicación con el título que contiene ${numero}`, () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.contains('Sistema de asistencia');
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('atorres@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('1234');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('#saludo').contains('¡Bienvenido(a) Ana Torres!');   
        cy.get('[ng-reflect-value="foro"]').click();
        cy.contains('eliminar').click();
        cy.wait(3000);
        cy.contains('Aceptar').click();
        cy.wait(3000);
        cy.contains(`Título de prueba ${numero}`).should('not.exist');
        cy.contains('Cerrar sesión').click();
      });
    });
  })

  it('Verificar validación y actualización de campos en misdatos', () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.contains('Sistema de asistencia');
      cy.get('#correo').invoke('val', '');
      cy.get('#correo').type('cfuentes@duocuc.cl');
      cy.get('#password').invoke('val', '');
      cy.get('#password').type('asdf');
      cy.contains('Ingresar').click();
      cy.intercept('/inicio').as('route').then(() => {
        cy.get('#saludo').contains('¡Bienvenido(a) Carla Fuentes!');
        cy.get('[ng-reflect-value="misdatos"]').click();
        cy.contains('Actualizar mis datos').click();
        cy.wait(3000);
        cy.get('#nombre').invoke('val', '');
        cy.get('#nombre').type(`María`);
        cy.get('#apellidos').invoke('val', '');
        cy.get('#apellidos').type(`Gonzalez`);
        cy.get('#correo2').invoke('val', '');
        cy.get('#correo2').type(`mgonzales@duocuc.cl`);
        cy.get('#pregunta').invoke('val', '');
        cy.get('#pregunta').type(`¿Color favorito?`);
        cy.get('#respuesta').invoke('val', '');
        cy.get('#respuesta').type(`Morado`);
        cy.get('#password2').invoke('val', '');
        cy.get('#password2').type(`4321`);
        cy.get('#password22').invoke('val', '');
        cy.get('#password22').type(`4321`);
        cy.contains('Actualizar mis datos').click();
        cy.wait(3000);
        cy.contains('Cerrar sesión').click();
      });
    });
  })
});
