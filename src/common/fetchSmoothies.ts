import { supabase } from "./supabaseClient"

type FetchSmoothiesParams = {
  userId?: string
  page?: string
  limit?: string
  search?: string
}

export const fetchSmoothies = async ({ userId, page = "1", limit = "10", search = "" }: FetchSmoothiesParams) => {
  const pageNumber = parseInt(page, 10)
  const limitNumber = parseInt(limit, 10)
  const from = (pageNumber - 1) * limitNumber
  const to = from + limitNumber - 1

  let query = supabase
    .from("smoothies")
    .select("*", { count: "exact" })
    .order("id", { ascending: false })
    .range(from, to)

  if (userId) {
    query = query.eq("user_id", userId)
  }

  if (search) {
    query = query.ilike("title", `%${search}%`)
  }

  return await query
}
