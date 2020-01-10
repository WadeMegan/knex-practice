require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
  })
  
console.log('knex and driver installed correctly');

//drill 1 - get all items that contain text

function searchByTerm(searchTerm){
    knexInstance.from('shopping_list')
      .select('name','price','category','checked','date_added')
      .where('name','ILIKE',`%${searchTerm}%`)
      .then(result=>{
        console.log(result)
      })
  }

//searchByTerm('fish')

//drill 2 - get all items paginated

function paginateProducts(page){
    const productsPerPage = 6
    const offset = productsPerPage*(page-1)
    knexInstance  
      .select('name','price','category','checked','date_added')
      .from('shopping_list')
      .limit(productsPerPage)
      .offset(offset)
      .then(result=>{
        console.log(result)
      })
  }
  
//paginateProducts(2)

//drill 3 - get all items added after date

function searchByDaysAgo(daysAgo){
    knexInstance    
        .select('name','date_added')
        .from('shopping_list')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
        )
        .then(result=>{
            console.log(result)
        })
}

//searchByDaysAgo(10)

//drill 4 - get the total cost for each category 

function getTotalCost(){
    knexInstance
        .select('category')
        .from('shopping_list')
        .sum('price AS total')
        .groupBy('category')
        .then(result=>{
            console.log(result)
        })
}

getTotalCost()

