import { Trigger } from "../entities/Trigger";

export const seedTriggers = async (AppDataSource: any) => {

    const triggerRepository = AppDataSource.getRepository(Trigger);
    const triggerCount = 20;
    const deviceIds = ["1247f785-c1d8-48e5-bb73-a6043ac85eaa",
        "5c7cd42c-ef2d-4721-b801-f791d18bc9b2",
        "96189d9a-5620-4430-ae23-b5a00ba2384d",
        "4112da12-562e-4a10-93c4-2af8dda14fc5",
        "2d7890a3-c6ce-441c-8db9-3be2e506f9c4",
        "ca85708b-6792-4845-a5ff-3644e08b177e",
        "972580ba-a988-4983-825e-c63e420e3e83",
        "115630a1-367b-4e56-a442-8ed41d31fc18",
        "cf1b2f1b-6202-45c7-939b-997c169899d3",
        "f2de4383-a80a-44b3-abf9-dbf59e1b538c",
        "9a265e7d-8257-48dd-8b05-d0add7f98df1",
        "1a55260d-7168-413a-b4e8-39fddc5d93f4",
        "08af8de6-3427-48d9-b726-ec096f1b7e98",
        "66916c51-f0a7-47da-8bba-194cbe384f01",
        "e6d096b3-030e-4e30-bce7-cdaa37b3f8f9",
        "ba93e85c-3ac4-4e77-baa5-0755527afe26",
        "0dbf7892-b21b-4b27-95bc-e9507a639558",
        "bd9ca5ad-bb25-4813-8c23-1c8fa24ccc9f",
        "01603658-3119-4609-9316-c8bb0655ec4c",
        "bf10e28c-9826-4295-aec2-e2143f0790ce"];
    const states = ['active', 'low_stock', 'out_of_stock', 'active', 'error'];
    const triggers = Array.from({ length: triggerCount }, (_, i) => ({
        state: states[i % states.length],
        triggerId: deviceIds[i],
    }));

    for (const triggerData of triggers) {
        const trigger = triggerRepository.create(triggerData);
        await triggerRepository.save(trigger);
    }
};

