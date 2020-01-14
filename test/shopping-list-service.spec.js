const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe(`Shopping list service object`,function(){
    let db 
    let testItems = [
        {
            id: 1,
            name: 'fish sticks',
            price: "10.10", //without "" the actual is a string and expected is numeric so doesnt pass test. why?
            category: 'Main',
            checked: false,
            date_added: new Date('2029-01-22T16:28:32.615Z')
        },
        {
            id: 2,
            name: 'hot dogs',
            price: "15.14",
            category: 'Snack',
            checked: false,
            date_added: new Date('2029-01-22T16:28:32.615Z')
        },
        {
            id: 3,
            name: 'Pizza',
            price: "12.12",
            category: 'Lunch',
            checked: true,
            date_added: new Date('2029-01-22T16:28:32.615Z')
        }
    ]

    before(()=>{
        db = knex({
            client:'pg',
            connection: process.env.SHOPPING_TEST_DB_URL,
        })
    })

    before(()=>db('shopping_list').truncate())

    this.afterEach(()=>db('shopping_list').truncate())

    after(()=>db.destroy())

    context(`given 'shopping_list' has data`,()=>{
        beforeEach(()=>{
            return db   
                .into('shopping_list')
                .insert(testItems)
        })

        it(`getAllArticles() resolves all articles from 'shopping_list' table`,()=>{
            return ShoppingListService.getAllItems(db)
                .then(actual=>{
                    expect(actual).to.eql(testItems)
                })
        })

        it(`getById() resolves an article by id from 'shopping_list' table`,()=>{
            const thirdId = 3
            const thirdTestItem = testItems[thirdId-1]
            return ShoppingListService.getById(db,thirdId)
                .then(actual=>{
                    expect(actual).to.eql({
                        id:thirdId,
                        name:thirdTestItem.name,
                        price:thirdTestItem.price,
                        category:thirdTestItem.category,
                        checked:thirdTestItem.checked,
                        date_added:thirdTestItem.date_added
                    })
                })
        })

        it(`deleteItem() removes an article by id from 'shopping_list' table`,()=>{
            const itemId=3
            return ShoppingListService.deleteItem(db,itemId)
                .then(()=>ShoppingListService.getAllItems(db))
                .then(allItems=>{
                    const expected = testItems.filter(item=>item.id !== itemId)
                    expect(allItems).to.eql(expected)
                })
        })

        it(`updateItem() updates an article from the 'shopping_list' table`,()=>{
            const idOfItemToUpdate=3
            const newItemData={
                name:'updated title',
                price:'5.00',
                category: 'Lunch',
                checked: true,
                date_added: new Date('2029-01-22T16:28:32.615Z')
            }
            return ShoppingListService.updateItem(db,idOfItemToUpdate,newItemData)
                .then(()=>ShoppingListService.getById(db,idOfItemToUpdate))
                .then(item=>{
                    expect(item).to.eql({
                        id:idOfItemToUpdate,
                        ...newItemData
                    })
                })
        })
    })

    context(`Given 'shopping_list' has no data`,()=>{
        it(`getAllItems() resolves an empty array`,()=>{
            return ShoppingListService.getAllItems(db)
                .then(actual=>{
                    expect(actual).to.eql([])
                })
        })

        it(`insertItem() inserts a new article and resolves the new article with an 'id'`,()=>{
            const newItem = {
                name: 'new name',
                price: "5.10",
                category: 'Lunch',
                checked: true,
                date_added: new Date('2029-01-22T16:28:32.615Z')
            }
            return ShoppingListService.insertItem(db,newItem)
                .then(actual=>{
                    expect(actual).to.eql({
                        id:1,
                        name: newItem.name,
                        price: newItem.price,
                        category: newItem.category,
                        checked: newItem.checked,
                        date_added: newItem.date_added
                    })
                })
        })

    })
})