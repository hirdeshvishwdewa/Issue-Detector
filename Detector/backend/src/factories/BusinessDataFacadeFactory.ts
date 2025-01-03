import { DatabaseBusinessDataFacade } from '../facades/DatabaseBusinessDataFacade';
import { HttpBusinessDataFacade } from '../facades/HttpBusinessDataFacade';
import { IBusinessDataFacade } from '../facades/IBusinessDataFacade';
import CoreApi from '../utils/coreApi';

export class BusinessDataFacadeFactory {
    static create(mode: 'db' | 'http'): IBusinessDataFacade {
        if (mode === 'db') {
            return new DatabaseBusinessDataFacade();
        } else if (mode === 'http') {
            const coreApi = new CoreApi({
                baseURL: process.env.SUIT_API_BASE_URL,
            });
            return new HttpBusinessDataFacade(coreApi);
        }
        throw new Error(`Unsupported mode: ${mode}`);
    }
}