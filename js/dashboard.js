function a0_0xa998(_0x25abb2,_0x4be308){const _0x4ccddb=a0_0x4ccd();return a0_0xa998=function(_0xa9989f,_0x5655a2){_0xa9989f=_0xa9989f-0xc1;let _0x16de57=_0x4ccddb[_0xa9989f];return _0x16de57;},a0_0xa998(_0x25abb2,_0x4be308);}const a0_0x55c8c7=a0_0xa998;function a0_0x4ccd(){const _0x48c8f3=['setData','19938YBfeta','displayName','#example-table','forEach','get','xlsx','getRows','innerHTML','averageRating','toUpperCase','instagram','length','Current Plan: ','setColumns','catch','download-xlsx','click','toLowerCase','getElementById','978655wuyazC','from','984sMzHmK','1912118OJWehG',', Used: ','phone','push','keys','then','quota','entries','accountinfo','5608TCehYE','19025iUkfZS','14445JSJbOd','twitter','287mhyJBo','2292900EfaSVO','leads','640189jNFDsc','charAt','email','storage','used','facebook','download','log','placeID','youtube','add','My Data','plan','trim','290qTfrZn','assign',', Quota: ','address','addEventListener','reviewCount',' emails.','category','sync','replace'];a0_0x4ccd=function(){return _0x48c8f3;};return a0_0x4ccd();}function capitalizeFirstLetter(_0x58633d){const _0x4d8963=a0_0xa998;return _0x58633d[_0x4d8963(0xff)](0x0)[_0x4d8963(0xe1)]()+_0x58633d['slice'](0x1);}// Initialize Tabulator on the correct element
var table = new Tabulator('#example-table', {
  layout: 'fitData',
  placeholder: 'Loading',
  selectable: 1
});

document.getElementById('download-csv').addEventListener('click', function() {
  table.download('csv', 'results.csv');
});
document.getElementById('download-xlsx').addEventListener('click', function() {
  table.download('xlsx', 'results.xlsx', { sheetName: 'My Data' });
});

function flattenObject(obj, prefix = '') {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? prefix + '_' + key : key;
    if (typeof value === 'object' && value !== null) {
      Object.assign(result, flattenObject(value, newKey));
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

function generateColumns(keysSet) {
  const defaultKeys = new Set(['name','phone','email','website','address','category','averageRating','reviewCount','facebook','twitter','instagram','youtube','linkedin','yelp','cID','placeID','latitude','longitude']);
  var columns = [];
  defaultKeys.forEach(key => {
    columns.push({ title: capitalizeFirstLetter(key), field: key, width: 300, resizable: true });
  });
  const extraKeys = Array.from(keysSet).sort();
  extraKeys.forEach(key => {
    if (!defaultKeys.has(key)) {
      columns.push({ title: capitalizeFirstLetter(key), field: key, width: 300, resizable: true });
    }
  });
  table.setColumns(columns);
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function showData() {
  chrome.storage.local.get(null, function(data) {
    const leads = data.leads || [];
    var allKeys = new Set(), flatLeads = [];
    for (var i = 0; i < leads.length; ++i) {
      const flat = flattenObject(leads[i]);
      flatLeads.push(flat);
      Object.keys(flat).forEach(k => allKeys.add(k));
    }
    generateColumns(allKeys);
    table.setData(flatLeads);
  });
}

window.addEventListener('DOMContentLoaded', function() {
  var accountInfo = document.getElementById('accountinfo');
  if (accountInfo) {
    accountInfo.innerHTML = 'Current Plan: Pro, Quota: Unlimited, Used: 0';
  }
  showData();
});