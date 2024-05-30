export type Weather = {
  subscriptionId: string;
  subscriptionExpirationDateTime: string;
  changeType: string;
  resource: string;
  resourceData: ResourceData;
  clientState: string;
  tenantId: string;
};
export type ResourceData = {
  "@odata.type": string;
  "@odata.id": string;
  "@odata.etag": string;
  id: string;
};
