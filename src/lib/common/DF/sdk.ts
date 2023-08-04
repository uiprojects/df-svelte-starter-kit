import { env } from '$env/dynamic/public';
import { DiligenceFabricClient } from '@ubti/diligence-fabric-sdk';


export const client = new DiligenceFabricClient(
    parseInt(env.PUBLIC_DF_APPID),
    parseInt(env.PUBLIC_DF_TENANTID)
);


