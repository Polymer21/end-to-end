'use strict'

const Hapi = require('hapi')
const Monk = require('monk') 

const server = Hapi.server({ 
    host: 'localhost', 
    port: 3001
})

const getCarsCollection = async () => {
    const connectionString = "mongodb://PolymerTrip:Sullivan62@ds115758.mlab.com:15758/dealerships"
    const db = Monk(connectionString)
    const cars = await db.get("cars")
    return cars
} 

server.route({
    method: 'GET',
    path:'/cars', 
    handler: async (request, h) => {
        const carsCollection = await getCarsCollection()
        const cars = await carsCollection.find()
        console.log(cars)
        return { cars }
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
})

server.route({
    method: 'GET',
    path:'/', 
    handler: (request, h) => {
        return { cars: [{
                make: "Toyota",
                model: "Tacoma",
                year: 2009,
                mileage: 100000
            },{
                make: "BMW",
                model: "i8",
                year: 2018,
                mileage: 1
            }]
        }
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
})

server.route({
    method: 'POST',
    path: '/cars',
    handler: async (request, h) => {
        const cars = await getCarsCollection()
        cars.insert(request.payload)
        console.log(request.payload)
        return h.response()
    },
    config: {
        cors: {
            origin: ['*'],
            additionalHeaders: ['cache-control', 'x-requested-with']
        }
    }
})

async function start() {

    try {
        await server.start()
    }
    catch (err) {
        console.log(err)
        process.exit(1)
    }

    console.log('Server running at:', server.info.uri)
}

start()