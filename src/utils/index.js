exports.messages = require("./messages")
exports.pagination = async (Model, conditions, search = "", search_fields = "", page = 1, limit = 10, sort_by = 'created_on', sort_dir = 'DESC') => {
    page = Number(page);
    limit = Number(limit);
    let data = Model.where(conditions).withGraphFetched(populate).orderBy(sort_by, sort_dir).page(page > 0 ? page - 1 : 0, limit);
    search_fields = search_fields.split(",")
    if (search_fields.length > 0 && search) {
      data = data.where(search_fields[0], 'like', `%${search}%`)
      if (search_fields.length > 1) {
        const [, ...rest] = search_fields;
        for (const field of rest) {
          data = data.orWhere(field, 'like', `%${search}%`)
        }
      }
    }
    data = await data;
    return { results: data.results, page_info: { page, limit, total: data.total, total_pages: Math.ceil(Number(data.total) / Number(limit)) } };
  }