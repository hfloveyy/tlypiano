'use strict';

function showTip(sms, icon, fun, t) {
    if (!t) {
        t = 1000;
    }
    wx.showToast({
        title: sms,
        icon: icon,
        duration: t,
        success: fun
    });
}

function showModal(c, t, fun) {
    if (!t) t = '提示';
    wx.showModal({
        title: t,
        content: c,
        showCancel: true,
        success: fun
    });
}

module.exports.showTip = showTip;
module.exports.showModal = showModal;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi5qcyJdLCJuYW1lcyI6WyJzaG93VGlwIiwic21zIiwiaWNvbiIsImZ1biIsInQiLCJ3eCIsInNob3dUb2FzdCIsInRpdGxlIiwiZHVyYXRpb24iLCJzdWNjZXNzIiwic2hvd01vZGFsIiwiYyIsImNvbnRlbnQiLCJzaG93Q2FuY2VsIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxTQUFTQSxPQUFULENBQWlCQyxHQUFqQixFQUFzQkMsSUFBdEIsRUFBNEJDLEdBQTVCLEVBQWlDQyxDQUFqQyxFQUFvQztBQUNoQyxRQUFJLENBQUNBLENBQUwsRUFBUTtBQUNKQSxZQUFJLElBQUo7QUFDSDtBQUNEQyxPQUFHQyxTQUFILENBQWE7QUFDVEMsZUFBT04sR0FERTtBQUVUQyxjQUFNQSxJQUZHO0FBR1RNLGtCQUFVSixDQUhEO0FBSVRLLGlCQUFTTjtBQUpBLEtBQWI7QUFNSDs7QUFFRCxTQUFTTyxTQUFULENBQW1CQyxDQUFuQixFQUFxQlAsQ0FBckIsRUFBdUJELEdBQXZCLEVBQTRCO0FBQ3hCLFFBQUcsQ0FBQ0MsQ0FBSixFQUNJQSxJQUFFLElBQUY7QUFDSkMsT0FBR0ssU0FBSCxDQUFhO0FBQ1RILGVBQU9ILENBREU7QUFFVFEsaUJBQVNELENBRkE7QUFHVEUsb0JBQVcsSUFIRjtBQUlUSixpQkFBU047QUFKQSxLQUFiO0FBTUg7O0FBR0RXLE9BQU9DLE9BQVAsQ0FBZWYsT0FBZixHQUF5QkEsT0FBekI7QUFDQWMsT0FBT0MsT0FBUCxDQUFlTCxTQUFmLEdBQTJCQSxTQUEzQiIsImZpbGUiOiJjb21tb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBzaG93VGlwKHNtcywgaWNvbiwgZnVuLCB0KSB7XHJcbiAgICBpZiAoIXQpIHtcclxuICAgICAgICB0ID0gMTAwMDtcclxuICAgIH1cclxuICAgIHd4LnNob3dUb2FzdCh7XHJcbiAgICAgICAgdGl0bGU6IHNtcyxcclxuICAgICAgICBpY29uOiBpY29uLFxyXG4gICAgICAgIGR1cmF0aW9uOiB0LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1blxyXG4gICAgfSlcclxufVxyXG5cclxuZnVuY3Rpb24gc2hvd01vZGFsKGMsdCxmdW4pIHtcclxuICAgIGlmKCF0KVxyXG4gICAgICAgIHQ9J+aPkOekuidcclxuICAgIHd4LnNob3dNb2RhbCh7XHJcbiAgICAgICAgdGl0bGU6IHQsXHJcbiAgICAgICAgY29udGVudDogYyxcclxuICAgICAgICBzaG93Q2FuY2VsOnRydWUsXHJcbiAgICAgICAgc3VjY2VzczogZnVuXHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMuc2hvd1RpcCA9IHNob3dUaXA7XHJcbm1vZHVsZS5leHBvcnRzLnNob3dNb2RhbCA9IHNob3dNb2RhbDsiXX0=