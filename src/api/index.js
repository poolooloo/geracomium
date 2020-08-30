import Ajax from '@/axios/axios.request'
import globalUrls from '@/api/api-url'

export const getScreenBaseInfo = params => Ajax.get(globalUrls.getScreenBaseInfo, params)
export const getScreenAgeDistributionByCounty = params => Ajax.get(globalUrls.getScreenAgeDistributionByCounty, params)
export const getOccupancyRateByInstitutionName = params => Ajax.get(globalUrls.getOccupancyRateByInstitutionName, params)
export const getScreenDiseaseByInstitutionName = params => Ajax.get(globalUrls.getScreenDiseaseByInstitutionName, params)
