import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"
import { Express } from "express"
import path from "path"
import fs from "fs"

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Smoothies API",
      version: "1.0.0",
      description: "REST API for managing smoothies built with Express and Supabase",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Smoothie: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "6f845fbd-c325-4fef-8f53-2dfe08fda109",
            },
            title: {
              type: "string",
              example: "Green Energy Boost",
            },
            method: {
              type: "string",
              example: "Blend all ingredients until smooth.",
            },
            rating: {
              type: "number",
              example: 4.5,
            },
            user_id: {
              type: "string",
              example: "b112a330-67fb-4d59-8d43-ccfe81f5d11e",
            },
            created_at: {
              type: "string",
              format: "date-time",
              example: "2025-05-13T08:00:00Z",
            },
          },
        },
        SmoothieInput: {
          type: "object",
          required: ["title", "method", "rating"],
          properties: {
            title: {
              type: "string",
              example: "Strawberry Banana Shake",
            },
            method: {
              type: "string",
              example: "Add all ingredients to blender. Mix well.",
            },
            rating: {
              type: "number",
              example: 4.0,
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: [path.resolve(__dirname, "../controllers/*.ts")],
}

const swaggerSpec = swaggerJSDoc(options)

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}

fs.writeFileSync("swagger-docs/swagger.json", JSON.stringify(swaggerSpec, null, 2))
