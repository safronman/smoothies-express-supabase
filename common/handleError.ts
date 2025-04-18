export const handleError = (res: any, error: any) => {
  console.error(error)
  return res.status(500).json({ error: error.message || "Internal server error" })
}
