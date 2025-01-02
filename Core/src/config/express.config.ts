import { Express } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import logger from "./logger.config";

export class ExpressConfig {
    private app: Express;
    private port = Number(process.env.PORT) || 3000;
    private routes: any;
    constructor(express: Express, routes: any) {
        this.app = express;
        this.routes = routes;
    }

    public async init(): Promise<void> {
        try {
            logger.info("Initializing express...");
            this.app.use(bodyParser.json());
            this.app.use(bodyParser.urlencoded({ extended: false }));
            this.app.use(cors());
            this.app.use(this.routes);
            this.app.listen(this.port, () => {
                logger.info(`Server is running on port ${this.port}...Click here to access http://localhost:${this.port}`);
            });
        } catch (error) {
            logger.error(`Error initializing express: ${error}`);
        }
    }
}
