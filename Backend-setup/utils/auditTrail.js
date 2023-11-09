const createAuditTrailObject = async (
  source,
  historyId,
  oldAction,
  newAction,
  placeOfChanges,
  placeOfChangesColumn,
  remark,
  status,
  createdBy
) => {
  let auditTrailData = {};
  auditTrailData.source = source ;
  auditTrailData.historyId = historyId;
  auditTrailData.oldAction = oldAction;
  auditTrailData.newAction = newAction;
  auditTrailData.placeOfChanges = placeOfChanges;
  auditTrailData.placeOfChangesColumn = placeOfChangesColumn;
  auditTrailData.dateOfChange = new Date();
  auditTrailData.remark = remark;
  auditTrailData.status = status;
  auditTrailData.createdBy = createdBy;
 
  return auditTrailData;
};

module.exports = {
  createAuditTrailObject,
};
