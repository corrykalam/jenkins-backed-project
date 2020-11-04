const database = require("../Config/Databases")
const Product = {}

Product.GetAll = () => {
    return new Promise((resolve, reject) => {
        database
            .query("SELECT p.id, p.name, p.image, p.price, c.category FROM product p INNER JOIN category c ON c.id = p.category;")
            .then((res) => {
                resolve(res.rows)
            })
            .catch((err) => {
                reject(err)
            })
    })
}
Product.Detail = (id) => {
    return new Promise((resolve, reject) => {
        database
            .query(`SELECT * FROM product WHERE id=${id};`)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
    })
}

Product.Add = (name, image, price, category) => {
    return new Promise((resolve, reject) => {
        database.query(`INSERT INTO product (name, image, price, category) VALUES ('${name}', '${image}', ${price}, '${category}')`)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

Product.Edit = (id, name, image, price, category) => {
    return new Promise((resolve, reject) => {
        database.query(`UPDATE public.product SET name='${name}', image='${image}', price=${price}, category='${category}' WHERE id=${id};`)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

Product.Delete = (id) => {
    return new Promise((resolve, reject) => {
        database.query(`DELETE FROM product WHERE id=${id};`)
            .then(res => resolve(res))
            .catch(err => reject(err))
    })
}

Product.Search = (name, sensitive = "false") => {
    return new Promise((resolve, reject) => {
        if (sensitive == "false") {
            database.query(`SELECT * FROM product WHERE lower(name) LIKE lower('${name}%');`)
                .then(res => resolve(res))
                .catch(err => reject(err))
        } else {
            database.query(`SELECT * FROM product WHERE lower(name) LIKE lower('%${name}%');`)
                .then(res => resolve(res))
                .catch(err => reject(err))
        }
    })
}

Product.Filter = (type, orderBy) => {
    return new Promise((resolve, reject) => {
        let query;
        if (type == "alphabetical" && orderBy == "asc") {
            query = `SELECT p.id, p.name, p.image, p.price, c.category FROM product p INNER JOIN category c ON c.id = p.category ORDER BY name ASC`
        } else if (type == "alphabetical" && orderBy == "desc") {
            query = `SELECT p.id, p.name, p.image, p.price, c.category FROM product p INNER JOIN category c ON c.id = p.category ORDER BY name DESC`
        } else if (type == "price" && orderBy == "asc") {
            query = `SELECT p.id, p.name, p.image, p.price, c.category FROM product p INNER JOIN category c ON c.id = p.category ORDER BY price ASC`
        } else if (type == "price" && orderBy == "desc") {
            query = `SELECT p.id, p.name, p.image, p.price, c.category FROM product p INNER JOIN category c ON c.id = p.category ORDER BY price DESC`
        } else if (type == "category" && orderBy == "food") {
            query = `SELECT p.id, p.name, p.image, p.price, c.category FROM product p INNER JOIN category c ON c.id = p.category WHERE c.category='Food'`
        } else if (type == "category" && orderBy == "drink") {
            query = `SELECT p.id, p.name, p.image, p.price, c.category FROM product p INNER JOIN category c ON c.id = p.category WHERE c.category='Drink'`
        } else if (type == "latest") {
            query = `SELECT p.id, p.name, p.image, p.price, c.category FROM product p INNER JOIN category c ON c.id = p.category ORDER BY p.id DESC`
        } else {
            query = false
        }
        if (query != false) {
            database.query(query)
                .then(res => resolve(res))
                .catch(err => reject(err))
        } else {
            resolve(false)
        }

    })
}

module.exports = Product