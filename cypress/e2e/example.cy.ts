describe("Test básico de componentes", () => {
  beforeEach(() => {
    cy.visit("/");
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

  it("Debería mostrar los valores correctamente en el encabezado", () => {
    cy.get(".presentValue").should("exist");

    cy.get("span.uk-text-success").should("exist");
    cy.get("span.uk-text-danger").should("exist");
  });

  it("Debería mostrar los instrumentos correctamente en la tabla", () => {
    cy.get("table tbody tr").should("have.length.greaterThan", 0);

    cy.get("th").contains("↑↓Nombre").should("be.visible");
    cy.get("th").contains("↑↓Último*").should("be.visible");
    cy.get("th").contains("↑↓Monto").should("be.visible");
  });

  it("Debería permitir ordenar los datos de la tabla por nombre", () => {
    cy.get("th").contains("↑↓Nombre").click();

    cy.get("tr").first().contains("Instrumento A");
  });
});
