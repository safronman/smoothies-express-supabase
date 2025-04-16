// import { VercelRequest, VercelResponse } from "@vercel/node"
//
// export function withCors(handler: (req: VercelRequest, res: VercelResponse) => Promise<VercelResponse | undefined>) {
//   return async (req: VercelRequest, res: VercelResponse) => {
//     console.log("CORS middleware active", req.method, req.headers.origin)
//
//     // Разрешаем запросы с указанных доменов
//     const allowedOrigins = ["http://localhost:3000", "https://smoothies-back.vercel.app"]
//     const origin = req.headers.origin || ""
//
//     if (allowedOrigins.includes(origin)) {
//       res.setHeader("Access-Control-Allow-Origin", origin)
//     }
//
//     // Разрешаем необходимые методы и заголовки
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type")
//
//     // Обработка предварительного запроса (OPTIONS)
//     if (req.method === "OPTIONS") {
//       return res.status(200).end()
//     }
//
//     // Вызов основного обработчика
//     return handler(req, res)
//   }
// }
