# Documentación del Sistema (Re-documentación e Ingeniería Inversa)

Esta carpeta contiene todos los artefactos generados como parte del esfuerzo de re-documentación e ingeniería inversa del proyecto, estructurados de acuerdo con las directrices del SWEBOK v4.

El propósito de esta documentación es establecer una línea base sólida (Software Configuration Items - SCI) para habilitar de forma segura las futuras fases de mantenimiento y evolución del sistema.

## Índice de Artefactos (SCIs)

La documentación está dividida en cuatro áreas principales de acuerdo a las preocupaciones del ciclo de vida del software:

### [01. Requisitos (Requirements)](./01_Requirements/)
Captura las necesidades del negocio y las restricciones impuestas por la tecnología elegida.
- 📄 [Requisitos Funcionales](./01_Requirements/functional_requirements.md)
- 📄 [Requisitos No Funcionales](./01_Requirements/non_functional_requirements.md)

### [02. Arquitectura (Architecture)](./02_Architecture/)
Describe las decisiones de diseño de alto nivel, los componentes estructurales a nivel macro y cómo se despliegan.
- 📄 [Descripción de la Arquitectura](./02_Architecture/architecture_description.md)
- 📄 [Vistas y Puntos de Vista](./02_Architecture/views_and_viewpoints.md)
- 📄 [Decisiones Arquitectónicas (ADRs)](./02_Architecture/architecture_decisions.md)

### [03. Diseño (Design)](./03_Design/)
Detalla la estructura interna del software (clases, entidades) y cómo interactúan (comportamiento dinámico) para cumplir con los requisitos funcionales.
- 📄 [Diseño Estructural (Modelos Estáticos)](./03_Design/structural_design.md)
- 📄 [Diseño de Comportamiento (Modelos Dinámicos)](./03_Design/behavioral_design.md)

### [04. Operaciones y Mantenimiento (Operations and Maintenance)](./04_Operations_and_Maintenance/)
Provee las guías prácticas para instalar, operar, comprender el código y solucionar problemas sin violar los principios arquitectónicos establecidos.
- 📄 [Guía de Instalación y Configuración](./04_Operations_and_Maintenance/installation_and_setup.md)
- 📄 [Guía de Mantenimiento](./04_Operations_and_Maintenance/maintenance_guide.md)

---
*Documentación generada mediante análisis estático de código e ingeniería inversa.*