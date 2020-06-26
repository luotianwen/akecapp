const Url = "https://akbt.ak-medical.net/";
//const Url = "http://192.168.2.124:8081/";
const httpUrl = Url+"akec/";

const savereg = function() {
	return httpUrl + "reg";
}
const login = function() {
	return httpUrl + "login";
}
const queryListUserBelongDealer = function() {
	return httpUrl + "queryListUserBelongDealer";
}
const deleteUser = function() {
	return httpUrl + "deleteUser";
}
const modifyUser = function() {
	return httpUrl + "modifyUser";
}
const modifyUserPass = function() {
	return httpUrl + "modifyUserPass";
}
const queryKnowledgeKindList = function() {
	return httpUrl + "queryKnowledgeKindList";
}
const queryKnowledgeContentList = function() {
	return httpUrl + "queryKnowledgeContentList";
}
const queryListReportStandbook = function() {
	return httpUrl + "queryListReportStandbook";
}
const queryBaseData = function() {
	return httpUrl + "queryBaseData";
}
const queryListUserDoctor = function() {
	return httpUrl + "queryListUserDoctor";
}
const deleteUserDoctor = function() {
	return httpUrl + "deleteUserDoctor";
}
const saveUserDoctor = function() {
	return httpUrl + "saveUserDoctor";
}
const queryDict = function() {
	return httpUrl + "queryDict";
}
const queryProvince = function() {
	return httpUrl + "queryProvince";
}
const queryhosptail = function() {
	return httpUrl + "queryHosptail";
}
const queryResultProductInfo = function() {
	return httpUrl + "queryResultProductInfo";
}
const queryGradeList = function() {
	return httpUrl + "queryGradeList";
}
const saveReportStandbook = function() {
	return httpUrl + "saveReportStandbook";
}
const getReportStandbook = function() {
	return httpUrl + "getReportStandbook";
}
const delReportStandbook = function() {
	return httpUrl + "delReportStandbook";
}
const queryListUnreadNotice = function() {
	return httpUrl + "queryListUnreadNotice";
}
const deleteNoticeUserRead = function() {
	return httpUrl + "deleteNoticeUserRead";
}
const exportListReportStandbook = function() {
	return httpUrl + "exportListReportStandbook";
}

const queryListReportStandbookOperation = function() {
	return httpUrl + "queryListReportStandbookOperation";
}
const saveReportStandbookOperation = function() {
	return httpUrl + "saveReportStandbookOperation";
}
const exportReportStandbookOperation = function() {
	return httpUrl + "exportReportStandbookOperation";
}

const queryListUserHospital = function() {
	return httpUrl + "queryListUserHospital";
}
 
const saveUserHospital = function() {
	return httpUrl + "saveUserHospital";
}
const getReportStandbookOperation = function() {
	return httpUrl + "getReportStandbookOperation";
}
const delReportStandbookOperation = function() {
	return httpUrl + "delReportStandbookOperation";
}
const getUserHospital = function() {
	return httpUrl + "getUserHospital";
}
const queryGetiReportStandbook = function() {
	return httpUrl + "queryGetiReportStandbook";
}
const sendsms = function() {
	return httpUrl + "sendsms";
}
const forgetUserPass = function() {
	return httpUrl + "forgetUserPass";
}
const outUseroutUser = function() {
	return httpUrl + "outUseroutUser";
}
const upload = function() {
	return httpUrl + "upload";
}

const queryListReportDStandbook = function() {
	return httpUrl + "queryListReportDStandbook";
}
const saveReportDStandbook = function() {
	return httpUrl + "saveReportDStandbook";
}
const getReportDStandbook = function() {
	return httpUrl + "getReportDStandbook";
}
const delReportDStandbook = function() {
	return httpUrl + "delReportDStandbook";
}

// 管理账号信息
const USERS_KEY = 'AKEC_KEY';
 
//baseReportId 为经销商 B18370AD648C42B79759D2B6DB04DF6B
//auditStatus 为审核通过
const getUsers = function() {
	let  ret = uni.getStorageSync(USERS_KEY);
	if (!ret) {
		ret =  "{ \"hasLogin\":false}"
	}
	return JSON.parse(ret);
}

const addUser = function(userInfo) {
	uni.setStorageSync(USERS_KEY, JSON.stringify(userInfo));
}



const getbaotai = function() {
	let ret = '';
	ret = uni.getStorageSync('baotailist');
	if (!ret) {
		ret = '[]';
	}
	return JSON.parse(ret);
}
const updatebaotai = function(bt) {
	uni.setStorageSync('baotailist', JSON.stringify(bt));
}
const addbaotai = function(bt) {
	let bs = getbaotai();
	bs.push(bt);
	uni.setStorageSync('baotailist', JSON.stringify(bs));
}

export default {
	Url,
	getUsers,
	getbaotai,
	addbaotai,
	updatebaotai,
	addUser,
	savereg,
	login,
	queryListUserBelongDealer,
	modifyUser,
	deleteUser,
	modifyUserPass,
	queryKnowledgeKindList,
	queryKnowledgeContentList,
	queryListReportStandbook,
	queryBaseData,
	queryListUserDoctor,
	deleteUserDoctor,
	saveUserDoctor,
	queryDict,
	queryProvince,
	queryhosptail,
	queryResultProductInfo,
	queryGradeList,
	saveReportStandbook,
	getReportStandbook,
	delReportStandbook,
	queryListUnreadNotice,
	deleteNoticeUserRead,
	exportListReportStandbook,
	queryListReportStandbookOperation,
	saveReportStandbookOperation,
	exportReportStandbookOperation,
	queryListUserHospital,
	saveUserHospital,
	getReportStandbookOperation,
	getUserHospital,
	queryGetiReportStandbook,
	forgetUserPass,
	sendsms,
	delReportStandbookOperation,
	outUseroutUser,
	upload,
	queryListReportDStandbook,
	saveReportDStandbook,
	getReportDStandbook,
	delReportDStandbook,
}
