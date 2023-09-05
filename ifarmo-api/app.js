'use strict';
const cors = require('cors');
const connectionProcess = require("./src/database/ConnectDatabase.js");
const express = require("express");
const cookieParser = require("cookie-parser");

require('dotenv').config();

const port = process.env.NODE_PORT || 80;

connectionProcess().then(() => {
        const app = express();

        app.use(cors({
            origin: '*' ,
            credentials: true,
            strict: true,
        }));

        app.use(express.json());
        app.use(cookieParser());

        app.use('/api/auth/', require('./src/routes/AuthRouter.js'));
        app.use('/api/user/', require('./src/routes/UserRouter.js'));
        app.use('/api/recovery/', require('./src/routes/RecoveryRouter.js'));
        app.use('/api/farm/', require('./src/routes/FarmRouter.js'));
        app.use('/api/product/', require('./src/routes/ProductRouter.js'));
        app.use('/api/equipment/', require('./src/routes/EquipmentRouter.js'));
        app.use('/api/job/', require('./src/routes/JobRouter.js'));
        app.use('/api/admin/', require('./src/routes/AdminRouter.js'));

        app.listen(port, () => {
            console.log(`Server and MySQL  running on port ${port}`);
        });
    }
).catch((error) => {
        console.error('Error connecting to MySQL:', error);
    }
);

