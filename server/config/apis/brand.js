import config from '../index'
export default {
	getBrandOne: config.apiHost + '/brandone', //获取品牌信息;
	// 获取所有品牌列表;
	getBrandList: config.apiHost + '/brandListz',

	//条件查询品牌;
	secBrandcondition: config.apiHost + '/secBrandcondition', //dreamBrandtitle

	// 获取所有模板列表;
	cradTemplateListz: config.apiHost + '/cradTemplateListz', //传入pageSize

	getCradTemplates: config.apiHost + '/getCradTemplates', // id
}
