describe("Test básico de componentes", () => {
  beforeEach(() => {
    cy.visit("/ipsa-chile-2025/");
  });

  it("Debería cargar el gráfico correctamente", () => {
    cy.get("canvas").should("be.visible");

    cy.get("p.uk-text-muted").should("not.exist"); // No debe existir el mensaje de "Cargando datos..."
    cy.get("p.uk-text-danger").should("not.exist"); // No debe existir un mensaje de error
  });

  it("Debería cambiar el timeframe al hacer clic en un botón", () => {
    cy.get(".btnTime").as("timeframeButton");

    cy.get("@timeframeButton").should("have.length", 4);

    cy.get("@timeframeButton").first().click();
    cy.get("@timeframeButton").first().should("have.class", "uk-active");
  });

  // it("Debería mostrar los instrumentos correctamente en la tabla", () => {
  //   cy.get("table tbody tr").should("have.length.greaterThan", 0);

  //   cy.get("th").contains("↑↓Nombre").should("be.visible");
  //   cy.get("th").contains("↑↓Último*").should("be.visible");
  //   cy.get("th").contains("↑↓Monto").should("be.visible");
  // });
});
