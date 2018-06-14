var BrowserDetect = {
    init: function() {
        this.browser = this.searchString(this.dataBrowser) || "An unknown browser", this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version", this.OS = this.searchString(this.dataOS) || "an unknown OS"
    },
    searchString: function(e) {
        for (var t = 0; t < e.length; t++) {
            var i = e[t].string,
                n = e[t].prop;
            if (this.versionSearchString = e[t].versionSearch || e[t].identity, i) {
                if (-1 != i.indexOf(e[t].subString)) return e[t].identity
            } else if (n) return e[t].identity
        }
    },
    searchVersion: function(e) {
        var t = e.indexOf(this.versionSearchString);
        if (-1 != t) return parseFloat(e.substring(t + this.versionSearchString.length + 1))
    },
    dataBrowser: [{
        string: navigator.userAgent,
        subString: "Chrome",
        identity: "Chrome"
    }, {
        string: navigator.userAgent,
        subString: "OmniWeb",
        versionSearch: "OmniWeb/",
        identity: "OmniWeb"
    }, {
        string: navigator.vendor,
        subString: "Apple",
        identity: "Safari",
        versionSearch: "Version"
    }, {
        prop: window.opera,
        identity: "Opera",
        versionSearch: "Version"
    }, {
        string: navigator.userAgent,
        subString: "Firefox",
        identity: "Firefox"
    }, {
        string: navigator.userAgent,
        subString: "MSIE",
        identity: "Explorer",
        versionSearch: "MSIE"
    }],
    dataOS: [{
        string: navigator.platform,
        subString: "Win",
        identity: "Windows"
    }, {
        string: navigator.platform,
        subString: "Mac",
        identity: "Mac"
    }, {
        string: navigator.userAgent,
        subString: "iPhone",
        identity: "iPhone/iPod"
    }, {
        string: navigator.platform,
        subString: "Linux",
        identity: "Linux"
    }]
};
BrowserDetect.init();
var oldMacBrowser = "Safari" === BrowserDetect.browser && BrowserDetect.version <= 9.1;
if (oldMacBrowser) {
    var outdatedOverlay = '<div class="outdatedOverlay"></div>',
        html = "";
    html += '<div class="outdatedPopup">', html += '\t<div class="outdatedLogo"><img src="/iwov-resources/image/common/logo.png" alt="Hong Kong International Airport" /></div>', html += '\t<div class="langEng">', html += "\t<p>For the best viewing experience, please upgrade your browser to the most up-to-date version.</p>", html += "\t</div>", html += '\t<div class="langTc">', html += "\t<p>請將瀏覽器更新至最新版本，以享有最佳瀏覽體驗。</p>", html += "\t</div>", html += '\t<div class="langSc">', html += "\t<p>请将浏览器更新至最新版本，以享有最佳浏览体验。</p>", html += "\t</div>", html += '\t<button class="mfp-close outadtedClose" type="button"></button>', html += "</div>", setTimeout(function() {
        $(outdatedOverlay).appendTo($("body")), $(html).appendTo($("body")), $(".outadtedClose").on("click", function() {
            $(".outdatedOverlay, .outdatedPopup").fadeOut()
        })
    }, 1e3)
}
String.prototype.toHex = function() {
    var e, t = "";
    for (e = 0; e < this.length; e++) t += "\\u" + ("0000" + this.charCodeAt(e).toString(16)).replace(/^.*(.{4,4})$/, "$1");
    return t
}, jQuery.transitionEnd = "transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd";
var HKIA = jQuery.Core("hkia");
HKIA.log = function() {
    if (HKIA.config("develop_mode")) {
        var e = Array.apply(null, arguments),
            t = new Error;
        t.stack && e.unshift("error: " + $.trim(t.stack.split("\n")[2])), e.unshift("(HKIA_LOG)")
    }
}, HKIA.dateFormat = function(e, t, i) {
    var n = $.datepicker.formatDate($.datepicker.regional[HKIA.config("language")].dateFormat, e);
    return t && (n += ", " + ("0000" + e.getHours()).replace(/^.*(\d{2,2})$/, "$1") + ":" + ("0000" + e.getMinutes()).replace(/^.*(\d{2,2})$/, "$1")), n + (!1 !== i ? " " + HKIA.__("HKT") : "")
}, HKIA.dateFormat_yyyymmdd = function(e, t) {
    return !1 !== t ? $.datepicker.formatDate("yy-mm-dd", e) : $.datepicker.formatDate("yymmdd", e)
}, HKIA.phoneNumber = function() {
    $.isMobile() && $(".telLink").each(function(e, t) {
        _ele = $(t);
        var i = $("<a/>", {
            href: "tel:" + _ele.attr("data-tel-no").replace(/ /g, ""),
            text: _ele.text()
        });
        _ele.replaceWith(i)
    })
}, HKIA.globalAnimate = function(e) {
    if (e) switch (e) {
        case "reset":
            HKIA("body .ani").css3({
                "transition-delay": ""
            }).removeClass(".loaded")
    } else {
        var t = [];
        HKIA("body .ani:visible:not(.loaded)").each(function(e, i) {
            var n = HKIA(window).scrollTop(),
                a = n + HKIA(window).height(),
                r = HKIA(i).offset().top,
                o = r + HKIA(i).height(),
                s = HKIA(this);
            n <= o && a >= r && (s.css3({
                "transition-delay": 100 + 100 * e + "ms"
            }).one(jQuery.transitionEnd, function(e) {
                $(e.currentTarget).off(jQuery.transitionEnd, arguments.callee).trigger("aniEnd")
            }).addClass("loaded"), t.push(this))
        }), t.length && setTimeout(function() {
            HKIA().trigger("animationUpdate")
        }, 500)
    }
}, HKIA.language = function(e) {
    if (!arguments.length) return HKIA.config("language");
    var t = {
        "en-US": "en",
        "zh-HK": "tc",
        "zh-CN": "sc"
    };
    /\/(en|tc|sc)/i.test(location.href) ? location.href = location.href.replace(/\/(en|tc|sc)/i, "/" + t[e]) : location.href = location.origin + "/" + t[e] + location.pathname
}, HKIA.queryString = function(e) {
    if ("" != location.search) {
        var t = {};
        return $.each(location.search.replace(/^\?/, "").split("&"), function(e, i) {
            var n = i.split("=");
            t[n[0]] = n[1]
        }), arguments.length ? t[e] : t
    }
    return !1
}, HKIA.i18n = function(e) {
    function t(e) {
        this._list = e
    }
    return t.prototype = {
        _language: "en-US",
        _list: {},
        lang: function(e) {
            return arguments.length ? (this._language = e, this) : this._language
        },
        item: function(e) {
            var t = this._list[e];
            return t && this._language in t ? t[this._language] : e
        }
    }, HKIA.__ = function(e) {
        var t = Array.apply(null, arguments),
            i = HKIA.i18n.item(t.shift());
        return t.length ? i.replace(/\{\{\d\}\}/g, function(e) {
            var i = t[parseInt(e.replace(/[\{\{\}\}]/g, ""))];
            return i || ""
        }) : i
    }, new t({
        HKT: {
            "zh-HK": "HKT",
            "zh-CN": "HKT"
        },
        TERMINAL: {
            "zh-HK": "大樓",
            "zh-CN": "大楼"
        },
        AISLE: {
            "zh-HK": "行段",
            "zh-CN": "行段"
        },
        RESERVATION: {
            "zh-HK": "訂位電話",
            "zh-CN": "订位电话"
        },
        "GENERAL ENQUIRIES": {
            "zh-HK": "一般查詢",
            "zh-CN": "一般查询"
        },
        WEBSITE: {
            "zh-HK": "網址",
            "zh-CN": "网址"
        },
        "Lounge Information": {
            "zh-HK": "貴賓室資料",
            "zh-CN": "贵宾室信息"
        },
        "LOUNGE INFORMATION": {
            "zh-HK": "貴賓室資料",
            "zh-CN": "贵宾室信息"
        },
        LOUNGE: {
            "zh-HK": "航空公司貴賓室",
            "zh-CN": "航空公司贵宾室"
        },
        LOCATION: {
            "zh-HK": "地點",
            "zh-CN": "位置"
        },
        TELEPHONE: {
            "zh-HK": "電話",
            "zh-CN": "电话"
        },
        "SERVICE HOURS": {
            "zh-HK": "服務時間",
            "zh-CN": "服务时间"
        },
        REMARKS: {
            "zh-HK": "備註",
            "zh-CN": "备注"
        },
        "Unit: microgram per m<sup>3</sup>": {
            "zh-HK": "單位：每立方米所含微克",
            "zh-CN": "单位：每立方米所含微克"
        },
        Concentration: {
            "zh-HK": "濃度",
            "zh-CN": "浓度"
        },
        "AQHI distribution": {
            "zh-HK": "空氣質素健康指數分配",
            "zh-CN": "空气质素健康指数分配"
        },
        "North station": {
            "zh-HK": "北站",
            "zh-CN": "北站"
        },
        "South station": {
            "zh-HK": "南站",
            "zh-CN": "南站"
        },
        "Sha Chau station": {
            "zh-HK": "沙洲站",
            "zh-CN": "沙洲站"
        },
        Risk: {
            "zh-HK": "風險",
            "zh-CN": "风险"
        },
        LEGEND: {
            "zh-HK": "圖例",
            "zh-CN": "图例"
        },
        "HEALTH RISK": {
            "zh-HK": "健康風險",
            "zh-CN": "健康风险"
        },
        "%": {
            "zh-HK": "百分比",
            "zh-CN": "百分比"
        },
        FLIGHT: {
            "zh-HK": "航班",
            "zh-CN": "航班"
        },
        Time: {
            "zh-HK": "時間",
            "zh-CN": "时间"
        },
        TIME: {
            "zh-HK": "時間",
            "zh-CN": "时间"
        },
        "All timing": {
            "zh-HK": "所有時段",
            "zh-CN": "所有时段"
        },
        STATUS: {
            "zh-HK": "現況",
            "zh-CN": "现况"
        },
        DATE: {
            "zh-HK": "日期",
            "zh-CN": "日期"
        },
        Date: {
            "zh-HK": "日期",
            "zh-CN": "日期"
        },
        "Date & Time": {
            "zh-HK": "日期及時間",
            "zh-CN": "日期及时间"
        },
        AQHI: {
            "zh-HK": "空氣質素健康指數",
            "zh-CN": "空气质素健康指数"
        },
        New: {
            "en-US": "New",
            "zh-HK": "新",
            "zh-CN": "新"
        },
        "More than 1 location": {
            "zh-HK": "超過一個地點",
            "zh-CN": "超过一个地点"
        },
        "Step 1": {
            "zh-HK": "步驟 1",
            "zh-CN": "步骤 1"
        },
        "Step 2": {
            "zh-HK": "步驟 2",
            "zh-CN": "步骤 2"
        },
        "Step 3": {
            "zh-HK": "步驟 3",
            "zh-CN": "步骤 3"
        },
        "First Quarter": {
            "zh-HK": "第一季",
            "zh-CN": "第一季"
        },
        "Second Quarter": {
            "zh-HK": "第二季",
            "zh-CN": "第二季"
        },
        "Third Quarter": {
            "zh-HK": "第三季",
            "zh-CN": "第三季"
        },
        "Fourth Quarter": {
            "zh-HK": "第四季",
            "zh-CN": "第四季"
        },
        "Coach services": {
            "en-US": "Coach Services",
            "zh-HK": "查看客車服務",
            "zh-CN": "查看客车服务"
        },
        to: {
            "zh-CN": "至",
            "zh-HK": "至"
        },
        "Itinerary options": {
            "en-US": "Itinerary Options",
            "zh-HK": "設定行程選項",
            "zh-CN": "设定行程选项"
        },
        "Itinerary summary": {
            "en-US": "Itinerary Summary",
            "zh-HK": "行程概要",
            "zh-CN": "行程概要"
        },
        Destination: {
            "zh-HK": "目的地",
            "zh-CN": "目的地"
        },
        DESTINATION: {
            "zh-HK": "目的地",
            "zh-CN": "目的地"
        },
        Origin: {
            "zh-HK": "出發地",
            "zh-CN": "出发地"
        },
        "CONTROL POINT": {
            "zh-HK": "口岸",
            "zh-CN": "口岸"
        },
        TERMINUS: {
            "zh-HK": "總站",
            "zh-CN": "总站"
        },
        STOPTOHKIA: {
            "en-US": "STOP",
            "zh-HK": "停站",
            "zh-CN": "停站"
        },
        STOPTOMAINLAND: {
            "en-US": "STOP",
            "zh-HK": "停站",
            "zh-CN": "停站"
        },
        step2GetOn: {
            "en-US": "STOP",
            "zh-HK": "登車地點",
            "zh-CN": "登车地点"
        },
        step3GetOn: {
            "en-US": "BOARDING POINT",
            "zh-HK": "登車地點",
            "zh-CN": "登车地点"
        },
        step2GetOff: {
            "en-US": "STOP",
            "zh-HK": "下車地點",
            "zh-CN": "下车地点"
        },
        step3GetOff: {
            "en-US": "BOARDING POINT",
            "zh-HK": "登車地點",
            "zh-CN": "登车地点"
        },
        "SERVICE PROVIDER": {
            "zh-HK": "服務營運商",
            "zh-CN": "服务营运商"
        },
        "Service provider": {
            "zh-HK": "服務營運商",
            "zh-CN": "服务营运商"
        },
        "PLEASE SELECT": {
            "zh-HK": "請選擇",
            "zh-CN": "请选择"
        },
        allPprovider: {
            "en-US": "All Providers",
            "zh-HK": "所有服務營運商",
            "zh-CN": "所有服务营运商"
        },
        "APPROX. DURATION": {
            "zh-HK": "預計車程",
            "zh-CN": "预计车程"
        },
        "Asia Pacific": {
            "zh-HK": "亞洲太平洋",
            "zh-CN": "亚洲太平洋"
        },
        Africa: {
            "zh-HK": "非洲",
            "zh-CN": "非洲"
        },
        "China & Guangdong Cities": {
            "zh-HK": "中國及廣東城市",
            "zh-CN": "中国及广东城市"
        },
        Europe: {
            "zh-HK": "歐洲",
            "zh-CN": "欧洲"
        },
        "North America": {
            "zh-HK": "北美洲",
            "zh-CN": "北美洲"
        },
        "South America": {
            "zh-HK": "南美洲",
            "zh-CN": "南美洲"
        },
        CITIES: {
            "zh-HK": "城市",
            "zh-CN": "城市"
        },
        WEATHER: {
            "zh-HK": "天氣",
            "zh-CN": "天气"
        },
        temperature: {
            "zh-HK": "温度",
            "zh-CN": "温度"
        },
        "TEMPERATURE RANGE (Degrees celsius)": {
            "zh-HK": "温度(攝氏)",
            "zh-CN": "温度(摄氏)"
        },
        TODAY: {
            "zh-HK": "今天",
            "zh-CN": "今天"
        },
        Low: {
            "zh-HK": "低",
            "zh-CN": "低"
        },
        Moderate: {
            "zh-HK": "中",
            "zh-CN": "中"
        },
        High: {
            "zh-HK": "高",
            "zh-CN": "高"
        },
        "Very High": {
            "zh-HK": "甚高",
            "zh-CN": "甚高"
        },
        Serious: {
            "zh-HK": "嚴重",
            "zh-CN": "严重"
        },
        PM: {
            "zh-HK": "懸浮粒子",
            "zh-CN": "悬浮粒子"
        },
        RSP: {
            "zh-HK": "可吸入懸浮粒子",
            "zh-CN": "可吸入悬浮粒子"
        },
        FSP: {
            "zh-HK": "微細懸浮粒子",
            "zh-CN": "微细悬浮粒子"
        },
        CO: {
            "zh-HK": "一氧化碳",
            "zh-CN": "一氧化碳"
        },
        SO2: {
            "en-US": "SO<sub>2</sub>",
            "zh-HK": "二氧化硫",
            "zh-CN": "二氧化硫"
        },
        O3: {
            "en-US": "O<sub>3</sub>",
            "zh-HK": "臭氧",
            "zh-CN": "臭氧"
        },
        NO2: {
            "en-US": "NO<sub>2</sub>",
            "zh-HK": "二氧化氮",
            "zh-CN": "二氧化氮"
        },
        " Risk": {
            "zh-HK": "風險",
            "zh-CN": "风险"
        },
        "Please enter a school name.": {
            "zh-HK": "請填寫學校名稱",
            "zh-CN": "请填写学校名称"
        },
        "Please enter number of participants.": {
            "zh-HK": "請填寫參加人數",
            "zh-CN": "请填写参加人数"
        },
        "Please enter a valid number.": {
            "zh-HK": "請填寫正確參加人數",
            "zh-CN": "请填写正确参加人数"
        },
        "Please enter a preferred date.": {
            "zh-HK": "請輸入申請參觀機場日期",
            "zh-CN": "請輸入申請參觀機場日期"
        },
        "Please enter a different date.": {
            "zh-HK": "請輸入不同日期",
            "zh-CN": "请输入不同日期"
        },
        "Please enter a date between {{0}} and {{1}}.": {
            "zh-HK": "請選擇 {{0}} 至 {{1}} 內之日期",
            "zh-CN": "請選擇 {{0}} 至 {{1}} 內之日期"
        },
        "Please enter a contact name.": {
            "zh-HK": "請輸入聯絡人姓名",
            "zh-CN": "请输入联络人姓名"
        },
        "Please enter a contact number.": {
            "zh-HK": "請輸入聯絡電話",
            "zh-CN": "请输入联络电话"
        },
        "Please enter a valid contact number.": {
            "zh-HK": "請輸入正確電話號碼格式",
            "zh-CN": "请输入正确电话号码格式"
        },
        "Please enter an email address.": {
            "zh-HK": "請輸入電郵",
            "zh-CN": "请输入电邮"
        },
        "Please enter an valid email address.": {
            "zh-HK": "請輸入正確電郵格式",
            "zh-CN": "请输入正确电邮格式"
        },
        "Please enter captcha.": {
            "en-US": "Please enter verification code.",
            "zh-HK": "請輸入驗證碼",
            "zh-CN": "请输入验证码"
        },
        "Please enter a name.": {
            "zh-HK": "請輸入姓名",
            "zh-CN": "请输入姓名"
        },
        "Please select Country.": {
            "zh-HK": "請選擇原居地",
            "zh-CN": "请选择原居地"
        },
        "Please enter a phone number.": {
            "zh-HK": "請輸入電話",
            "zh-CN": "请输入电话"
        },
        "Please enter a fax number.": {
            "zh-HK": "請輸入傳真",
            "zh-CN": "请输入传真"
        },
        "Please enter a valid number": {
            "zh-HK": "請輸入正確號碼格式",
            "zh-CN": "请输入正确号码格式"
        },
        "This field is required.": {
            "zh-HK": "請輸入必填欄",
            "zh-CN": "请输入必填栏"
        },
        "Click the following to access the sent link:": {
            "zh-HK": "請按這裏以連接送上的超連結﹕",
            "zh-CN": "请按这里以连接送上的超连结："
        },
        "You have received the following link to the HKIA website": {
            "zh-HK": "你收到以下連接香港國際機場網站的超連結",
            "zh-CN": "你收到以下连接香港国际机场网站的超连结"
        },
        AIRLINE: {
            "zh-HK": "航空公司",
            "zh-CN": "航空公司"
        },
        ORIGIN: {
            "zh-HK": "出發地",
            "zh-CN": "出发地"
        },
        "PARKING STAND": {
            "zh-HK": "泊機位",
            "zh-CN": "停机位"
        },
        HALL: {
            "zh-HK": "大堂",
            "zh-CN": "大堂"
        },
        BELT: {
            "zh-HK": "行李帶",
            "zh-CN": "行李带"
        },
        "View all flights": {
            "zh-HK": "查看所有航班",
            "zh-CN": "查看所有航班"
        },
        "View all shops": {
            "zh-HK": "查看所有商店",
            "zh-CN": "查看所有商店"
        },
        "View all airline information": {
            "zh-HK": "查看所有航空公司資料",
            "zh-CN": "查看所有航空公司信息"
        },
        Arrivals: {
            "zh-HK": "入境",
            "zh-CN": "入境"
        },
        Departures: {
            "zh-HK": "離境",
            "zh-CN": "离境"
        },
        "Last updated on:": {
            "zh-HK": "最近更新﹕",
            "zh-CN": "最近更新﹕"
        },
        "CHECK-IN": {
            "zh-HK": "登記行段",
            "zh-CN": "办理登机手续"
        },
        "TRANSFER DESK": {
            "zh-HK": "轉機櫃檯",
            "zh-CN": "转机柜台"
        },
        GATE: {
            "zh-HK": "閘口",
            "zh-CN": "闸口"
        },
        "Live passenger flights update containing": {
            "zh-HK": "最新即時客運航班資料包括",
            "zh-CN": "最新即时客运航班资料包括"
        },
        "Live cargo flights update containing": {
            "zh-HK": "最新即時貨運航班資料包括",
            "zh-CN": "最新即时货运航班资料包括"
        },
        "Related content": {
            "zh-HK": "相關內容",
            "zh-CN": "相关内容"
        },
        allTag: {
            "en-US": "ALL",
            "zh-HK": "所有",
            "zh-CN": "所有"
        },
        "Load more": {
            "zh-HK": "更多",
            "zh-CN": "更多"
        },
        'No pages were found containing "{{0}}"': {
            "zh-HK": '找不到和 "{{0}}" 相符的資料',
            "zh-CN": '找不到和 "{{0}}" 相符的资料'
        },
        "PRICE ($HK)": {
            "zh-HK": "票價($HK)",
            "zh-CN": "票价($HK)"
        },
        "PRICE (RMB)": {
            "zh-HK": "票價(RMB)",
            "zh-CN": "票价(RMB)"
        },
        "Selected Journey": {
            "zh-HK": "已選擇行程",
            "zh-CN": "已选择行程"
        },
        FROM: {
            "zh-HK": "由",
            "zh-CN": "由"
        },
        TO: {
            "zh-HK": "至",
            "zh-CN": "至"
        },
        "Please select your preferences above.": {
            "zh-HK": "請於上方選擇您的偏好設置。",
            "zh-CN": "请从上方选择您的偏好设置。"
        },
        "Departure Schedule": {
            "zh-HK": "出發時間表",
            "zh-CN": "出发时间表"
        },
        ADULT: {
            "zh-HK": "成人",
            "zh-CN": "成人"
        },
        CHILD: {
            "zh-HK": "小童",
            "zh-CN": "儿童"
        },
        START: {
            "zh-HK": "起點",
            "zh-CN": "起点"
        },
        END: {
            "zh-HK": "終點",
            "zh-CN": "终点"
        },
        Next: {
            "zh-HK": "下一步",
            "zh-CN": "下一步"
        },
        Back: {
            "zh-HK": "返回",
            "zh-CN": "返回"
        },
        "Itinerary Details": {
            "zh-HK": "詳細行程",
            "zh-CN": "详细行程"
        },
        JOURNEY: {
            "zh-HK": "行程內容",
            "zh-CN": "行程内容"
        },
        "SERVICE PROVIDER / CONTROL POINT": {
            "zh-HK": "服務營運商／口岸",
            "zh-CN": "服务营运商／口岸"
        },
        "DEPARTURE DATE": {
            "zh-HK": "出發日期",
            "zh-CN": "出发日期"
        },
        "DEPARTURE TIME": {
            "zh-HK": "出發時間",
            "zh-CN": "出发时间"
        },
        "ARRIVAL TIME": {
            "zh-HK": "抵港時間",
            "zh-CN": "抵港时间"
        },
        "FARE TYPE": {
            "zh-HK": "車票類型",
            "zh-CN": "车票类型"
        },
        QUANTITY: {
            "zh-HK": "數量",
            "zh-CN": "数量"
        },
        "Ticketing Details": {
            "zh-HK": "車票詳情",
            "zh-CN": "车票详情"
        },
        "BOARDING POINT": {
            "zh-HK": "登車處",
            "zh-CN": "上车地点"
        },
        "TICKETING POINT": {
            "zh-HK": "票務處",
            "zh-CN": "票务处"
        },
        Map: {
            "zh-HK": "位置圖",
            "zh-CN": "位置图"
        },
        "Route Map": {
            "zh-HK": "路線圖",
            "zh-CN": "路线图"
        },
        "Minute(s)": {
            "zh-HK": "分鐘",
            "zh-CN": "分钟"
        },
        Normal: {
            "zh-HK": "正價",
            "zh-CN": "正价"
        },
        "https://{{0}}/json/{{1}}/{{2}}/aqhi-eng.csv": {
            "zh-HK": "https://{{0}}/json/{{1}}/{{2}}/aqhi-chi.csv",
            "zh-CN": "https://{{0}}/json/{{1}}/{{2}}/aqhi-gb.csv"
        },
        'Search results for "{{0}}" ({{1}})': {
            "zh-HK": '搜尋 "{{0}}" 之結果，共找到({{1}})項',
            "zh-CN": '搜索 "{{0}}" ，共找到({{1}})个相关结果'
        },
        'Search results for "{{0}}"': {
            "zh-HK": '搜尋 "{{0}}" 之結果',
            "zh-CN": '搜索 "{{0}}" 相关结果'
        },
        "Handled by {{0}}": {
            "zh-HK": "由{{0}}提供服務",
            "zh-CN": "由{{0}}提供服务"
        },
        "Passenger Arrivals": {
            "zh-HK": "抵港客機",
            "zh-CN": "抵港客机"
        },
        "Passenger Departures": {
            "zh-HK": "離港客機",
            "zh-CN": "离港客机"
        },
        "Cargo Arrivals": {
            "zh-HK": "抵港貨機",
            "zh-CN": "抵港货机"
        },
        "Cargo Departures": {
            "zh-HK": "離港貨機",
            "zh-CN": "离港货机"
        },
        "Absolute carbon emissions": {
            "zh-HK": "Absolute carbon emissions",
            "zh-CN": "Absolute carbon emissions"
        },
        "Carbon intensity": {
            "zh-HK": "Carbon intensity",
            "zh-CN": "Carbon intensity"
        },
        "Paper and cardboard": {
            "zh-HK": "紙張及硬紙板",
            "zh-CN": "纸张及硬纸板"
        },
        "Food Waste": {
            "zh-HK": "廚餘",
            "zh-CN": "厨余"
        },
        Plastics: {
            "zh-HK": "塑膠",
            "zh-CN": "塑胶"
        },
        Metal: {
            "zh-HK": "金屬",
            "zh-CN": "金属"
        },
        Others: {
            "zh-HK": "其他",
            "zh-CN": "其他"
        },
        "Shop & Dine": {
            "zh-HK": "購物餐飲",
            "zh-CN": "购物餐饮"
        },
        "The Airport": {
            "zh-HK": "香港國際機場",
            "zh-CN": "香港国际机场"
        },
        "Passenger Guide": {
            "zh-HK": "旅客指南",
            "zh-CN": "旅客指南"
        },
        "Relax & Fun": {
            "zh-HK": "娛樂消閒",
            "zh-CN": "娱乐休闲"
        },
        Transport: {
            "zh-HK": "交通",
            "zh-CN": "交通"
        },
        Community: {
            "zh-HK": "社區關係",
            "zh-CN": "社区关系"
        },
        Sustainability: {
            "zh-HK": "可持續發展",
            "zh-CN": "可持续发展"
        },
        Careers: {
            "zh-HK": "事業發展",
            "zh-CN": "事业发展"
        },
        "Media Centre": {
            "zh-HK": "傳媒中心",
            "zh-CN": "传媒中心"
        },
        "Airport Authority": {
            "zh-HK": "機場管理局",
            "zh-CN": "机场管理局"
        },
        Flights: {
            "zh-HK": "航班資料",
            "zh-CN": "航班信息"
        },
        "Search Now": {
            "zh-HK": "立即搜尋",
            "zh-CN": "立即搜寻"
        },
        "We cannot find any result that matches your search criteria": {
            "zh-HK": "我們找不到任何資料符合你的搜尋條件",
            "zh-CN": "我们找不到任何资料符合你的搜寻条件"
        },
        "Server Error. Please retry later.": {
            "zh-HK": "伺服器錯誤。 請稍後再試。",
            "zh-CN": "伺服器错误。 请稍后再试。"
        },
        Close: {
            "zh-HK": "關閉",
            "zh-CN": "关闭"
        },
        Note: {
            "zh-HK": "註",
            "zh-CN": "注"
        },
        airlineNote: {
            "en-US": 'Only today\'s flight data is shown. You may view the <a href="/en/flights/arrivals/{{0}}.page">full {{1}} arrival flight list</a> or <a href="/en/flights/departures/{{0}}.page">full {{1}} departure flight list</a> for more information.',
            "zh-HK": '只顯示今日航班資料。如需更多資料，請查看<a href="/tc/flights/arrivals/{{0}}.page">抵港{{1}}完整名單</a>或<a href="/tc/flights/departures/{{0}}.page">離港{{1}}完整名單</a>。',
            "zh-CN": '只显示当日航班信息。如需更多信息，请查看<a href="/sc/flights/arrivals/{{0}}.page">抵港{{1}}完整列表</a>或<a href="/sc/flights/departures/{{0}}.page">离港{{1}}完整列表</a>。'
        },
        apiErrorMessage: {
            "en-US": 'Your requested data is currently unavailable on this page, please <a href="javascript:;" class="sp-fresh">refresh</a> or try again later.',
            "zh-HK": '此頁面暫時未能提供您所指定的數據，請<a href="javascript:;" class="sp-fresh">重新載入</a>或稍後再試。',
            "zh-CN": '此页暂时未能提供您所需要的数据，请<a href="javascript:;" class="sp-fresh">重刷</a>或稍后再试。'
        },
        apiErrorMessageFlight: {
            "en-US": 'The page you attempted to access is currently closed for system upgrade, please visit us again later. For flight information, please <a href="/en/flights/airlines-information/airlines.page">contact your airlines</a>.',
            "zh-HK": '您所尋找的網頁現正進行系統更新，請稍後再試。如欲查詢航班資料，請<a href="/tc/flights/airlines-information/airlines.page">聯絡航空公司</a>。',
            "zh-CN": '您所寻找的网页现正进行系统更新，请稍后再试。如欲查询航班资料，请<a href="/sc/flights/airlines-information/airlines.page">联络航空公司</a>。'
        },
        "Special Notice": {
            "zh-HK": "特別提示",
            "zh-CN": "特别提示"
        },
        "Your bookmarked flight could not be found or has changed information. Please search and bookmarked your flight again or contact airline directly for updated flight information": {
            "zh-HK": "您所標記的航班不存在或已被更改。請重新搜尋及標記您的航班，或聯絡航空公司以獲取最新航班資訊。",
            "zh-CN": "您所标记的航班不存在或已被修改。请重新搜寻和标记您的航班，或联系航空公司以获取最新的航班资讯。"
        },
        "Hong Kong": {
            "zh-HK": "香港",
            "zh-CN": "香港"
        },
        "AIRLINE CODE": {
            "zh-HK": "航空公司代號",
            "zh-CN": "航空公司代号"
        },
        CODE: {
            "zh-HK": "航空公司代號",
            "zh-CN": "航空公司代号"
        },
        "Live updates with ": {
            "zh-HK": "最新即時航班資料",
            "zh-CN": "最新即时航班资料"
        },
        "Information of {{0}}": {
            "zh-HK": "{{0}}資料",
            "zh-CN": "{{0}}资料"
        },
        "Information on {{0}} {{1}} flights": {
            "zh-HK": "{{0}}{{1}}資料",
            "zh-CN": "{{0}}{{1}}资料"
        },
        passenger: {
            "zh-HK": "客機",
            "zh-CN": "客机"
        },
        cargo: {
            "zh-HK": "貨機",
            "zh-CN": "货机"
        },
        "More Flights": {
            "zh-HK": "更多航班",
            "zh-CN": "更多航班"
        },
        "View More": {
            "zh-HK": "瀏覽更多",
            "zh-CN": "浏览更多"
        },
        showOtherResults: {
            "en-US": "Show other results",
            "zh-HK": "顯示其他結果",
            "zh-CN": "显示其他结果"
        },
        "Read More": {
            "zh-HK": "查看更多",
            "zh-CN": "查看更多"
        },
        smartSearchMore: {
            "en-US": "Not what you're looking for?",
            "zh-HK": "想獲得更多搜尋結果？",
            "zh-CN": "想获得更多搜寻结果？"
        },
        noFlight: {
            "en-US": "There's no available flights",
            "zh-HK": "沒有相關航班提供",
            "zh-CN": "没有提供相关航班"
        },
        "Boarding Soon": {
            "zh-HK": "Boarding Soon",
            "zh-CN": "Boarding Soon"
        },
        "CODESHARE AIRLINES": {
            "zh-HK": "聯營航空公司",
            "zh-CN": "联营航空公司"
        },
        "Please select company / organization": {
            "zh-HK": "請選擇公司 / 機構",
            "zh-CN": "请选择公司 / 机构"
        },
        Arrive: {
            "zh-HK": "抵港",
            "zh-CN": "抵港"
        },
        Depart: {
            "zh-HK": "離港",
            "zh-CN": "离港"
        },
        "AIRLINE / FLIGHT": {
            "zh-HK": "航空公司/航班",
            "zh-CN": "航空公司/航班"
        },
        DiscoverHKIATitle: {
            "en-US": "Discover HKIA",
            "zh-HK": "探索機場",
            "zh-CN": "探索机场"
        },
        smartBannerAppName: {
            "en-US": "MyFlight",
            "zh-HK": "MyFlight",
            "zh-CN": "MyFlight"
        },
        noFlightRecord: {
            "en-US": "No Record Found. Please choose another date.",
            "zh-HK": "沒有資料請選取其他日期。",
            "zh-CN": "没有资料请选取其他日期。"
        },
        aboutHomePast: {
            "en-US": "A LEGEND UNDER THE SKY",
            "zh-HK": "天空下的傳奇",
            "zh-CN": "天空下的传奇"
        },
        aboutHomePresent: {
            "en-US": "THE AIRPORT THAT NEVER SLEEPS",
            "zh-HK": "機場運作 日夜不息",
            "zh-CN": "机场运作 日夜不息"
        },
        aboutHomeFuture: {
            "en-US": "A SMARTER & BRIGHTER FUTURE",
            "zh-HK": "開拓智能未來",
            "zh-CN": "开拓智能未来"
        },
        noFlightResult: {
            "en-US": 'If you cannot find the flight, please click <a href="/en/flights/{{0}}/{{1}}.page?q={{2}}">here</a>.',
            "zh-HK": '若您未能搜尋指定航班, 請點擊<a href="/tc/flights/{{0}}/{{1}}.page?q={{2}}">這裡</a>。',
            "zh-CN": '若您未能搜寻指定航班, 请点击<a href="/sc/flights/{{0}}/{{1}}.page?q={{2}}">这里</a>。'
        },
        bookmarkFlight: {
            "en-US": "bookmark flight",
            "zh-HK": "將航班加入書簽",
            "zh-CN": "将航班加入书签"
        },
        address: {
            "en-US": "address",
            "zh-HK": "地址",
            "zh-CN": "地址"
        },
        openingHours: {
            "en-US": "Opening Hours",
            "zh-HK": "營業時間",
            "zh-CN": "营业时间"
        },
        threeSteps: {
            "en-US": "Three steps of the itinerary planner",
            "zh-HK": "計劃行程的三個步驟",
            "zh-CN": "计划行程的三个步骤"
        },
        coachDetails: {
            "en-US": "Details of the coach available",
            "zh-HK": "可選乘客車資料",
            "zh-CN": "可选乘客车资料"
        },
        shop: {
            "en-US": "SHOP",
            "zh-HK": "商店名稱",
            "zh-CN": "商店名称"
        },
        selectDateDesc: {
            "en-US": "Select date to filter coach services",
            "zh-HK": "選擇日期以篩選航班編號、出發地或航空公司",
            "zh-CN": "選擇日期以篩選航班編號、出發地或航空公司"
        },
        selectDateDescCoach: {
            "en-US": "Select date to filter flight number, origin or airline",
            "zh-HK": "選擇日期以篩選客車服務",
            "zh-CN": "選擇日期以篩選客车服务"
        },
        currentWeather: {
            "en-US": "current weather in Hong Kong",
            "zh-HK": "香港天氣現況",
            "zh-CN": "香港天气现况"
        },
        currentTemp: {
            "en-US": "current temperature in Hong Kong",
            "zh-HK": "香港現時溫度",
            "zh-CN": "香港现时温度"
        },
        closeNotice: {
            "en-US": "Close Important Notice",
            "zh-HK": "關閉重要通知",
            "zh-CN": "关闭重要通知"
        },
        datepickerDesc: {
            "en-US": "Select date from calendar",
            "zh-HK": "從日曆選取日期",
            "zh-CN": "从日曆选取日期"
        },
        loungeDesc: {
            "en-US": "Table showing the information of the lounge of the airlines",
            "zh-HK": "選擇航空公司或地勤服務代理商列表",
            "zh-CN": "选择航空公司或地勤服务代理商列表"
        }
    })
}(), HKIA.config("develop_mode", /^localhost/i.test(location.host)), HKIA.config("_uat_", !1), /^www-staging.hkairport.com/i.test(location.host) ? HKIA.config("staging_mode", !0) : HKIA.config("staging_mode", !1), HKIA.config("prefix", "HKIA"), HKIA.config("browser_support", "ie9+, firefox, chrome, safari"), HKIA.config("cookie_key", {
    importantNoticeStatus: HKIA.config("prefix") + ".important-notice-status",
    importantNoticeLatestUpdate: HKIA.config("prefix") + ".important-notice-latest-update",
    flightBookmark: HKIA.config("prefix") + ".flight-bookmark",
    fontSize: HKIA.config("prefix") + ".font-size",
    weather: HKIA.config("prefix") + ".weather"
}), HKIA.config("cookie_settings", {
    expires: 365,
    path: "/"
}), HKIA.config("browser_language", navigator.language || navigator.userLanguage), HKIA.config("language", HKIA.config("browser_language"));
var lang = document.getElementsByTagName("HTML")[0].getAttribute("lang");
switch (lang) {
    case "sc":
        HKIA.config("language", "zh-CN");
        break;
    case "tc":
        HKIA.config("language", "zh-HK");
        break;
    default:
        HKIA.config("language", "en-US")
}
HKIA.config("default_font_size", "S"), HKIA.config("hk_time_zone", "+8"), HKIA.config("is_hk_time_zone", (new Date).getTimezoneOffset() / -60 == parseInt(HKIA.config("hk_time_zone"))), HKIA.config("hk_time", new Date((new Date).toGMTString() + (HKIA.config("is_hk_time_zone") ? "" : HKIA.config("hk_time_zone")))), HKIA.config("server_time", new Date), HKIA.config("visiting_time", new Date), HKIA.config("deviceType", "other"), /Mobile/i.test(navigator.userAgent) && (/iPhone|iPad|iPod/i.test(navigator.userAgent) && HKIA.config("deviceType", "ios"), (/Android|webOS|BlackBerry/i.test(navigator.userAgent) || /Windows Phone/i.test(navigator.userAgent)) && HKIA.config("deviceType", "android")), HKIA.config("hkia_app_protocol", "hkgmyflight://ArrivalBaggageNotice"), HKIA.config("hkia_domain", (HKIA.config("_uat_"), "//www.hongkongairport.com")), HKIA.config("hkia_dummy_api_domain", ""), HKIA.config("develop_mode") ? (HKIA.config("map_url", location.origin + "/" + lang + "/map.shtml"), HKIA.config("search_result_url", location.origin + "/" + lang + "/search-result.shtml")) : (HKIA.config("map_url", "/" + lang + "/map/index.page"), HKIA.config("search_result_url", "/" + lang + "/search-result.page")), HKIA.config("develop_mode") ? (HKIA.config("smartsearch_exact_flight_passenger_arrival", "/html/" + lang + "/flights/arrivals/useful-information.html"), HKIA.config("smartsearch_exact_flight_passenger_desparture", "/html/" + lang + "/flights/departures/useful-information.html")) : (HKIA.config("smartsearch_exact_flight_passenger_arrival", "/iwov-resources/smart-search/" + lang + "/flights/arrivals/useful-information.html"), HKIA.config("smartsearch_exact_flight_passenger_desparture", "/iwov-resources/smart-search/" + lang + "/flights/departures/useful-information.html")), HKIA.config("bookmarkTimeout", HKIA.config("develop_mode") ? 3e5 : 72e5), HKIA.config("mainlandcoach_api_dir", "/iwov-resources/custom/json/mainland-coach"), HKIA.config("mainlandcoach_airport_tacketing_detail", HKIA.config("mainlandcoach_api_dir") + "/toMainlandTacketingDetail.json"), HKIA.config("flight_info_icon_dir", "/iwov-resources/image/flights/airline-information/"), HKIA.config("API.AQHIBlobHost", (HKIA.config("_uat_"), "//aahkaqhi.blob.core.windows.net")), HKIA.config("API.AQHICmsHost", "//aahk-aqhi-cms.azurewebsites.net"), HKIA.config("API.ErrorMessage", HKIA.__("apiErrorMessage")), HKIA.config("autoPlaySpeed", 7e3);
var HKIA_Common_Flight_API_Config = {
        url: function() {
            if ("10.129.154.22" == location.host || "175.45.49.247" == location.host) {
                var e = this.data.date;
                return "function" == typeof e && (e = this.data.date()), HKIA.config("hkia_dummy_api_domain") + "/iwov-resources/custom/json/dummy/" + e + "/flights.json"
            }
            return HKIA.config("develop_mode") ? HKIA.config("hkia_dummy_api_domain") + "/iwov-resources/custom/json/flights.php" : HKIA.config("hkia_domain") + "/flightinfo-rest/rest/flights"
        },
        method: "GET",
        data: {
            span: 1,
            date: function() {
                var e = HKIA.config("server_time");
                HKIA.Clock && (e = HKIA.Clock.getCurrentDateObject());
                var t = e,
                    i = r("00:00"),
                    n = r("02:00");
                if (i > n) {
                    var a = i;
                    i = n, n = a
                }

                function r(e) {
                    var t = e.split(/:|\s/),
                        i = new Date;
                    return i.setHours(+t.shift()), i.setMinutes(+t.shift()), i.setSeconds(0), i
                }
                var o = t < n && t > i ? t.getDate() - 1 : t.getDate();
                return t.getFullYear() + "-" + ("0000" + (t.getMonth() + 1)).replace(/^.*(\d{2,2})$/, "$1") + "-" + ("0000" + o).replace(/^.*(\d{2,2})$/, "$1")
            },
            lang: function() {
                return "en-US" == HKIA.language() ? "en" : HKIA.language().replace(/-/g, "_")
            }
        },
        adapter: function(e) {
            var t = this,
                i = [];
            return $.each(e, function(e, n) {
                if ("cargo" in t.data && t.data.cargo !== n.cargo) return !0;
                if ("arrival" in t.data && t.data.arrival !== n.arrival) return !0;
                var a = [];
                for (var r in n.list) n.list[r].date = n.date, n.list[r].cargo = n.cargo, n.list[r].arrival = n.arrival, a.push(HKIA.Flight(n.list[r]));
                i = i.concat(a)
            }), {
                list: i.sort(function(e, t) {
                    return e._time - t._time
                })
            }
        },
        config: {
            cache: !1,
            error: function() {
                HKIA(".flightTableDataContainer").render({
                    key: "spError",
                    data: {
                        type: "flight"
                    }
                })
            }
        }
    },
    HKIA_Common_Flight_API_Config_History = {
        url: function() {
            if ("10.129.154.22" == location.host || "175.45.49.247" == location.host) {
                var e = this.data.date;
                return "function" == typeof e && (e = this.data.date()), HKIA.config("hkia_dummy_api_domain") + "/iwov-resources/custom/json/dummy/" + e + "/flights.json"
            }
            return HKIA.config("develop_mode") ? HKIA.config("hkia_dummy_api_domain") + "/iwov-resources/custom/json/flights.php" : HKIA.config("hkia_domain") + "/flightinfo-rest/rest/flights/past"
        },
        method: HKIA_Common_Flight_API_Config.method,
        data: HKIA_Common_Flight_API_Config.data,
        adapter: HKIA_Common_Flight_API_Config.adapter,
        config: {
            cache: !0,
            error: function() {
                HKIA(".flightTableDataContainer").render({
                    key: "spError",
                    data: {
                        type: "flight"
                    }
                })
            }
        }
    };
HKIA.config("API", {
        airlines: {
            url: function() {
                return "10.129.154.22" == location.host || "175.45.49.247" == location.host ? HKIA.config("hkia_dummy_api_domain") + "/iwov-resources/custom/json/dummy/airline.json" : HKIA.config("develop_mode") ? HKIA.config("hkia_dummy_api_domain") + "/iwov-resources/custom/json/airline.json" : HKIA.config("hkia_domain") + "/flightinfo-rest/rest/airlines"
            },
            method: "GET",
            adapter: function(e) {
                var t = {};
                return $.each(e, function(e, i) {
                    t[i.code] = i
                }), t
            }
        },
        airports: {
            url: function() {
                return "10.129.154.22" == location.host || "175.45.49.247" == location.host ? HKIA.config("hkia_dummy_api_domain") + "/iwov-resources/custom/json/dummy/airport.json" : HKIA.config("develop_mode") ? HKIA.config("hkia_dummy_api_domain") + "/iwov-resources/custom/json/airport.json" : HKIA.config("hkia_domain") + "/flightinfo-rest/rest/airports"
            },
            method: "GET",
            adapter: function(e) {
                var t = {};
                return $.each(e, function(e, i) {
                    t[i.code] = i
                }), t
            }
        },
        flightForSearch: HKIA.extend(!0, {}, HKIA_Common_Flight_API_Config, {
            data: {
                span: 2
            },
            adapter: function(e) {
                var t = {};
                return $.each(HKIA_Common_Flight_API_Config.adapter(e).list, function(e, i) {
                    $.each(i.flight, function(e, n) {
                        n.no in t || (t[n.no] = []), t[n.no].push(i)
                    })
                }), t
            }
        }),
        flightRecords: HKIA.extend(!0, {}, HKIA_Common_Flight_API_Config),
        flightRecordsHistory: HKIA.extend(!0, {}, HKIA_Common_Flight_API_Config_History),
        flightInfo: HKIA.extend(!0, {}, HKIA_Common_Flight_API_Config),
        autoCompltete: {
            url: "/iwov-resources/custom/json/autocomplete.json",
            adapter: function(e) {
                return {
                    shop1: ["shop", "din"]
                }
            }
        },
        "airport-city-mapping": {
            url: "/iwov-resources/custom/json/airport-city.json"
        },
        maps: {
            url: function() {
                switch (HKIA.language()) {
                    case "en-US":
                        return "/iwov-resources/custom/json/map_en.json";
                    case "zh-HK":
                        return "/iwov-resources/custom/json/map_tc.json";
                    case "zh-CN":
                        return "/iwov-resources/custom/json/map_sc.json";
                    default:
                        return "/iwov-resources/custom/json/map_en.json"
                }
            }
        },
        keywords: {
            url: "/iwov-resources/custom/json/general_keyword.json"
        },
        search: {
            url: function() {
                return HKIA.config("develop_mode") ? HKIA.config("hkia_dummy_api_domain") + "/iwov-resources/custom/search.php" : "/" + document.getElementsByTagName("HTML")[0].getAttribute("lang") + "/site-search-result.page"
            },
            method: "GET",
            data: {
                q: "",
                lang: HKIA.config("language"),
                page: 1
            },
            config: {
                dataType: "XML"
            },
            adapter: function(e) {
                var t = {
                        total: 0,
                        offset: 0,
                        limit: 0,
                        cats: [],
                        list: []
                    },
                    i = $(e).find("root Response Pagination");
                return t.total = parseInt(i.find("Total").text()), t.offset = parseInt(i.find("Offset").text()), t.limit = parseInt(i.find("Limit").text()), $.each($(e).find("root Response Categories").children(), function(e, i) {
                    t.cats.push({
                        key: $(i).attr("key"),
                        total: $(i).attr("count"),
                        name: $(i).text()
                    })
                }), $.each($(e).find("root Response Hits").children(), function(e, i) {
                    var n = {};
                    for (e = 0; e < i.childElementCount; e++) n[i.childNodes[e].tagName] = $(i.childNodes[e]).text();
                    t.list.push(n)
                }), t
            }
        },
        shopAndDineSearch: {
            url: function() {
                return HKIA.config("develop_mode") ? HKIA.config("hkia_dummy_api_domain") + "/iwov-resources/custom/search.php" : "/" + document.getElementsByTagName("HTML")[0].getAttribute("lang") + "/site-search-result.page"
            },
            method: "GET",
            data: {
                q: "",
                lang: HKIA.config("language"),
                page: 1,
                type: "shopDine"
            },
            config: {
                dataType: "XML"
            },
            adapter: function(e) {
                var t = [],
                    i = {};
                return $("root>shopDineInfo", e).each(function(e, t) {
                    var n = {};
                    $(t).children().each(function(e, t) {
                        n[t.tagName] = $(t).text()
                    });
                    var a = n.friendlyUrl.split("/").pop();
                    i[a] = n
                }), $.each(Object.keys(i).sort(function(e, t) {
                    return e.url < t.url ? -1 : e.url > t.url ? 1 : 0
                }), function(e, n) {
                    t[e] = i[n]
                }), t
            }
        },
        keywordSearch: {
            url: function() {
                return HKIA.config("develop_mode") ? HKIA.config("hkia_dummy_api_domain") + "/iwov-resources/custom/search.php" : "/" + document.getElementsByTagName("HTML")[0].getAttribute("lang") + "/site-search-result.page"
            },
            method: "GET",
            data: {
                q: "",
                lang: HKIA.config("language"),
                page: 1,
                type: "general"
            },
            config: {
                dataType: "XML"
            },
            adapter: function(e) {
                var t = {
                    data: []
                };
                return $("root", e).children().each(function(e, i) {
                    var n = {};
                    $(i).children().each(function(e, t) {
                        n[t.tagName] = $(t).text()
                    }), t.data.push(n)
                }), t
            }
        },
        nearGate: {
            url: function() {
                return HKIA.config("develop_mode") ? HKIA.config("hkia_dummy_api_domain") + "/iwov-resources/custom/search.php" : "/" + document.getElementsByTagName("HTML")[0].getAttribute("lang") + "/site-search-result.page"
            },
            method: "GET",
            data: {
                q: "",
                lang: HKIA.config("language"),
                page: 1,
                type: "nearShop"
            },
            config: {
                dataType: "XML"
            },
            adapter: function(e) {
                var t = {
                    promotion: {},
                    list: []
                };
                return $("root>promotion>datum", e).children().each(function(e, i) {
                    t.promotion[i.tagName] = $(i).text()
                }), $("root>normal>datum", e).each(function(e, i) {
                    var n = {};
                    $(i).children().each(function(e, t) {
                        n[t.tagName] = $(t).text()
                    }), t.list.push(n)
                }), t
            }
        },
        weather: {
            url: function() {
                return "10.129.154.22" == location.host || "175.45.49.247" == location.host || HKIA.config("develop_mode") ? HKIA.config("hkia_dummy_api_domain") + "/iwov-resources/custom/json/currentWX.json" : "/wxinfo/rest/currentWX"
            },
            method: "GET",
            adapter: function(e, t, i) {
                return HKIA.extend(e, {
                    latestUpdate: new Date
                })
            },
            config: {
                cache: !0,
                error: function() {
                    HKIA(".todayWeather .row").render({
                        key: "spError"
                    }), HKIA(".weatherLastUpdate").hide()
                }
            }
        },
        forecast: {
            url: function() {
                return "10.129.154.22" == location.host || "175.45.49.247" == location.host || HKIA.config("develop_mode") ? HKIA.config("hkia_dummy_api_domain") + "/iwov-resources/custom/json/wxForecast.json" : HKIA.config("hkia_domain") + "/wxinfo/rest/wxForecast"
            },
            method: "GET",
            adapter: function(e) {
                return {
                    list: e
                }
            },
            config: {
                cache: !0,
                error: function() {
                    HKIA(".todayWeather .row").render({
                        key: "spError"
                    }), HKIA(".weatherLastUpdate").hide()
                }
            }
        },
        weather_warning: {
            url: function() {
                return "10.129.154.22" == location.host || "175.45.49.247" == location.host || HKIA.config("develop_mode") ? HKIA.config("hkia_dummy_api_domain") + "/iwov-resources/custom/json/wxWarning.json" : "/wxinfo/rest/wxWarning"
            },
            method: "GET",
            adapter: function(e) {
                var t = [];
                for (var i in e) {
                    var n = e[i];
                    n.inForce && (n.code = i, t.push(n))
                }
                return t
            },
            config: {
                cache: !0,
                error: function() {
                    HKIA(".todayWeather .row").render({
                        key: "spError"
                    }), HKIA(".weatherLastUpdate").hide()
                }
            }
        },
        weather_global: {
            url: function() {
                return "10.129.154.22" == location.host || "175.45.49.247" == location.host || HKIA.config("develop_mode") ? HKIA.config("hkia_dummy_api_domain") + "/iwov-resources/custom/json/citiesWX.json" : HKIA.config("hkia_domain") + "/wxinfo/rest/citiesWX"
            },
            method: "GET",
            adapter: function(e) {
                var t = {
                        BRIGHT: "br",
                        CLOUDY: "cu",
                        COLD: "cd",
                        COOL: "cl",
                        DRIZZLE: "de",
                        DRY: "dr",
                        FINE: "fn",
                        "FINE TO CLOUDY": "fc",
                        FOG: "fg",
                        HAZE: "hz",
                        "HEAVY RAIN": "hr",
                        HOT: "ht",
                        HUMID: "hm",
                        "LIGHT RAIN": "lr",
                        "MAINLY CLOUDY": "mc",
                        "MAINLY FINE": "mf",
                        MIST: "mt",
                        "MODERATE RAIN": "mr",
                        OVERCAST: "ov",
                        RAIN: "rn",
                        SHOWERS: "sh",
                        SNOW: "sn",
                        SUNNY: "su",
                        "SUNNY INTERVALS": "si",
                        "SUNNY INTERVALS WITH SHOWERS": "ss",
                        "SUNNY PERIODS": "sp",
                        "SUNNY PERIODS WITH A FEW SHOWERS": "is",
                        THUNDERSTORMS: "ts",
                        WARM: "wm",
                        WINDY: "wd",
                        SANDSTORM: "sm"
                    },
                    i = {};
                return $.each(e, function(e, n) {
                    if ((r = n.weather) && r.constructor === Array) {
                        var a = n.weather;
                        n.weather = {
                            type: t[a[0]],
                            description: a
                        }, i[n.code] = n
                    }
                    var r
                }), i
            },
            config: {
                error: function() {
                    HKIA("[data-api-key]").render({
                        key: "spError"
                    }).next().hide()
                }
            }
        },
        air_sa: {
            url: function() {
                return HKIA.config("develop_mode") ? "/iwov-resources/custom/json/airSA.json" : HKIA.config("API.AQHICmsHost") + "/wp-json/wp/v2/posts/"
            },
            method: "GET"
        },
        air_sa_aqhi: {
            url: function() {
                return HKIA.config("develop_mode") ? "/iwov-resources/custom/json/airSA-AQHI.json" : HKIA.config("API.AQHICmsHost") + "/wp-json/wp/v2/pages/4"
            },
            method: "GET"
        },
        air_aqhi: {
            url: function() {
                return HKIA.config("develop_mode") ? "/iwov-resources/custom/json/current-past-24.json" : HKIA.config("API.AQHIBlobHost") + "/json/current-past-24.json"
            },
            method: "GET",
            adapter: function(e) {
                var t = {
                        ES: {
                            pieChart: HKIA.config("API.AQHIBlobHost") + "/charts/past-24-hours-es-pie.png"
                        },
                        LK: {
                            pieChart: HKIA.config("API.AQHIBlobHost") + "/charts/past-24-hours-lk-pie.png"
                        },
                        ST: {
                            pieChart: HKIA.config("API.AQHIBlobHost") + "/charts/past-24-hours-st-pie.png"
                        }
                    },
                    i = {
                        stations: {}
                    };
                return HKIA.config("is_hk_time_zone") ? (i.updated = new Date(e.updated), i.asOf = new Date(e.asOf)) : (i.updated = new Date(new Date(e.updated).toGMTString() + HKIA.config("hk_time_zone")), i.asOf = new Date(new Date(e.asOf).toGMTString() + HKIA.config("hk_time_zone"))), $.each(t, function(t, n) {
                    var a = Object.keys(e.stations[t]).sort().pop(),
                        r = a.replace(/^(\d{4,4})(\d{2,2})(\d{2,2})(\d{2,2})$/, "$1,$2,$3,$4").split(",");
                    i.stations[t] = $.extend({
                        update: new Date(r[0], parseInt(r[1], 10) - 1, r[2], r[3])
                    }, n, e.stations[t][a])
                }), i
            }
        },
        air_aqhi_past24: {
            url: function() {
                return HKIA.config("develop_mode") ? "/iwov-resources/custom/json/current-past-24.json" : HKIA.config("API.AQHIBlobHost") + "/json/current-past-24.json"
            },
            method: "GET",
            adapter: function(e) {
                var t = {
                        ES: {
                            chart: HKIA.config("API.AQHIBlobHost") + "/charts/past-24-hours-es.png"
                        },
                        LK: {
                            chart: HKIA.config("API.AQHIBlobHost") + "/charts/past-24-hours-lk.png"
                        },
                        ST: {
                            chart: HKIA.config("API.AQHIBlobHost") + "/charts/past-24-hours-st.png"
                        }
                    },
                    i = {
                        stations: {}
                    };
                return HKIA.config("is_hk_time_zone") ? (i.updated = new Date(e.updated), i.asOf = new Date(e.asOf)) : (i.updated = new Date(new Date(e.updated).toGMTString() + HKIA.config("hk_time_zone")), i.asOf = new Date(new Date(e.asOf).toGMTString() + HKIA.config("hk_time_zone"))), HKIA.each(t, function(t, n) {
                    var a = Object.keys(e.stations[t]).sort();
                    i.stations[t] = HKIA.extend({
                        list: []
                    }, n), $.each(a, function(n, a) {
                        var r = a.replace(/^(\d{4,4})(\d{2,2})(\d{2,2})(\d{2,2})$/, "$1,$2,$3,$4").split(",");
                        i.stations[t].list.push(HKIA.extend({
                            update: new Date(r[0], parseInt(r[1], 10) - 1, r[2], r[3], 0, 0, 0)
                        }, e.stations[t][a]))
                    })
                }), i
            }
        },
        air_monthly: {
            url: function() {
                var e = "";
                return e = /^q/.test(this.urlData.month) ? HKIA.config("API.AQHIBlobHost") + "/json/" + this.urlData.year + "/" + this.urlData.month + "/quarterly.json" : HKIA.config("API.AQHIBlobHost") + "/json/" + this.urlData.year + "/" + ("0000" + parseInt(this.urlData.month, 10)).replace(/^.*(\d{2,2})$/, "$1") + "/monthly.json", HKIA.config("develop_mode"), e
            },
            urlData: {
                year: "2017",
                month: "09"
            },
            method: "GET",
            adapter: function(e) {
                return e.updated = new Date(e.updated), e
            }
        },
        air_monthly_excel: {
            url: function() {
                return HKIA.config("develop_mode") ? "/iwov-resources/custom/json/monthly-excel-index.json" : HKIA.config("API.AQHIBlobHost") + "/json/monthly-excel-index.json"
            },
            method: "GET"
        },
        promotions: {
            adapter: function(e) {
                var t = {},
                    i = [],
                    n = {},
                    a = [],
                    r = HKIA.Clock.getCurrentDateObject();
                $.each(e.shops, function(e, n) {
                    var a = n["publish-date"].split(" "),
                        o = a[0].split("-"),
                        s = a[1].split(":");
                    publish = new Date(o[0], parseInt(o[1], 10) - 1, o[2], s[0], s[1], s[2]);
                    var l = n["expiry-date"].split(" "),
                        c = l[0].split("-"),
                        h = l[1].split(":");
                    expiry = new Date(c[0], parseInt(c[1], 10) - 1, c[2], h[0], h[1], h[2]), publish < r && expiry > r && (t[e] = n, i.push({
                        code: e,
                        url: n["friendly-url"].split("/").pop()
                    }))
                }), $.each(e.filter, function(e, t) {
                    n[e] = t, a.push({
                        group: e,
                        name: t
                    })
                });
                var o = {},
                    s = {};
                return a.reverse(), $.each(i.sort(function(e, t) {
                    return e.url < t.url ? -1 : e.url > t.url ? 1 : 0
                }), function(e, i) {
                    o[i.code] = t[i.code]
                }), e.shops = o, $.each(a.sort(function(e, t) {
                    var i = parseInt(e.group.replace("group", "")),
                        n = parseInt(t.group.replace("group", ""));
                    return i < n ? -1 : i > n ? 1 : 0
                }), function(e, t) {
                    s[t.group] = n[t.group]
                }), e.filter = s, e
            }
        },
        snd_categories: {
            url: function() {
                switch (HKIA.language()) {
                    case "en-US":
                        return "/iwov-resources/custom/json/shops_en.json";
                    case "zh-HK":
                        return "/iwov-resources/custom/json/shops_tc.json";
                    case "zh-CN":
                        return "/iwov-resources/custom/json/shops_sc.json";
                    default:
                        return "/iwov-resources/custom/json/shops_en.json"
                }
            },
            filter: "shopping",
            adapter: function(e) {
                var t = [],
                    i = {},
                    n = HKIA.Clock.getCurrentDateObject(),
                    a = e.kind[this.filter].catidx;
                return $.each(e.brand, function(e, i) {
                    var r = !1;
                    if ($.each(i.cat, function(e, t) {
                            if (r) return !1;
                            r = $.inArray(t, a) > -1
                        }), r) {
                        var o = i["publish-date"].split(" "),
                            s = o[0].split("-"),
                            l = o[1].split(":");
                        s = new Date(s[0], parseInt(s[1], 10) - 1, s[2], l[0], l[1], l[2]);
                        var c = i["expiry-date"].split(" "),
                            h = c[0].split("-"),
                            d = c[1].split(":");
                        h = new Date(h[0], parseInt(h[1], 10) - 1, h[2], d[0], d[1], d[2]), HKIA.config("staging_mode") ? h > n && t.push({
                            url: i["friendly-url"],
                            code: e
                        }) : s < n && h > n && t.push({
                            url: i["friendly-url"],
                            code: e
                        })
                    }
                }), $.each(t.sort(function(e, t) {
                    return e.url < t.url ? -1 : e.url > t.url ? 1 : 0
                }), function(t, n) {
                    i[n.code] = e.brand[n.code]
                }), e.kind = e.kind[this.filter], e.brand = i, e
            }
        },
        airlines_info: {
            url: function() {
                switch (HKIA.language()) {
                    case "en-US":
                        return "/iwov-resources/custom/json/airline_en.json";
                    case "zh-HK":
                        return "/iwov-resources/custom/json/airline_tc.json";
                    case "zh-CN":
                        return "/iwov-resources/custom/json/airline_sc.json";
                    default:
                        return "/iwov-resources/custom/json/airline_en.json"
                }
            },
            adapter: function(e) {
                var t = [];
                return $.each(e.airline, function(i, n) {
                    var a = [];
                    $.each(n["airline-lounge"], function(t, i) {
                        a.push($.extend({
                            code: i
                        }, e["airline-lounge"][i]))
                    }), t.push($.extend({
                        code: i,
                        lounge: a
                    }, n))
                }), t
            }
        },
        airlines_info_gha: {
            url: function() {
                switch (HKIA.language()) {
                    case "en-US":
                        return "/iwov-resources/custom/json/airline_en.json";
                    case "zh-HK":
                        return "/iwov-resources/custom/json/airline_tc.json";
                    case "zh-CN":
                        return "/iwov-resources/custom/json/airline_sc.json";
                    default:
                        return "/iwov-resources/custom/json/airline_en.json"
                }
            },
            adapter: function(e) {
                var t = {},
                    i = [];
                $.each(e["ground-handling-agent"], function(e, t) {
                    i.push({
                        name: t.name,
                        key: e
                    })
                }), $.each(i.sort(function(e, t) {
                    return e.name < t.name ? -1 : e.name > t.name ? 1 : 0
                }), function(i, n) {
                    t[n.key] = e["ground-handling-agent"][n.key]
                }), e["ground-handling-agent"] = t;
                var n = {};
                return $.each(e["ground-handling-agent"], function(t, i) {
                    var a = [];
                    $.each(e.airline, function(e, t) {
                        $.inArray(i.name, t["ground-handling-agent"]) > -1 && a.push($.extend({
                            code: e
                        }, t))
                    }), n[t] = $.extend({
                        airlines: a.sort(function(e, t) {
                            return e["all-names"][0] < t["all-names"][0] ? -1 : e["all-names"][0] > t["all-names"][0] ? 1 : 0
                        })
                    }, i)
                }), n
            }
        },
        important_notice: {
            url: function() {
                switch (HKIA.language()) {
                    case "en-US":
                        return "/iwov-resources/custom/json/important-notice_en.json";
                    case "zh-HK":
                        return "/iwov-resources/custom/json/important-notice_tc.json";
                    case "zh-CN":
                        return "/iwov-resources/custom/json/important-notice_sc.json";
                    default:
                        return "/iwov-resources/custom/json/important-notice_en.json"
                }
            },
            adapter: function(e) {
                var t = [];

                function i(e) {
                    return new Date(e[0], e[1], e[2], e[3], e[4], e[5], 0)
                }
                return $.each(e.detail, function(e, n) {
                    var a = n["publish-date"].replace(/[\s\:\-]/g, ",").split(",");
                    a[1] = parseInt(a[1], 10) - 1;
                    var r = n["expiry-date"].replace(/[\s\:\-]/g, ",").split(",");
                    r[1] = parseInt(r[1], 10) - 1;
                    var o = HKIA.Clock.getCurrentDateObject();
                    n._time = i(a), HKIA.config("staging_mode") ? o <= i(r) && t.push(n) : o >= i(a) && o <= i(r) && t.push(n)
                }), e.detail = t.sort(function(e, t) {
                    return t._time - e._time
                }), e
            }
        },
        carbon_reduction: {
            url: function() {
                switch (HKIA.language()) {
                    case "en-US":
                        return "/iwov-resources/custom/json/carbon-reduction_en.json";
                    case "zh-HK":
                        return "/iwov-resources/custom/json/carbon-reduction_tc.json";
                    case "zh-CN":
                        return "/iwov-resources/custom/json/carbon-reduction_sc.json";
                    default:
                        return "/iwov-resources/custom/json/carbon-reduction_en.json"
                }
            }
        },
        carpark: {
            url: function() {
                return HKIA.config("develop_mode") || HKIA.config("_uat_") ? "//aahkcarpark.blob.core.windows.net/staging/data.json" : "//nyankotan.github.io/data/data.json"
            },
            config: {
                timeout: 2500,
                dataType: "jsonp",
                jsonpCallback: "jsonpCallback"
            }
        },
        carparkManual: {
            url: function() {
                return HKIA.config("develop_mode") || HKIA.config("_uat_") ? "//aahkcarpark.blob.core.windows.net/staging/manual.json" : "//nyankotan.github.io/data/manual.json"
            },
            config: {
                timeout: 2500,
                dataType: "jsonp",
                jsonpCallback: "jsonpCallback2"
            }
        }
    }), HKIA._configProp("readOnly", !0), $.widget(HKIA.config("prefix") + ".hkia_selectmenu", $.ui.selectmenu, {
        options: {
            append: "body",
            size: 6,
            scrollOptions: {
                autoReinitialise: !0
            }
        },
        _init: function() {
            var e = this._superApply(arguments),
                t = $("<div/>", {
                    class: "hkia_customSelect"
                });
            return $.isMobile() && (t.addClass("hkia_customSelect_mobile"), $(this.element).show().change(function(e) {
                $(e.currentTarget).trigger("hkia_selectmenuchange").hkia_selectmenu("refresh")
            })), $(this.element).next().wrap(t).before(this.element), e
        },
        _renderButtonItem: function(e) {
            var t = this._superApply(arguments);
            return e.element.parent().next().attr("aria-describedby", e.element.parent().attr("data-class")), t
        },
        _renderMenu: function(e) {
            var t = this._superApply(arguments);
            return e.parents(".ui-selectmenu-inner-scroll").length || e.wrap($("<div/>", {
                class: "ui-selectmenu-inner-scroll",
                css: {
                    overflow: "auto"
                }
            })), t
        },
        menuWidget: function() {
            return this._superApply(arguments).parents(".ui-selectmenu-inner-scroll")
        },
        close: function() {
            this.menuWidget();
            return this._superApply(arguments)
        },
        open: function(e, t) {
            if ($.isMobile()) return this;
            var i = this.options,
                n = this._superApply(arguments),
                a = this.element.parents().filter(function(e, t) {
                    return /hidden|auto|scroll/.test($(t).css("overflow-y")) || /hidden|auto|scroll/.test($(t).css("overflow"))
                }).first(),
                r = (a.offset(), 0);
            r = a.length && "BODY" != a.get(0).tagName ? a.scrollTop() + a.outerHeight(!0) : $(window).scrollTop() + $(window).height();
            var o = this.menuWidget(),
                s = o.parent().offset(),
                l = o.find(".ui-state-active"),
                c = o.height("").height(function() {
                    return o.find("li:first").outerHeight(!0) * Math.min(o.find("li").length, i.size)
                }).outerHeight(!0);
            switch ("jScrollPane" in $.fn && (o.data("jsp") ? o.data("jsp").reinitialise() : (o.jScrollPane(this.options.scroll), o.data("jsp").scrollTo(0, l.position().top))), this.options.append) {
                case "parent":
                    o.parent().appendTo($("[aria-owns=" + this.element.attr("id") + "-menu]"));
                    break;
                case "body":
                    break;
                default:
                    o.parent().appendTo($(this.options.append))
            }
            return r < s.top + c ? o.parent().position({ of: $("[aria-owns=" + this.element.attr("id") + "-menu]"),
                my: "left bottom",
                at: "left top",
                collision: "none"
            }) : o.parent().position({ of: $("[aria-owns=" + this.element.attr("id") + "-menu]"),
                my: "left top",
                at: "left bottom",
                collision: "none"
            }), n
        }
    }), HKIA.datepicker.regional.en.dateFormat = HKIA.datepicker.regional["en-US"].dateFormat = "d M yy",
    function(e) {
        "function" == typeof define && define.amd ? define(["../widgets/datepicker"], e) : e(jQuery.datepicker)
    }(function(e) {
        return e.regional["zh-CN"] = {
            closeText: "关闭",
            prevText: "&#x3C;上月",
            nextText: "下月&#x3E;",
            currentText: "今天",
            monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthNamesShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
            weekHeader: "周",
            dateFormat: "yy年Md日",
            firstDay: 1,
            isRTL: !1,
            showMonthAfterYear: !0,
            yearSuffix: "年"
        }, e.setDefaults(e.regional["zh-CN"]), e.regional["zh-CN"]
    }),
    function(e) {
        "function" == typeof define && define.amd ? define(["../widgets/datepicker"], e) : e(jQuery.datepicker)
    }(function(e) {
        return e.regional["zh-HK"] = {
            closeText: "關閉",
            prevText: "&#x3C;上月",
            nextText: "下月&#x3E;",
            currentText: "今天",
            monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthNamesShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            dayNames: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
            dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
            dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
            weekHeader: "周",
            dateFormat: "yy年Md日",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !0,
            yearSuffix: "年"
        }, e.setDefaults(e.regional["zh-HK"]), e.regional["zh-HK"]
    });
var _generateHTML = $.datepicker._generateHTML;
$.datepicker._generateHTML = function(e) {
    var t = _generateHTML.call(this, e),
        i = $(t);
    return i.filter(".ui-datepicker-header").find(".ui-datepicker-next").after(function() {
        return $("<a/>", {
            class: "ui-datepicker-current ui-corner-all",
            "data-handler": "today",
            "data-event": "click",
            title: $.datepicker._defaults.currentText,
            click: function(t) {
                t.preventDefault(), $(e.input).datepicker("setDate", $.datepicker._get(e, "beforeGoToCurrentDate")())
            },
            html: function() {
                return $("<span/>", {
                    class: "ui-icon ui-icon-home",
                    text: $.datepicker._defaults.currentText
                })
            }
        })
    }), i
};
var _findPos = $.datepicker._findPos;

function parseDate(e) {
    var t = !1;
    if ("en-US" == HKIA.language()) try {
        t = $.datepicker.parseDate("dd M yy", e)
    } catch (e) {
        t = new Date(void 0)
    } else try {
        t = $.datepicker.parseDate("yy年mm月dd日", e)
    } catch (e) {
        t = new Date(void 0)
    }
    return t
}

function homeBanner() {
    $(".hsliderBox").one("init", function(e) {
        var t = HKIA().statusDispatcher("status"),
            i = HKIA.trim(t.device + " " + (t.orientation || ""));
        $('.hsliderBox [data-slick-index="0"]>span:not(.multiDeviceBg)').addClass("multiDeviceBg").css({
            "background-image": function() {
                return "url(" + ("desktop" == i || "tablet landscape" == i || "tablet portrait" == i ? HKIA(this).attr("data-src-desktop") : HKIA(this).attr("data-src-mobile")) + ")"
            }
        }), $slickList = $(".slick-list"), $slickList.removeAttr("aria-live"), $slickList.on("focus", function() {
            $slickList.attr("aria-live", "polite")
        }), $slickList.on("blur").removeAttr("aria-live")
    }).one("beforeChange", function(e, t, i, n) {
        var a = HKIA().statusDispatcher("status"),
            r = HKIA.trim(a.device + " " + (a.orientation || ""));
        $(".hsliderBox .slick-slide>span:not(.multiDeviceBg)").addClass("multiDeviceBg").css({
            "background-image": function() {
                return "url(" + ("desktop" == r || "tablet landscape" == r || "tablet portrait" == r ? HKIA(this).attr("data-src-desktop") : HKIA(this).attr("data-src-mobile")) + ")"
            }
        })
    }).slick({
        lazyLoad: "ondemand",
        dots: !0,
        infinite: !0,
        speed: 400,
        autoplay: !0,
        autoplaySpeed: 5e3,
        appendDots: $(".bannerDots")
    }), setTimeout(function() {
        $(".slogan, .passenger").addClass("gAni")
    }, 100), setTimeout(function() {
        $(".slogan").addClass("ready")
    }, 1e3), setTimeout(function() {
        $(".passenger").addClass("ready")
    }, 1300)
}
$.datepicker._findPos = function(e) {
    for (var t, i, n = this._getInst(e), a = this._get(n, "isRTL"); e && ("hidden" === e.type || 1 !== e.nodeType || $.expr.filters.hidden(e));) e = e[a ? "previousSibling" : "nextSibling"];
    switch (n.settings.append) {
        case "parent":
            return [(t = $(e).position()).left, t.top];
        case "body":
            return [(t = $(e).offset()).left, t.top];
        default:
            return t = $(e).offset(), i = $(e).parents().filter(function(e, t) {
                return /absolute|relative/i.test($(t).css("position"))
            }).first().offset(), [t.left - i.left, t.top - t.top]
    }
}, $.datepicker.setDefaults($.datepicker.regional[HKIA.language()]), $.datepicker._defaults.beforeGoToCurrentDate = function() {
    return new Date
}, $.widget(HKIA.config("prefix") + ".hkia_datepicker", {
    options: {
        regional: HKIA.language(),
        todayButton: !0,
        append: "parent"
    },
    _create: function() {
        var e = this,
            t = (this.element, this.element.attr("min")),
            i = this.element.attr("max"),
            n = this.options.beforeShow,
            a = this.options.onClose,
            r = this.options.onSelect;
        $.datepicker.setDefaults($.datepicker.regional[this.options.regional]), this.element.attr({
            readonly: !0
        }).focus(function(e) {
            e.currentTarget.blur()
        }), this.element.datepicker($.extend({
            minDate: t,
            maxDate: i
        }, this.options, {
            onSelect: function() {
                if ($(this).trigger("change"), r) var e = r.apply(this, arguments);
                return e
            },
            onClose: function() {
                if (e._trigger("close"), a) var t = a.apply(this, arguments);
                return t
            },
            beforeShow: function(t, i) {
                if (e._trigger("beforeshow"), $("#ui-datepicker-div :last-child").is("table") && setTimeout(function() {
                        $(".ui-datepicker-calendar").attr("summary", HKIA.__("datepickerDesc"))
                    }, 500), n) var a = n.apply(this, arguments);
                switch (i.settings.append) {
                    case "parent":
                        $(t).parent().append(i.dpDiv);
                        break;
                    case "body":
                        break;
                    default:
                        $(this.options.append).append(i.dpDiv)
                }
                return a
            }
        }))
    },
    destroy: function() {
        var e = Array.apply(null, arguments);
        return e.unshift("destroy"), $(this.element).datepicker.apply($(this.element), e)
    },
    dialog: function() {
        var e = Array.apply(null, arguments);
        return e.unshift("dialog"), $(this.element).datepicker.apply($(this.element), e)
    },
    getDate: function() {
        var e = Array.apply(null, arguments);
        return e.unshift("getDate"), $(this.element).datepicker.apply($(this.element), e)
    },
    hide: function() {
        var e = Array.apply(null, arguments);
        return e.unshift("hide"), $(this.element).datepicker.apply($(this.element), e)
    },
    isDisabled: function() {
        var e = Array.apply(null, arguments);
        return e.unshift("isDisabled"), $(this.element).datepicker.apply($(this.element), e)
    },
    option: function() {
        var e = Array.apply(null, arguments);
        return e.unshift("option"), $(this.element).datepicker.apply($(this.element), e)
    },
    refresh: function() {
        var e = Array.apply(null, arguments);
        return e.unshift("refresh"), $(this.element).datepicker.apply($(this.element), e)
    },
    setDate: function() {
        var e = Array.apply(null, arguments);
        return e.unshift("setDate"), $(this.element).datepicker.apply($(this.element), e)
    },
    show: function() {
        var e = Array.apply(null, arguments);
        return e.unshift("show"), $(this.element).datepicker.apply($(this.element), e)
    },
    widget: function() {
        var e = Array.apply(null, arguments);
        return e.unshift("widget"), $(this.element).datepicker.apply($(this.element), e)
    }
}), $.widget(HKIA.config("prefix") + ".hkia_autocomplete", $.ui.autocomplete, {
    response: function(e, t) {
        this._superApply(arguments)
    }
}), $.widget(HKIA.config("prefix") + ".hkia_searchfield", $.HKIA.hkia_autocomplete, {
    options: {
        source: function(e, t) {
            this.options.searchProvider ? this.options.searchProvider(e.term, function() {
                t(Object.keys(this.suggestedList()))
            }) : HKIA.log("search provider not setup yet")
        },
        searchProvider: null,
        appendTo: function() {
            return $(this).parent()
        },
        onSubmit: function() {}
    },
    _create: function() {
        var e = this;
        "function" == typeof this.options.appendTo && (this.options.appendTo = this.options.appendTo.call(this.element));
        var t = this.options,
            i = this.options.select;
        this.options.select = function() {
            setTimeout(function() {
                e.submit(), i && i.apply(this, arguments)
            }, 500)
        }, this.submit(function(e) {
            var i = arguments,
                n = this;
            setTimeout(function() {
                t.onSubmit.apply(n, i)
            }, 500)
        }), this._superApply(arguments), $(this.element).on("keydown", function(t) {
            $.keyCheck(t).isEnter() && (e.submit(), t.preventDefault())
        }), this.menu.activeMenu.addClass("searchBoxPlaceHolder")
    },
    submit: function(e) {
        var t = $(this.element);
        arguments.length ? t.on("submit", function(t) {
            e.apply(this, arguments)
        }) : "" !== t.val() && t.triggerHandler("submit")
    }
}), $.widget(HKIA.config("prefix") + ".hkia_submenu", {
    options: {
        mobile: !1,
        expandableClass: "expandable",
        expandableBtnTemplate: '<div class="btnGroup"><a href="javascript:;" class="btnClose" title="Close menu"><span></span></a><a href="javascript:;" class="btnExpand icon-lv3-expand" title="View all menu"></a></div>'
    },
    _init: function() {
        var e = this,
            t = $(this.element);
        t.filter("." + this.options.expandableClass).children("ul").after(function() {
            var t = $(e.options.expandableBtnTemplate).addClass("expandCollapseButton");
            return t.click(function() {
                e.expand(!e.expand())
            }), $("<div />", {
                class: "expandMenu"
            }).append($(this).clone()).add(t)
        }), t.children("ul").wrap('<div class="menuInner"/>').width(function() {
            var e = 0;
            return $(this).children().each(function(t, i) {
                e += $(i).outerWidth()
            }), e + 2
        }), this.mobile(this.options.mobile)
    },
    mobile: function(e) {
        if (!arguments.length) return this.hasClass("mobile");
        var t = $(this.element);
        return this.reset(), e ? (t.addClass("mobile").trigger("mobile", e), this.refresh()) : t.addClass("desktop").trigger("mobile", e), this
    },
    expand: function(e) {
        var t = $(this.element);
        if (!arguments.length) return t.hasClass("expand");
        if (t.find(".expandMenu").off($.transitionEnd), e) {
            if (!this.expand()) {
                var i = t.find(".expandMenu").show().height();
                t.find(".expandMenu").css({
                    display: ""
                }), t.addClass("expand").trigger("expand", e), t.find(".expandMenu").height(i), this.refresh()
            }
        } else this.expand() && t.find(".expandMenu").height("").one($.transitionEnd, function(i) {
            t.removeClass("expand").trigger("expand", e)
        });
        return this
    },
    refresh: function(e) {
        $(this.element).find(".menuInner>ul").width(function() {
            var e = 0;
            return $(this).children().each(function(t, i) {
                e += $(i).outerWidth()
            }), e + 2
        });
        var t = $(this.element).trigger("refresh");
        return $(".menuInner .current").length > 0 && (t.find(".expandCollapseButton").hide(), t.find(".menuInner").stop().animate({
            scrollLeft: t.find(".menuInner").scrollLeft() + t.find(".menuInner .current").position().left
        }, isNaN(e) ? 500 : e), t.find(".menuInner").width() < t.find(".menuInner>*").outerWidth() && t.hasClass(this.options.expandableClass) && t.find(".expandCollapseButton").show()), this
    },
    reset: function() {
        return this.element.removeClass("mobile desktop"), this
    }
}), HKIA.airIndex = function(e) {
    arguments.callee;
    var t = HKIA.extend(!0, {
        init: !1,
        elementsClass: "",
        areasClass: "",
        titleId: ""
    }, e);
    return HKIA.airIndex = {
        select: function(e) {
            datas = $("." + t.elementsClass + "[data-id=" + e + "]").attr("data-data").split(",");
            for (var i = 1; i <= 3; i++) $("." + t.areaClass + "[data-area=" + i + "]").html(datas[i - 1]), $(".area-index[data-area=" + i + "]").html(datas[i - 1]), datas[3] < 2 ? risk = "Low Risk" : 3 == datas[3] ? risk = "Medium Risk" : risk = "High Risk";
            $(".ui-selectmenu-text").html($("." + t.elementsClass + "[data-id=" + e + "]").html()), $("." + t.elementsClass).removeClass("selected-index"), $("." + t.elementsClass + "[data-id=" + e + "]").addClass("selected-index")
        }
    }, t.init && t.init.call(HKIA.airIndex), HKIA.airIndex
}, HKIA.Content = function(e, t) {
    var i = arguments.callee,
        n = HKIA.extend({
            init: !1
        }, t);
    return HKIA.Content = HKIA.create("content", HKIA(e), {
        destroy: function() {
            HKIA.Content = i
        }
    }), n.init && n.init.call(HKIA.Content), HKIA.Content
}, HKIA.Header = function(e, t) {
    var i = arguments.callee,
        n = HKIA(e),
        a = HKIA.extend(!0, {
            init: !1,
            languageSelector: ".navLang",
            fontSizeSelector: ".toolFont",
            miniSearch: ".miniSearchBox",
            weatherOptions: {
                className: ".topWeather"
            },
            clockOptions: {
                className: ".weatherAndTime .time",
                radius: 10,
                color: "#fff",
                borderWidth: 2,
                handWidth: 2,
                hourLength: 5,
                minuteLength: 6,
                scale: 2,
                mobile: {
                    className: ".mobileWeatherAndTime .time",
                    color: "#003162",
                    scale: 4
                }
            },
            bookmark: ".navBookmark",
            bookmarkProvider: null
        }, t),
        r = {},
        o = {
            menu: function() {
                return this.length ? this.children("a.hasDropdown").next() : (HKIA.log(this.prefix + " not defined"), this)
            },
            expand: function() {
                if (!this.length) return HKIA.log(this.prefix + " not defined"), this;
                var e = HKIA.Event("expand");
                if (e.target = this.get(0), this.trigger(e), !e.isDefaultPrevented() && !1 !== e.result) {
                    var t = this;
                    this.menu().addClass("show animate").parent().addClass("expand").children("a").attr({
                        "aria-expanded": !0
                    }).end(), this.off(HKIA.transitionEnd).one(HKIA.transitionEnd, function(e) {
                        t.menu().removeClass("animate"), e.preventDefault()
                    })
                }
                return this
            },
            collapse: function() {
                if (!this.length) return HKIA.log(this.prefix + " not defined"), this;
                var e = HKIA.Event("collapse");
                if (e.target = this.get(0), this.trigger(e), !e.isDefaultPrevented() && !1 !== e.result) {
                    var t = this;
                    t.menu().addClass("animate"), this.off(HKIA.transitionEnd).one(HKIA.transitionEnd, function(e) {
                        t.menu().removeClass("show animate"), e.preventDefault()
                    }).removeClass("expand").children("a").attr({
                        "aria-expanded": !1
                    }).end()
                }
                return this
            },
            reset: function() {
                return this.length ? (this.menu().removeClass("show"), this) : (HKIA.log(this.prefix + " not defined"), this)
            }
        },
        s = {
            languageSelector: {
                _init: function() {
                    var e = this;
                    this.hover(function(t) {
                        e.expand()
                    }, function() {
                        e.collapse()
                    }).find("a").focusin(function(t) {
                        e.expand()
                    }).focusout(function(t) {
                        e.find("a:focus").length || e.collapse()
                    })
                }
            },
            fontSizeSelector: {
                _init: function() {
                    var e = this;
                    this.hover(function(t) {
                        e.expand()
                    }, function() {
                        e.collapse()
                    }).find("a").focusin(function(t) {
                        e.expand()
                    }).focusout(function(t) {
                        e.find("a:focus").length || e.collapse()
                    }), this.menu().find("a").click(function(t) {
                        t.preventDefault(), e.fontSize(HKIA(t.currentTarget).attr("href").replace(/\#/g, ""))
                    });
                    var t = this.fontSize() || HKIA.config("default_font_size");
                    this.fontSize(t)
                },
                fontSize: function(e) {
                    if (!this.length) return HKIA.log(this.prefix + " not defined"), this;
                    if (!arguments.length) return HKIA.cookie(HKIA.config("cookie_key").fontSize);
                    HKIA.cookie(HKIA.config("cookie_key").fontSize, e, HKIA.config("cookie_settings"));
                    var t = HKIA.Event("change");
                    if (t.target = this.get(0), this.trigger(t, e), !t.isDefaultPrevented() && !1 !== t.result) {
                        var i = "size" + e.toUpperCase();
                        HKIA("html").removeClass("sizeS sizeM sizeL").addClass(i), this.find("." + i).addClass("active").attr("aria-selected", !0).siblings().removeClass("active").removeAttr("aria-selected"), this.children("a").text(this.find("." + i).text()), this.collapse()
                    }
                    return this
                }
            },
            bookmark: {
                porvider: a.bookmarkProvider,
                refresh: function() {
                    if (!this.porvider) return this;
                    var e = this.porvider.list();
                    e.length ? (this.find(".noBookmark").hide(), this.find(".bookmarkedFlights").show()) : (this.find(".noBookmark").show(), this.find(".bookmarkedFlights").hide()), e.length > 0 ? (this.addClass("hasBookmark"), this.find(".num").addClass("show").text(e.length)) : (this.removeClass("hasBookmark"), this.find(".num").removeClass("show").text(""));
                    var t = this.find(".bookmarkedFlights .slick-slide:not(.slick-cloned)").length;
                    if (t < this.porvider.numOfRecords())
                        for (var i = t; i < this.porvider.numOfRecords(); i++) this.find(".bookmarkedFlights").slick("slickAdd", HKIA("<div/>", {
                            class: "flightItem"
                        }));
                    else if (t > this.porvider.numOfRecords())
                        for (i = t - 1; i >= this.porvider.numOfRecords(); i--) this.find(".bookmarkedFlights").slick("slickRemove", i);
                    this.find(".bookmarkedFlights .slick-slide:not(.slick-cloned)").each(function(t, i) {
                        HKIA(i).render({
                            key: "flightBookmarkRecord",
                            data: {
                                data: e[HKIA(i).attr("data-slick-index")]
                            }
                        })
                    })
                },
                _init: function() {
                    var e = this;
                    this.children("a.hasDropdown").click(function(t) {
                        e.menu().hasClass("animate") || ($(t.currentTarget).parent().hasClass("expand") ? e.collapse() : e.expand())
                    }), this.find("a.btnClose").click(function(t) {
                        e.collapse()
                    }), this.find(".bookmarkedFlights").slick({
                        lazyLoad: "ondemand",
                        dots: !0,
                        infinite: !0,
                        speed: 400
                    }), e.porvider.on("updated", function(t) {
                        e.refresh(), e.find(".bookmarkedFlightDropdown").removeClass("showLoading")
                    }).on("recordAdd recordRemove", function(t) {
                        setTimeout(function() {
                            e.refresh()
                        }, 0)
                    }).on("recordMaxed", function(e) {}), e.refresh(), this.on("expand", function() {
                        e.porvider.list().length && (e.porvider.refresh(), e.find(".bookmarkedFlights").slick("slickGoTo", 0), e.find(".bookmarkedFlightDropdown").addClass("showLoading"))
                    })
                }
            }
        };
    if (HKIA.each(s, function(e, t) {
            if (!1 !== a[e]) {
                var i = t._init;
                delete t._init, r[HKIA.ucFirst(e)] = HKIA.create("header_" + e, HKIA(a[e], n), HKIA.extend(o, t)), i.call(r[HKIA.ucFirst(e)])
            }
        }), !1 !== a.miniSearch && (r.MiniSearch = HKIA.create("header_miniSearch", HKIA(a.miniSearch, n), {
            expand: function() {
                if (!this.length) return HKIA.log(this.prefix + " not defined"), this;
                var e = HKIA.Event("expand");
                if (e.target = this.get(0), this.trigger(e), !e.isDefaultPrevented() && !1 !== e.result) {
                    var t = this;
                    this.addClass("expand"), setTimeout(function() {
                        t.find("input").get(0).focus()
                    }, 1e3)
                }
                return this
            },
            collapse: function() {
                if (!this.length) return HKIA.log(this.prefix + " not defined"), this;
                var e = HKIA.Event("collapse");
                return e.target = this.get(0), this.trigger(e), e.isDefaultPrevented() || !1 === e.result || this.removeClass("expand"), this
            },
            reset: function() {
                return this.length ? (this.removeClass("expand"), this) : (HKIA.log(this.prefix + " not defined"), this)
            }
        }), r.MiniSearch.find(".btnOpenSearch").click(function(e) {
            $.isMobile() && $("body").css({
                position: "fixed"
            }), r.MiniSearch.expand(), e.stopPropagation()
        }), r.MiniSearch.find(".btnClose").click(function(e) {
            $.isMobile() && $("body").css({
                position: "relative"
            }), r.MiniSearch.collapse(), e.stopPropagation()
        })), !1 !== a.weather && (r.Weather = HKIA.create("header_weather", HKIA(a.weatherOptions.className, n), {
            latsetWeather: null,
            set: function(e, t, i, n) {
                var a = this;
                if (!this.length) return HKIA.log(this.prefix + " not defined"), this;
                if (this.latsetWeather && this.removeClass(this.latsetWeather.type), n) {
                    $(".weatherIcon").html(""), $.each(e, function(e, t) {
                        a.find("." + t.replace(/ /g, ".")).length <= 0 && $('<span class="' + t + '">').appendTo($(".weatherIcon"))
                    });
                    var r = {
                        init: function(e) {
                            var t = e.length,
                                i = 0,
                                n = !1;
                            e.eq(i).addClass("active");
                            setInterval(function() {
                                n || (++i == t && (i = 0), e.removeClass("active").eq(i).addClass("active"))
                            }, 5e3);
                            $(".weatherAndTime a").hover(function() {
                                n = !0
                            }, function() {
                                n = !1
                            })
                        }
                    };
                    e.length > 1 ? (r.init($(".weatherAndTime .warning")), r.init($(".mobileWeatherAndTime .warning"))) : $(".weatherIcon .warning").addClass("active"), this.find(".iconTxt>span").text(i), this.addClass("hasWarning")
                } else this.removeClass("hasWarning"), this.addClass(e[0]).find(".iconTxt>span").html('<span class="tempTitle">' + HKIA.__("currentTemp") + ": </span>" + i), this.find(".weatherIcon").html('<span class="weatherDesc">' + HKIA.__("currentWeather") + ": " + t + "</span>");
                this.latsetWeather = {
                    type: e,
                    temperature: i
                }
            }
        })), !1 !== a.clock) {
        function l(e) {
            var t = e.scale,
                i = {
                    _className: e.className,
                    _cr: e.radius * t,
                    _cd: e.radius * t * 2,
                    _ctspan: e.timespan,
                    _ccolor: e.color,
                    _cbw: e.borderWidth * t,
                    _chw: e.handWidth * t,
                    _chl: e.hourLength * t,
                    _cml: e.minuteLength * t
                };
            return i._canvas = !!HKIA.isCanvasSupported() && HKIA("<canvas />", {
                attr: {
                    width: i._cd,
                    height: i._cd
                }
            }).get(0), i
        }
        var c = HKIA(a.clockOptions.className);
        c.length && (c = c.config("clockOption", l(a.clockOptions)).add(HKIA(a.clockOptions.mobile.className).config("clockOption", l($.extend(a.clockOptions, a.clockOptions.mobile))))), r.Clock = HKIA.create("header_clock", c, {
            update: function(e) {
                if (!this.length) return HKIA.log(this.prefix + " not defined"), this;
                var t = e.getHours(),
                    i = e.getMinutes(),
                    n = HKIA().styleSheet();
                if (n.cssRules.length)
                    for (var a = 0; a < c.length; a++) n.deleteRule(0);
                return this.each(function(e, a) {
                    var r = (a = HKIA(a)).config("clockOption");
                    if (a.find(".iconTxt>span").text(("0000" + t).replace(/^.*(\d{2,2})/, "$1") + ":" + ("0000" + i).replace(/^.*(\d{2,2})/, "$1")), a.hasClass("icon"))
                        if (r._canvas) {
                            var o = r._canvas,
                                s = o.getContext("2d");
                            s.msImageSmoothingEnabled = !0, s.fillStyle = r._ccolor, s.strokeStyle = r._ccolor, s.clearRect(0, 0, r._cd, r._cd), s.save(), s.beginPath(), s.arc(r._cr, r._cr, r._cr - r._cbw / 2, 0, 2 * Math.PI, !1), s.closePath(), s.lineWidth = r._cbw, s.stroke(), s.beginPath(), l((12 - t) / 12 - Math.round(i / 60 / 12 * 1e3) / 1e3, r._chl), l((60 - i) / 60, r._cml), s.lineWidth = r._chw, s.stroke(), s.arc(r._cr, r._cr, r._chw / 2, 0, 2 * Math.PI, !1), s.fill(), s.restore(), "addRule" in n ? n.addRule(r._className + ".icon:before", "background-image:url(" + o.toDataURL() + ")", e) : "insertRule" in n && n.insertRule(r._className + ".icon:before{background-image:url(" + o.toDataURL() + ")}", e)
                        } else HKIA.log("browser dose not support canvas.");

                    function l(e, t) {
                        var i = (360 * e - 180) / 180 * Math.PI;
                        s.moveTo(r._cr, r._cr), s.lineTo(r._cr + Math.sin(i) * t, r._cr + Math.cos(i) * t)
                    }
                }), this
            }
        })
    }
    return HKIA.Header = HKIA.create("header", HKIA(e), HKIA.extend(r, {
        mobile: function(e) {
            return this.length ? arguments.length ? (e ? this.mobile() || (this.removeClass("aniNav"), this.reset().addClass("mobile").trigger("mobile", e)) : this.mobile() && (this.removeClass("aniNav"), this.reset().trigger("mobile", e)), this) : this.hasClass("mobile") : (HKIA.log(this.prefix + " not defined"), this)
        },
        mini: function(e) {
            return this.length ? arguments.length ? (e ? this.mini() || (this.off(HKIA.transitionEnd), this.addClass("mini aniNav").trigger("mini", e)) : this.mini() && (this.off(HKIA.transitionEnd), this.removeClass("aniNav").one(HKIA.transitionEnd, function(t) {
                HKIA(t.currentTarget).removeClass("mini").trigger("mini", e), t.preventDefault()
            })), this) : this.hasClass("mini") : (HKIA.log(this.prefix + " not defined"), this)
        },
        reset: function() {
            return this.length ? (this.removeClass("mini mobile"), this) : (HKIA.log(this.prefix + " not defined"), this)
        },
        destroy: function() {
            this.length ? this.unbind("mobile").unbind("mini") : HKIA.log(this.prefix + " not defined"), this.reset(), this.reset(), HKIA.Header = i
        }
    })), a.init && a.init.call(HKIA.Header), HKIA.Header
}, HKIA.ImportantNotice = function(e, t) {
    var i = arguments.callee,
        n = HKIA.config("cookie_key").importantNoticeStatus,
        a = HKIA.config("cookie_key").importantNoticeLatestUpdate,
        r = HKIA.extend(!0, {
            init: !1
        }, t);
    return HKIA.ImportantNotice = HKIA.create("importantNotice", HKIA(e), {
        isExists: function() {
            return Boolean(this.length)
        },
        active: function(e) {
            return arguments.length ? (e ? this.active() || (HKIA("body").addClass("showImportantNotice"), HKIA.cookie(n, "open", HKIA.config("cookie_settings")), this.trigger("active", e)) : this.active() && (HKIA("body").removeClass("showImportantNotice"), HKIA.cookie(n, "close", HKIA.config("cookie_settings")), this.trigger("active", e)), this) : HKIA("body").hasClass("showImportantNotice")
        },
        refresh: function() {
            this.trigger("refresh")
        },
        destroy: function() {
            HKIA.ImportantNotice = i
        }
    }), HKIA.cookie(n) || HKIA.cookie(n, "open", HKIA.config("cookie_settings")), HKIA.API.load("important_notice", {
        callback: function(e) {
            if (e.detail.length > 0) {
                var t = $("#importantNotice .importantNoticeInner");
                $(".navContainer .topbarRight .btnImportantNotice").css({
                    display: "inline-block"
                }), $(".navContainer .btnImportantNotice").css({
                    display: "block"
                });
                var i = e.detail;
                HKIA.cookie(a) != e["last-update"] && (HKIA.cookie(a, e["last-update"], HKIA.config("cookie_settings")), HKIA.cookie(n, "open", HKIA.config("cookie_settings")));
                for (var o = $("<ul>"), s = 0; s < i.length; s++) o.append("<li><a href=" + i[s].websiteURL + ' tabindex="-1">' + i[s].title + "</a><span class='time'>" + i[s]["publish-date"] + "</span></li>");
                t.append(o), r.init && r.init.call(HKIA.ImportantNotice), HKIA.ImportantNotice.isExists() && ("open" == HKIA.cookie(n) ? HKIA.ImportantNotice.active(!0) : HKIA.ImportantNotice.active(!1)), $(".importantNoticeDetail").length && function(e) {
                    for (var t = HKIA.queryString("noticeid"), i = 0; i < e.detail.length; i++) e.detail[i].id == t && ($(".noticeTitle").addClass("icon-important-notice-sign").html(e.detail[i].title), $(".noticeContent").html(e.detail[i].content), $(".noticeLastUpdated").html(e.detail[i]["publish-date"]));
                    if (e.detail.length > 1) {
                        $(".otherNotice").show();
                        var n = $("<ul>");
                        for ($(".otherNotice").append(n), i = 0; i < e.detail.length; i++) e.detail[i].id != t && $(n).append('<li><a href="' + e.detail[i].websiteURL + '" class="more"><span>' + e.detail[i].title + '</span><span class="icon-arrow-more end"></span><span class="icon-arrow-more front"></span></a></li>')
                    }
                }(e)
            } else $(".topbarRight .btnImportantNotice").css({
                display: "none"
            }), $(".navContainer .btnImportantNotice").css({
                display: "none"
            })
        }
    }), HKIA.ImportantNotice
}, HKIA.FloatingADBox = function(e, t) {
    var i = arguments.callee,
        n = HKIA.extend(!0, {
            init: !1
        }, t);
    return HKIA.FloatingADBox = HKIA.create("floatingADBox", HKIA(e), {
        top: function() {
            return parseFloat(this.css("top") || 0) + parseFloat(this.css("margin-top") || 0) + parseFloat(this.css("margin-bottom") || 0)
        },
        bottom: function() {
            return this.top() + this.height()
        },
        close: function(e) {
            return arguments.length ? (e ? this.close() || (this.active(!1), this.addClass("close")) : this.close() && (this.removeClass("close"), this.active(!0)), this) : this.hasClass("close")
        },
        active: function(e) {
            return this.close() ? this : arguments.length ? (e ? this.active() || this.removeClass("hideItem").trigger("active", e) : this.active() && this.addClass("hideItem").trigger("active", e), this) : !this.hasClass("hideItem")
        },
        destroy: function() {
            HKIA.FloatingADBox = i
        }
    }), $(".adHocSilder.bottom").slick({
        lazyLoad: "ondemand",
        dots: !0,
        infinite: !0,
        slidesToShow: 2,
        slidesToScroll: 2,
        speed: 400
    }), $(".floatingAdHocSilder").slick({
        lazyLoad: "ondemand",
        dots: !0,
        infinite: !0,
        speed: 400
    }), n.init && n.init.call(HKIA.FloatingADBox), HKIA.FloatingADBox
}, HKIA.MainMenu = function(e, t) {
    var i = arguments.callee,
        n = HKIA.extend(!0, {
            init: !1
        }, t);
    return HKIA.MainMenu = HKIA.create("navigation", HKIA(e), {
        mobile: function(e) {
            return this.length ? arguments.length ? (e ? this.mobile() || this.reset().addClass("mobile").trigger("mobile", e).find(".globalnav").height(HKIA(window).height() - this.find(".topbar").outerHeight(!0)) : this.mobile() && this.reset().trigger("mobile", e), this) : this.hasClass("mobile") : (HKIA.log(this.prefix + " not defined"), this)
        },
        firstlevel: function(e) {
            var t = this,
                i = {
                    current: function(e) {
                        return this.length ? arguments.length ? (e ? this.current() || this.addClass("current").trigger("currentupdate", e) : this.current() && this.removeClass("current").trigger("currentupdate", e), this) : this.eq(0).hasClass("current") : (HKIA.log(t.prefix + " has no firstlevel"), this)
                    },
                    active: function(e) {
                        return this.length ? arguments.length ? (e ? this.active() || this.addClass("active").trigger("active", e) : this.active() && this.removeClass("active").trigger("active", e), this) : this.eq(0).hasClass("active") : (HKIA.log(t.prefix + " has no firstlevel"), this)
                    },
                    expand: function() {
                        if (!this.length) return HKIA.log(t.prefix + " has no firstlevel"), this;
                        if (clearTimeout(this.data("ecpendAni")), this.hasClass("expand")) return HKIA.log(t.prefix + " firstlevel(" + this.index + ") olready expanded"), this;
                        var e = HKIA.Event("expand");
                        if (e.target = this.get(0), this.trigger(e), !e.isDefaultPrevented() && !1 !== e.result) {
                            var i = this.addClass("expand").children("a").attr({
                                    "aria-expanded": !0
                                }).siblings(".subnavContainer").addClass("show").find(".subnav").height(),
                                n = this;
                            this.reset().find(".subnavContainer").addClass("show"), this.data({
                                ecpendAni: setTimeout(function() {
                                    n.addClass("expand").find(".subnavContainer").height(i)
                                }, 100)
                            })
                        }
                        return this
                    },
                    collapse: function() {
                        if (!this.length) return HKIA.log(t.prefix + " has no firstlevel"), this;
                        if (clearTimeout(this.data("ecpendAni")), !this.hasClass("expand")) return HKIA.log(t.prefix + " firstlevel(" + this.index() + ") olready collapse"), this;
                        var e = HKIA.Event("collapse");
                        return e.target = this.get(0), this.trigger(e), e.isDefaultPrevented() || !1 === e.result || (this.off(HKIA.transitionEnd), t.mobile() ? this.one(HKIA.transitionEnd, function(e) {
                            HKIA(e.currentTarget).removeClass("expand").children("a").attr({
                                "aria-expanded": !1
                            }).siblings(".subnavContainer").removeClass("show")
                        }).find(".subnavContainer").height("") : this.one(HKIA.transitionEnd, function(e) {
                            HKIA(e.currentTarget).removeClass("expand").children("a").attr({
                                "aria-expanded": !1
                            }).siblings(".subnavContainer").removeClass("show")
                        }).removeClass("expand")), this
                    },
                    reset: function() {
                        return this.length ? (this.off(HKIA.transitionEnd).find(".subnavContainer").removeClass("show").height("").end().removeClass("expand"), this) : (HKIA.log(this.prefix + " has no firstlevel"), this)
                    }
                },
                n = null;
            return arguments.length ? ("number" == typeof e && (n = HKIA.create("navigationFirstLevel", this.find(">ul>li:eq(" + e + ")"), i)), n = "function" == typeof e ? HKIA.create("navigationFirstLevel", this.find(">ul>li").filter(e), i) : HKIA.create("navigationFirstLevel", HKIA(e, this), i)) : n = HKIA.create("navigationFirstLevel", this.find(">ul>li"), i), n
        },
        reset: function() {
            return this.length ? (HKIA("body").removeClass("navIn"), this.removeClass("mobile").firstlevel().reset(), this.find(".globalnav").height(""), this) : (HKIA.log(this.prefix + " not defined"), this)
        },
        destroy: function() {
            this.length ? this.unbind("mobile") : HKIA.log(this.prefix + " not defined"), this.reset(), HKIA.MainMenu = i
        }
    }), HKIA.MainMenu.on("focus", "a", function(e) {
        function t(e) {
            HKIA.MainMenu.mobile() || HKIA.MainMenu.firstlevel(e.currentTarget).siblings(".expand").collapse()
        }
        HKIA.MainMenu.firstlevel().off("mouseenter", t).filter(function() {
            return HKIA(this).find("a:focus").length
        }).expand().siblings().collapse().one("mouseenter", t)
    }).firstlevel().hover(function(e) {
        HKIA.MainMenu.mobile() || HKIA.MainMenu.firstlevel(e.currentTarget).expand()
    }, function(e) {
        HKIA.MainMenu.mobile() || HKIA.MainMenu.firstlevel(e.currentTarget).collapse()
    }), HKIA.MainMenu.firstlevel().children("a:not(.withoutSubLevel)").click(function(e) {
        HKIA.MainMenu.mobile() && !HKIA(e.currentTarget).hasClass("withoutSubNav") && (e.preventDefault(), HKIA(e.currentTarget).parent().hasClass("expand") ? HKIA.MainMenu.firstlevel(HKIA(e.currentTarget).parent()).collapse() : (HKIA.MainMenu.firstlevel(HKIA(e.currentTarget).parent()).expand(), HKIA.MainMenu.firstlevel(HKIA(e.currentTarget).parent().siblings()).collapse()))
    }), n.init && n.init.call(HKIA.MainMenu), HKIA.MainMenu.firstlevel().filter(function(e, t) {
        return new RegExp("^/\\w{2,2}/" + $("meta[name=category]").attr("content")).test($(">a", t).prop("pathname"))
    }).children("a").addClass("current"), HKIA.MainMenu
}, HKIA.Quicklink = function(e, t) {
    var i = arguments.callee,
        n = HKIA.extend(!0, {
            init: !1,
            backToTop: ".backToTopContainer",
            shareProvider: null,
            shareMapping: {
                "icon-fb": "toFacebook",
                "icon-twitter": "toTwitter",
                "icon-weibo": "toWeibo",
                "icon-whatsapp": "toWhatsapp",
                "icon-wechat": "toWechat",
                "icon-line": "toLine",
                "icon-telegram": "toTelegram"
            }
        }, t);
    return HKIA.Quicklink = HKIA.create("quicklink", HKIA(e), {
        top: function() {
            return parseFloat(this.css("top") || 0) + parseFloat(this.css("margin-top") || 0) + parseFloat(this.css("margin-bottom") || 0)
        },
        bottom: function() {
            return this.top() + this.height()
        },
        active: function(e) {
            return arguments.length ? (e ? this.active() || this.removeClass("hideItem").trigger("active", e) : this.active() && this.addClass("hideItem").trigger("active", e), this) : !this.hasClass("hideItem")
        },
        destroy: function() {
            HKIA.Quicklink = i
        },
        Share: function(e) {
            var t = this,
                i = arguments.callee;
            this.Share = HKIA.create("quicklink_share", HKIA(e), {
                destroy: function() {
                    t.Share = i
                }
            }), n.shareProvider && $.each(n.shareMapping, function(e, i) {
                t.Share.find("." + e).click(function(e) {
                    switch (e.preventDefault(), typeof i) {
                        case "string":
                            n.shareProvider[i]();
                            break;
                        case "function":
                            i.call(t.Share, n.shareProvider)
                    }
                })
            })
        },
        BackToTop: function(e) {
            var t = this,
                i = arguments.callee;
            this.BackToTop = HKIA.create("quicklink_backToTop", HKIA(e), {
                active: function(e) {
                    return arguments.length ? (e ? this.active() || this.removeClass("hideItem").trigger("active", e) : this.active() && this.addClass("hideItem").trigger("active", e), this) : !this.hasClass("hideItem")
                },
                destroy: function() {
                    t.BackToTop = i
                }
            })
        }
    }), HKIA.Quicklink.Share(HKIA.Quicklink.find(".shareSocial")), HKIA.Quicklink.BackToTop(n.backToTop), n.init && n.init.call(HKIA.Quicklink), HKIA.Quicklink
}, HKIA.Filter = function(e, t) {
    var i, n = arguments.callee,
        a = HKIA.extend({
            init: !1,
            filterAttr: "data-filter",
            filterKeyWord: ".filterInputTxt",
            filterOption: ".filterInput",
            onAfterSift: function(e) {
                return e
            }
        }, t),
        r = 0;
    return HKIA.Filter = HKIA.create("Filter", HKIA(e), {
        isExist: function() {
            return Boolean(this.length)
        },
        _sift: function() {
            if (this.isExist()) {
                HKIA().addClass("non-scroll"), r = $(window).scrollTop();
                var e = $("[" + a.filterAttr + "]");
                this.find(a.filterOption + "," + a.filterKeyWord).each(function(t, i) {
                    if (!e.length) return !1;
                    e = e.filter(function(e, t) {
                        return "" == HKIA(i).val() || new RegExp(HKIA(i).val(), "i").test(HKIA(t).attr(a.filterAttr))
                    })
                });
                var t = $.Event("afterSift");
                return this.trigger(t, [e]), $("[" + a.filterAttr + "]").hide(), null !== t.result && void 0 !== t.result ? (t.result.show(), HKIA().removeClass("non-scroll"), t.result) : (e.show(), HKIA().removeClass("non-scroll"), $("window").scrollTop(r), e)
            }
            return !1
        },
        sift: function() {
            var e = a.onAfterSift.call(this, this._sift());
            return e && e.length ? $(this.attr("data-no-result")).hide() : $(this.attr("data-no-result")).show(), e
        },
        reset: function() {
            HKIA('input.filterInputTxt[type="text"]', this).val(""), HKIA("select.filterInput", this).val("").hkia_selectmenu("refresh"), this.sift()
        },
        destroy: function() {
            HKIA.Content = n
        }
    }), HKIA.Filter.find(a.filterOption).filter("input").on("change", function() {
        HKIA.Filter.sift()
    }), HKIA.Filter.find(a.filterOption).filter("select").on("change hkia_selectmenuchange", function(e) {
        0 == $(this).val().indexOf("/") ? location.href = $(this).val() : HKIA.Filter.sift()
    }), HKIA.Filter.find(a.filterKeyWord).on("change keyup", function(e) {
        clearTimeout(i), i = setTimeout(function() {
            HKIA.Filter.sift()
        }, 500)
    }), a.init && a.init.call(HKIA.Filter), HKIA.Filter
}, HKIA.Map = function(e, t) {
    var i = arguments.callee,
        n = ["basemap", "poi"],
        a = ["poi", "category", "brand"],
        r = HKIA.extend({
            template: '<iframe  frameborder="0"></iframe>',
            srcDir: "",
            type: "poi",
            lang: "en",
            extid: !1,
            init: !1,
            onReady: function() {}
        }, t);
    return HKIA.Map = HKIA.create("map", HKIA(e), {
        _handshakeFromPOI: function(e) {
            return this.config("origin", e.origin), this.config("content", e.source), HKIA(window).one("message", function(e) {
                var t = e.originalEvent;
                "_" + t.data.type in HKIA.Map && HKIA.Map["_" + t.data.type](t)
            }), this._postMessage({
                type: "init"
            }), this
        },
        _mapIsReady: function(e) {
            return r.extid ? "string" == typeof r.extid ? this.send(r.extid) : this.send(r.extid.id, r.extid.type) : this._postMessage({
                type: "update"
            }), r.onReady && r.onReady.call(this, e), this.triggerHandler("ready"), this
        },
        _postMessage: function(e) {
            if (this.config("content") && this.config("origin")) {
                var t = Array.apply(null, arguments);
                t[0].lang = r.lang, t.push(this.config("origin")), this.config("content").postMessage.apply(this.config("content"), t)
            }
            return this
        },
        type: function(e) {
            return arguments.length ? ($.inArray(e, n) > -1 && e != this.config("type") && (this.config("type", e), this.refresh()), this) : this.config("type")
        },
        send: function(e, t) {
            var i = {
                type: "update",
                target: $.inArray(t, a) > -1 ? t : "poi"
            };
            return e && (i.value = e), this._postMessage(i), this
        },
        refresh: function() {
            var e = r.srcDir + this.config("type") + ".html";
            if (this.config("iframe") && this.config("iframe").remove(), 10 == $.IEVersion()) {
                var t = {
                    type: "init",
                    lang: r.lang
                };
                r.extid && ("string" == typeof r.extid ? (t.target = "poi", t.value = r.extid) : (t.target = r.extid.type || "poi", t.value = r.extid.id)), this.config("iframe", HKIA(r.template).attr({
                    src: e + "?" + HKIA.params(t)
                }))
            } else {
                var i = this;
                this.config("iframe", HKIA(r.template).attr({
                    src: e
                })), HKIA(window).on("message", function(e) {
                    var t = e.originalEvent;
                    if ("scroll" == t.data.type) {
                        var i = t.data.params;
                        i.ydiff && $("body").scrollTop($("body").scrollTop() - Number(i.ydiff))
                    }
                }).one("message", function(e) {
                    var t = e.originalEvent;
                    "_" + t.data.type in i && i["_" + t.data.type](t)
                })
            }
            return this.append(this.config("iframe")), this
        },
        destroy: function() {
            this.config("iframe").remove(), HKIA.Map = i
        }
    }), $.each(["origin", "content"], function(e, t) {
        HKIA.Map.config(t, !1)
    }), HKIA.Map.type(r.type), r.init && r.init.call(HKIA.Map), HKIA.Map
}, VirtualModule = function() {}, VirtualModule.prototype = {
    trigger: function() {
        return $.fn.trigger.apply($(this), arguments), this
    },
    on: function() {
        return $.fn.on.apply($(this), arguments), this
    },
    one: function() {
        return $.fn.one.apply($(this), arguments), this
    },
    bind: function() {
        return $.fn.bind.apply($(this), arguments), this
    },
    off: function() {
        return $.fn.apply.apply($(this), arguments), this
    },
    unbind: function() {
        return $.fn.unbind.apply($(this), arguments), this
    }
}, HKIA._VirtualModule = function() {
    return new VirtualModule
}, HKIA.API = function(e) {
    var t = arguments.callee;

    function n() {
        var e = this.storageType;
        if (e && "cookies" == e) return {};
        if (arguments.length) {
            result = {}, $.each(arguments[0], function(e, t) {
                result[e] = t.toObject()
            });
            try {
                window[e].setItem("APICache", JSON.stringify(result))
            } catch (e) {
                HKIA.log(e)
            }
        }
        return JSON.parse(window[e].getItem("APICache") || "{}")
    }

    function a(e) {
        var i = this;
        HKIA.ajaxSetup(HKIA.extend({
            error: function(e, t, i) {
                HKIA.log("API Error.", e, t, i)
            }
        }, e)), this.storageType = e && "storageType" in e ? e.storageType : this.storageType, $.each(n.call(this), function(n, a) {
            i._cache[n] = t.Cache(n, e.cacheOpts), i._cache[n].import(a)
        })
    }
    return a.prototype = HKIA.extend(HKIA._VirtualModule(), {
        _cache: {},
        storageType: void 0 != window.sessionStorage && "sessionStorage",
        load: function(a, r) {
            var o = this,
                s = HKIA.config("API")[a],
                l = HKIA.extend(!0, {
                    method: "POST",
                    config: {}
                }, s, r),
                c = l.config;
            if ("function" == typeof l.url ? c.url = l.url.call(l) : c.url = l.url, "data" in l && (! function(e) {
                    for (i in e) "function" == typeof e[i] ? e[i] = e[i].call(l.data) : "object" == typeof e[i] && t(e[i])
                }(l.data), c.data = l.data), c.success = function(i, s, c) {
                    var h = Array.apply(null, arguments),
                        d = i;
                    l.adapter && (d = l.adapter(i)), a in o._cache || (o._cache[a] = t.Cache(a, e.cacheOpts)), !1 !== l.config.cache && o._cache[a].push({
                        options: r,
                        _response: {
                            data: i,
                            textStatus: s,
                            jqXHR: c
                        },
                        _update: c.getResponseHeader("date")
                    }, l.config.dataType), n.call(o, o._cache), h[0] = d || i, "callback" in l && l.callback.apply(this, h), "render" in HKIA.fn && HKIA('[data-api-key="' + a + '"][data-autorender]').render({
                        data: h[0]
                    }), h.unshift("success." + a), o.trigger.apply(o, h)
                }, !l.jsonp && "jsonp" != l.dataType) return "GET" == l.method ? HKIA.get.call(HKIA, c) : HKIA.post.call(HKIA, c);
            HKIA.ajax(c)
        },
        cache: function(e) {
            return e in this._cache || HKIA.log("cache not exist!"), this._cache[e]
        },
        destroy: function() {
            HKIA.API = t
        }
    }), HKIA.API = new a(e), HKIA.API
}, HKIA.API.Cache = function(e, t) {
    function n() {}

    function a(e) {
        for (i in e) this[i] = e[i]
    }
    return n.prototype = {
        response: function(e) {
            if (arguments.length)
                if ("string" == typeof e) {
                    if (e in this._response) return this._response[e];
                    HKIA.log("cache response warning: response." + e + " dose not exists.")
                } else HKIA.log("cache response error: params type must be string.");
            return this._response
        },
        data: function() {
            var t = HKIA.config("API")[e],
                i = HKIA.API.cache(e).last().response().data;
            if ("adapter" in t) {
                var n = t.adapter(i);
                return n || i
            }
            return i
        },
        toObject: function() {
            return $.extend({
                _respone: this._respone,
                _update: this._update
            }, this)
        }
    }, a.prototype = $.extend([], {
        max: 5,
        API: e,
        push: function(e, t) {
            var i = $.extend({}, e);
            if ("xml" === t) {
                var a = $.extend({}, e._response);
                a.data = $("<div/>", {
                    html: $(i._response.data).children("root")
                }).html(), n.prototype = $.extend(n.prototype, {
                    _response: a,
                    _update: i._update ? new Date(i._update) : HKIA.Clock.getCurrentDateObject()
                })
            } else n.prototype = $.extend(n.prototype, {
                _response: i._response,
                _update: new Date(i._update)
            });
            delete i._response, delete i._update;
            var r = $.extend(new n, i),
                o = Array.prototype.push.call(this, r);
            return this.length > this.max && this.shift(), o
        },
        import: function(e) {
            for (i in e) {
                var t = $.extend({}, e[i]);
                n.prototype = $.extend(n.prototype, {
                    _response: t._response,
                    _update: new Date(t._update)
                }), delete t._response, delete t._update, Array.prototype.push.call(this, $.extend(new n, t))
            }
        },
        refresh: function(e) {
            arguments.length ? "number" == typeof e ? this[e] ? HKIA.API.load(this.API, this[e].options) : HKIA.log("cache refresh warning: cache record[" + e + "] dose not exists.") : HKIA.log("cache refresh error: params type must be number.") : HKIA.API.load(this.API, this[this.length - 1].options)
        },
        last: function() {
            return this[this.length - 1]
        },
        lastUpdate: function() {
            return this[this.length - 1]._update
        },
        toObject: function() {
            var e = [];
            return $.each(this, function(t, i) {
                e.push(i.toObject())
            }), e
        }
    }), new a(t)
}, HKIA.Clock = function(e) {
    var t = arguments.callee;

    function i(t) {
        var i = HKIA.extend({
            baseTime: new Date,
            startTime: new Date
        }, e);
        this.baseTime = i.baseTime, this.startTime = i.startTime
    }
    return i.prototype = HKIA.extend(HKIA._VirtualModule(), {
        baseTime: null,
        startTime: null,
        timespan: function(e, t) {
            var i = this,
                n = setInterval(function() {
                    e.call(i, function() {
                        clearTimeout(n)
                    })
                }, t);
            return this
        },
        getCurrentDateObject: function() {
            return new Date(this.baseTime.getTime() + (new Date - this.startTime))
        },
        getDate: function() {
            return this.getCurrentDateObject().getDate()
        },
        getDay: function() {
            return this.getCurrentDateObject().getDay()
        },
        getFullYear: function() {
            return this.getCurrentDateObject().getFullYear()
        },
        getHours: function() {
            return this.getCurrentDateObject().getHours()
        },
        getMilliseconds: function() {
            return this.getCurrentDateObject().getMilliseconds()
        },
        getMinutes: function() {
            return this.getCurrentDateObject().getMinutes()
        },
        getMonth: function() {
            return this.getCurrentDateObject().getMonth()
        },
        getSeconds: function() {
            return this.getCurrentDateObject().getSeconds()
        },
        getTime: function() {
            return this.getCurrentDateObject().getTime()
        },
        destroy: function() {
            HKIA.Clock = t
        }
    }), HKIA.Clock = new i(e), HKIA.Clock
}, HKIA.Share = function(e) {
    var t = arguments.callee,
        i = HKIA.extend({
            popup: {
                menubar: 1,
                resizable: 1,
                width: 500,
                height: 510
            }
        }, e);

    function n() {
        this.title = HKIA("title").text(), this.url = window.location.href
    }
    return n.prototype = HKIA.extend(HKIA._VirtualModule(), {
        popup: function(e, t) {
            var n = HKIA.extend(i.popup, t),
                a = [];
            $.each(n, function(e, t) {
                a.push(e + "=" + t)
            }), window.open(e, "cssSocialMediaPopup", a.join(","))
        },
        toFacebook: function(e, t) {
            e = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(e || this.url);
            return !1 !== t && this.popup(e, t), e
        },
        toWeibo: function(e, t, i) {
            e = "http://v.t.sina.com.cn/share/share.php?url=" + encodeURIComponent(e || this.url) + "&title=" + encodeURIComponent(t || this.title);
            return !1 !== i && this.popup(e, i), e
        },
        toPinterest: function(e, t, i) {
            e = "http://share.v.t.qq.com/index.php?c=share&a=index&title=" + encodeURIComponent(t || this.title) + "&url=" + encodeURIComponent(e || this.url);
            return !1 !== i && this.popup(e, i), e
        },
        toTwitter: function(e, t) {
            e = "https://twitter.com/intent/tweet?url=" + encodeURIComponent(e || this.url);
            return !1 !== t && this.popup(e, t), e
        },
        toLine: function(e, t) {
            e = "http://line.naver.jp/R/msg/text/?" + encodeURIComponent(e || this.url);
            return !1 !== t && this.popup(e, t), e
        },
        toWhatsapp: function(e, t, i) {
            e = "https://web.whatsapp.com/send?text=" + encodeURIComponent(e || this.url);
            return !1 !== i && this.popup(e, i), e
        },
        toWechat: function(e, t) {
            e = "http://api.addthis.com/oexchange/0.8/forward/wechat/offer?url=" + encodeURIComponent(e || this.url);
            return !1 !== t && this.popup(e, t), e
        },
        toTelegram: function(e, t) {
            e = "https://t.me/share/url?url=" + encodeURIComponent(e || this.url);
            return !1 !== t && this.popup(e, t), e
        },
        destroy: function() {
            HKIA.Share = t
        }
    }), HKIA.Share = new n, HKIA.Share
}, HKIA.Flight = HKIA.extend(function(e) {
    var t = arguments.callee;

    function i() {
        var e = $.extend(!0, {}, this._originalData);
        for (var i in e) this[i] = e[i];
        var n = e.date.split("-"),
            a = e.time.split(":");
        this._time = new Date(n[0], parseInt(n[1], 10) - 1, n[2], parseInt(a[0], 10), parseInt(a[1], 10), 0, 0);
        var r = this;
        $(t.emitter).on("airlineUpdate", function(e) {
            r.setAirline(r.flight), r.setFilterKey()
        }).on("airportUpdate", function(e) {
            r.setAirport(r.arrival ? r.origin : r.destination), r.setFilterKey()
        }), this.setAirline(this.flight), this.setAirport(this.arrival ? this.origin : this.destination), this.setFilterKey()
    }
    return i.prototype = {
        _originalData: e,
        _filterKey: [],
        setAirline: function(e) {
            if (t.airlinesLoading || HKIA.API.cache("airlines")) {
                if (!t.airlinesLoading) {
                    t.airlines || (t.airlines = HKIA.API.cache("airlines").last().data());
                    var i = [];
                    $.each(e, function(e, n) {
                        if ("string" == typeof n.airline) {
                            var a = t.airlines[n.airline];
                            a ? (i[n.airline] = a, n.airline = a) : i[n.airline] = n.airline
                        }
                    }), this._airline = i
                }
            } else HKIA.API.load("airlines", {
                callback: function(e) {
                    t.airlines = HKIA.API.cache("airlines").last().data(), t.airlinesLoading = !1, $(t.emitter).triggerHandler("airlineUpdate")
                }
            }), t.airlinesLoading = !0
        },
        setAirport: function(e) {
            if (t.airportsLoading || HKIA.API.cache("airports")) {
                if (!t.airportsLoading) {
                    t.airports || (t.airports = HKIA.API.cache("airports").last().data());
                    var i = [];
                    $.each(e, function(n, a) {
                        var r = t.airports[a];
                        r ? (i[a] = r, e[n] = r) : i[a] = a
                    }), this._airport = i
                }
            } else HKIA.API.load("airports", {
                callback: function(e) {
                    t.airports = HKIA.API.cache("airports").last().data(), t.airportsLoading = !1, $(t.emitter).triggerHandler("airportUpdate")
                }
            }), t.airportsLoading = !0
        },
        setFilterKey: function() {
            var e = [];
            $.each(this.flight, function(t, i) {
                e.push(i.no), e.push(i.no.replace(/\s/g, ""));
                var n = i.airline;
                "string" == typeof n ? e.push(n) : (e.push(n.code), e = e.concat(n.description))
            });
            var t = null;
            t = this.arrival ? this.origin : this.destination, $.each(t, function(t, i) {
                "string" == typeof i ? e.push(i) : (e.push(i.code), e = e.concat(i.description))
            }), this._filterKey = e
        },
        filterKey: function() {
            return this._filterKey.join(" ")
        },
        bookmark: function() {
            if (!arguments.length) return !!HKIA.FlightBookmark.search(this._originalData).length;
            arguments[0] ? HKIA.FlightBookmark.add(this._originalData) : HKIA.FlightBookmark.remove(this._originalData)
        },
        isMatch: function(e) {
            return this._originalData.flight[0].no == e.flight[0].no && this._originalData.cargo == e.cargo && this._originalData.arrival == e.arrival && this._originalData.date == e.date && this._originalData.time == e.time
        },
        isCancelled: function() {
            return !!/^cx?|^xc?/i.test(this.statusCode)
        },
        isAllowBookmark: function() {
            return !/^cx?|^xc?|^on?|^om?|^dd?|^da?|^dp?/i.test(this.statusCode)
        }
    }, new i
}, {
    airportsLoading: !1,
    airlinesLoading: !1,
    airports: !1,
    airlines: !1,
    emitter: {}
}), HKIA.FlightBookmark = function(e) {
    var t = arguments.callee,
        i = HKIA.extend({
            searchExclude: ["status", "_time"],
            limited: 5,
            timeout: 1728e5
        }, e),
        n = {
            push: function(e) {
                return arguments.length && e && Array.prototype.push.call(this, HKIA.Flight(e)), this
            },
            triggerEvent: function(e, t) {
                var i = HKIA.Event(e);
                return i.target = this, HKIA(this).trigger(i, t), !i.isDefaultPrevented() && !1 !== i.result
            },
            empty: function() {
                for (; this.length;) this.splice(0, 1)
            },
            load: function(e) {
                var t = this;
                if (n.triggerEvent.call(this, "load")) {
                    var i = t._list,
                        a = [],
                        r = [];
                    HKIA.each(i, function(e, t) {
                        r[e] = $.extend(!0, {}, t._originalData), r[e].recordNotFind = !0, HKIA.inArray(t.date, a) < 0 && a.push(t.date)
                    });
                    var o = a.length;
                    if (o) {
                        ! function e(s) {
                            o > s && HKIA.API.load("flightRecords", {
                                data: {
                                    date: a[s]
                                },
                                callback: function(a) {
                                    HKIA.each(i, function(e, t) {
                                        HKIA.each(a.list, function(i, n) {
                                            if (t.isMatch(n._originalData)) return r[e] = $.extend(!0, {}, n._originalData), r[e].recordNotFind = !1, !1
                                        })
                                    }), e(s + 1), o - 1 == s && (n.empty.call(t._list), $.each(r, function(e, i) {
                                        n.push.call(t._list, i)
                                    }), n.save.call(t, t._list), n.triggerEvent.call(t, "updated"))
                                }
                            })
                        }(0)
                    }
                }
            },
            save: function(e) {
                var t = [];
                HKIA.each(e, function(e, i) {
                    t.push(i._originalData)
                }), n.triggerEvent.call(this, "save", t) && HKIA.cookie(HKIA.config("cookie_key").flightBookmark, JSON.stringify(t), HKIA.config("cookie_settings"))
            }
        };

    function a() {
        var e = this;
        this._list = [], HKIA.each(JSON.parse(HKIA.cookie(HKIA.config("cookie_key").flightBookmark) || "[]"), function(t, i) {
            n.push.call(e._list, i)
        });
        var t = ["ON", "OM", "CX", "XC", "DT", "DD", "DA", "DP", "DT", "DV", "DT"];
        this._list.length > 0 && $.each(this._list, function(n, a) {
            if (a) {
                var r = new Date(a._time);
                if (HKIA.inArray(a.statusCode, t) > -1) {
                    if (/\(.*\)/.test(a.status)) {
                        var o = a.status.replace(/^.*\((.*)\).*$/, "$1").split("/");
                        r.setYear(o[2]), r.setMonth(parseInt(o[1], 10) - 1), r.setDate(o[0])
                    }
                    var s = a.status.replace(/^.*(\d{2,2}\:\d{2,2}).*$/, "$1");
                    s && (s = s.split(":"), r.setHours(parseInt(s[0], 10)), r.setMinutes(parseInt(s[1], 10))), r.setSeconds(0)
                }
            }
            HKIA.Clock.getCurrentDateObject() - r > i.timeout && e.remove(a._originalData)
        })
    }
    return a.prototype = HKIA.extend(HKIA._VirtualModule(), {
        refresh: function() {
            return n.load.call(this), this
        },
        add: function(e) {
            return this.search(e).length ? (HKIA.log("FlightBookmark: Record is existed"), this) : n.triggerEvent.call(this, "recordAdd", e) ? (i.limited < 1 || this._list.length < i.limited ? (n.push.call(this._list, e), n.save.call(this, this._list)) : n.triggerEvent.call(this, "recordMaxed"), this) : this
        },
        remove: function(e) {
            if (!n.triggerEvent.call(this, "recordRemove", e)) return this;
            var t = this._list.filter(function(t, i) {
                return !t.isMatch(e)
            });
            n.empty.call(this._list);
            var i = this;
            return $.each(t, function(e, t) {
                i._list.push(t)
            }), n.save.call(this, this._list), this
        },
        numOfRecords: function() {
            return this._list.length
        },
        search: function(e) {
            var t = this;
            return "function" == typeof e ? HKIA(this).filter(e).toArray() : HKIA(this._list).filter(function(n, a) {
                var r = !0;
                return HKIA.each(e, function(e, o) {
                    if (!(/^_/.test(e) || HKIA.inArray(e, i.searchExclude) > -1)) {
                        var s = a._originalData[e];
                        "function" == typeof s && (s = s.call(t, n, o)), r = r && JSON.stringify(s) === JSON.stringify(o)
                    }
                }), r
            }).toArray()
        },
        empty: function() {
            return n.triggerEvent.call(this, "empty") && (n.empty.call(this._list), n.save.call(this, this._list)), this
        },
        destroy: function() {
            HKIA.FlightBookmark = t
        },
        list: function() {
            var e = [];
            return $.each(this._list, function(t, i) {
                e.push(i)
            }), e
        },
        isFull: function() {
            return this._list.length >= i.limited
        }
    }), HKIA.FlightBookmark = new a, HKIA.FlightBookmark
}, HKIA.SmartSearch = HKIA.extend(function(e, t) {
    var i = arguments.callee;
    i._logicFlow.length || i.loginFlowSetup(i.exactFlight, i.flightList, i.airline, i.exactKeyword, i.shopAndDine, i.general), i.reset(), arguments.length && "function" != typeof arguments[0] && e && "" != e && (t && (i._callback = t), i.run(e))
}, VirtualModule.prototype, {
    _keyword: !1,
    _result: {},
    _logicFlow: [],
    _callback: function() {},
    _flightCache: !1,
    _cacheDate: null,
    _start: function(e, t) {
        var i = this;
        if (e.length < 3 || !this._flightCache) return t(), !1;
        var n = $.trim(e.replace(/\(.*\)/, "")),
            a = this._flightCache,
            r = (Object.keys(a), new RegExp(n, "i"));
        $.each(a, function(e, t) {
            (r.test(e) || r.test(e.replace(" ", ""))) && (i._result._suggestedFlights[e] = {
                searchType: "flight",
                data: t
            })
        }), t()
    },
    _complete: function(e) {
        var t = this;
        this._callback && (this._result.type || (this._result.type = "other"), this._callback.call(this)), setTimeout(function() {
            t._callback = !1
        }, 500)
    },
    loginFlowSetup: function() {
        this._logicFlow = Array.apply(null, arguments), this._logicFlow.unshift(this._start), this._logicFlow.push(this._complete)
    },
    run: function(e, t) {
        var i = this,
            n = [];

        function a() {
            var t = arguments.callee,
                a = n.shift();
            a && a.call(i, e, function() {
                t.call(i)
            })
        }
        this._keyword = e, n = Array.apply(null, this._logicFlow), t || !this._flightCache || (HKIA.getHKTime() - this._cacheDate) / 1e3 > 10 ? HKIA.API.load("flightForSearch", {
            callback: function(e, t, n) {
                var r = n.getResponseHeader("date");
                i._cacheDate = r ? HKIA.getHKTime(r) : HKIA.Clock.getCurrentDateObject(), i._flightCache = e, a()
            },
            config: {
                error: function() {
                    a()
                }
            }
        }) : a()
    },
    reset: function() {
        this._status = "ready", this._keyword = !1, this._result = {
            _suggestedList: {},
            _suggestedFlights: {},
            _suggestedCityFlights: {},
            type: !1
        }
    },
    exactFlight: function(e, t) {
        var i = $.trim(e.replace(/\(.*\)/, "")),
            n = this._result._suggestedFlights;
        if (!Object.keys(n).length) return t(), !1;
        if (Object.keys(n).length >= 1) {
            var a = Object.keys(n)[0];
            if ($.each(Object.keys(n), function(e, t) {
                    t.replace(/ /g, "").toLowerCase() == i.replace(/ /g, "").toLowerCase() && (a = t)
                }), (a.toLowerCase() == i.toLowerCase() || a.replace(/ /g, "").toLowerCase() == i.toLowerCase()) && !this._result.type) {
                var r = {};
                if (n[a].data.length > 1) {
                    var o = /\(.*\)/.test(e) ? e = e.replace(/^.*\((.*)\)$/, "$1").split(": ").pop() : "";
                    "" != o && "Invalid Date" != (o = parseDate(o)).toString() && (o = HKIA.dateFormat_yyyymmdd(o), $.each(n[a].data, function(e, t) {
                        if (t.date == o) {
                            var i = t.arrival ? HKIA.__("Arrive") : HKIA.__("Depart");
                            r[a + " (" + i + ": " + HKIA.dateFormat(t._time, !1, !1) + ")"] = {
                                data: [t],
                                searchType: n[a].searchType
                            }
                        }
                    }), Object.keys(r).length && (this._result.type = "exactFlight", this._result._suggestedList = $.extend(!0, this._result._suggestedList, r)))
                } else $.each(n[a].data, function(e, t) {
                    var i = t.arrival ? HKIA.__("Arrive") : HKIA.__("Depart");
                    r[a + " (" + i + ": " + HKIA.dateFormat(t._time, !1, !1) + ")"] = {
                        data: [t]
                    }
                }), this._result.type = "exactFlight", this._result._suggestedList = $.extend(!0, this._result._suggestedList, r)
            }
        }
        t()
    },
    flightList: function(e, t) {
        var i = this._result._suggestedFlights,
            n = this._result._suggestedCityFlights,
            a = /^\b[A-Za-z0-9]{2}\d{1,4}\b/.test(e.replace(/ /g, "").toLowerCase()),
            r = this,
            o = $.trim(e.replace(/\(.*\)/, "")),
            s = /^[A-Za-z0-9]*$/.test(o.replace(/ /g, "").toLowerCase()) ? 3 : 2;
        if (o.length >= s) {
            var l = new RegExp(o, "i");
            Object.keys(i).length || a || ($.each(this._flightCache, function(e, t) {
                for (var i in t)
                    if (t[i].origin)
                        for (var n in t[i].origin)
                            for (var a in t[i].origin[n].description) l.test(t[i].origin[n].description[a]) && (r._result._suggestedCityFlights[e] = {
                                searchType: "flight",
                                data: t
                            });
                    else if (t[i].destination)
                    for (var n in t[i].destination)
                        for (var a in t[i].destination[n].description) l.test(t[i].destination[n].description[a]) && (r._result._suggestedCityFlights[e] = {
                            searchType: "flight",
                            data: t
                        })
            }), n = this._result._suggestedCityFlights)
        }
        if (!Object.keys(i).length && !Object.keys(n).length && !a) return t(), !1;
        if (a)
            if (Object.keys(i).length && !this._result.type) {
                var c = {};
                $.each(this._result._suggestedFlights, function(e, t) {
                    $.each(t.data, function(i, n) {
                        var a = n.arrival ? HKIA.__("Arrive") : HKIA.__("Depart");
                        c[e + " (" + a + ": " + HKIA.dateFormat(n._time, !1, !1) + ")"] = {
                            data: [n],
                            searchType: t.searchType
                        }
                    })
                }), this._result._suggestedList = $.extend(!0, this._result._suggestedList, c), this._result.type = "flightList"
            } else this._result.type || (this._result.type = "flightList");
        else if (Object.keys(n).length && !this._result.type) {
            c = {};
            $.each(this._result._suggestedCityFlights, function(e, t) {
                $.each(t.data, function(i, n) {
                    var a = n.arrival ? HKIA.__("Arrive") : HKIA.__("Depart");
                    c[e + " (" + a + ": " + HKIA.dateFormat(n._time, !1, !1) + ")"] = {
                        data: [n],
                        searchType: t.searchType
                    }
                })
            }), this._result._suggestedCityFlights = $.extend(!0, this._result._suggestedCityFlights, c), this._result.type = "flightList"
        }
        t()
    },
    airline: function(e, t) {
        var i = this,
            n = {},
            a = /[\w\d]+/.test(e) ? e : e.toHex();

        function r() {
            var e = "";
            HKIA.API.cache("airlines_info").last().data().filter(function(t) {
                a.toLowerCase() == t["iata-2"].toLowerCase() && (e = t.code)
            });
            for (var r = Array.apply(null, HKIA.API.cache("airlines").last().response("data")); r.length > 0;) {
                var o = r.shift();
                e == o.code && (o.type = "airline", n[o.code] = {
                    searchType: "airline",
                    data: o
                })
            }
            i._result._suggestedList = $.extend(!0, i._result._suggestedList, n), Object.keys(n).length >= 1 && (i._result.type || (i._result.type = "airline"), t())
        }

        function o() {
            HKIA.API.cache("airlines") ? r() : HKIA.API.load("airlines", {
                callback: function() {
                    r()
                },
                config: {
                    error: function() {
                        t()
                    }
                }
            })
        }

        function s() {
            for (var e = Array.apply(null, HKIA.API.cache("airlines").last().response("data")); e.length > 0;) {
                var r = e.shift();
                for (var o in r.description) new RegExp(a, "i").test(r.description[o]) && (r.type = "airline", n[r.description[o]] = {
                    searchType: "airline",
                    data: r
                })
            }
            i._result._suggestedList = $.extend(!0, i._result._suggestedList, n), Object.keys(n).length >= 1 ? (i._result.type || (i._result.type = "airline"), t()) : t()
        }
        HKIA.API.cache("airlines_info") ? o() : HKIA.API.load("airlines_info", {
            callback: function() {
                o()
            },
            config: {
                error: function() {
                    t()
                }
            }
        }), e.length < 2 ? t() : HKIA.API.cache("airlines") ? s() : HKIA.API.load("airlines", {
            callback: function() {
                s()
            },
            config: {
                error: function() {
                    t()
                }
            }
        })
    },
    exactKeyword: function(e, t) {
        var i = this;

        function n() {
            var n = {};
            $.each(HKIA.API.cache("keywords").last().data().general, function(t, i) {
                e.toLowerCase() == i.toLowerCase() && (n[i] = {
                    type: "keyword",
                    data: !1
                })
            });
            var a = {};
            $.each(HKIA.API.cache("keywords").last().data().shopDine, function(t, i) {
                e.toLowerCase() == i.toLowerCase() && (a[i] = {
                    type: "shopAndDine",
                    data: !1
                })
            }), i._result._suggestedList = $.extend(!0, i._result._suggestedList, n, a), Object.keys(a).length ? i._result.type || (i._result.type = "shopAndDine") : Object.keys(n).length && (i._result.type || (i._result.type = "keyword")), t()
        }
        HKIA.API.cache("keywords") && HKIA.API.cache("keywords").length ? n() : HKIA.API.load("keywords", {
            callback: n
        })
    },
    shopAndDine: function(e, t) {
        var i = this;

        function n() {
            var n = {};
            $.each(HKIA.API.cache("keywords").last().data().shopDine, function(t, i) {
                e.toLowerCase() != i.toLowerCase() && new RegExp(e, "i").test(i) && (n[i] = {
                    type: "shopAndDine",
                    data: !1
                })
            }), Object.keys(n).length && (i._result._suggestedList = $.extend(!0, i._result._suggestedList, n), i._result.type || (i._result.type = "shopAndDine")), t()
        }
        e.length < 2 ? t() : HKIA.API.cache("keywords") && HKIA.API.cache("keywords").length ? n() : HKIA.API.load("keywords", {
            callback: n
        })
    },
    general: function(e, t) {
        var n = this;

        function a() {
            var a = {};
            if ($.each(HKIA.API.cache("keywords").last().data().general, function(t, i) {
                    e.toLowerCase() != i.toLowerCase() && new RegExp(e, "i").test(i) && (a[i] = {
                        type: "keyword",
                        data: !1
                    })
                }), Object.keys(a).length) {
                for (i = 0; i < Object.keys(a).length; i++)
                    for (k in k = Object.keys(a)[i], n._result._suggestedList) n._result._suggestedList.hasOwnProperty(k) || (n._result._suggestedList = $.extend(!0, n._result._suggestedList, a));
                n._result.type || (n._result.type = "keyword")
            }
            t()
        }
        e.length < 2 ? t() : HKIA.API.cache("keywords") && HKIA.API.cache("keywords").length ? a() : HKIA.API.load("keywords", {
            callback: a
        })
    },
    suggestedList: function() {
        var e, t = {},
            i = this._result._suggestedList,
            n = Object.keys(i),
            a = n.length;
        for (n.sort(), e = 0; e < a; e++) k = n[e], t[k] = i[k];
        return t
    },
    result: function(e, t) {
        window.location.hash && history.pushState("", document.title, window.location.pathname + window.location.search);
        var i = this;
        this._callback = function() {
            var t = this._result,
                n = {
                    type: t.type,
                    data: {}
                };
            switch (t.type) {
                case "exactFlight":
                    $.each(t._suggestedFlights, function(e, t) {
                        if (e.replace(" ", "").toLowerCase() == $.trim(i._keyword.replace(/\(.*\)/, "")).replace(" ", "").toLowerCase())
                            if (/\(.*\)/.test(i._keyword)) {
                                var a = i._keyword.replace(/^.*\((.*)\)$/, "$1"),
                                    r = a.split(": ")[0] == HKIA.__("Arrive");
                                "" != (a = a.split(": ").pop()) && (a = HKIA.dateFormat_yyyymmdd(parseDate(a))), $.each(t.data, function(e, t) {
                                    t.date == a && t.arrival == r && (n.data.flight = t)
                                })
                            } else $.each(t.data, function(e, t) {
                                n.data.flight = t
                            })
                    });
                    break;
                case "flightList":
                    function a(e) {
                        HKIA(this).filter(function(t, i) {
                            var n = !0;
                            return HKIA.each(e, function(e, t) {
                                /^_/.test(e) || HKIA.inArray(e, ["status"]) > -1 || (n = n && JSON.stringify(i[e]) === JSON.stringify(t))
                            }), n
                        }).length || this.push(e)
                    }

                    function r(e, t) {
                        return e._time - t._time
                    }
                    n.data = $.extend(n.data, {
                        passenger: {
                            arrival: [],
                            departure: []
                        },
                        cargo: {
                            arrival: [],
                            departure: []
                        }
                    }), $.each(t._suggestedFlights, function(e, t) {
                        $.each(t.data, function(e, t) {
                            t.cargo ? t.arrival ? a.call(n.data.cargo.arrival, t) : a.call(n.data.cargo.departure, t) : t.arrival ? a.call(n.data.passenger.arrival, t) : a.call(n.data.passenger.departure, t)
                        })
                    }), $.each(t._suggestedCityFlights, function(e, t) {
                        $.each(t.data, function(e, t) {
                            t.cargo ? t.arrival ? a.call(n.data.cargo.arrival, t) : a.call(n.data.cargo.departure, t) : t.arrival ? a.call(n.data.passenger.arrival, t) : a.call(n.data.passenger.departure, t)
                        })
                    }), n.data.cargo.arrival.sort(r), n.data.cargo.departure.sort(r), n.data.passenger.arrival.sort(r), n.data.passenger.departure.sort(r);
                    break;
                case "airline":
                    $.each(t._suggestedList, function(e, i) {
                        if (i.searchType == t.type) return n.data = i, !1
                    });
                    break;
                default:
                    n.data = !1
            }
            e && e.call(this, n)
        }, this.run(this._keyword, t)
    },
    keyword: function() {
        return this._keyword
    }
}), HKIA.Weather = function(e) {
    var t = $.inArray(HKIA.language(), ["en-US", "zh-HK", "zh-CN"]),
        i = arguments.callee;

    function n(t) {
        var i = this,
            n = HKIA.extend({
                expires: 108e5,
                autoUpdate: !0
            }, e);
        i.data = JSON.parse(HKIA.cookie(HKIA.config("cookie_key").weather) || "{}");
        var a = new Date - new Date(i.data.latestUpdate);
        "latestUpdate" in i.data && !(n.expires < a) || this.update(), n.autoUpdate && setTimeout(function() {
            var e = arguments.callee;
            i.update(), setTimeout(e, n.expires)
        }, Math.max(0, n.expires - a))
    }
    return n.prototype = HKIA.extend(HKIA._VirtualModule(), {
        data: null,
        update: function(e) {
            var i = this,
                n = HKIA.Event("updated");
            n.target = this;
            var a, r, o, s = !1,
                l = [],
                c = {},
                h = {},
                d = ["PTC", "RWS", "TCW", "TSW", "CWW"];
            if (arguments.length) {
                this.on(n.type, e);
                var u = JSON.parse(HKIA.cookie(HKIA.config("cookie_key").weather) || "{}");
                "latestUpdate" in u && e.call(this, n, u)
            } else HKIA.API.load("weather_warning", {
                callback: function(e) {
                    for (var u in e) e.length && ($.inArray(e[u].code, ["PTC"]) > -1 || $.inArray(e[u].code, ["TSW"]) > -1 || $.inArray(e[u].code, ["CWW"]) > -1 ? (s = !0, a = e[u].name[t], r = e[u].code, o = e[u].code, l.push({
                        warningTitle: a,
                        warningClass: r,
                        warningCode: o
                    })) : ($.inArray(e[u].code, ["RWS"]) > -1 || $.inArray(e[u].code, ["TCW"]) > -1) && (s = !0, a = e[u].name[t] + " (" + e[u].type[t] + ")", r = e[u].code + " " + e[u].type[0].toLowerCase().replace(/\./g, "").replace(/\s/g, "_"), o = e[u].code, l.push({
                        warningTitle: a,
                        warningClass: r,
                        warningCode: o
                    })));
                    if (l.length) {
                        for (u = 0; u < d.length; u++) h[d[u]] = u;
                        l.sort(function(e, t) {
                            return h[e.warningCode] - h[t.warningCode]
                        })
                    }
                    c = {
                        warningInfo: l,
                        hasWarning: s
                    }, HKIA.API.load("weather", {
                        callback: function(e) {
                            e.temperature || $(".topWeather").hide(), HKIA.extend(e, c), HKIA.cookie(HKIA.config("cookie_key").weather, JSON.stringify(e), HKIA.config("cookie_settings")), i.data = e, i.trigger(n, [e])
                        },
                        config: {
                            error: function() {
                                $(".topWeather").hide()
                            }
                        }
                    })
                },
                config: {
                    error: function() {
                        $(".topWeather").hide()
                    }
                }
            });
            return this
        },
        destroy: function() {
            HKIA.Weather = i
        }
    }), HKIA.Weather = new n(e), HKIA.Weather
}, HKIA.fn.banner = function() {
    var e = Array.apply(null, arguments);
    if (e.length && "object" != typeof e[0]) {
        if ("string" == typeof e[0]) {
            switch (e.shift()) {
                case "update":
                    this.each(function(t, i) {
                        var n = HKIA(i),
                            a = n.data("banner")._canvas;
                        if (!a) return HKIA.log("browser dose not support canvas."), !1;
                        var r = n.outerWidth(!0),
                            o = HKIA(a).attr({
                                width: r + "px"
                            }).height(),
                            s = e[0];
                        "function" == typeof s && (s = s.call(i)), s = s || 0;
                        var l = a.getContext("2d");
                        l.fillStyle = "#FFF", l.save(), l.clearRect(0, 0, r, o), l.translate(0, o), l.beginPath();
                        var c = o * s;
                        l.lineTo(0, -c), l.lineTo(r / 2, -o), l.lineTo(r, -c), l.lineTo(r, 0), l.lineTo(0, 0), l.closePath(), l.fill(), l.restore()
                    })
            }
        }
    } else {
        var t = HKIA.extend({
            runwayHeight: 100,
            runwayStartRate: 0
        }, e[0]);
        this.each(function(e, i) {
            HKIA("runwayCanvas", i).remove();
            var n = !!HKIA.isCanvasSupported() && HKIA("<canvas>", {
                id: "runwayCanvas",
                attr: {
                    width: HKIA(i).outerWidth(!0) + "px",
                    height: t.runwayHeight + "px"
                }
            }).appendTo(i).get(0);
            HKIA(i).data({
                banner: {
                    _canvas: n
                }
            })
        }).banner("update", t.runwayStartRate)
    }
    return this
}, HKIA.fn.switchView = function() {
    var e = "displayMode",
        t = Array.apply(null, arguments);
    if (t.length && "object" != typeof t[0]) {
        if ("string" == typeof t[0]) {
            var i = t.shift();
            switch (i) {
                case "grid":
                case "list":
                    t.unshift(i),
                        function(t, i) {
                            var n = HKIA.Event("changedisplaymode");
                            this.trigger(n, t), n.isDefaultPrevented() || !1 === n.result || this.each(function(n, a) {
                                var r = HKIA(a);
                                if (!r.hasClass(t + "-mode")) {
                                    var o = r.data("switchView");
                                    if (!1 !== i && !1 !== o.storage) {
                                        var s = "switchView." + e;
                                        /sectionStorage|localStorage/.test(o.storageType) && void 0 != window[o.storageType] ? window[o.storageType].setItem(s, t) : HKIA.cookie(HKIA.config("prefix") + "." + s, t, HKIA.config("cookie_settings"))
                                    }
                                    r.removeClass("grid-mode list-mode").addClass(t + "-mode")
                                }
                            })
                        }.apply(this, t)
            }
        }
    } else {
        var n = HKIA.extend({
            storageType: void 0 != window.sessionStorage ? "sessionStorage" : "cookie",
            storage: !1,
            displayMode: "grid"
        }, t[0]);
        this.switchView(n.displayMode, !1).each(function(e, t) {
            var i = HKIA(t),
                a = {};
            a.switchView = {
                storageType: n.storageType,
                storage: n.storage
            }, i.data(a)
        })
    }
    return this
}, HKIA.fn.miniSlideShow = function() {
    var e = Array.apply(null, arguments);
    if (e.length && "object" != typeof e[0]) {
        if ("string" == typeof e[0]) {
            switch (e.shift()) {
                case "option":
                    break;
                case "reset":
                    this.each(function(e, t) {
                        $(t).children().slick("slickGoTo", 0), $(t).children().slick("setPosition"), $(t).filter(".auto").children().filter(".slick-initialized").filter(function() {
                            return $(this).css("opacity") > 0
                        }).slick("slickSetOption", "autoplay", !0, !0).parent().toggleClass("auto startAuto")
                    })
            }
        }
    } else this.each(function(t, i) {
        if ($(i).children().not(".slick-initialized").length) {
            var n = $.extend({
                lazyLoad: "ondemand",
                dots: !0,
                infinite: !0,
                speed: 400,
                autoplaySpeed: HKIA.config("autoPlaySpeed"),
                autoplay: !0
            }, e[0]);
            $(i).children().not(".slick-initialized").on("beforeChange", function(e, t, n, a) {
                setTimeout(function() {
                    $(i).children().hasClass("detail") && ($(t.$dots).css({
                        top: $(t.$slides.get(a)).outerHeight()
                    }), $(t.$list).css({
                        height: $(t.$slides.get(a)).outerHeight()
                    }), $(t.$slides.get(a)).find("figcaption").length > 0 && $(t.$dots).css({
                        top: $(t.$slides.get(a)).outerHeight()
                    }))
                }, 500)
            }).slick(n), n.autoplay && $(i).toggleClass("auto startAuto")
        }
    });
    return this
}, HKIA.fn.component = function(e) {
    var t = {
            commonTab: function(e) {
                var t;

                function i(e) {
                    var i = HKIA(this),
                        n = i.find(".tabContent .tabItem").filter(e),
                        a = i.find(".tabNav li").removeClass("current").filter(function() {
                            return $(this).find('a[href="' + e + '"]').length
                        }).addClass("current");
                    i.find(".tabContent .tabItem").stop().fadeTo(500, 0, function() {
                        $(this).css({
                            display: "none"
                        }), i.find(".tabContent").height(n.outerHeight(!0)).find(".tabItem").css({
                            position: "absolute",
                            "z-index": 0
                        }), n.stop().css({
                            position: "relative",
                            "z-index": 1
                        }).fadeTo(500, 1, function() {
                            $(i).find(".tabContent").height(""), $(this).css({
                                display: "block"
                            })
                        }), $(i).trigger("tabchange", [a.get(0), n.get(0)])
                    });
                    var r = HKIA(window).scrollTop();
                    location.hash = e, t ? (HKIA(window).scrollTop(r), i.find(".tabContent").css({
                        opacity: 1
                    })) : setTimeout(function() {
                        var n = $(e).offset().top - $(".tabNav").height() - $(".headerContainer").height();
                        HKIA(window).scrollTop(n), t = !0, i.find(".tabContent").animate({
                            opacity: 1
                        })
                    }, 1e3);
                    var o = $(i).find(".mobileTabContainer");
                    o.length && o.find("select").val(e).hkia_selectmenu("refresh")
                }
                if (e) switch (e) {
                    case "refresh":
                        this.each(function(e, t) {
                            $(t).find(".tabContent").height("auto");
                            var n = HKIA(t).find(".tabNav li.current");
                            if (n.hasClass("disabled")) {
                                var a = n.removeClass("current").siblings("li:not(.disabled):first").attr("href");
                                a ? i.call(t, a) : $(t).find(".tabContent>.tabItem").fadeTo(500, 0, function() {
                                    $(this).css({
                                        display: "none"
                                    })
                                })
                            }
                        });
                        break;
                    case "tabTo":
                        var n = arguments[1];
                        this.each(function(e, t) {
                            var a = HKIA(t).find(".tabNav li:eq(" + n + ")").find("a").attr("href");
                            i.call(t, a)
                        });
                        break;
                    case "disable":
                        n = arguments[1];
                        this.each(function(e, t) {
                            var i = HKIA(t).find(".mobileTabContainer"),
                                a = HKIA(t).find(".tabNav li:eq(" + n + ")");
                            if (isNaN(n)) a = HKIA(t).find(".tabNav li");
                            a.addClass("disabled"), i.length && (a.each(function(e, t) {
                                HKIA(t).data("mobileElement").prop("disabled", !0)
                            }), i.find("select").hkia_selectmenu("refresh"))
                        }), arguments.callee.call(this, "refresh");
                        break;
                    case "enable":
                        n = arguments[1];
                        this.each(function(e, t) {
                            var i = HKIA(t).find(".mobileTabContainer"),
                                a = HKIA(t).find(".tabNav li:eq(" + n + ")");
                            if (isNaN(n)) a = HKIA(t).find(".tabNav li");
                            a.removeClass("disabled"), i.length && (a.each(function(e, t) {
                                HKIA(t).data("mobileElement").prop("disabled", !1)
                            }), i.find("select").hkia_selectmenu("refresh"))
                        }), arguments.callee.call(this, "refresh");
                        break;
                    case "currentTab":
                        return this.eq(0).find(".tabNav li.current")
                } else {
                    if (!this.length) return this;
                    this.each(function(e, t) {
                        $.isMobile() && $(t).addClass("mobile");
                        var n = HKIA(t).find(".mobileTabContainer");
                        if (location.hash.replace("#", "").length ? i.call(HKIA(t), location.hash) : HKIA(t).find(".tabContent").css({
                                opacity: 1
                            }), HKIA(t).attr("data-tab", !0).find(".tabNav").children().click(function(e) {
                                var n = e.currentTarget;
                                if ($(n).hasClass("disabled")) return !1;
                                var a = HKIA(t).find(".tabNav li:eq(" + HKIA(n).index() + ")").find("a").attr("href"),
                                    r = $.Event("beforeTabChange");
                                return HKIA(t).trigger(r, [n, HKIA(t).find(".tabContent .tabItem").filter(a).get(0)]), !1 === r.result || r.isDefaultPrevented() || i.call(t, a), !1
                            }).filter(".current").each(function(e, i) {
                                $(t).find(".tabContent .tabItem").css({
                                    opacity: 0,
                                    position: "absolute",
                                    "z-index": 0,
                                    display: "none"
                                }).filter(HKIA(i).find("a").attr("href")).css({
                                    opacity: 1,
                                    position: "relative",
                                    "z-index": 1,
                                    display: "block"
                                })
                            }), $(t).find(".tabNav li.current").length && HKIA(t).find(".tabNav").scrollLeft(0).animate({
                                scrollLeft: $(t).find(".tabNav li.current").position().left
                            }, {
                                duration: 500
                            }), n.length) {
                            var a = HKIA("<select/>").appendTo(n);
                            $(t).find(".tabNav").children().each(function(e, t) {
                                var i = HKIA("<option/>", {
                                    value: HKIA(t).children("a").attr("href"),
                                    text: HKIA(t).text()
                                }).prop("selected", HKIA(t).hasClass("current")).appendTo(a);
                                HKIA(t).data({
                                    mobileElement: i
                                })
                            }), a.hkia_selectmenu().on("hkia_selectmenuchange", function(e) {
                                $(t).find(".tabNav").find('[href="' + HKIA(e.currentTarget).val() + '"]').trigger("click")
                            })
                        }
                        HKIA(window).bind("hashchange", function() {
                            i.call(HKIA(location.hash).parents("[data-tab]:first").get(0), location.hash)
                        })
                    })
                }
            },
            accordion: function(e) {
                var t = this;

                function i(e) {
                    $(e.currentTarget).data("accordionContainer").removeClass("open"), $(e.currentTarget).off(jQuery.transitionEnd, i), e.preventDefault()
                }
                var n = {
                    expend: function() {
                        var e = this.content.show().height();
                        this.content.css({
                            display: ""
                        }), this.handle.attr({
                            "aria-expanded": "true"
                        }), this.content.attr({
                            "aria-hidden": "false"
                        }), this.target.addClass("open"), this.content.off(jQuery.transitionEnd, i).addClass("animate").height(e)
                    },
                    collapse: function() {
                        this.content.off(jQuery.transitionEnd, i).addClass("animate").one(jQuery.transitionEnd, i).height(""), this.handle.attr({
                            "aria-expanded": "false"
                        }), this.content.attr({
                            "aria-hidden": "true"
                        }), this.content.height() || this.target.removeClass("open")
                    }
                };
                if ("string" == typeof e) switch (e) {
                    case "refresh":
                        $(this).each(function(e, t) {
                            $(t).data("accordion").filter(".open").each(function(e, t) {
                                $(t).data("accordion").content.removeClass("animate").height("auto").height(function(e, t) {
                                    return t
                                })
                            })
                        });
                        break;
                    case "reset":
                        $(this).data("accordion").filter(".open").removeClass("open").each(function(e, t) {
                            $(t).data("accordion").content.removeClass("animate").height("")
                        }), $(this).trigger("reset");
                        break;
                    case "expand":
                        n.expend.call($(this).data("accordion").eq(arguments[1]).data("accordion"));
                        break;
                    case "collapse":
                        n.collapse.call($(this).data("accordion").eq(arguments[1]).data("accordion"));
                        break;
                    case "expandAll":
                        $(this).data("accordion").each(function(e, t) {
                            n.expend.call($(t).data("accordion"))
                        });
                        break;
                    case "collapseAll":
                        $(this).data("accordion").each(function(e, t) {
                            n.collapse.call($(t).data("accordion"))
                        })
                } else {
                    var a = $.extend({
                        target: ".accordionItem",
                        handle: ">a",
                        content: ".accordionContent"
                    }, e);
                    $(a.content, this).on(jQuery.transitionEnd, function(e) {
                        $(e.currentTarget).removeClass("animate"), e.preventDefault()
                    }), this.each(function(e, i) {
                        var r = $(i).index();
                        $(a.target, i).each(function(e, i) {
                            var o = {
                                target: $(i),
                                handle: $(i).find(a.handle),
                                content: $(i).find(a.content)
                            };
                            o.handle.data({
                                accordionContainer: $(i)
                            }), o.handle.attr({
                                "aria-expanded": "false",
                                "aria-controls": "accordion-" + r + "-" + (e + 1)
                            }), o.content.data({
                                accordionContainer: $(i)
                            }), (!o.content.hasClass("accordionContentMobile") || $.isMobile() && o.content.hasClass("accordionContentMobile")) && o.content.attr({
                                "aria-hidden": "true",
                                id: "accordion-" + r + "-" + (e + 1)
                            }), o.handle.click(function(e) {
                                if (o.target.hasClass("open")) {
                                    i = $.Event("collapsebefore");
                                    $(t).trigger(i, o.target), i.isDefaultPrevented() || !1 === i.reault || (n.collapse.call(o), $(t).trigger("collapse", o.target))
                                } else {
                                    var i = $.Event("expandbefore");
                                    $(t).trigger(i, o.target), i.isDefaultPrevented() || !1 === i.reault || (n.expend.call(o), $(t).trigger("expand", o.target))
                                }
                            }), $(i).data({
                                accordion: o
                            })
                        }), $(i).data({
                            accordion: $(a.target, i)
                        })
                    })
                }
            }
        },
        i = Array.apply(null, arguments);
    if (i.shift(), e in t) {
        var n = t[e].apply(this, i);
        if (void 0 !== n) return n
    }
    return this
}, $.fn.HKIASlideShow = function() {
    var e = Array.apply("", arguments),
        t = {
            transform: function(e) {
                return $(this).css({
                    "-webkit-transform": e,
                    "-moz-transform": e,
                    "-ms-transform": e,
                    "-o-transform": e,
                    transform: e
                })
            },
            dotsRefresh: function(e) {
                isNaN(e) && (e = $(this).data("HKIASlideShow.data").current), $(this).find(".HKIASlideDots li.HKIASlideDotCurrent").index() != e && $(this).find(".HKIASlideDots li:eq(" + e + ")").addClass("HKIASlideDotCurrent").siblings().removeClass("HKIASlideDotCurrent")
            },
            animationStart: function(e) {
                $(this).trigger("beforeAnimating").addClass("HKIASlideAnimating", [$(this).data("HKIASlideShow.data").current, e]), t.dotsRefresh.call($(this), e)
            },
            animationComplete: function() {
                $(this).removeClass("HKIASlideAnimating").trigger("afterAnimating", $(this).data("HKIASlideShow.data").current)
            }
        },
        i = {
            prev: function(e) {
                return $(this).each(function(i, n) {
                    if ($(n).hasClass("HKIASlideAnimating")) return !0;
                    var a = $(n).data("HKIASlideShow.config"),
                        r = $(n).data("HKIASlideShow.data").current,
                        o = $(n).find(".HKIASlide:eq(" + r + ")").prev();
                    if (o.length) {
                        var s = $(n).data("HKIASlideShow.data").x,
                            l = o.data("HKIASlide.animation").prop("rate");
                        $(n).triggerHandler("beforePrev", [r, r - 1]), t.animationStart.call($(n), r - 1), $(n).removeClass("HKIASlideDirectionRight").addClass("HKIASlideDirectionLeft").data("HKIASlideShow.animation").stop().prop({
                            rate: 0
                        }).delay(a.delay).animate({
                            rate: 1
                        }, {
                            duration: isNaN(e) ? a.speed : e,
                            start: function() {
                                o.data("HKIASlide.animation").stop()
                            },
                            step: function(e) {
                                var i = l + (0 - l) * e,
                                    r = s + (o.position().left - s) * e;
                                $(n).data("HKIASlideShow.data").x = r, o.data("HKIASlide.animation").prop({
                                    rate: i
                                }), t.transform.call(o.children(".HKIASlideContent"), "translate(" + i * a.arrowsHoverOffset + "px, 0)"), t.transform.call($(n).find(".HKIASlideTrack"), "translate(-" + r + "px, 0)")
                            },
                            complete: function() {
                                $(n).removeClass("HKIASlideAnimating").data("HKIASlideShow.data").current = r - 1, $(n).find(".HKIASlide:eq(" + (r - 1) + ")").addClass("HKIASlideCurrent").siblings().removeClass("HKIASlideCurrent"), t.animationComplete.call($(n)), $(n).triggerHandler("afterPrev", $(n).data("HKIASlideShow.data").current), $(n).removeClass("hover"), $(".HKIASlidePrev").trigger("mouseout")
                            }
                        })
                    }
                }), this
            },
            next: function(e) {
                return $(this).each(function(i, n) {
                    if ($(n).hasClass("HKIASlideAnimating")) return !0;
                    var a = $(n).data("HKIASlideShow.config"),
                        r = $(n).data("HKIASlideShow.data").current,
                        o = $(n).find(".HKIASlide:eq(" + r + ")").next();
                    if (o.length) {
                        var s = $(n).data("HKIASlideShow.data").x,
                            l = o.data("HKIASlide.animation").prop("rate");
                        $(n).triggerHandler("beforeNext", [r, r + 1]), t.animationStart.call($(n), r + 1), $(n).removeClass("HKIASlideDirectionLeft").addClass("HKIASlideDirectionRight").data("HKIASlideShow.animation").stop().prop({
                            rate: 0
                        }).delay(a.delay).animate({
                            rate: 1
                        }, {
                            duration: isNaN(e) ? a.speed : e,
                            start: function() {
                                o.data("HKIASlide.animation").stop()
                            },
                            step: function(e) {
                                var i = l + (0 - l) * e,
                                    r = s + (o.position().left - s) * e;
                                $(n).data("HKIASlideShow.data").x = r, o.data("HKIASlide.animation").prop({
                                    rate: i
                                }), t.transform.call(o.children(".HKIASlideContent"), "translate(-" + i * a.arrowsHoverOffset + "px, 0)"), t.transform.call($(n).find(".HKIASlideTrack"), "translate(-" + r + "px, 0)")
                            },
                            complete: function() {
                                $(n).data("HKIASlideShow.data").current = r + 1, $(n).find(".HKIASlide:eq(" + (r + 1) + ")").addClass("HKIASlideCurrent").siblings().removeClass("HKIASlideCurrent"), t.animationComplete.call($(n)), $(n).triggerHandler("afterNext", $(n).data("HKIASlideShow.data").current), $(n).removeClass("hover"), $(".HKIASlideNext").trigger("mouseout")
                            }
                        })
                    }
                }), this
            },
            jumpTo: function(e) {
                return $(this).each(function(i, n) {
                    if ($(n).hasClass("HKIASlideAnimating") || $(n).data("HKIASlideShow.data").current == e) return !0;
                    var a = $(n).data("HKIASlideShow.config"),
                        r = $(n).find(".HKIASlide:eq(" + e + ")");
                    if (r.length) {
                        var o = $(n).data("HKIASlideShow.data").x;
                        $(n).data("HKIASlideShow.data").current > e ? $(n).removeClass("HKIASlideDirectionRight").addClass("HKIASlideDirectionLeft") : $(n).removeClass("HKIASlideDirectionLeft").addClass("HKIASlideDirectionRight"), $(n).triggerHandler("beforeJumpTo", [$(n).data("HKIASlideShow.data").current, e]), t.animationStart.call($(n), e), $(n).data("HKIASlideShow.animation").stop().prop({
                            rate: 0
                        }).delay(a.delay).animate({
                            rate: 1
                        }, {
                            duration: a.speed,
                            step: function(e) {
                                var i = o + (r.position().left - o) * e;
                                $(n).data("HKIASlideShow.data").x = i, t.transform.call($(n).find(".HKIASlideTrack"), "translate(-" + i + "px, 0)")
                            },
                            complete: function() {
                                $(n).data("HKIASlideShow.data").current = e, $(n).find(".HKIASlide:eq(" + e + ")").addClass("HKIASlideCurrent").siblings().removeClass("HKIASlideCurrent"), t.animationComplete.call($(n)), $(n).triggerHandler("afterJumpTo", $(n).data("HKIASlideShow.data").current)
                            }
                        })
                    }
                }), this
            },
            current: function() {
                return $(this).eq(0).data("HKIASlideShow.data").current
            },
            options: function(e, n) {
                if (2 != arguments.length) return $(this).eq(0).data("HKIASlideShow.config")[e];
                $(this).each(function(a, r) {
                    var o = $(r),
                        s = o.data("HKIASlideShow.config");
                    if (e in s) switch (s[e] = n, e) {
                        case "dots":
                            n ? o.append(function() {
                                return $(s.dotsContainerTemplate.replace(/\{\{bullets\}\}/, '<ul class="HKIASlideDots"></ul>')).addClass("HKIASlideDotsContainer").each(function(e, t) {
                                    o.find(".HKIASlide").each(function(e, n) {
                                        $(t).find(".HKIASlideDots").append(function() {
                                            var t = "HKIASlideDot";
                                            return e == o.data("HKIASlideShow.data").current && (t += " HKIASlideDotCurrent"), $("<li/>", {
                                                class: t
                                            }).append(function() {
                                                return $(s.dotBulletTemplate).text(e).addClass("HKIASlideBullet").on("click", function(t) {
                                                    $(this).parent().addClass("HKIASlideDotCurrent").siblings().removeClass("HKIASlideDotCurrent"), i.jumpTo.call(o, e)
                                                })
                                            })
                                        })
                                    })
                                })
                            }) : o.find(".HKIASlideDotsContainer").remove();
                            break;
                        case "arrows":
                            n ? o.append(function() {
                                return $(s.arrowTemplate.replace(/\{\{data-label\}\}/, 'data-label="' + s.prevLabel + '"')).addClass("HKIASlidePrev icon-plane-l HKIASlideArrow").on({
                                    mouseenter: function() {
                                        if (o.hasClass("HKIASlideAnimating")) return !0;
                                        $(this).addClass("hover");
                                        var e = o.data("HKIASlideShow.data").current,
                                            i = $(o.find(".HKIASlide:eq(" + e + ")").prev());
                                        i.length && i.data("HKIASlide.animation").stop().animate({
                                            rate: 1
                                        }, {
                                            duration: s.arrowsHhoverSpeed,
                                            step: function(e) {
                                                t.transform.call(i.children(".HKIASlideContent"), "translate(" + e * s.arrowsHoverOffset + "px, 0)")
                                            }
                                        })
                                    },
                                    mouseleave: function() {
                                        if (o.hasClass("HKIASlideAnimating")) return !0;
                                        $(this).removeClass("hover");
                                        var e = o.data("HKIASlideShow.data").current,
                                            i = $(o.find(".HKIASlide:eq(" + e + ")").prev());
                                        i.length && i.data("HKIASlide.animation").stop().animate({
                                            rate: 0
                                        }, {
                                            duration: s.arrowsHhoverSpeed,
                                            step: function(e) {
                                                t.transform.call(i.children(".HKIASlideContent"), "translate(" + e * s.arrowsHoverOffset + "px, 0)")
                                            }
                                        })
                                    },
                                    click: function(e) {
                                        i.prev.call(o)
                                    }
                                })
                            }).append(function() {
                                return $(s.arrowTemplate.replace(/\{\{data-label\}\}/, 'data-label="' + s.nextLabel + '"')).addClass("HKIASlideNext icon-plane-r HKIASlideArrow").on({
                                    mouseenter: function() {
                                        if (o.hasClass("HKIASlideAnimating")) return !0;
                                        $(this).addClass("hover");
                                        var e = o.data("HKIASlideShow.data").current,
                                            i = $(o.find(".HKIASlide:eq(" + e + ")").next());
                                        i.length && i.data("HKIASlide.animation").stop().animate({
                                            rate: 1
                                        }, {
                                            duration: s.arrowsHhoverSpeed,
                                            step: function(e) {
                                                t.transform.call(i.children(".HKIASlideContent"), "translate(-" + e * s.arrowsHoverOffset + "px, 0)")
                                            }
                                        })
                                    },
                                    mouseleave: function() {
                                        if (o.hasClass("HKIASlideAnimating")) return !0;
                                        $(this).removeClass("hover");
                                        var e = o.data("HKIASlideShow.data").current,
                                            i = $(o.find(".HKIASlide:eq(" + e + ")").next());
                                        i.length && i.data("HKIASlide.animation").stop().animate({
                                            rate: 0
                                        }, {
                                            duration: s.arrowsHhoverSpeed,
                                            step: function(e) {
                                                t.transform.call(i.children(".HKIASlideContent"), "translate(-" + e * s.arrowsHoverOffset + "px, 0)")
                                            }
                                        })
                                    },
                                    click: function() {
                                        i.next.call(o)
                                    }
                                })
                            }) : o.find(".HKIASlideArrow").remove();
                            break;
                        case "prevLabel":
                            if (s.arrows)(l = o.find(".HKIASlidePrev.HKIASlideArrow[data-label]")).length || (l = o.find(".HKIASlidePrev.HKIASlideArrow").find("[data-label]")), l.length && l.attr({
                                "data-label": n
                            });
                            break;
                        case "nextLabel":
                            var l;
                            if (s.arrows)(l = o.find(".HKIASlideNext.HKIASlideArrow[data-label]")).length || (l = o.find(".HKIASlideNext.HKIASlideArrow").find("[data-label]")), l.length && l.attr({
                                "data-label": n
                            })
                    }
                })
            },
            refresh: function() {
                return $(this).each(function(e, i) {
                    var n = 0;
                    $(i).height("").height(function() {
                        return $(this).parent().height()
                    }).find(".HKIASlide").width($(i).width()).each(function(e, t) {
                        n += $(t).width()
                    }), $(i).find(".HKIASlideTrack").width("").width(n);
                    var a = $(i).data("HKIASlideShow.data").current;
                    $(i).data("HKIASlideShow.data").x = $(i).find(".HKIASlide:eq(" + a + ")").addClass("HKIASlideCurrent").position().left, t.transform.call($(i).find(".HKIASlideTrack"), "translate(-" + $(i).data("HKIASlideShow.data").x + "px, 0)")
                }), this
            }
        };
    if (e.length && "object" != typeof e[0]) {
        if ("string" == typeof e[0]) {
            var n = e.shift();
            if (n in i) return i[n].apply(this.filter(function(e, t) {
                return $(t).data("HKIASlideShow.config")
            }), e)
        }
    } else {
        var a = $.extend({
            dots: !0,
            dotsContainerTemplate: "<div><span></span><div>{{bullets}}</div></div>",
            dotBulletTemplate: "<a></a>",
            arrows: !0,
            startSlide: 0,
            arrowTemplate: "<a {{data-label}} ></a>",
            prevLabel: "PAST",
            nextLabel: "FUTURE",
            arrowsHoverOffset: 120,
            arrowsHhoverSpeed: 300,
            speed: 500,
            delay: 0
        }, e[0]);
        this.filter(function(e, t) {
            return !$(t).data("HKIASlideShow.config")
        }).each(function(e, t) {
            var n = $(t).data({
                "HKIASlideShow.config": a,
                "HKIASlideShow.data": {
                    current: a.startSlide,
                    x: 0
                },
                "HKIASlideShow.animation": $({
                    rate: 0
                })
            });
            n.addClass("HKIASlideShow").children().addClass("HKIASlide").each(function(e, t) {
                $(t).data({
                    "HKIASlide.animation": $({
                        rate: 0
                    })
                })
            }).wrapInner($("<div/>", {
                class: "HKIASlideContent"
            })), n.wrapInner($("<div/>", {
                class: "HKIASlideTrack"
            })).wrapInner($("<div/>", {
                class: "HKIASlideClip"
            })), i.options.apply(n, ["arrows", a.arrows]), i.options.apply(n, ["dots", a.dots]), i.refresh.apply(n)
        })
    }
    return this
}, HKIA.render = function(e) {
    function t(e) {
        for (i in e) this[i] = e[i]
    }
    return t.prototype = {
        _renderLoopLimit: 10,
        _template: null,
        _content: null,
        setTemplate: function(e, t, i) {
            var n = HKIA.extend({
                    displayName: e,
                    id: e,
                    getInitialState: function() {
                        return this.props
                    }
                }, i, {
                    _container: function() {
                        return HKIA(ReactDOM.findDOMNode(this).parentNode)
                    },
                    render: t
                }),
                a = {};
            a = n.id ? $.extend(a, {
                componentDidMount: function() {
                    var e = this._container().data("renderID");
                    e && HKIA.log("renderID(" + e + ") will overrided!"), this._container().data({
                        renderID: n.id,
                        reactContent: this
                    });
                    var t = this;
                    this._container().on("renderdataupdate", function(e, i) {
                        t.setState(i)
                    })
                }
            }) : $.extend(a, {
                componentWillReceiveProps: function(e) {
                    e && this.setState(e)
                }
            }), $.each(a, function(e, t) {
                var i = n[e];
                n[e] = function() {
                    var e = t.apply(this, arguments),
                        n = void 0;
                    return i && (n = i.apply(this, arguments)), void 0 === n ? e : n
                }
            }), this._template[e] = React.createClass(n)
        },
        template: function(e) {
            return this._template[e]
        },
        content: function(e, t) {
            return React.createElement(this._template[e], t)
        }
    }, new t({
        _template: {}
    })
}(), HKIA.fn.render = function() {
    var e = Array.apply(null, arguments);
    if (e.length && "object" != typeof e[0]) {
        if ("string" == typeof e[0]) {
            switch (e.shift()) {
                case "existRenderID":
                    return this.eq(0).data("renderID")
            }
        }
    } else this.each(function(t, i) {
        var n = HKIA.extend({
                key: HKIA(i).attr("data-render-id"),
                data: null,
                callback: function() {}
            }, e[0]),
            a = n.data;
        "function" == typeof a && (a = a());
        var r = 0;
        HKIA(i).data("renderID") == n.key ? HKIA(i).triggerHandler("renderdataupdate", [a]) : HKIA.render._template[n.key] ? ReactDOM.render(HKIA.render.content(n.key, a), i) : (clearInterval($(i).data("renderLoop")), $(i).data({
            renderLoop: setInterval(function() {
                ++r >= HKIA.render._renderLoopLimit && (clearInterval($(i).data("renderLoop")), HKIA.log('template "' + n.key + '" dose not exist!')), HKIA.render._template[n.key] && (clearInterval($(i).data("renderLoop")), ReactDOM.render(HKIA.render.content(n.key, a), i))
            }, 100)
        })), HKIA.phoneNumber(), HKIA.globalAnimate(), n.callback && n.callback()
    });
    return this
}, $(function() {
    if ($("html").hasClass("no-csstransitions")) {
        var e = "";
        e += '<div class="outdatedPopup">', e += '\t<div class="outdatedLogo"><img src="/iwov-resources/image/common/logo.png" alt="Hong Kong International Airport" /></div>', e += '\t<div class="langEng">', e += "\t<p>For the best viewing experience, please upgrade your browser to the most up-to-date version.</p>", e += "\t</div>", e += '\t<div class="langTc">', e += "\t<p>請將瀏覽器更新至最新版本，以享有最佳瀏覽體驗。</p>", e += "\t</div>", e += '\t<div class="langSc">', e += "\t<p>请将浏览器更新至最新版本，以享有最佳浏览体验。</p>", e += "\t</div>", e += "</div>", $.magnificPopup.open({
            mainClass: "outdated",
            items: {
                src: e,
                type: "inline"
            },
            removalDelay: 160,
            preloader: !1,
            fixedContentPos: !1,
            callbacks: {
                markupParse: function(e, t, i) {},
                open: function() {}
            }
        })
    }
    $(".menuWrapper").on("refresh", function(e) {
        var t = $(e.currentTarget);
        t.prev(".arrows").hide(), t.hasClass("mobile") && t.prev(".arrows").length && t.find(".menuInner").width() < t.find(".menuInner ul").outerWidth() && (t.prev(".arrows").show(), setTimeout(function() {
            t.find(".menuInner").trigger("scroll")
        }, 0))
    }).hkia_submenu({
        mobile: $.isMobile()
    }), $(".menuWrapper").filter(function() {
        return $(this).prev(".arrows").length
    }).find(".menuInner").on("scroll", function(e) {
        var t = $(this).parent().prev(".arrows").children().hide(),
            i = $(e.currentTarget);
        i.scrollLeft() > 0 && t.filter(".btnPrev").show(), i.scrollLeft() < i.children("ul").width() - i.width() - 1 && t.filter(".btnNext").show()
    }), $(window).resize(function() {
        $(".menuWrapper").hkia_submenu("refresh")
    }), $("img.lazy").lazyload({
        threshold: 200
    }), $("select.skinup").hkia_selectmenu(), $(window).resize(function() {
        $(".hkia_customSelect select").hkia_selectmenu("close")
    }), $("input.calendar.skinup").on("hkia_datepickerbeforeshow", function(e) {
        $(e.currentTarget).parent(".filterSelectBox").addClass("active")
    }).on("hkia_datepickerclose", function(e) {
        $(e.currentTarget).parent(".filterSelectBox").removeClass("active")
    }).hkia_datepicker({
        showOn: "button",
        buttonText: HKIA.__("selectDateDesc"),
        beforeGoToCurrentDate: function() {
            return "function" != typeof HKIA.Clock ? HKIA.Clock.getCurrentDateObject() : HKIA.config("server_time")
        },
        beforeShowDay: function(e) {
            new Date;
            var t = "function" != typeof HKIA.Clock ? HKIA.Clock.getCurrentDateObject() : HKIA.config("server_time"),
                i = [!0];
            return e.getFullYear() == t.getFullYear() && e.getMonth() == t.getMonth() && e.getDate() == t.getDate() && (i = [!0, "ui-datepicker-today-hk"]), i
        }
    }).each(function(e, t) {
        $(t).hkia_datepicker("setDate", HKIA.config("server_time"))
    }), $("input.searchInput").hkia_searchfield({
        searchProvider: HKIA.SmartSearch,
        minLength: 3,
        onSubmit: function(e) {
            e.isDefaultPrevented() || !1 === e.result || (location.href = HKIA.config("search_result_url") + "?q=" + encodeURIComponent($(e.currentTarget).val()))
        }
    });
    var t = HKIA(window).scrollTop();
    HKIA(".topBanner").banner({
        runwayHeight: 60,
        runwayStartRate: function() {
            var e = HKIA(this).hasClass(".mini") ? 2 : 4;
            return t / e / 100
        }
    });
    var i, n = '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe><div class="videoYtTitle mfp-title"></div><div class="videoYtDesc mfp-desc"></div></div>';
    $(".popup-youtube").each(function() {
        var e = $(this).attr("href");
        if (0 == e.indexOf("KID-")) {
            $(this).removeClass("popup-youtube").addClass("popup-kaltura");
            var t = e.replace("KID-", "");
            i = t, $(this).attr("data-video", t), e = "//corpvideo.hkairport.com/embed/secure/iframe/entryId/" + i + "/uiConfId/41657502?flashvars[autoPlay]=true", $(this).attr("href", e)
        } else e = "//www.youtube.com/watch?rel=0&v=" + e, $(this).attr("href", e)
    });
    var a = '<div class="mfp-inline-scaler"><div class="mfp-close"></div><div class="kalturaPlayer"><iframe id="kmsembed-' + i + '" width="100%" height="100%" class="mfp-iframe kmsembed" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay; fullscreen; encrypted-media" frameborder="0" title="Kaltura Player"></iframe></div><div class="videoYtTitle mfp-title"></div><div class="videoYtDesc mfp-desc"></div></div>';

    function r() {
        $(".mfp-close").attr("aria-label", HKIA.__("Close"))
    }
    $(".popup-kaltura").magnificPopup({
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: !1,
        fixedContentPos: !1,
        src: a,
        iframe: {
            markup: a
        },
        callbacks: {
            markupParse: function(e, t, i) {
                i.el.attr("data-title") && $(e).find(".videoYtTitle").show(), i.el.attr("data-desc") && $(e).find(".videoYtDesc").show(), t.title = i.el.attr("data-title"), t.desc = i.el.attr("data-desc")
            },
            open: function(e, t, i) {
                r()
            }
        }
    }), $(".popup-youtube, .popup-vimeo").magnificPopup({
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: !1,
        fixedContentPos: !1,
        iframe: {
            markup: n
        },
        callbacks: {
            markupParse: function(e, t, i) {
                i.el.attr("data-title") && $(e).find(".videoYtTitle").show(), i.el.attr("data-desc") && $(e).find(".videoYtDesc").show(), t.title = i.el.attr("data-title"), t.desc = i.el.attr("data-desc")
            },
            open: function() {
                r()
            }
        }
    }), $(".popup-video").each(function() {
        var e = $(this).attr("href");
        $(this).attr("href", e)
    }), $(".popup-video, .popup-vimeo").magnificPopup({
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: !1,
        fixedContentPos: !1,
        iframe: {
            markup: n
        },
        callbacks: {
            markupParse: function(e, t, i) {
                i.el.attr("data-title") && $(e).find(".videoYtTitle").show(), i.el.attr("data-desc") && $(e).find(".videoYtDesc").show(), t.title = i.el.attr("data-title"), t.desc = i.el.attr("data-desc")
            },
            open: function() {
                r()
            }
        }
    }), $(".open-popup-video").length > 0 && $("body").append('<div id="popup-with-video" class="mfp-hide"></div>'), $(".open-popup-video").click(function() {
        var e = '<source src="' + $(this).attr("data-video") + '" type="video/mp4">';
        if ($("#popup-with-video").html(""), $("#popup-with-video").append($('<video width="100%" height="50%" style="padding-left:0%" controls>')), $("#popup-with-video video").html(e), $(this).attr("data-title") && $(".videoTitle").length <= 0) {
            var t = '<div class="videoTitle">' + $(this).attr("data-title") + "</div>";
            $(t).appendTo($("#popup-with-video"))
        }
        if ($(this).attr("data-desc") && $(".videoDesc").length <= 0) {
            var i = '<div class="videoDesc">' + $(this).attr("data-desc") + "</div>";
            $(i).appendTo($("#popup-with-video"))
        }
        $.magnificPopup.open({
            items: {
                src: "#popup-with-video"
            },
            type: "inline",
            callbacks: {
                close: function() {
                    $("#popup-with-video video").html("")
                },
                open: function() {
                    r(), $("#popup-with-video video")[0].play()
                }
            }
        })
    }), $(".btnSpeaker").magnificPopup({
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: !1,
        fixedContentPos: !1,
        callbacks: {
            open: function(e) {
                $(".mfp-close").attr("aria-label", HKIA.__("Close"))
            }
        }
    });
    var o = !1,
        s = navigator.userAgent;

    function l() {
        function e(e) {
            for (;
                /(\d+)(\d{3})/.test(e.toString());) e = e.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
            return e
        }

        function t(e) {
            for (;
                /(\d+)(\d{3})/.test(e.toString());) e = e.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1 ");
            return e
        }
        $(".dynamic-number").each(function(i) {
            $(this).find("span").each(function(i) {
                var n = $(this).html(),
                    a = this;
                if (n) {
                    var r = n.indexOf(",") > -1,
                        o = n.indexOf(" ") > -1,
                        s = n.indexOf("/") > -1;
                    if (r) {
                        n = n.replace(/,/gi, "");
                        var l = parseInt(n)
                    } else if (o) {
                        n = n.replace(/ /gi, "");
                        l = parseInt(n)
                    } else l = s ? n : parseFloat(n);
                    var c = l % 1 != 0;
                    if (s) $(a).text(l);
                    else if (c) {
                        var h = l.toString().split(".")[1].length;
                        $({
                            numberValue: 0
                        }).animate({
                            numberValue: l
                        }, {
                            duration: 3e3,
                            easing: "easeInOutSine",
                            step: function(e) {
                                $(a).text(e.toFixed(h))
                            }
                        })
                    } else r ? $({
                        numberValue: 0
                    }).animate({
                        numberValue: l
                    }, {
                        duration: 3e3,
                        easing: "easeInOutSine",
                        step: function() {
                            $(a).text(e(Math.ceil(this.numberValue)))
                        },
                        complete: function() {
                            $(a).text(e(this.numberValue))
                        }
                    }) : o ? $({
                        numberValue: 0
                    }).animate({
                        numberValue: l
                    }, {
                        duration: 3e3,
                        easing: "easeInOutSine",
                        step: function() {
                            $(a).text(t(Math.ceil(this.numberValue)))
                        },
                        complete: function() {
                            $(a).text(t(this.numberValue))
                        }
                    }) : $({
                        numberValue: 0
                    }).animate({
                        numberValue: l
                    }, {
                        duration: 3e3,
                        easing: "easeInOutSine",
                        step: function() {
                            $(a).text(Math.ceil(this.numberValue))
                        },
                        complete: function() {
                            $(a).text(this.numberValue)
                        }
                    })
                }
            })
        })
    }
    if ($.each(HKIA.config("browser_support").replace(/ /g, "").split(","), function(e, t) {
            var i = t.match(/\d.*$/),
                n = t.replace(/\d.*$/, "").split("_");
            if ("ie" == n[0]) return $.isIE() ? i ? i.toString().indexOf("+") > -1 ? $.IEVersion() >= parseInt(i.toString().replace(/\+/, "")) && (o = !0, !1) : $.IEVersion() == parseInt(i[0]) && (o = !0, !1) : (o = !0, !1) : void 0;
            var a = n.pop();
            for (var r in n) {
                if (!(l = new RegExp(n[r], "i")).test(s)) return
            }
            var l = new RegExp(a + "/[\\d.]*", "i"),
                c = s.match(l);
            if (c) {
                if (c = c[0], i) {
                    var h = parseInt(c.replace(/\w*\/(.*)/, "$1"));
                    return i[0].indexOf("+") > -1 ? h >= parseInt(i[0].replace(/\+/, "")) && (o = !0, !1) : h == parseInt(i[0]) && (o = !0, !1)
                }
                return o = !0, !1
            }
        }), o ? HKIA.log("browser supported") : HKIA.log("browser dose not support"), $(".backContainer a.back").on("click", function(e) {
            if (e.preventDefault(), /mainland\-coaches/i.test(location.pathname)) {
                var t = location.pathname.split("/");
                t.pop(), location.href = t.join("/") + "/"
            }
            window.history.back()
        }), $(".presentFact").length) {
        var c = !1;
        $(window).on("scroll", function() {
            $(window).scrollTop() > $(".presentFact").offset().top / 3 && (c || (c = !0, l(), $(".presentFact").addClass("active")))
        })
    } else l();
    ($("body").on("statusChange", function(e, t) {
        "printer" == t && $(".lazy").each(function() {
            var e = $(this);
            e.attr("src", e.attr("data-original"))
        }), "desktop" != t.device ? $(".navBookmark").appendTo($(".navPos")) : $(".navBookmark").appendTo($(".topbarRight"))
    }), window.matchMedia) && window.matchMedia("print").addListener(function(e) {
        e.matches && $(".lazy").each(function() {
            var e = $(this);
            e.attr("src", e.attr("data-original"))
        })
    });
    $(".awardsYear").length && $(".awardsYear").each(function() {
        $(this).html($(this).text().replace(/\|\|/g, "<br />"))
    })
}), $(window).load(function() {
    $(".menuWrapper").hkia_submenu("refresh", 100)
}), HKIA.getHKTime = function(e, t) {
    var i = e ? new Date(e) : new Date,
        n = i.getTime() + (t || 0) + 6e4 * i.getTimezoneOffset();
    return new Date(n + 288e5)
}, HKIA.on("beforeInit.hkia", function(e) {
    var t = new Date;
    HKIA.ajax({
        url: "/iwov-resources/custom/json/server.json",
        async: !1,
        cache: !1,
        type: "POST",
        timeout: 0,
        success: function() {
            var e = new Date - t,
                i = arguments[2].getResponseHeader("date"),
                n = HKIA.getHKTime(i, e);
            HKIA._configProp("readOnly", !1), HKIA.config("server_time", n), HKIA._configProp("readOnly", !0)
        },
        error: function() {
            HKIA.config("develop_mode")
        }
    }), HKIA.i18n.lang(HKIA.language()), HKIA.API({
        dataType: "json",
        cache: !1,
        cacheOpts: {
            max: 3
        }
    }), HKIA.Share(), HKIA.Weather({
        expires: 6e5,
        autoUpdate: !0
    }), HKIA.Clock({
        baseTime: HKIA.config("server_time"),
        startTime: HKIA.config("visiting_time")
    }), HKIA.FlightBookmark({
        timeout: HKIA.config("bookmarkTimeout")
    }), HKIA.Header("header", {
        init: function() {
            this.Clock.update(HKIA.Clock.getCurrentDateObject()), this.on("mobile", function(e, t) {
                HKIA.MainMenu.mobile(t)
            }), this.find(".toolLanguage a").click(function(e) {
                HKIA.language($(e.currentTarget).attr("data-lang"))
            })
        },
        clockOptions: {
            handWidth: 2,
            scale: 1,
            mobile: {
                scale: 2
            }
        },
        bookmarkProvider: HKIA.FlightBookmark
    }), HKIA.MainMenu("#navigation", {
        init: function() {
            HKIA(".mobileMenuTrigger a").on("click", function(e) {
                HKIA("body").addClass("navIn")
            }), HKIA(".btnCloseMobileMenu").on("click", function(e) {
                HKIA.MainMenu.reset(), HKIA("body").removeClass("navIn")
            })
        }
    }), HKIA.ImportantNotice("#importantNotice", {
        init: function() {
            if (!this.isExists()) return !1;
            var e = this;
            this.find(".btnClose").attr("aria-label", HKIA.__("closeNotice")), this.removeAttr("style").on("refresh active", function(t) {
                if (e.active()) {
                    var i = e.find(".importantNoticeInner").outerHeight(!0);
                    e.height(i).find("a").removeAttr("tabindex"), HKIA("body").find(".topBanner, .topTitle").css({
                        "border-top-width": i
                    })
                } else e.height("").find("a").attr("tabindex", -1), HKIA("body").find(".topBanner, .topTitle").css({
                    "border-top-width": ""
                })
            }), HKIA(".btnImportantNotice").click(function(t) {
                e.active(!0), e.find(".importantNoticeInner a").first().focus(), HKIA.Header.mobile() && (HKIA.MainMenu.reset(), HKIA("body").removeClass("navIn"))
            }), this.find(".btnClose").click(function(t) {
                e.active(!1), $(".aboutUsSliderBox").length > 0 && setTimeout(function() {
                    $(".aboutUsSliderBox").HKIASlideShow("refresh"), HKIA.videoSize()
                }, 300)
            }), HKIA(".btnImportantNotice").click(function(t) {
                e.active(!0)
            }), this.on("active", function() {
                setTimeout(function() {
                    HKIA.globalAnimate()
                }, 1e3)
            }), this.find("li a").click(function() {
                e.active(!1)
            })
        }
    }), HKIA.Content("#main"), HKIA.Quicklink(".quicklinks", {
        shareProvider: HKIA.Share,
        shareMapping: {
            "icon-whatsapp": function(e) {
                window.open(e.toWhatsapp(window.location.href, HKIA("title").text(), !1))
            },
            "icon-email": function() {
                var e = "mailto:?body=" + HKIA.__("Click the following to access the sent link:") + "%0A%0A" + window.location.href + "&subject=" + HKIA.__("You have received the following link to the HKIA website");
                location.href = e
            }
        }
    }), HKIA.FloatingADBox(".floatingAdHocBox", {
        init: function() {
            var e = this;
            $(this).find(".btnClose").click(function(t) {
                e.close(!0)
            })
        }
    }), HKIA.Filter(".filterBox", {
        onAfterSift: function(e) {
            if (!e) return e;
            var t = this.attr("data-column-num");
            return t && ($("[data-filter]").removeAttr("data-column"), e.attr("data-column", function(e) {
                return e % parseInt(t)
            })), e.removeClass("even").filter(":even").addClass("even"), $(".btnCTA.loadMore").hide(), HKIA.log(e.end().length, e.length), (e.end() && e.length < e.end().length || !e.end() && e.last().length) && $(".btnCTA.loadMore").css({
                display: "table"
            }), $(".filterGroup").hide(), e.parents(".filterGroup").show(), HKIA.globalAnimate(), e
        }
    }), HKIA.cookie(HKIA.config("prefix") + ".smartbannerClosed") ? HKIA.cookie(HKIA.config("prefix") + ".smartbannerClosed", !0, HKIA.config("cookie_settings")) : "other" != HKIA.config("deviceType") && HKIA($("<div/>").prependTo($("body").addClass("withSmartBanner"))).render({
        key: "smartbanner"
    }), HKIA.Header.on("mini", function(e, t) {
        HKIA.Header.mobile() || (t ? $("#importantNotice").css("max-height", 0) : $("#importantNotice").css("max-height", ""))
    }).on("mobile", function(e, t) {
        t && $("#importantNotice").css("max-height", "")
    }), HKIA(".globalSilder").miniSlideShow(), HKIA(".tabContainer").component("commonTab"), HKIA().on("tabchange", function(e, t, i) {
        HKIA(i).find(".accordion").length && HKIA(i).find(".accordion").component("accordion", "refresh"), HKIA(".globalSilder", i).miniSlideShow("reset"), HKIA.globalAnimate(), $(".tabContent .futureSilder").length > 0 && ($(".tabContent .futureSilder").hasClass("slick-initialized") ? $(".tabContent .futureSilder").slick("setPosition") : $(".tabContent .futureSilder").slick({
            infinite: !1,
            slidesToShow: 3,
            slidesToScroll: 3,
            speed: 400,
            dots: !0,
            arrows: !1,
            responsive: [{
                breakpoint: 767,
                settings: {
                    arrows: !1,
                    infinite: !0,
                    slidesToScroll: 2,
                    slidesToShow: 2
                }
            }]
        }))
    }), HKIA(".accordion").each(function(e, t) {
        HKIA(t).component("accordion").on("expandbefore", function(e, t) {
            $($(t).data("accordion").content).show(), HKIA(".globalSilder", e.currentTarget).miniSlideShow("reset"), $(".accordionContent .futureSilder").length > 0 && !$(".accordionContent .futureSilder").hasClass("slick-initialized") ? $(".accordionContent .futureSilder").slick({
                infinite: !1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 400,
                dots: !0,
                arrows: !1
            }) : $(".accordionContent .futureSilder").slick("setPosition")
        }).on("expand", function(e, i) {
            records = $(i).siblings(), records.length == records.filter(".open").length && HKIA(t).addClass("expandAll")
        }).on("collapse", function() {
            HKIA(t).filter(".expandAll").removeClass("expandAll")
        }), HKIA(t).find("a.btnExpandAll").click(function(e) {
            HKIA(t).not(".expandAll").addClass("expandAll").component("accordion", "expandAll"), setTimeout(function() {
                HKIA(".globalSilder").miniSlideShow("reset"), HKIA(t).component("accordion", "refresh")
            }, 0)
        }), HKIA(t).find("a.btnCollapseAll").click(function(e) {
            HKIA(t).filter(".expandAll").removeClass("expandAll").component("accordion", "collapseAll")
        }), $.isMobile() || setTimeout(function() {
            HKIA(".globalSilder", t).miniSlideShow("reset"), HKIA(t).component("accordion", "refresh")
        }, 0)
    }), HKIA(".moreDetailAccordion").component("accordion", {
        target: ".moreDetailAccordionItem",
        handle: ".moreDetailAccordionHandle",
        content: ".moreDetailAccordionContent"
    }), HKIA.Weather.update(function(e, t) {
        var i, n = $.inArray(HKIA.language(), ["en-US", "zh-HK", "zh-CN"]),
            a = [];
        t.hasWarning ? $.each(t.warningInfo, function(e, t) {
            a.push(t.warningClass + " warning")
        }) : (a.push(t.weather.icon.replace(/\.png/, "")), i = t.weather.description[n]), HKIA.Header.Weather.set(a, i, t.temperature, t.hasWarning)
    }), HKIA.Clock.timespan(function(e) {
        HKIA.Header.Clock.update(this.getCurrentDateObject())
    }, 3e4), HKIA("#globalBackToTop").click(function(e) {
        e.preventDefault(), HKIA("html, body").animate({
            scrollTop: 0
        }, {
            duration: HKIA(window).scrollTop() / 5
        })
    }), HKIA(".hasMultiViewMode").on("changedisplaymode", function(e, t) {
        $(".gridBox, .listBox").removeClass("selected").filter('[class*="' + t + '"]').addClass("selected")
    }).switchView({
        displayMode: "grid"
    }), $(".gridBox, .listBox").click(function(e) {
        $(e.currentTarget).hasClass("selected") || HKIA(".hasMultiViewMode").switchView($(e.currentTarget).hasClass("gridBox") ? "grid" : "list")
    }), HKIA().on("animationUpdate", function(e) {
        HKIA(".globalSilder").miniSlideShow("reset")
    }).on("statusChange", function(e, t) {
        var i = HKIA.trim(t.device + " " + (t.orientation || ""));
        HKIA.Header.mobile("tablet portrait" == i || "mobile" == i), HKIA(".multiDeviceImg").attr({
            src: function() {
                return "desktop" == i || "tablet landscape" == i || "tablet portrait" == i ? HKIA(this).attr("data-src-desktop") : HKIA(this).attr("data-src-mobile")
            }
        }), HKIA(".multiDeviceBg").css({
            "background-image": function() {
                return "url(" + ("desktop" == i || "tablet landscape" == i || "tablet portrait" == i ? HKIA(this).attr("data-src-desktop") : HKIA(this).attr("data-src-mobile")) + ")"
            }
        }), HKIA(".multiDeviceBg").css({
            opacity: 0
        }), setTimeout(function() {
            HKIA(".multiDeviceBg").animate({
                opacity: 1
            }, function() {
                HKIA(".topBanner .title span").animate({
                    opacity: 1
                })
            })
        }, 500)
    }).statusDispatcher("triggerEvent"), HKIA.phoneNumber(), HKIA("#miniSearchInput").data({
        syncInput: HKIA("#searchInput")
    }), HKIA("#searchInput").data({
        syncInput: HKIA("#miniSearchInput")
    }), HKIA("#miniSearchInput, #searchInput").on("keydown", function(e) {
        setTimeout(function() {
            HKIA(e.currentTarget).data("syncInput").val(HKIA(e.currentTarget).val())
        }, 0)
    }).on("paste", function(e) {
        var t = e.originalEvent.clipboardData.getData("text");
        HKIA(e.currentTarget).data("syncInput").val(t)
    }), HKIA(".searchBoxBtn").click(function(e) {
        $(e.currentTarget).siblings('input[type="text"]').hkia_searchfield("submit")
    }), HKIA.queryString("q") && $("#miniSearchInput, #searchInput").val(decodeURIComponent(HKIA.queryString("q"))), HKIA(".line-menu .item").click(function(e) {
        var t = $(this).attr("data-anchor"),
            i = $("a[data-anchor=" + t + "]").offset().top;
        $("html, body").animate({
            scrollTop: i + "px"
        }, 400)
    }), (HKIA(".line-menu").length > 0 || HKIA(".formContainer").length > 0) && window.location.hash && setTimeout(function() {
        var e = window.location.hash.substring(1);
        $("a.anchorHolder").each(function() {
            if ($(this).attr("data-anchor") == e) {
                var t = $("a[data-anchor=" + e + "]").offset().top;
                $("html, body").animate({
                    scrollTop: t + "px"
                }, 400)
            }
        })
    }, 500), HKIA(".selectAnchor").on("change hkia_selectmenuchange", function(e) {
        var t = $(this).val();
        if (t) {
            var i = $("#" + t).offset().top;
            $("html, body").animate({
                scrollTop: i
            }, 400)
        }
    }), HKIA(".html-content, .html-content-large").find("table").wrap($("<div/>", {
        class: "genericTable"
    })).parent().wrap($("<div/>", {
        class: "genericTableBox scrollTable"
    })), HKIA().on("click", ".sp-fresh", function() {
        location.reload()
    })
}), HKIA.on("afterRender.hkia", function(e) {
    HKIA(window).on("resize", function(e) {
        HKIA.ImportantNotice.refresh(), HKIA(".accordion").component("accordion", "refresh"), HKIA(".tabContainer").component("commonTab", "refresh")
    }).on("scroll", function(e) {
        if (HKIA().hasClass("non-scroll")) return !1;
        var t = HKIA(window).scrollTop(),
            i = HKIA("body").outerHeight(!0) - HKIA("footer").outerHeight(!0),
            n = HKIA(".topBanner").offset().top + HKIA(".topBanner").outerHeight(!0);
        HKIA.Header.mini(t + parseInt(HKIA(".topBanner").css("margin-top")) > n - parseInt(HKIA(".topBanner").css("margin-top")) - $("#runwayCanvas").height());
        var a = HKIA.Quicklink.top(),
            r = HKIA.Quicklink.bottom();
        HKIA.Quicklink.active(n - t < a && i - t > r), HKIA.Quicklink.BackToTop.active(n - t < a);
        var o = HKIA.FloatingADBox.top();
        HKIA.FloatingADBox.bottom();
        HKIA.FloatingADBox.active() || HKIA.FloatingADBox.active(n - t < o)
    }).on("resize scroll", function(e) {
        var t = HKIA(window).scrollTop();
        HKIA(".topBanner").banner("update", function() {
            var e = HKIA(this).hasClass(".mini") ? 2 : 4;
            return t / e / 100
        }), HKIA(".hasFixHeader").length && HKIA(".hasFixHeader").each(function(e, t) {
            var i = $(t);
            i.offset().top <= HKIA.MainMenu.offset().top + HKIA.MainMenu.outerHeight(!0) ? HKIA(".fixTableHeader", i).addClass("fixed") : HKIA(".fixTableHeader", i).removeClass("fixed"), HKIA.MainMenu.offset().top + HKIA.MainMenu.outerHeight(!0) + HKIA(".fixTableHeader", i).outerHeight(!0) >= i.offset().top + i.outerHeight(!0) ? HKIA(".fixTableHeader", i).filter(function() {
                return !/absolute/.test($(this).css("position"))
            }).addClass("bottom") : HKIA(".fixTableHeader", i).filter(function() {
                return /absolute/.test($(this).css("position"))
            }).removeClass("bottom")
        }), HKIA.globalAnimate()
    }).trigger("scroll"), HKIA.Filter.on("afterSift", function(e) {
        $("body").trigger("scroll")
    })
}), HKIA.on("start.hkia", function(e) {
    HKIA.globalAnimate()
}), HKIA.render.setTemplate("flightBookmarkRecord", function() {
    var e = $.inArray(HKIA.language(), ["en-US", "zh-HK", "zh-CN"]),
        t = this.state.data;
    return React.createElement("div", null, React.createElement("a", {
        href: "javascript:;",
        className: "btnDeleteFlight",
        title: "Delete Flight",
        onClick: function(e) {
            t.bookmark(!t.bookmark())
        }
    }), function(e, t) {
        var i = "";
        return i = t ? "Cargo" : "Passenger", i += e ? " Arrivals" : " Departures", React.createElement("h2", {
            className: i.toLowerCase().replace(" ", "_")
        }, HKIA.__(i))
    }(t.arrival, t.cargo), React.createElement("dl", {
        className: "flightNo"
    }, React.createElement("dt", null, HKIA.__("FLIGHT")), React.createElement("dd", null, function(e) {
        var t = [];
        for (var i in e) t.push(React.createElement("span", {
            key: i
        }, e[i].no));
        return t
    }(t.flight))), React.createElement("div", {
        className: t.recordNotFind ? "bookmarkedFlightInfo flightNotFound" : "bookmarkedFlightInfo"
    }, React.createElement("dl", {
        className: "date"
    }, React.createElement("dt", null, HKIA.__("DATE")), React.createElement("dd", null, HKIA.dateFormat(t._time, !1, !1))), React.createElement("dl", {
        className: "time"
    }, React.createElement("dt", null, HKIA.__("TIME")), React.createElement("dd", null, t.time)), React.createElement("dl", {
        className: "location"
    }, React.createElement("dt", null, t.arrival ? HKIA.__("ORIGIN") : HKIA.__("DESTINATION")), React.createElement("dd", null, t.arrival ? [t.origin.map(function(t, i) {
        try {
            return React.createElement("div", {
                key: "origin" + i,
                className: "city"
            }, t.description[e])
        } catch (e) {
            return React.createElement("div", null)
        }
    })] : [t.destination.map(function(t, i) {
        try {
            return React.createElement("div", {
                key: "destination" + i,
                className: "city"
            }, t.description[e])
        } catch (e) {
            return React.createElement("div", null)
        }
    })])), t.recordNotFind ? React.createElement("div", {
        className: "notFound"
    }, HKIA.__("Your bookmarked flight could not be found or has changed information. Please search and bookmarked your flight again or contact airline directly for updated flight information")) : React.createElement("dl", {
        className: "status"
    }, React.createElement("dt", null, HKIA.__("STATUS")), React.createElement("dd", null, "" == t.status ? "-" : /^BoardingSoon$/i.test($.trim(t.status)) ? "Boarding Soon" : t.status))))
}), HKIA.render.setTemplate("smartbanner", function() {
    return React.createElement("div", {
        id: "smartbanner"
    }, React.createElement("div", {
        className: "smartbanner-container"
    }, React.createElement("a", {
        onClick: this.hideSmartbanner,
        className: "smartbanner-close"
    }, "×"), React.createElement("span", {
        className: "smartbanner-icon"
    }, React.createElement("img", {
        src: "http://www.hongkongairport.com/iwov-resources/image/myflight/mytag/app-icon.png",
        alt: ""
    })), React.createElement("div", {
        className: "smartbanner-info"
    }, React.createElement("div", {
        className: "smartbanner-title"
    }, HKIA.__("smartBannerAppName")), React.createElement("div", null, HKIA.__("Hong Kong International Airport")), React.createElement("span", null, HKIA.__("FREE In {{0}}", "ios" == HKIA.config("deviceType") ? HKIA.__("App Store") : HKIA.__("Google Play")))), React.createElement("a", {
        onClick: this.toSmartbannerApp,
        className: "smartbanner-button"
    }, HKIA.__("View"))))
}, {
    componentWillMount: function() {
        navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) ? this.type = "ios" : (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) && (this.type = "android")
    },
    launchIframeApproach: function(e, t) {
        var i = document.createElement("iframe");
        i.style.border = "none", i.style.width = "1px", i.style.height = "1px", i.onload = function() {
            document.location = t
        }, document.body.appendChild(i)
    },
    launchiOSApp: function(e) {
        var t = (new Date).valueOf();
        setTimeout(function() {
            (new Date).valueOf() - t > 100 || (window.location = "https://itunes.apple.com/hk/app/hkg-my-flight/id610290647?mt=8")
        }, 50), window.location = e
    },
    launchAndroidApp: function(e) {
        var t = "https://play.google.com/store/apps/details?id=com.hkia.myflight&hl=en";
        if (navigator.userAgent.match(/Chrome/)) {
            var i = e.replace("hkgmyflight", "intent") + "#Intent;scheme=hkgmyflight;package=com.hkia.myflight;end";
            document.location = i
        } else if (navigator.userAgent.match(/Firefox/)) {
            var n = (new Date).valueOf();
            setTimeout(function() {
                (new Date).valueOf() - n > 100 || (window.location = t)
            }, 50), window.location = e
        } else this.launchIframeApproach(e, t)
    },
    toSmartbannerApp: function(e) {
        "ios" == HKIA.config("deviceType") ? this.launchiOSApp(HKIA.config("hkia_app_protocol")) : "android" == HKIA.config("deviceType") && this.launchAndroidApp(HKIA.config("hkia_app_protocol"))
    },
    hideSmartbanner: function(e) {
        HKIA.cookie(HKIA.config("prefix") + ".smartbannerClosed", !0, HKIA.config("cookie_settings")), $("body").removeClass("withSmartBanner"), $("#smartbanner").hide(), $(".aboutUsBanner").length && (HKIA.aboutUsBannerSize(), HKIA.videoSize())
    }
}), HKIA.render.setTemplate("spError", function() {
    return React.createElement("div", {
        className: "specialAnnouncementContainer"
    }, React.createElement("div", {
        className: "specialAnnouncement icon-important-notice-sign"
    }, React.createElement("p", {
        id: "sp"
    }, React.createElement("strong", null, HKIA.__("Special Notice"), ":"), " ", React.createElement("span", {
        dangerouslySetInnerHTML: {
            __html: "flight" == this.state.type ? HKIA.__("apiErrorMessageFlight") : HKIA.__("apiErrorMessage")
        }
    }))))
});
//# sourceMappingURL=hkia.js.map
