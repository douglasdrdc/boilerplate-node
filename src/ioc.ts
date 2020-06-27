import { Container } from "inversify";
import { coreModule } from "./core/ioc";
import { infraModule } from "./infrastructure/ioc";
import { entrypointModule } from "./entrypoint/ioc";

export const container = new Container({
    autoBindInjectable: true, // Classes são injetadas implicitamente
    defaultScope: "Request", // Escopo de vida da classe é por requisição
    skipBaseClassChecks: true, // Classe pai não é validada durante a injeção
});

container.load(
    coreModule, infraModule, entrypointModule,
);