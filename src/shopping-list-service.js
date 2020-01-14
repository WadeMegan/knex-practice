const ShoppingListService = {
    getAllItems(knex){ //why is this called knex and not db
        return knex.select('*').from('shopping_list')
    },
    getById(knex,id){
        return knex.from('shopping_list').select('*').where('id',id).first() //what does first do
    },
    deleteItem(knex,id){
        return knex('shopping_list')
            .where({id})
            .delete()
    },
    updateItem(knex,id,newItemFields){
        return knex('shopping_list')
            .where({id})
            .update(newItemFields)
    },
    insertItem(knex,newItem){
        return knex 
            .insert(newItem)
            .into('shopping_list')
            .returning('*')
            .then(rows=>{
                return rows[0]
            })
    }
}

module.exports=ShoppingListService