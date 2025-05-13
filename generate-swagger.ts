import fs from "fs"
import { swaggerSpec } from "./src/docs/swagger"

fs.writeFileSync("./swagger-docs/swagger.json", JSON.stringify(swaggerSpec, null, 2))
console.log("Swagger JSON generated at ./swagger-docs/swagger.json")
