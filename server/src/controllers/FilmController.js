import db from "../models/index.js";
import { Op } from "sequelize";
const { Film, Language, Category, FilmCategory, Actor } = db;

class FilmController {
  async getAllFilms(req, res) {
    try {
      // console.log("Fetching films with query:", req.query);
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      // Sorting
      let sortBy = req.query.sortBy || "title";
      let sortOrder = req.query.sortOrder === "desc" ? "DESC" : "ASC";
      const sortFieldMap = {
        title: "title",
        release_year: "release_year",
        language: "language_id",
        length: "length",
        rating: "rating",
      };
      if (!Object.keys(sortFieldMap).includes(sortBy)) sortBy = "title";

      // Filtering
      const where = {};
      const include = [{ model: Language, as: "language" }];

      // through this method we can add those properties which are available
      // const where = {
      //   ...(req.query.language) && {language_id : req.query.language}
      // };

      // Language filter
      if (req.query.language) {
        where.language_id = req.query.language;
      }
      // Release year filter
      if (req.query.release_year) {
        where.release_year = req.query.release_year;
      }
      // Length filter (with operator)
      if (req.query.length && req.query.lengthOp) {
        where.length = { [Op[req.query.lengthOp]]: req.query.length };
      }

      // Category filter
      if (req.query.category) {
        include.push({
          model: Category,
          as: "categories",
          where: { category_id: req.query.category },
          through: { attributes: [] },
          required: true,
        });
      }
      // Actor filter
      if (req.query.actor) {
        include.push({
          association: "actors", // Include the association named actors from the Film model.
          where: { actor_id: req.query.actor },
          through: { attributes: [] },
          required: true,
        });
      }
      // console.log("Where clause:", where);

      const { count, rows: films } = await Film.findAndCountAll({
        where,
        include,
        offset,
        limit,
        order: [[sortFieldMap[sortBy], sortOrder]],
        distinct: true,
      });

      return res.status(200).json({
        success: true,
        message: "Films fetched successfully",
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalCount: count,
        data: films,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch films",
        error: error.message,
      });
    }
  }

  async getAllLanguages(req, res) {
    try {
      const languages = await Language.findAll();

      return res.status(200).json({
        success: true,
        message: "Languages fetched successfully",
        count: languages.length,
        data: languages,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch languages",
        error: error.message,
      });
    }
  }

  async getAllCategories(req, res) {
    try {
      const categories = await Category.findAll();

      return res.status(200).json({
        success: true,
        message: "Categories fetched successfully",
        count: categories.length,
        data: categories,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch categories",
        error: error.message,
      });
    }
  }

  async getAllActors(req, res) {
    try {
      // const [results] = await db.sequelize.query(
      //   `SELECT actor_id, first_name, last_name FROM actor`
      // );
      const actors = await Actor.findAll();
      res.json({ success: true, data: actors });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch actors",
        error: error.message,
      });
    }
  }

  // on click show respective film casts
  async getFilmActors(req, res) {
    try {
      const filmId = req.params.filmId;
      const [results] = await db.sequelize.query(
        `SELECT a.actor_id, a.first_name, a.last_name
             FROM actor a
             JOIN film_actor fa ON a.actor_id = fa.actor_id
             WHERE fa.film_id = ?`,
        { replacements: [filmId] }
      );
      res.json({ success: true, data: results });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch actors",
        error: error.message,
      });
    }
  }

  // async getAllFilmCategories(req, res) {
  //   try {
  //     const filmCategories = await FilmCategory.findAll({
  //       include: [
  //         { model: Film, as: "film" },
  //         { model: Category, as: "category" },
  //       ],
  //     });

  //     return res.status(200).json({
  //       success: true,
  //       message: "Film categories fetched successfully",
  //       count: filmCategories.length,
  //       data: filmCategories,
  //     });
  //   } catch (error) {
  //     return res.status(500).json({
  //       success: false,
  //       message: "Failed to fetch film categories",
  //       error: error.message,
  //     });
  //   }
  // }
}

export default new FilmController();
