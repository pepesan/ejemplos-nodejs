Feature: Buscador de post
  Descripción de la feature

  Scenario: Busqueda de testing exitosa
    Given Voy a la pagina principal
    When Escribo "testing" en el buscador y pulso buscar
    Then Encuento el titulo "Search results for: testing"
