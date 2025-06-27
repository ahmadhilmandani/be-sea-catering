const connectDb = require('../config/db.js')

const getFoodMenuRepo = async (getLimit, dietType) => {
  const connection = await connectDb()

  try {

    let sql_statement_food_menu = `
      SELECT
        fm.id_food_menu,
        fm.id_diet_type,
        fm.name AS food_menu_name,
        fm.price,
        fm.description,
        fm.recomended_for,
        fm.created_at,
        dt.name AS diet_type_name,
        dt.description
      FROM
        food_menu AS fm
      INNER JOIN
        diet_type AS dt
      ON
        fm.id_diet_type = dt.id_diet_type
    `

    let sqlParams = []
    if (dietType) {
      sql_statement_food_menu = sql_statement_food_menu + ' WHERE fm.id_diet_type = ?'
      sqlParams.push(dietType)
    }
    if (getLimit) {
      sql_statement_food_menu = sql_statement_food_menu + ' LIMIT ? '
      sqlParams.push(getLimit)
    }

    const foodMenu = await connection.execute(sql_statement_food_menu, sqlParams)

    if (foodMenu[0].length > 0) {
      let sql_statement_nutritions = `
        SELECT
          n.id_nutrition,
          n.name,
          n.value,
          n.unit
        FROM
          nutritions AS n
        WHErE
          n.id_food_menu = ?
      `

      let res = []

      for (let index = 0; index < foodMenu[0].length; index++) {
        res.push({
          title: foodMenu[0][index].food_menu_name,
          price: foodMenu[0][index].price,
          desciption: foodMenu[0][index].description,
          diet: foodMenu[0][index].diet_type_name,
          nutrition: [],
        })
        
        const getNutritions = await connection.execute(sql_statement_nutritions, [foodMenu[0][index].id_food_menu])

        for (let indexNutritions = 0; indexNutritions < getNutritions[0].length; indexNutritions++) {
          res[index].nutrition.push(
            {
              id_nutrition: getNutritions[0][indexNutritions].id_nutrition,
              name: getNutritions[0][indexNutritions].name,
              value: getNutritions[0][indexNutritions].value,
              unit: getNutritions[0][indexNutritions].unit,
            }
          )
        }
      }
      return res
    }
    return []
  } catch (error) {
    throw new Error(error)
  }
}


module.exports = { getFoodMenuRepo }